import { ArrowRight } from "lucide-react";
import type { NewsPost } from "../types";
import { news, formatNewsDate } from "../data/news";
import SectionHeader from "./SectionHeader";

/** Cards sitting in the same row appear 60ms apart */
const STAGGER = 60;

interface LatestNewsProps {
  posts?: NewsPost[];
  title?: string;
  subtitle?: string;
  action?: { label: string; href: string } | null;
  /** `center` stacks the heading and the "view all" link; `left` keeps them apart */
  align?: "left" | "center";
}

/** Three latest articles; also reused on /news */
export default function LatestNews({
  posts = news,
  title = "Latest News",
  subtitle = "Company updates and industry insights",
  action = { label: "View All", href: "/news/" },
  align = "left",
}: LatestNewsProps) {
  return (
    <section className="section bg-gray-50" id="news">
      <div className="container-page">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          align={align}
          action={action ?? undefined}
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="card group"
              data-animate
              data-delay={(index % 3) * STAGGER}
            >
              <a
                href={`/news/${post.slug}/`}
                className="flex h-full flex-col"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4">
                    <span className="rounded-xs bg-primary-600 px-3 py-1 text-sm font-medium text-white">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2 text-sm text-gray-500">
                    {formatNewsDate(post.date)}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary-600">
                    {post.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition-transform group-hover:translate-x-1">
                    Read More
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
