import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "../data/site";
import { footerColumns, legalLinks } from "../data/navigation";
import { styleCategories } from "../data/categories";
import { categoryHref } from "../data/routes";
import SocialLinks from "./SocialLinks";

/** Dark footer: brand blurb, link columns, contact details, legal row */
export default function Footer() {
  /* Built from the category data so the links can never go stale */
  const categoryColumn = {
    title: "Display Styles",
    links: [
      { label: "All POP retail displays", href: "/pop-retail-displays/" },
      ...styleCategories.map((category) => ({
        label: category.name,
        href: categoryHref(category),
      })),
    ],
  };

  return (
    <footer className="bg-navy-900 text-white/70">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a
              href="/"
              className="mb-6 flex items-center"
              aria-label={site.name}
            >
              {/* Dark footer: the single-colour wordmark is inverted to solid white */}
              <img
                src={site.logo.src}
                alt={site.logo.alt}
                width={1443}
                height={301}
                className="h-10 w-auto brightness-0 invert"
              />
            </a>
            <p className="mb-6 text-white/60">{site.footerBlurb}</p>
            <SocialLinks />
          </div>

          {/* Link columns */}
          {[categoryColumn, ...footerColumns].map((column) => (
            <div key={column.title}>
              <h3 className="mb-6 font-semibold text-white">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="mb-6 font-semibold text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary-300"
                  aria-hidden="true"
                />
                <span>{site.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  className="h-5 w-5 shrink-0 text-primary-300"
                  aria-hidden="true"
                />
                <a
                  href={`tel:${site.contact.phoneHref}`}
                  className="transition-colors hover:text-white"
                >
                  {site.contact.phone}
                </a>
                <span className="text-sm text-white/50">(WhatsApp)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  className="h-5 w-5 shrink-0 text-primary-300"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="transition-colors hover:text-white"
                >
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/50 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
