import { articles } from "../../data/site-content";
import { SectionShell } from "../layout/section-shell";
import { ArrowUpRight, BookOpen } from "lucide-react";

export function ResourcesSection() {
  return (
    <section aria-labelledby="resources-heading" className="py-16 sm:py-24" data-premium-section id="resources">
      <SectionShell>
        <div className="max-w-3xl">
          <p className="premium-eyebrow">Featured articles</p>
          <h2 className="mt-5 text-3xl font-bold tracking-[-0.035em] text-content sm:text-5xl" id="resources-heading">
            Practical guidance for smarter decisions.
          </h2>
          <p className="mt-4 text-base leading-8 text-muted">
            Short, operator-focused reads for turning weak signals into focused action.
          </p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {articles.map((article, index) => {
            const card = (
              <>
                <div className="flex items-center justify-between">
                  <span aria-hidden="true" className="icon-glow flex size-11 items-center justify-center rounded-xl">
                    <BookOpen size={20} strokeWidth={1.8} />
                  </span>
                  <span className="number-glow text-3xl font-black tracking-tight">0{index + 1}</span>
                </div>
                <p className="mt-6 text-sm font-bold uppercase tracking-[0.12em] text-[var(--assessment-accent-text)]">{article.category}</p>
                <h3 className="mt-2 text-xl font-bold leading-snug text-content">{article.title}</h3>
                <p className="mt-3 text-base leading-7 text-muted">{article.summary}</p>
                <span className="mt-5 flex items-center gap-2 text-sm font-medium text-subtle">{article.meta}{article.href && <ArrowUpRight aria-hidden="true" size={16} />}</span>
              </>
            );

            return article.href ? (
              <a className="premium-card rounded-2xl p-5 sm:p-6" href={article.href} key={article.title} rel="noopener noreferrer" target="_blank">
                {card}
              </a>
            ) : (
              <article className="premium-card rounded-2xl p-5 sm:p-6" key={article.title}>{card}</article>
            );
          })}
        </div>
      </SectionShell>
    </section>
  );
}
