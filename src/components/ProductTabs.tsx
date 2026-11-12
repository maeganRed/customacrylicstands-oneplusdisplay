import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import type {
  ArtworkGuideline,
  ProductTab,
  ProductValue,
  SpecRow,
} from "../types";
import type { OrderStep } from "../data/orderProcess";

interface ProductTabsProps {
  tabs: readonly ProductTab[];
  /** Paragraph shown at the top of the Product Details panel */
  overview: string;
  specs: SpecRow[];
  note: string;
  artwork: ArtworkGuideline[];
  whyChoose: ProductValue[];
  /** Only step / title / text are rendered; the photos stay on /order-process/ */
  steps: readonly OrderStep[];
  terms: SpecRow[];
}

/** Shared shell of a panel: white card, consistent padding */
const panelClass = "border border-gray-200 bg-white p-5 sm:p-8";

/** Compact sticky header height, kept clear when a jump may reveal it (px) */
const HEADER_MIN = 64;
/** Breathing room between the sticky strip and the heading it lands on (px) */
const GAP = 8;

/** Distance from the document top a panel heading should stop at */
const landingOffset = (headerBottom: number, stripHeight: number): number =>
  Math.max(headerBottom, HEADER_MIN) + stripHeight + GAP;

/**
 * The information block of a product page — Product Details / Artwork
 * Guidelines / Order Process / Why Choose — read as one document.
 *
 * All four panels are server-rendered and always visible, so the page reads
 * top to bottom with no JavaScript at all. The tab strip above them is a
 * section nav: it sticks under the site header while the panels scroll past,
 * marks the panel you are reading, and clicking a tab scrolls to it. The
 * panels keep stable ids, so deep links such as `#specifications` still land
 * on the right block.
 */
