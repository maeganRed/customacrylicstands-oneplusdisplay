import type { Product } from "../types";
import { featuredProducts } from "../data/products";
import ProductCard from "./ProductCard";
import SectionHeader from "./SectionHeader";

/** Cards sitting in the same row appear 60ms apart */
const STAGGER = 60;

interface FeaturedProductsProps {
  products?: Product[];
  title?: string;
  subtitle?: string;
  action?: { label: string; href: string };
  /** Small label above the heading, e.g. "Product showcase" */
  eyebrow?: string;
  /** Display applications rendered as a chip row under the grid */
  tags?: string[];
  /** Heading for the chip row, e.g. "Display applications" */
  tagsLabel?: string;
  /** `center` stacks the heading and the "view all" link; `left` keeps them apart */
  align?: "left" | "center";
  /**
   * Quote prompt printed under each tile. Pass `""` to hide it, e.g. inside a
   * sidebar where the extra line would crowd the grid.
   */
  cardCta?: string;
}

/** Three-up grid of the models highlighted for export markets */
export default function FeaturedProducts({
  products = featuredProducts,
  title = "Featured Custom Acrylic & PVC Displays",
  subtitle = "Sample models across our most requested stand styles",
  action = { label: "View All", href: "/pop-retail-displays/" },
  eyebrow,
  tags,
  tagsLabel = "Display applications",
  align = "left",
  cardCta = "Get A Quick Quote",
}: FeaturedProductsProps) {
  return (
    <section className="section" id="products">
      <div className="container-page">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          eyebrow={eyebrow}
          align={align}
          action={action}
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              revealDelay={(index % 3) * STAGGER}
              ctaLabel={cardCta || undefined}
            />
          ))}
        </div>

        {tags && tags.length > 0 && (
          <div className="mt-12 border-t border-gray-200 pt-6" data-animate>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              {tagsLabel}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
