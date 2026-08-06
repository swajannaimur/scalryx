import { ArrowUpRight, BookOpen } from "lucide-react";
import { articles } from "../../data/site-content";
import { SectionShell } from "../layout/section-shell";

export function ResourcesSection() {
  return (
    <section
      aria-labelledby="resources-heading"
      className="py-16 sm:py-24"
      data-editorial-section
      id="resources"
    >
      <SectionShell>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="section-label">Featured articles</p>
            <h2
              className="mt-5 text-3xl font-bold tracking-[-0.04em] text-content sm:text-5xl"
              id="resources-heading"
            >
              Useful thinking for the next operating decision.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted">
            Short, operator-focused reads for turning weak signals into focused action.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {articles.map((article, index) => {
            const content = (
              <>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.09em] text-[var(--brand-navy)]">
                    <BookOpen aria-hidden="true" size={15} />
                    {article.category}
                  </span>
                  <span className="text-sm font-semibold text-subtle">{article.meta}</span>
                </div>
                <h3 className={`${index === 0 ? "max-w-3xl text-2xl sm:text-3xl" : "text-xl sm:text-2xl"} mt-8 font-bold leading-snug tracking-[-0.03em] text-content`}>
                  {article.title}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{article.summary}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-navy)]">
                  {article.href ? "Read article" : "Editorial guide"}
                  {article.href ? <ArrowUpRight aria-hidden="true" size={15} /> : null}
                </span>
              </>
            );

            const className = `editorial-card rounded-2xl p-5 sm:p-7 ${index === 0 ? "lg:col-span-2 lg:min-h-80" : "lg:min-h-72"}`;

            return article.href ? (
              <a className={className} href={article.href} key={article.title} rel="noopener noreferrer" target="_blank">
                {content}
              </a>
            ) : (
              <article className={className} key={article.title}>{content}</article>
            );
          })}
        </div>
      </SectionShell>
    </section>
  );
}
