import { factoryGallery } from "../data/advantages";
import { slideAt, slideStyle, trackWindow, useSlideTrack } from "../hooks/useSlideTrack";

interface GallerySlide {
  src: string;
  alt: string;
}

interface FactoryShowcaseProps {
  slides?: GallerySlide[];
  /** `square` keeps a 1:1 frame; `fill` takes the height of the card it sits in */
  aspect?: "square" | "fill";
  /** Dot colour: `dark` for light photography, `light` for dark photography */
  dotsTone?: "light" | "dark";
  /** Accessible name of the carousel */
  label?: string;
}

/**
 * Factory gallery: one photo per frame, dots below, no arrows.
 * The photos form a sliding strip: dragging left/right with a mouse, finger
 * or pen pulls the strip along 1:1 and settles it on the neighbouring photo;
 * the dots remain as a non-drag alternative and slide to their target.
 * Hydrated on the client because the active index lives in component state.
 */
export default function FactoryShowcase({
  slides = factoryGallery,
  aspect = "square",
  dotsTone = "light",
  label = "Factory gallery",
}: FactoryShowcaseProps) {
  const total = slides.length;
  const {
    position,
    index: active,
    offset,
    animated,
    dragging,
    goTo,
    consumeSwipe,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onTransitionEnd,
  } = useSlideTrack({ total });

  const frame =
    aspect === "square"
      ? "aspect-square rounded-xl"
      : "aspect-[4/3] w-full rounded-none lg:aspect-auto";
  const dotClasses =
    dotsTone === "dark"
      ? { active: "bg-gray-900", idle: "bg-gray-900/30" }
      : { active: "bg-white", idle: "bg-white/60" };

  return (
    <div
      className={`relative h-full touch-pan-y overflow-hidden bg-gray-100 ${frame} ${
        dragging ? "cursor-grabbing select-none" : "md:cursor-grab"
      }`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onTransitionEnd={onTransitionEnd}
      onClickCapture={(event) => {
        /* Drop the click a drag leaves behind, so the dots stay tap-only */
        if (!consumeSwipe()) return;
        event.preventDefault();
        event.stopPropagation();
      }}
      aria-roledescription="carousel"
      aria-label={label}
    >
      {trackWindow(position, total).map((a) => {
        const slide = slides[slideAt(a, total)];
        return (
          <div
            key={a}
            aria-hidden={a !== active}
            className="absolute inset-0"
            style={slideStyle(a, position, offset, animated)}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              loading="lazy"
              draggable={false}
              className="h-full w-full object-cover"
            />
          </div>
        );
      })}

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to image ${index + 1}`}
            aria-current={index === active}
            className={`h-2 rounded-full transition-all ${
              index === active
                ? `w-6 ${dotClasses.active}`
                : `w-2 ${dotClasses.idle}`
            }`}
          />
        ))}
      </div>
    </div>
  );
}
