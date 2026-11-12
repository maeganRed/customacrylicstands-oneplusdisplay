import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroSlide } from "../types";
import { site } from "../data/site";
import { useSwipe } from "../hooks/useSwipe";

interface HeroProps {
  /** Carousel slides: one per photo theme, in rotation order */
  slides?: HeroSlide[];
  /** Risk-reversal line under the single CTA */
  ctaNote?: string;
}

/**
 * Slide dwell time; also drives the progress fill via `--hero-dwell`.
 * Long enough that the CTA is still on screen when a visitor finishes reading
 * the first slide — at 8s the button rotated away mid-scan.
 */
const DWELL_MS = 12000;
/** Minimum horizontal drag distance that counts as a slide change */
const SWIPE_PX = 50;

/* Custom property on the progress fill; kept as a cast because CSS custom
   properties are not part of React's CSSProperties. */
const dwellStyle = {
  "--hero-dwell": `${DWELL_MS}ms`,
} as CSSProperties;

/**
 * Home page hero carousel, modelled on the group's Chinese-language site:
 * every slide fills the first screen, with a dual-layer Ken Burns background
 * cross-fading underneath. Copy is the only content — one centred column in
 * front of the photo — and each switch brings the copy lines in from below,
 * one after the other. A finger drags anywhere, a mouse only from the empty
 * space between blocks, and dots plus desktop arrows cover the rest.
 * Hydrated on the client: the active index lives in state.
 */