export default function ProductTabs({
  tabs,
  overview,
  specs,
  note,
  artwork,
  whyChoose,
  steps,
  terms,
}: ProductTabsProps) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const [stuck, setStuck] = useState(false);
  const strip = useRef<HTMLDivElement | null>(null);
  const scroller = useRef<HTMLDivElement | null>(null);
  const links = useRef<Record<string, HTMLAnchorElement | null>>({});
  const panels = useRef<Record<string, HTMLDivElement | null>>({});
  /** Set while a click-driven smooth scroll runs, so the spy keeps that tab */
  const pending = useRef<{ el: HTMLDivElement; until: number } | null>(null);

  /** Scrolls a panel to just below the sticky strip */
  const goTo = (id: string, smooth = true) => {
    const el = panels.current[id];
    if (!el) return;

    const header = document.querySelector("header");
    const headerBottom = header
      ? Math.max(0, header.getBoundingClientRect().bottom)
      : 0;
    const stripHeight = strip.current?.getBoundingClientRect().height ?? 0;
    const top = Math.max(
      0,
      window.scrollY +
        el.getBoundingClientRect().top -
        landingOffset(headerBottom, stripHeight),
    );

    pending.current = { el, until: performance.now() + 1500 };
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top, behavior: smooth ? "smooth" : "instant" });
  };

  const onClick = (id: string, event: ReactMouseEvent<HTMLAnchorElement>) => {
    /* Without a hydrated ref the plain anchor is the better fallback */
    if (!panels.current[id]) return;
    event.preventDefault();
    goTo(id);
  };

  useEffect(() => {
    const stripEl = strip.current;
    if (!stripEl) return;

    const header = document.querySelector("header");
    let frame = 0;

    const update = () => {
      frame = 0;
      const headerBottom = header
        ? Math.max(0, header.getBoundingClientRect().bottom)
        : 0;
      /* The strip parks right under whatever the header is showing now */
      stripEl.style.setProperty("--tabs-offset", `${Math.round(headerBottom)}px`);

      const stripRect = stripEl.getBoundingClientRect();
      const pinned = stripRect.top <= headerBottom + 0.5;
      setStuck(pinned);

      /* Anything above this line has been read; the line sits at the bottom
         of the strip, so a heading counts once it clears the tabs */
      const line =
        (pinned ? stripRect.bottom : headerBottom + stripRect.height) + 12;

      /* A click owns the highlight until its scroll lands, otherwise the tab
         would flick through the sections it passes on the way */
      if (pending.current) {
        const { el, until } = pending.current;
        const target =
          window.scrollY +
          el.getBoundingClientRect().top -
          landingOffset(headerBottom, stripRect.height);
        const arrived = Math.abs(window.scrollY - target) <= 2;
        if (!arrived && performance.now() < until) return;
        pending.current = null;
      }

      let current = tabs[0]?.id ?? "";
      for (const tab of tabs) {
        const el = panels.current[tab.id];
        if (el && el.getBoundingClientRect().top <= line) current = tab.id;
      }
      setActive((prev) => (prev === current ? prev : current));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    /* The header slides between full / compact / hidden, so its height is
       re-read on every scroll frame and whenever a transition settles */
    const cancelPending = () => {
      pending.current = null;
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("wheel", cancelPending, { passive: true });
    window.addEventListener("touchstart", cancelPending, { passive: true });
    header?.addEventListener("transitionend", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("wheel", cancelPending);
      window.removeEventListener("touchstart", cancelPending);
      header?.removeEventListener("transitionend", schedule);
    };
  }, [tabs]);

  /* Landing on a shared link such as `#order-process` */
  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash || !tabs.some((tab) => tab.id === hash)) return;
      /* Instant on load: the browser has already jumped to the anchor */
      goTo(hash, false);
    };

    const frame = requestAnimationFrame(openFromHash);
    window.addEventListener("hashchange", openFromHash);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, [tabs]);

  /* Phones: keep the marked tab inside the horizontally scrolled strip */
  useEffect(() => {
    const scrollerEl = scroller.current;
    const link = links.current[active];
    if (!scrollerEl || !link) return;
    if (scrollerEl.scrollWidth <= scrollerEl.clientWidth + 1) return;

    const box = scrollerEl.getBoundingClientRect();
    if (box.bottom < 0 || box.top > window.innerHeight) return;
    link.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [active]);

  return (
    <section
      className="section bg-gray-50"
      id="product-file"
      aria-labelledby="product-tabs-heading"
    >
      <div className="container-page">
        <h2 id="product-tabs-heading" className="sr-only">
          Product details, artwork guidelines, order process and factory
        </h2>

        {/* Sticky while the panels scroll past: the strip parks under the site
            header and gains a shadow once it is pinned. Phones bleed it to the
            screen edge so the tabs can be swiped. */}
        <div
          ref={strip}
          className={`sticky top-[var(--tabs-offset,4rem)] z-30 -mx-4 bg-gray-50 px-4 pb-3 transition-shadow duration-200 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 ${
            stuck ? "shadow-[0_10px_16px_-14px_rgba(0,0,0,0.55)]" : ""
          }`}
        >
          <div
            ref={scroller}
            className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-visible"
          >
            <nav
              aria-label="Product information"
              className="flex min-w-max gap-2 rounded-xs border border-gray-200 bg-gray-100 p-1.5 md:grid md:min-w-0 md:grid-cols-4"
            >
              {tabs.map((tab) => {
                const selected = tab.id === active;
                return (
                  <a
                    key={tab.id}
                    ref={(node) => {
                      links.current[tab.id] = node;
                    }}
                    href={`#${tab.id}`}
                    aria-current={selected ? "true" : undefined}
                    onClick={(event) => onClick(tab.id, event)}
                    className={`flex min-h-12 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-xs border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-1 md:px-5 ${
                      selected
                        ? "border-primary-600 bg-primary-600 text-white shadow-sm"
                        : "border-transparent bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div
            id="specifications"
            ref={(node) => {
              panels.current.specifications = node;
            }}
            className={`scroll-mt-36 ${panelClass}`}
          >
            <h3 className="text-xl font-bold text-gray-900">Product Details</h3>

            <h4 className="mt-5 text-xs font-bold uppercase tracking-wider text-gray-500">
              Overview
            </h4>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-700">
              {overview}
            </p>

            <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-gray-500">
              Specifications
            </h4>
            <dl className="mt-3 border-t border-gray-200">
              {specs.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-1 border-b border-gray-200 py-3 sm:grid-cols-[200px_1fr] sm:gap-6"
                >
                  <dt className="text-sm font-medium text-gray-500">{row.label}</dt>
                  <dd className="text-sm leading-relaxed text-gray-900">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-4 text-sm italic text-gray-500">{note}</p>
          </div>

          <div
            id="artwork-guidelines"
            ref={(node) => {
              panels.current["artwork-guidelines"] = node;
            }}
            className={`scroll-mt-36 ${panelClass}`}
          >
            <h3 className="text-xl font-bold text-gray-900">Artwork Guidelines</h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">
              Five checks before a file reaches the printer. Send artwork against
              the drawing we return, and a digital proof comes back for sign-off.
            </p>

            <ol className="mt-6 border-t border-gray-200">
              {artwork.map((rule, index) => (
                <li
                  key={rule.heading}
                  className="grid gap-2 border-b border-gray-200 py-4 sm:grid-cols-[48px_200px_1fr] sm:gap-6"
                >
                  <span className="text-sm font-bold tracking-widest text-primary-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-sm font-semibold text-gray-900">
                    {rule.heading}
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-600">{rule.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div
            id="order-process"
            ref={(node) => {
              panels.current["order-process"] = node;
            }}
            className={`scroll-mt-36 ${panelClass}`}
          >
            <h3 className="text-xl font-bold text-gray-900">Order Process</h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">
              Six steps from brief to container. The render, the quotation and any
              revision to the drawing are free; the sample is refunded at 100 sets.
            </p>

            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_280px] lg:gap-12">
              <ol className="border-t border-gray-200">
                {steps.map((step) => (
                  <li
                    key={step.step}
                    className="grid gap-1 border-b border-gray-200 py-4 sm:grid-cols-[48px_1fr] sm:gap-6"
                  >
                    <span className="text-sm font-bold tracking-widest text-primary-600">
                      {step.step}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">
                        {step.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">
                        {step.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="self-start border border-gray-200 bg-gray-50 p-5">
                <h4 className="text-sm font-semibold text-gray-900">
                  Terms at a glance
                </h4>
                <dl className="mt-3 space-y-2.5">
                  {terms.map((term) => (
                    <div key={term.label} className="text-sm">
                      <dt className="text-gray-500">{term.label}</dt>
                      <dd className="font-medium text-gray-900">{term.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <div
            id="why-choose"
            ref={(node) => {
              panels.current["why-choose"] = node;
            }}
            className={`scroll-mt-36 ${panelClass}`}
          >
            <h3 className="text-xl font-bold text-gray-900">
              Why Choose One Plus Display
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">
              Four things that decide whether a custom stand arrives on time and
              matches the sample — and how this factory handles each one.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {whyChoose.map((value, index) => (
                <div key={value.title} className="border border-gray-200 p-5">
                  <span className="text-sm font-bold tracking-widest text-primary-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-2 text-base font-semibold text-gray-900">
                    {value.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
