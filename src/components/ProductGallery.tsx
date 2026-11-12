import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import type { GalleryImage } from "../types";
import { slideAt, slideStyle, trackWindow, useSlideTrack } from "../hooks/useSlideTrack";

interface ProductGalleryProps {
  images: GalleryImage[];
  /** Product name, used as the accessible label of the thumbnail group */
  label: string;
}

/** A photo whose caption has been resolved against the product title */
interface Shot {
  src: string;
  alt: string;
}

/**
 * Full-screen previewer. Kept private: it only ever lives inside this gallery.
 * Shares the gallery's slide track, so swiping here continues from exactly
 * the slide the frame was on.
 */
function Lightbox({
  track,
  shots,
  onClose,
}: {
  track: ReturnType<typeof useSlideTrack>;
  shots: Shot[];
  onClose: () => void;
}) {
  const {
    position,
    index,
    offset,
    animated,
    slideTo,
    consumeSwipe,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onTransitionEnd,
  } = track;
  const total = shots.length;

  /* A drag that ends over the backdrop must not also register as a click */
  const handleBackdropClick = () => {
    if (consumeSwipe()) return;
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-navy-950/92 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        aria-label="Close image viewer"
        className="absolute right-3 top-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xs border-2 border-white text-white transition-colors hover:bg-white hover:text-navy-950 sm:right-5 sm:top-5"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          slideTo(-1);
        }}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xs bg-white/90 text-gray-700 transition-colors hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          slideTo(1);
        }}
        aria-label="Next image"
        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xs bg-white/90 text-gray-700 transition-colors hover:bg-white"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>

      <div
        className="flex w-full touch-pan-y select-none flex-col items-center"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <div
          className="relative h-[68vh] w-full overflow-hidden"
          onTransitionEnd={onTransitionEnd}
        >
          {trackWindow(position, total).map((a) => {
            const shot = shots[slideAt(a, total)];
            return (
              <div
                key={a}
                aria-hidden={a !== position}
                className="absolute inset-0 flex items-center justify-center"
                style={slideStyle(a, position, offset, animated)}
              >
                <img
                  src={shot.src}
                  alt={shot.alt}
                  draggable={false}
                  onClick={(event) => event.stopPropagation()}
                  className="max-h-full w-auto max-w-full cursor-default object-contain"
                />
              </div>
            );
          })}
        </div>
        <div
          onClick={(event) => event.stopPropagation()}
          className="flex flex-col items-center"
        >
          <p className="mt-3 max-w-2xl cursor-default text-center text-sm text-white">
            {shots[index].alt}
          </p>
          <p className="mt-1 cursor-default text-xs text-white/60">
            {index + 1} / {total}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Arrow button shared by the main image; 44px target on touch screens */
const arrowClass =
  "absolute top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xs border border-gray-200 bg-white/90 text-gray-700 shadow-sm transition-colors hover:border-primary-600 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100";

/**
 * Product photo carousel: one square frame, arrows and a position counter,
 * with the thumbnails in a row under the frame on every screen.
 * The frame is a sliding strip: arrows, keys and thumbnails move it with a
 * side-slide animation, and a drag follows the pointer 1:1 before settling
 * on the neighbouring slide. Clicking the frame or a thumbnail opens the
 * full-screen previewer, which rides the same track. Mouse, touch and pen
 * behave the same. The only client-side behaviour in the product hero,
 * hydrated with client:visible.
 */
export default function ProductGallery({ images, label }: ProductGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const mainButtonRef = useRef<HTMLButtonElement>(null);
  /* Captions are optional on upload: fall back to the product title */
  const shots: Shot[] = images.map((image) => ({
    ...image,
    alt: image.alt ?? label,
  }));
  const total = shots.length;

  const track = useSlideTrack({ total });
  const {
    position,
    index: activeIndex,
    offset,
    animated,
    dragging,
    slideTo,
    goTo,
    consumeSwipe,
  } = track;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        mainButtonRef.current?.focus();
        return;
      }
      if (event.key === "ArrowLeft") {
        slideTo(-1);
        return;
      }
      if (event.key === "ArrowRight") {
        slideTo(1);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    /* slideTo updates state functionally, so re-subscribing on open/close
       and total changes is enough */
  }, [isOpen, total]);

  const close = () => {
    setIsOpen(false);
    mainButtonRef.current?.focus();
  };

  /** Arrow keys move the carousel while it has focus */
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (isOpen) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      slideTo(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      slideTo(1);
    }
  };

  if (total === 0) return null;

  return (
    <div className="flex min-w-0 flex-col gap-2" onKeyDown={onKeyDown}>
      {/* No flex-1: the frame hugs the photo so the thumbnails sit right
          under it instead of being pushed to the bottom of the column */}
      <div className="relative min-w-0">
        <button
          ref={mainButtonRef}
          type="button"
          onClick={() => {
            if (consumeSwipe()) return;
            setIsOpen(true);
          }}
          onPointerDown={track.onPointerDown}
          onPointerMove={track.onPointerMove}
          onPointerUp={track.onPointerUp}
          onPointerCancel={track.onPointerCancel}
          aria-label={`Open image viewer: ${shots[activeIndex].alt}`}
          className={`group relative block w-full cursor-pointer touch-pan-y select-none overflow-hidden rounded-xs border border-gray-200 bg-gray-50 ${
            dragging ? "cursor-grabbing" : ""
          }`}
        >
          <div
            className="relative aspect-square w-full overflow-hidden"
            onTransitionEnd={track.onTransitionEnd}
          >
            {trackWindow(position, total).map((a) => {
              const shot = shots[slideAt(a, total)];
              return (
                <div
                  key={a}
                  aria-hidden={a !== position}
                  className="absolute inset-0"
                  style={slideStyle(a, position, offset, animated)}
                >
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    width={1200}
                    height={1200}
                    loading="eager"
                    fetchPriority={a === position ? "high" : "auto"}
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                </div>
              );
            })}
          </div>
          <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-xs bg-white/80 text-gray-700 opacity-0 transition-opacity group-hover:opacity-100">
            <ZoomIn className="h-4 w-4" aria-hidden="true" />
          </span>
        </button>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => slideTo(-1)}
              aria-label="Previous image"
              className={`${arrowClass} left-2`}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => slideTo(1)}
              aria-label="Next image"
              className={`${arrowClass} right-2`}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <p className="pointer-events-none absolute bottom-3 right-3 rounded-xs bg-navy-950/70 px-2 py-1 text-xs font-medium text-white">
              {activeIndex + 1} / {total}
            </p>
          </>
        )}
      </div>

      {total > 1 && (
        <div
          className="grid grid-cols-4 gap-3 sm:gap-4"
          role="group"
          aria-label={`${label} gallery`}
        >
          {shots.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onMouseEnter={() => goTo(index)}
              onFocus={() => goTo(index)}
              onClick={() => {
                goTo(index);
                setIsOpen(true);
              }}
              aria-pressed={index === activeIndex}
              aria-label={`Show image ${index + 1}: ${image.alt}`}
              className={`w-full cursor-pointer overflow-hidden rounded-xs border-2 transition ${
                index === activeIndex
                  ? "border-primary-600"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={image.src}
                alt=""
                width={300}
                height={300}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <Lightbox track={track} shots={shots} onClose={close} />
      )}
    </div>
  );
}