export default function Hero({
  slides = site.hero.slides,
  ctaNote = site.hero.ctaNote,
}: HeroProps) {
  const [active, setActive] = useState(0);
  /* Autoplay pauses while the pointer rests on the hero, while the tab is in
     the background, and when the visitor asked for less motion */
  const [hovered, setHovered] = useState(false);
  const [backgrounded, setBackgrounded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  /* Two background layers take turns being in front for the cross-fade */
  const [bg, setBg] = useState(() => ({
    a: slides[0].image,
    b: "",
    frontIsA: true,
  }));
  /* Bumped whenever autoplay resumes so the progress fill restarts in sync */
  const [dwell, setDwell] = useState(0);

  const total = slides.length;
  /* Clamped so a shorter slide list can never leave an empty frame */
  const index = Math.min(active, total - 1);
  const slide = slides[index];

  const go = (delta: number) =>
    setActive((current) => (Math.min(current, total - 1) + delta + total) % total);
  const jumpTo = (target: number) => setActive(target);

  /* Two instances on purpose: a mouse only drags the empty layer behind the
     copy, while a finger drags anywhere on the slide. A mostly vertical drag
     is left to the browser either way, so the page still scrolls. */
  const mouseDrag = useSwipe({
    onSwipe: go,
    threshold: SWIPE_PX,
    verticalRatio: 1.2,
    pointerTypes: ["mouse"],
  });
  const touchDrag = useSwipe({
    onSwipe: go,
    threshold: SWIPE_PX,
    verticalRatio: 1.2,
    pointerTypes: ["touch", "pen"],
  });

  const paused =
    hovered ||
    backgrounded ||
    reducedMotion ||
    mouseDrag.dragging ||
    touchDrag.dragging;

  /* Read after hydration: the server renders slide 0 either way */
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) =>
      setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onVisibility = () => setBackgrounded(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /* Restart the progress fill whenever autoplay resumes */
  useEffect(() => {
    if (!paused) setDwell((current) => current + 1);
  }, [paused]);

  /* The interval restarts on every move, so a click buys a full dwell */
  useEffect(() => {
    if (total < 2 || paused) return;
    const timer = window.setInterval(() => go(1), DWELL_MS);
    return () => window.clearInterval(timer);
  }, [index, total, paused]);

  /* Route the new slide's background into the layer that is currently
     behind, so the front layer can fade out while the next fades in */
  useEffect(() => {
    setBg((current) => {
      const next = slides[index]?.image;
      if (!next) return current;
      const frontImage = current.frontIsA ? current.a : current.b;
      if (frontImage === next) return current;
      return current.frontIsA
        ? { a: current.a, b: next, frontIsA: false }
        : { a: next, b: current.b, frontIsA: true };
    });
  }, [index]);

  /* One dot per slide; the active dot stretches and its fill sweeps across
     the dwell time, pausing with the autoplay */
  const dots = (
    <div className="flex items-center gap-2">
      {slides.map((item, dotIndex) => (
        <button
          key={item.image}
          type="button"
          onClick={() => jumpTo(dotIndex)}
          aria-label={`Show ${item.titleLine1} ${item.titleLine2}`}
          aria-current={dotIndex === index}
          className={`relative block h-2 overflow-hidden rounded-full transition-all duration-300 ${
            dotIndex === index ? "w-6 bg-white/30" : "w-2 bg-white/50 hover:bg-white/80"
          }`}
        >
          {dotIndex === index && !reducedMotion && (
            <span
              key={`${dwell}-${index}`}
              style={dwellStyle}
              className={`absolute inset-y-0 left-0 block rounded-full bg-primary-300 animate-hero-progress ${
                paused ? "[animation-play-state:paused]" : ""
              }`}
            />
          )}
        </button>
      ))}
    </div>
  );

  /* Desktop-only arrows: touch visitors drag instead, and every viewport
     keeps the dots as a non-drag fallback. Both sit above the drag layer. */
  const arrowClass =
    "absolute top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xs border border-white/30 bg-navy-950/50 text-white backdrop-blur transition-colors hover:bg-navy-950/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:flex";

  /* Every slide owns the whole first screen: the viewport minus the sticky
     header (100px from md up — 36px contact bar + 64px main bar; 64px below
     that, where the contact bar is hidden). One height for all three, so
     switching never moves the page below it. On phones the slide stacks —
     photo banner first, copy under it — while md up keeps the single
     centred column on top of the full-bleed background. */
  return (
    <section
      className={`relative flex min-h-[calc(100svh-64px)] touch-pan-y flex-col overflow-hidden bg-navy-950 pb-16 md:min-h-[calc(100svh-100px)] md:justify-center md:py-12 ${
        mouseDrag.dragging || touchDrag.dragging ? "select-none" : ""
      } ${touchDrag.dragging ? "cursor-grabbing" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onPointerDown={touchDrag.onPointerDown}
      onPointerUp={touchDrag.onPointerUp}
      onPointerCancel={touchDrag.onPointerCancel}
      onClickCapture={(event) => {
        /* A drag ends with a click on whatever is under the pointer: swallow
           it so the CTA, arrow or dot is not triggered by accident */
        const mouseSwiped = mouseDrag.consumeSwipe();
        const touchSwiped = touchDrag.consumeSwipe();
        if (!mouseSwiped && !touchSwiped) return;
        event.preventDefault();
        event.stopPropagation();
      }}
      aria-roledescription="carousel"
      aria-label="One Plus Display"
    >
      {/* Blueprint grid: the phone banner is scaled to the screen width, so it
          never reaches the bottom of the section. The grid carries the rest of
          the first screen and is redundant once the photo goes full-bleed. */}
      <div aria-hidden="true" className="texture-grid md:hidden" />

      {/* Photo: on phones the slide image is scaled to the screen width
          (1500:733) and sits directly under the header, so the whole picture
          reads instead of a cropped sliver of it. From md up the same layers
          become the full-bleed Ken Burns background, cross-fading in place. */}
      <div
        aria-hidden="true"
        className="relative aspect-1500/733 w-full shrink-0 md:absolute md:inset-0 md:aspect-auto"
      >
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 md:animate-hero-kenburns ${
            bg.frontIsA ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${bg.a})` }}
        />
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 md:animate-hero-kenburns ${
            bg.frontIsA ? "opacity-0" : "opacity-100"
          }`}
          style={{ backgroundImage: bg.b ? `url(${bg.b})` : undefined }}
        />
        {/* Phone: the photo fades into the navy grid along its lower edge.
            Desktop: the original left-to-right wash that keeps copy legible. */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/15 via-navy-950/45 to-navy-950 md:bg-gradient-to-r md:from-navy-950/45 md:via-navy-950/55 md:to-navy-950/80" />
      </div>

      {/* Mouse-only drag surface: above the photo, below the copy, so the
          empty space drags while text, media and controls keep their own
          pointer behaviour. Hidden on narrow widths, where the section
          itself listens to fingers across the whole slide. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 z-10 hidden md:block ${
          mouseDrag.dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={mouseDrag.onPointerDown}
        onPointerUp={mouseDrag.onPointerUp}
        onPointerCancel={mouseDrag.onPointerCancel}
      />

      {/* Content is transparent to the pointer so empty gaps fall through to
          the drag layer; the copy block opts back in. On phones the copy starts
          under the banner instead of being centred in the screen. */}
      <div className="container-page pointer-events-none relative z-20 pt-10 md:pt-0">
        <div className="mx-auto max-w-4xl text-center">
          {/* Copy: rendered one panel at a time so there is always exactly one
              h1; every line rises in from below, one after the other, so the
              panel reads as a wave rather than a single block. One centred
              column on every slide: the photo already fills the screen behind
              it, so no second image competes with the headline. */}
          <div
            key={index}
            className="pointer-events-auto [&>*]:animate-hero-rise [&>*:nth-child(2)]:[animation-delay:180ms] [&>*:nth-child(3)]:[animation-delay:300ms] [&>*:nth-child(4)]:[animation-delay:420ms] [&>*:nth-child(5)]:[animation-delay:560ms] [&>*:nth-child(6)]:[animation-delay:700ms] [&>*:nth-child(7)]:[animation-delay:840ms]"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-xs border border-white/35 bg-navy-950/55 px-4 py-2 text-sm font-medium text-white backdrop-blur sm:mb-6">
              <span className="h-2 w-2 bg-primary-300" aria-hidden="true" />
              {slide.badge}
            </span>

            <h1 className="text-3xl leading-[1.05] font-bold uppercase tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {slide.titleLine1}
              <br />
              <span className="text-primary-300">{slide.titleLine2}</span>
            </h1>

            {/* Qualifying terms sit above the capability chips: they stay
                visible on phones, because they decide whether the visitor is
                in the right place at all. */}
            {slide.qualifiers && slide.qualifiers.length > 0 && (
              <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-semibold text-white">
                {slide.qualifiers.map((qualifier, qualifierIndex) => (
                  <span key={qualifier} className="inline-flex items-center gap-2">
                    {qualifierIndex > 0 && (
                      <span
                        className="h-1.5 w-1.5 bg-primary-300"
                        aria-hidden="true"
                      />
                    )}
                    {qualifier}
                  </span>
                ))}
              </p>
            )}

            {slide.highlights && slide.highlights.length > 0 && (
              <ul className="mt-5 hidden flex-wrap justify-center gap-2 sm:flex">
                {slide.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-xs border border-white/25 bg-white/10 px-3 py-1.5 text-sm font-medium text-white backdrop-blur"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-5 text-lg leading-relaxed text-gray-200">
              {slide.description}
            </p>

            {/* One action only: a second link competed with the enquiry and
                split it. The button is the largest element under the copy and
                runs full width on phones; the note underneath answers the two
                things that stop a first enquiry — how fast, and what it costs
                to ask. */}
            <div className="mt-6 flex flex-col items-center gap-3 sm:mt-8">
              <a
                href={slide.primaryCta.href}
                className="btn-cta group w-full sm:w-auto"
              >
                {slide.primaryCta.label}
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              {ctaNote && (
                <p className="text-sm text-primary-100">{ctaNote}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className={`${arrowClass} left-3 lg:left-6`}
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next slide"
            className={`${arrowClass} right-3 lg:right-6`}
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </>
      )}

      {/* Dots, at the same place on every slide and every viewport: centred
          on the bottom edge. Drag still moves the carousel everywhere. */}
      <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2">
        {dots}
      </div>
    </section>
  );
}
