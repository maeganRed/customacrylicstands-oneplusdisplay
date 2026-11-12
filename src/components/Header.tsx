import { useEffect, useRef, useState } from "react";
import { ChevronDown, Linkedin, Mail, Menu, Phone, X, Youtube } from "lucide-react";
import type { Category, NavItem } from "../types";
import { mainNav } from "../data/navigation";
import { industryCategories, styleCategories } from "../data/categories";
import { categoryHref } from "../data/routes";
import { site } from "../data/site";

/**
 * Presence of the header, driven by the scroll direction:
 * "full"    — top of the page: contact bar + nav bar, everything visible.
 * "compact" — reading mode: the contact bar has slid out of view, keeping the
 *             whole header laid out so nothing below shifts.
 * "hidden"  — scrolling downwards: the header sits above the viewport.
 */
type HeaderMode = "full" | "compact" | "hidden";

/* Height of the contact bar (py-2 + text-sm ≈ 36px = -translate-y-9). The
   header slides up by exactly this much instead of collapsing the bar, so its
   own height never changes — collapsing a sticky element would push the whole
   page up. Change together with the bar's padding below. */
const CONTACT_BAR_HEIGHT = 36;
/** Downward travel before the header leaves the viewport */
const HIDE_TRAVEL = 96;
/** A short move upwards is enough to bring it straight back */
const REVEAL_TRAVEL = 8;

interface HeaderProps {
  nav?: NavItem[];
  /** Style categories shown as illustrated cards in the mega menu */
  menuStyles?: Category[];
  /** Industry categories shown as a text list in the mega menu */
  menuIndustries?: Category[];
}

