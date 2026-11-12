import { useRef, useState } from "react";
import type {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from "react";

/** Horizontal travel that turns a press into a drag; below it the click survives */
const DRAG_THRESHOLD = 5;

/** Pointer speed (px/ms) at which a release counts as a flick to the next card */
const FLICK_VELOCITY = 0.5;

/** Drag distance as a fraction of the card width that also advances a card */
const ADVANCE_RATIO = 0.2;

/** How many pointer positions are kept to derive a release velocity */
const VELOCITY_SAMPLES = 4;

/** Only these recent samples count, so a pause before the flick is ignored */
const VELOCITY_WINDOW_MS = 120;

/** Fallback for browsers without `scrollend` or a scroll that never starts */
const SETTLE_TIMEOUT = 700;

interface PointerSample {
  x: number;
  time: number;
}

/**
 * Scroll offsets that put a card edge where the CSS `scroll-snap` would —
 * measured relative to the first card, whose resting place is `scrollLeft`
 * 0 (the track's own padding already places it on the content edge). No
 * computed style is parsed: the responsive `scroll-padding` is a `calc()`
 * with a percentage that `parseFloat` cannot resolve, which used to shift
 * every snap point by the container gutter.
 */
function snapPoints(track: HTMLElement): number[] {
  const trackLeft = track.getBoundingClientRect().left;
  const offsets = Array.from(track.children)
    .filter((child): child is HTMLElement => child instanceof HTMLElement)
    .map(
      (child) =>
        child.getBoundingClientRect().left - trackLeft + track.scrollLeft,
    );
  const first = offsets[0];
  return first === undefined ? [] : offsets.map((offset) => offset - first);
}

function nearestIndex(points: number[], position: number): number {
  let best = 0;
  for (let i = 1; i < points.length; i += 1) {
    if (Math.abs(points[i] - position) < Math.abs(points[best] - position)) {
      best = i;
    }
  }
  return best;
}

/** Recent pointer speed in px/ms; positive when the pointer moves right */
function releaseVelocity(samples: PointerSample[]): number {
  if (samples.length < 2) return 0;
  const last = samples[samples.length - 1];
  const recent = samples.filter(
    (sample) => last.time - sample.time <= VELOCITY_WINDOW_MS,
  );
  if (recent.length < 2) return 0;
  const first = recent[0];
  const dt = last.time - first.time;
  return dt > 0 ? (last.x - first.x) / dt : 0;
}

interface DragScrollHandlers {
  onPointerDown: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerMove: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerUp: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerCancel: (event: ReactPointerEvent<HTMLElement>) => void;
  onClickCapture: (event: ReactMouseEvent<HTMLElement>) => void;
  /** True while the track is being pulled, for cursor / select-none styling */
  dragging: boolean;
}

/**
 * Grab-and-pull scrolling for a horizontal track.
 *
 * Touch never reaches this hook: the browser already scrolls the track with
 * momentum, so only a mouse or pen press starts a drag. `scrollLeft` is
 * written straight onto the element from `pointermove` — no state update and
 * no render per frame, which is why a drag stays smooth with six cards in
 * the DOM. Pointer capture is taken once the drag threshold is crossed, never
 * on press, so a plain click still lands on the link inside the card.
 *
 * Snapping is suspended while the cards follow the pointer; on release the
 * hook picks the card to land on — the nearest one, or the next one in the
 * drag direction when the gesture was a flick or covered enough of a card —
 * and glides there with `scrollTo`. Only after the glide ends is the CSS
 * snap restored, because re-enabling `scroll-snap-type` mid-scroll makes the
 * browser jump instead of animate.
 */
export function useDragScroll(): DragScrollHandlers {
  /** Press origin plus the scroll offset at the moment of the press */
  const origin = useRef<{ x: number; left: number } | null>(null);
  const dragged = useRef(false);
  /** Inline values taken over while the drag holds the track */
  const prevSnap = useRef("");
  const prevSelect = useRef("");
  /** Pointer trail from which the release velocity is derived */
  const samples = useRef<PointerSample[]>([]);
  /** Cancels the pending snap restore of an earlier release */
  const cancelSettle = useRef<(() => void) | null>(null);
  /** Stays set until the click a drag leaves behind has been swallowed */
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);

  const endDrag = (track: HTMLElement) => {
    track.style.userSelect = prevSelect.current;
    prevSelect.current = "";
    setDragging(false);
  };

  /**
   * Glide to the chosen card, then hand snapping back to the CSS.
   * `dragDelta` is the pointer travel (negative = content moved right);
   * `velocity` is the pointer speed in px/ms at the moment of release.
   */
  const settle = (
    track: HTMLElement,
    dragDelta: number,
    velocity: number,
  ) => {
    const points = snapPoints(track);
    if (points.length === 0) {
      track.style.scrollSnapType = prevSnap.current;
      prevSnap.current = "";
      return;
    }

    const max = track.scrollWidth - track.clientWidth;
    let index = nearestIndex(points, track.scrollLeft);

    const scrollDirection = dragDelta === 0 ? 0 : dragDelta < 0 ? 1 : -1;
    const card = track.firstElementChild?.getBoundingClientRect().width ?? 0;
    const intent =
      Math.abs(velocity) >= FLICK_VELOCITY ||
      (card > 0 && Math.abs(dragDelta) >= card * ADVANCE_RATIO);
    if (intent && scrollDirection !== 0) {
      index = Math.min(Math.max(index + scrollDirection, 0), points.length - 1);
    }
    const target = Math.min(Math.max(points[index] ?? track.scrollLeft, 0), max);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      track.removeEventListener("scrollend", finish);
      track.style.scrollSnapType = prevSnap.current;
      prevSnap.current = "";
      cancelSettle.current = null;
    };
    cancelSettle.current = finish;
    track.addEventListener("scrollend", finish, { once: true });
    window.setTimeout(finish, SETTLE_TIMEOUT);

    track.scrollTo({ left: target, behavior: reduced ? "auto" : "smooth" });
    /* An instant scroll (reduced motion, or already on target) fires no
       `scrollend`, so the snap is restored right away instead */
    if (track.scrollLeft === target) finish();
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    /* A finger already scrolls natively; a right click is never a drag */
    if (event.pointerType === "touch") return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    /* A press during the previous release's glide stops it and gives the
       snap back, so the new gesture starts from a settled track */
    cancelSettle.current?.();

    suppressClick.current = false;
    dragged.current = false;
    origin.current = { x: event.clientX, left: event.currentTarget.scrollLeft };
    samples.current = [{ x: event.clientX, time: event.timeStamp }];
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const from = origin.current;
    if (!from) return;

    samples.current.push({ x: event.clientX, time: event.timeStamp });
    if (samples.current.length > VELOCITY_SAMPLES) samples.current.shift();

    if (!dragged.current) {
      if (Math.abs(event.clientX - from.x) < DRAG_THRESHOLD) return;

      dragged.current = true;
      const track = event.currentTarget;
      /* Snapping pulls a manually scrolled track back, and text must not be
         selected while the cards are being dragged */
      prevSnap.current = track.style.scrollSnapType;
      prevSelect.current = track.style.userSelect;
      track.style.scrollSnapType = "none";
      track.style.userSelect = "none";
      track.setPointerCapture(event.pointerId);
      setDragging(true);
    }

    event.currentTarget.scrollLeft = from.left - (event.clientX - from.x);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    const from = origin.current;
    const wasDragging = dragged.current;
    origin.current = null;
    dragged.current = false;

    if (!wasDragging) {
      samples.current = [];
      return;
    }

    suppressClick.current = true;
    const track = event.currentTarget;
    const velocity = releaseVelocity(samples.current);
    samples.current = [];
    endDrag(track);
    settle(track, from ? event.clientX - from.x : 0, velocity);
  };

  const onPointerCancel = (event: ReactPointerEvent<HTMLElement>) => {
    const from = origin.current;
    const wasDragging = dragged.current;
    origin.current = null;
    dragged.current = false;

    if (!wasDragging) {
      samples.current = [];
      return;
    }

    suppressClick.current = true;
    const track = event.currentTarget;
    const velocity = releaseVelocity(samples.current);
    samples.current = [];
    endDrag(track);
    settle(track, from ? event.clientX - from.x : 0, velocity);
  };

  const onClickCapture = (event: ReactMouseEvent<HTMLElement>) => {
    if (!suppressClick.current) return;
    suppressClick.current = false;
    /* A drag that ends over a card must not open it */
    event.preventDefault();
    event.stopPropagation();
  };

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onClickCapture,
    dragging,
  };
}
