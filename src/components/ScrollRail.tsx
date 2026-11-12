import { useCallback, useEffect, useRef, useState } from "react";
import type { DragEvent, ReactNode, UIEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDragScroll } from "../hooks/useDragScroll";

interface ScrollRailProps {
  /** Announced on the track and used in the arrow labels */
  label: string;
  /** `ul` for cards, `ol` where the order of the items carries meaning */
  as?: "ul" | "ol";
  /** Extra classes for the track itself */
  className?: string;
  children: ReactNode;
}

/**
 * Track gutters mirror the *content* edge of `.container-page`: half of the
 * leftover width once the 1280px box is centred, plus that box's own 1.5rem
 * padding. The first card therefore starts exactly under the heading while the
 * track itself runs edge to edge. Measured against the track's own width rather
 * than `100vw`, which would include the scrollbar and push the page sideways on
 * Windows.
 */
const TRACK_PADDING_RESPONSIVE =
  "px-4 sm:px-6 lg:px-[max(1.5rem,calc((100%_-_1280px)/2_+_1.5rem))]";

/** Same value as the padding: a snapped card stops on the heading's edge */
const TRACK_SCROLL_PADDING_RESPONSIVE =
  "scroll-pl-4 sm:scroll-pl-6 lg:scroll-pl-[max(1.5rem,calc((100%_-_1280px)/2_+_1.5rem))]";

/** Square, 2px radius, brand blue on hover; inert until the track can move */
const arrowClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-xs border border-gray-300 bg-white text-gray-700 transition-colors hover:border-primary-600 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300 disabled:hover:border-gray-200 disabled:hover:text-gray-300";

/** Sub-pixel slack in the at-start / at-end test */
const EDGE_TOLERANCE = 2;

/**
 * Horizontal scrolling track: native overflow plus scroll snapping, so touch
 * and keyboard work with no JavaScript at all. Only the two things the
 * browser cannot do — a mouse drag and the arrow buttons — are hydrated.
 *
 * The cards stay with the calling component; this one only owns the track,
 * which keeps `<ul>` / `<ol>` semantics in place and lets both sections share
 * a single scrolling implementation.
 */
export default function ScrollRail({
  label,
  as = "ul",
  className = "",
  children,
}: ScrollRailProps) {
  const trackRef = useRef<HTMLElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const {
    dragging,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onClickCapture,
  } = useDragScroll();

  const attachRef = useCallback((node: HTMLElement | null) => {
    trackRef.current = node;
  }, []);

  const syncEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= EDGE_TOLERANCE);
    setAtEnd(track.scrollLeft >= max - EDGE_TOLERANCE);
  }, []);

  useEffect(() => {
    syncEdges();
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(syncEdges);
    observer.observe(track);
    return () => observer.disconnect();
  }, [syncEdges]);

  const handleScroll = (event: UIEvent<HTMLElement>) => {
    const track = event.currentTarget;
    const max = track.scrollWidth - track.clientWidth;
    /* Same-value state updates bail out, so a scroll costs no render */
    setAtStart(track.scrollLeft <= EDGE_TOLERANCE);
    setAtEnd(track.scrollLeft >= max - EDGE_TOLERANCE);
  };

  /** One card plus one gap, measured rather than hard-coded */
  const page = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.firstElementChild;
    const step = card ? card.getBoundingClientRect().width : track.clientWidth * 0.8;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

    track.scrollBy({ left: direction * (step + gap), behavior });
  };

  const trackClass = [
    "flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-3",
    /* The scrollbar would otherwise cut across the full-bleed track */
    "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
    TRACK_PADDING_RESPONSIVE,
    TRACK_SCROLL_PADDING_RESPONSIVE,
    dragging ? "cursor-grabbing select-none" : "md:cursor-grab",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const ListTag = as;

  return (
    <>
      {/* Pulled up into the heading's own bottom margin so the arrows do not
          add a row of height to the section */}
      <div className="container-page -mt-8 mb-3 hidden justify-end gap-2 md:flex">
        <button
          type="button"
          onClick={() => page(-1)}
          disabled={atStart}
          aria-label={`Scroll ${label} left`}
          className={arrowClass}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => page(1)}
          disabled={atEnd}
          aria-label={`Scroll ${label} right`}
          className={arrowClass}
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* The reveal lives on this wrapper, never on the track: the track's
          class list changes while it is being dragged, and React rewrites the
          whole attribute when it does — which would drop the `.is-visible`
          class the observer added and fade the entire row out for good. */}
      <div data-animate="">
        <ListTag
          ref={attachRef}
          className={trackClass}
          tabIndex={0}
          aria-label={label}
          onScroll={handleScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onClickCapture={onClickCapture}
          onDragStart={(event: DragEvent<HTMLElement>) => event.preventDefault()}
        >
          {children}
        </ListTag>
      </div>
    </>
  );
}
