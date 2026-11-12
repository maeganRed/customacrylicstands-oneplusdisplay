import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import type { SocialLink } from "../types";
import { site } from "../data/site";

interface SocialLinksProps {
  links?: SocialLink[];
  className?: string;
}

const iconMap = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

/** Round social icon links (used in the footer) */
export default function SocialLinks({
  links = site.social,
  className = "",
}: SocialLinksProps) {
  return (
    <div className={`flex gap-4 ${className}`}>
      {links.map((link) => {
        const Icon = iconMap[link.icon];
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener"
            aria-label={link.label}
            className="flex h-10 w-10 items-center justify-center rounded-xs bg-navy-800 text-white/70 transition-colors hover:bg-primary-600 hover:text-white"
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
