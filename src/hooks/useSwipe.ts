import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

/** Inputs that can start a drag; a mouse and a finger can be handled apart */
export type SwipePointerType = "mouse" | "touch" | "pen";

interface SwipeOptions {
  /** Called once per gesture, with +1 for a left drag and -1 for a right drag */
  onSwipe: (delta: 1 | -1) => void;
  /** Minimum horizontal travel in pixels that counts as a swipe (default 40) */
  threshold?: number;
  /**
   * Vertical travel wins once it exceeds horizontal travel by this factor,
   * so a mostly vertical drag keeps scrolling the page (default 1).
   */
  verticalRatio?: number;
  /** Pointer types allowed to start a drag; omitted accepts every input */
  pointerTypes?: readonly SwipePointerType[];
}

interface SwipeHandlers {
  onPointerDown: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerUp: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerCancel: () => void;
  /** True between pointerdown and pointerup, for cursor / select-none styling */
  dragging: boolean;
  /** Consumes the click a drag leaves behind; true if the last gesture was a drag */
  consumeSwipe: () => boolean;
}

/**
 * Horizontal drag navigation shared by the hero, the factory gallery and the
 * product gallery. Pointer events cover mouse, touch and pen the same way;
 * the direction is only decided on release, so dragging never re-renders
 * per frame. Vertical travel still scrolls the page.
 */
export function useSwipe({
  onSwipe,
  threshold = 40,
  verticalRatio = 1,
  pointerTypes,
}: SwipeOptions): SwipeHandlers {
  const origin = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const [dragging, setDragging] = useState(false);
  /* Widened once so the DOM's string value needs no assertion at the check */
  const allowedInputs: readonly string[] | undefined = pointerTypes;

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    /* Narrow the input set when a caller only wants mice or only fingers */
    if (allowedInputs && !allowedInputs.includes(event.pointerType)) return;
    /* Left mouse button only; touch and pen report button 0 as well */
    if (event.pointerType === "mouse" && event.button !== 0) return;
    swiped.current = false;
    origin.current = { x: event.clientX, y: event.clientY };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    const from = origin.current;
    origin.current = null;
    setDragging(false);
    if (!from) return;

    const deltaX = event.clientX - from.x;
    const deltaY = event.clientY - from.y;
    if (
      Math.abs(deltaX) < threshold ||
      Math.abs(deltaX) <= Math.abs(deltaY) * verticalRatio
    ) {
      return;
    }

    swiped.current = true;
    onSwipe(deltaX < 0 ? 1 : -1);
  };

  /** The browser took over the gesture (e.g. scrolling): forget the start point */
  const onPointerCancel = () => {
    origin.current = null;
    setDragging(false);
  };

  /** Lets a tap handler skip the click a drag leaves behind */
  const consumeSwipe = () => {
    const wasSwipe = swiped.current;
    swiped.current = false;
    return wasSwipe;
  };

  return { onPointerDown, onPointerUp, onPointerCancel, dragging, consumeSwipe };
}