const sectionId = (label: string): string =>
  `mobile-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

/* Every nav entry is a button: same box on hover, filled when it owns the page.
   `relative` lets dropdown triggers carry the invisible hover bridge below. */
/* `font-display` (Space Grotesk) on purpose: the menu carries the same voice
   as the headings, only at body size */
const navButton =
  "relative inline-flex items-center gap-1 rounded-xs px-3 py-2 font-display font-medium transition-colors";

/* Invisible strip under a dropdown trigger: keeps the 2px gap between the
   button and its panel hoverable, so the menu never drops while the pointer
   travels downwards */
const hoverBridge =
  "after:absolute after:inset-x-0 after:top-full after:h-[2px] after:content-['']";
const navIdle = "text-gray-700 hover:bg-primary-50 hover:text-primary-700";
/** Current page: brand-coloured text, not a filled button.
    No font-weight change: bolding shifts letter widths and jolts the layout */
const navActive = "text-primary-600 hover:bg-primary-50";

const normalize = (value: string): string => value.replace(/\/+$/, "") || "/";

/** In-page anchors (/#factory) never own a page, so they stay un-highlighted */
const pathMatches = (path: string, href: string): boolean => {
  if (!path || href.includes("#")) return false;
  const target = normalize(href);
  const current = normalize(path);
  return target === "/"
    ? current === "/"
    : current === target || current.startsWith(`${target}/`);
};

/**
 * Sticky header: top contact bar, main navigation, product mega menu,
 * small dropdowns and the mobile drawer.
 * This is the only component that needs client-side JavaScript.
 */
export default function Header({
  nav = mainNav,
  menuStyles = styleCategories,
  menuIndustries = industryCategories,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  /* Read after hydration so the server and client markup stay identical */
  const [path, setPath] = useState("");
  const [mode, setMode] = useState<HeaderMode>("full");

  /* Mirror state for the scroll handler, which lives in a one-shot effect */
  const modeRef = useRef<HeaderMode>("full");
  /* Keeps the header in place while the pointer rests on it — scrolling with
     the nav or a dropdown open must not pull it away. Refs, not state:
     they gate the handler, they do not render anything. */
  const hoverRef = useRef(false);
  const drawerRef = useRef(false);

  const applyMode = (next: HeaderMode): void => {
    if (modeRef.current === next) return;
    modeRef.current = next;
    setMode(next);
  };

  useEffect(() => setPath(window.location.pathname), []);

  useEffect(() => {
    drawerRef.current = mobileOpen;
  }, [mobileOpen]);

  useEffect(() => {
    let lastY = window.scrollY;
    /* Travel accumulated in the current scroll direction */
    let travel = 0;

    const onScroll = (): void => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;

      /* Top of the page: the header is back to its full height */
      if (y <= CONTACT_BAR_HEIGHT) {
        travel = 0;
        applyMode("full");
        return;
      }

      /* Open drawer or pointer over the nav — the header stays put */
      if (drawerRef.current || hoverRef.current) return;

      travel = travel * delta > 0 ? travel + delta : delta;

      if (travel > HIDE_TRAVEL) {
        travel = 0;
        applyMode("hidden");
      } else if (travel < -REVEAL_TRAVEL || modeRef.current === "full") {
        /* Scrolling up reveals it at once; anything below the contact bar
           drops that bar, even before the header has hidden itself */
        travel = 0;
        applyMode("compact");
      }
    };

    /* Restored scroll position after a reload */
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** An item is highlighted when it, one of its children, or a `match` prefix owns the page */
  const isItemActive = (item: NavItem): boolean =>
    pathMatches(path, item.href) ||
    (item.children ?? []).some((child) => pathMatches(path, child.href)) ||
    (item.match ?? []).some((prefix) => normalize(path).startsWith(prefix));

  const toggleSection = (label: string) =>
    setOpenSection((current) => (current === label ? null : label));

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenSection(null);
  };

  const compact = mode !== "full";

  return (
    <header
      onMouseEnter={() => {
        hoverRef.current = true;
      }}
      onMouseLeave={() => {
        hoverRef.current = false;
      }}
      className={`sticky top-0 z-50 border-b border-gray-200 bg-white transition-transform duration-300 ease-out ${
        /* Sliding up by the contact bar's height keeps it out of view while
           the layout box stays exactly the same */
        mode === "hidden"
          ? "-translate-y-full"
          : compact
            ? "translate-y-0 md:-translate-y-9"
            : "translate-y-0"
      }`}
    >
      {/* Top info bar */}
      <div className="hidden bg-navy-900 py-2 text-sm text-white/70 md:block">
        {/* Right-aligned: the enlarged logo block covers the left side of this bar */}
        <div className="container-page flex items-center justify-end">
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${site.contact.email}`}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {site.contact.email}
            </a>
            <a
              href={`tel:${site.contact.phoneHref}`}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.contact.phone}
            </a>
            {/* Icon-only social links, URLs kept in site.social */}
            {site.social
              .filter((link) => link.icon === "youtube" || link.icon === "linkedin")
              .map((link) => {
                const Icon = link.icon === "youtube" ? Youtube : Linkedin;
                return (
                  <a
                    key={link.icon}
                    href={link.href}
                    target="_blank"
                    rel="noopener"
                    aria-label={link.label}
                    className="flex items-center transition-colors hover:text-white"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                );
              })}
          </div>
        </div>
      </div>

      {/* Main bar: 4rem (64px) tall at every breakpoint */}
      <div className="container-page">
        <div className="flex h-[calc(var(--spacing)*16)] items-center justify-between">
          {/* Logo. On md+ the block is pulled up by the height of the top bar
              (py-2 + text-sm ≈ 36px = -mt-9) and stretched, so it measures
              top bar (36px) + main bar (4rem/64px) = 100px: the full header.
              Corner radii are half the block height, keeping both ends
              semicircular — change them together with the height.
              Change -mt-9 together with the top bar padding.
              Once the contact bar has slid away the block shrinks back to the
              nav bar alone (4rem/64px, radii 2rem), staying flush with the
              header's bottom edge while the bar slides out behind it. */}
          <a
            href="/"
            className={`relative z-10 flex shrink-0 items-center justify-center md:border md:border-gray-200 md:bg-white md:px-6 md:transition-all md:duration-300 md:ease-out ${
              compact
                ? "md:h-16 md:rounded-tl-[2rem] md:rounded-br-[2rem]"
                : "md:-mt-9 md:h-[6.25rem] md:self-start md:rounded-tl-[3.125rem] md:rounded-br-[3.125rem]"
            }`}
            aria-label={site.name}
          >
            <img
              src={site.logo.src}
              alt={site.logo.alt}
              width={1443}
              height={301}
              className={`h-9 w-auto transition-[height] duration-300 ease-out ${
                compact ? "md:h-11" : "md:h-14"
              }`}
            />
          </a>

          {/* Desktop navigation: right-aligned on large screens */}
          {/* text-sm + gap-2: each entry carries its own px-3 button padding */}
          <nav className="ml-auto hidden h-full items-center gap-2 text-sm xl:flex">
            {nav.map((item) => {
              if (item.megaMenu) {
                const active = isItemActive(item);

                return (
                  /* Not `relative` on purpose: the panel is positioned against
                     the <header> so it spans the full content container.
                     The wrapper is only as tall as the button, so hovering the
                     bar next to it does not keep the panel open. */
                  <div key={item.label} className="group/mega flex items-center">
                    <a
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`${navButton} ${hoverBridge} ${
                        active
                          ? navActive
                          : `${navIdle} group-hover/mega:bg-primary-50 group-hover/mega:text-primary-700`
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className="h-4 w-4 transition-transform duration-200 group-hover/mega:rotate-180"
                        aria-hidden="true"
                      />
                    </a>

                    {/* Mega menu: as wide as .container-page, sitting 2px below the
                        button. The button is 36px tall inside the 4rem (64px) bar,
                        so its bottom edge is 0.75rem above the header bottom —
                        keep the two in sync if the nav bar height, nav font size
                        or button padding changes.
                        Sized to the 1280px content shell (not `inset-x-0`) so the
                        empty margins beside the card are outside the hover area;
                        no pointer-events trick, otherwise the trigger loses its
                        own hover state while the pointer is on the panel. */}
                    <div className="invisible absolute left-1/2 top-full z-40 w-full max-w-[1280px] -translate-x-1/2 -mt-[0.75rem] opacity-0 transition-opacity duration-0 group-hover/mega:visible group-hover/mega:opacity-100 group-hover/mega:duration-200">
                      <div className="container-page">
                        <div className="border border-gray-200 bg-white p-6 shadow-2xl">
                          <div className="grid grid-cols-12 gap-8">
                            {/* Styles: illustrated cards */}
                            <div className="col-span-8 border-r border-gray-200 pr-8">
                              <div className="mb-4 flex items-center justify-between">
                                <h3 className="eyebrow">Builds by stand type</h3>
                                <a
                                  href={item.href}
                                  className="text-sm font-medium text-primary-600 hover:text-primary-700"
                                >
                                  View all {item.label} →
                                </a>
                              </div>
                              <div className="grid grid-cols-4 gap-3">
                                {menuStyles.map((style) => (
                                  <a
                                    key={style.slug}
                                    href={categoryHref(style)}
                                    className="group/style block"
                                  >
                                    <div className="aspect-square overflow-hidden rounded-xs border border-gray-100 bg-gray-50">
                                      <img
                                        src={style.image}
                                        alt={style.alt}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover/style:scale-105"
                                      />
                                    </div>
                                    <span className="mt-2 block font-display text-xs font-medium leading-snug text-gray-700 transition-colors group-hover/style:text-primary-600">
                                      {style.name}
                                    </span>
                                  </a>
                                ))}
                              </div>
                            </div>

                            {/* Industries: text list */}
                            <div className="col-span-4">
                              <h3 className="eyebrow mb-2">Builds by retail sector</h3>
                              <ul>
                                {menuIndustries.map((industry) => (
                                  <li key={industry.slug}>
                                    <a
                                      href={categoryHref(industry)}
                                      className="block px-3 py-2 font-display text-sm font-medium text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
                                    >
                                      {industry.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              if (item.children) {
                const active = isItemActive(item);

                return (
                  <div
                    key={item.label}
                    className="group/dropdown relative flex items-center"
                  >
                    <a
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`${navButton} ${hoverBridge} ${
                        active
                          ? navActive
                          : `${navIdle} group-hover/dropdown:bg-primary-50 group-hover/dropdown:text-primary-700`
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className="h-4 w-4 transition-transform duration-200 group-hover/dropdown:rotate-180"
                        aria-hidden="true"
                      />
                    </a>
                    {/* 2px under the button; min-w-[12rem] keeps the panel
                        edge-aligned with the trigger, never narrower than it */}
                    <div className="invisible absolute left-0 top-full z-50 mt-[2px] min-w-[12rem] rounded-xs border border-gray-200 bg-white opacity-0 shadow-lg transition-all duration-0 group-hover/dropdown:visible group-hover/dropdown:opacity-100 group-hover/dropdown:duration-200">
                      <div className="p-2">
                        {item.children.map((child) => {
                          const childActive = pathMatches(path, child.href);

                          return (
                            <a
                              key={child.label}
                              href={child.href}
                              aria-current={childActive ? "page" : undefined}
                              className={`block rounded-xs px-4 py-2 font-display text-sm transition-colors ${
                                childActive
                                  ? "font-medium text-primary-600"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-primary-700"
                              }`}
                            >
                              {child.label}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              const active = isItemActive(item);

              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`${navButton} ${active ? navActive : navIdle}`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="p-2 xl:hidden"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer: driven by the same nav data as the desktop bar */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-gray-200 bg-white md:max-h-[calc(100dvh-6.25rem)] xl:hidden"
        >
          <div className="container-page space-y-1 py-4">
            {nav.map((item) => {
              if (item.megaMenu) {
                return (
                  <div key={item.label}>
                    {/* Label links to the catalogue, only the chevron expands */}
                    <div className="flex items-center">
                      <a
                        href={item.href}
                        onClick={closeMobile}
                        aria-current={isItemActive(item) ? "page" : undefined}
                        className={`flex-1 rounded-xs px-3 py-3 font-display font-medium ${
                          isItemActive(item)
                            ? "text-primary-600"
                            : "text-gray-700"
                        }`}
                      >
                        {item.label}
                      </a>
                      <button
                        type="button"
                        onClick={() => toggleSection(item.label)}
                        aria-expanded={openSection === item.label}
                        aria-controls={sectionId(item.label)}
                        aria-label={`Toggle ${item.label} categories`}
                        className="-mr-3 p-3 text-gray-500"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            openSection === item.label ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    {openSection === item.label && (
                      <div
                        id={sectionId(item.label)}
                        className="space-y-6 pb-4 pl-4"
                      >
                        <div>
                          <p className="eyebrow mb-2">By Style</p>
                          <div className="grid grid-cols-2 gap-3">
                            {menuStyles.map((style) => (
                              <a
                                key={style.slug}
                                href={categoryHref(style)}
                                onClick={closeMobile}
                                className="block"
                              >
                                <div className="aspect-square overflow-hidden rounded-xs border border-gray-100 bg-gray-50">
                                  <img
                                    src={style.image}
                                    alt={style.alt}
                                    loading="lazy"
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <span className="mt-1.5 block font-display text-sm font-medium leading-snug text-gray-700">
                                  {style.name}
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="eyebrow mb-2">By Industry</p>
                          <ul className="grid grid-cols-2 gap-x-3">
                            {menuIndustries.map((industry) => (
                              <li key={industry.slug}>
                                <a
                                  href={categoryHref(industry)}
                                  onClick={closeMobile}
                                  className="block py-1.5 font-display text-sm leading-snug text-gray-700"
                                >
                                  {industry.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <a
                          href={item.href}
                          onClick={closeMobile}
                          className="inline-block text-sm font-semibold text-primary-600"
                        >
                          View all {item.label} →
                        </a>
                      </div>
                    )}
                  </div>
                );
              }

              if (item.children) {
                return (
                  <div key={item.label}>
                    <div className="flex items-center">
                      <a
                        href={item.href}
                        onClick={closeMobile}
                        aria-current={isItemActive(item) ? "page" : undefined}
                        className={`flex-1 rounded-xs px-3 py-3 font-display font-medium ${
                          isItemActive(item)
                            ? "text-primary-600"
                            : "text-gray-700"
                        }`}
                      >
                        {item.label}
                      </a>
                      <button
                        type="button"
                        onClick={() => toggleSection(item.label)}
                        aria-expanded={openSection === item.label}
                        aria-controls={sectionId(item.label)}
                        aria-label={`Toggle ${item.label} submenu`}
                        className="-mr-3 p-3 text-gray-500"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            openSection === item.label ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    {openSection === item.label && (
                      <div
                        id={sectionId(item.label)}
                        className="space-y-1 pb-2 pl-4"
                      >
                        {item.children.map((child) => {
                          const childActive = pathMatches(path, child.href);

                          return (
                            <a
                              key={child.label}
                              href={child.href}
                              onClick={closeMobile}
                              aria-current={childActive ? "page" : undefined}
                              className={`block rounded-xs px-3 py-2 font-display ${
                                childActive
                                  ? "font-medium text-primary-600"
                                  : "text-gray-600"
                              }`}
                            >
                              {child.label}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const active = isItemActive(item);

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMobile}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-xs px-3 py-3 font-display font-medium ${
                    active ? "text-primary-600" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
