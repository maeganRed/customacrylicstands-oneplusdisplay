import { useRef, useState } from "react";
import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  TransitionEvent,
} from "react";

/** Minimum horizontal travel in pixels that counts as a swipe */
export const SWIPE_THRESHOLD = 40;

/** Timing of one slide animation */
const SLIDE_TIMING = "transform 300ms ease";

interface SlideTrackOptions {
  /** Number of slides; below 2 the gestures and animation are disabled */
  total: number;
  /** Minimum horizontal travel in pixels that counts as a swipe (default 40) */
  threshold?: number;
}

/**
 * Slide-track engine shared by the site's small carousels. Instead of swapping
 * or fading a single image, the track holds neighbouring slides side by side
 * and moves as one strip: while a finger or mouse pulls, `offset` follows the
 * pointer 1:1 (no transition); on release the strip finishes its slide to the
 * neighbour (or springs back) with a short transform transition.
 *
 * `position` is unbounded so the strip can keep travelling in one direction;
 * after each transition ends it is folded back into [0, total) with the
 * animation switched off, which is invisible because slide content is
 * resolved modulo the total.
 */
export function useSlideTrack({
  total,
  threshold = SWIPE_THRESHOLD,
}: SlideTrackOptions) {
  const [position, setPosition] = useState(0);
  const [offset, setOffset] = useState(0);
  const [animated, setAnimated] = useState(true);
  const [dragging, setDragging] = useState(false);
  const origin = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  const index = total > 0 ? ((position % total) + total) % total : 0;

  /** Move `delta` slides with a slide animation (arrows, keys, wheel swipes) */
  const slideTo = (delta: number) => {
    if (total < 2) return;
    setPosition((current) => current + delta);
    setOffset(0);
    setAnimated(true);
  };

  /** Move to a slide index, taking the shortest path around the ring */
  const goTo = (target: number) => {
    if (total < 2) return;
    setPosition((current) => {
      const from = ((current % total) + total) % total;
      let delta = target - from;
      if (delta > total / 2) delta -= total;
      if (delta < -total / 2) delta += total;
      return current + delta;
    });
    setOffset(0);
    setAnimated(true);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (total < 2) return;
    /* Left mouse button only; touch and pen report button 0 as well */
    if (event.pointerType === "mouse" && event.button !== 0) return;
    swiped.current = false;
    origin.current = { x: event.clientX, y: event.clientY };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const from = origin.current;
    if (!from) return;
    const deltaX = event.clientX - from.x;
    const deltaY = event.clientY - from.y;
    /* A mostly vertical drag keeps scrolling the page instead of pulling */
    if (Math.abs(deltaY) >= Math.abs(deltaX)) {
      setOffset(0);
      return;
    }
    setAnimated(false);
    setOffset(deltaX);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    const from = origin.current;
    origin.current = null;
    setDragging(false);
    if (!from) return;

    const deltaX = event.clientX - from.x;
    const deltaY = event.clientY - from.y;
    setOffset(0);
    setAnimated(true);
    if (Math.abs(deltaX) >= threshold && Math.abs(deltaX) > Math.abs(deltaY)) {
      swiped.current = true;
      setPosition((current) => current + (deltaX < 0 ? 1 : -1));
    }
  };

  /** The browser took over the gesture (e.g. scrolling): spring back */
  const onPointerCancel = () => {
    origin.current = null;
    setDragging(false);
    setOffset(0);
    setAnimated(true);
  };

  /** Fold an unbounded position back into range once the slide has finished */
  const onTransitionEnd = (event: TransitionEvent<HTMLElement>) => {
    if (event.propertyName !== "transform") return;
    if (position < 0 || position >= total) {
      setAnimated(false);
      setPosition(((position % total) + total) % total);
    }
  };

  /** Lets a tap handler skip the click a drag leaves behind */
  const consumeSwipe = () => {
    const wasSwipe = swiped.current;
    swiped.current = false;
    return wasSwipe;
  };

  return {
    position,
    index,
    offset,
    animated,
    dragging,
    slideTo,
    goTo,
    consumeSwipe,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onTransitionEnd,
  };
}

export type SlideTrack = ReturnType<typeof useSlideTrack>;

/**
 * Absolute slide positions to render around the current one. Two on each
 * side keeps a fast drag of up to two slide widths covered without
 * mounting the whole set.
 */
export function trackWindow(position: number, total: number): number[] {
  if (total < 2) return [0];
  return [-2, -1, 0, 1, 2].map((distance) => position + distance);
}

/** Resolve an absolute track position to a slide index in [0, total) */
export function slideAt(position: number, total: number): number {
  return ((position % total) + total) % total;
}

/**
 * Inline style for one slide in the strip: placed a full slide width per
 * step away from the current position, plus the pixel offset a drag adds.
 * While `animated` is false the transform follows the pointer with no delay.
 */
export function slideStyle(
  a: number,
  position: number,
  offset: number,
  animated: boolean,
): CSSProperties {
  return {
    transform: `translateX(calc(${(a - position) * 100}% + ${offset}px))`,
    transition: animated ? SLIDE_TIMING : "none",
  };
}
