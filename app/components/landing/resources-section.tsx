import { articles } from "../../data/site-content";
import { SectionShell } from "../layout/section-shell";
import { ArrowUpRight, BookOpen } from "lucide-react";

export function ResourcesSection() {
  return (
    <section aria-labelledby="resources-heading" className="py-16 sm:py-20" id="resources">
      <SectionShell>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[var(--assessment-accent-text)]">Featured articles</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-content sm:text-4xl" id="resources-heading">
            Practical guidance for smarter decisions.
          </h2>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {articles.map((article) => {
            const card = (
              <>
                <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-lg bg-blue-500/15 text-[var(--assessment-accent-text)]">
                  <BookOpen size={20} strokeWidth={1.8} />
                </span>
                <p className="mt-5 text-sm font-medium text-[var(--assessment-accent-text)]">{article.category}</p>
                <h3 className="mt-2 text-xl font-semibold leading-snug text-content">{article.title}</h3>
                <p className="mt-3 text-base leading-7 text-muted">{article.summary}</p>
                <span className="mt-5 flex items-center gap-2 text-sm font-medium text-subtle">{article.meta}{article.href && <ArrowUpRight aria-hidden="true" size={16} />}</span>
              </>
            );

            return article.href ? (
              <a className="rounded-xl border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:border-blue-400/60 hover:bg-surface-raised" href={article.href} key={article.title} rel="noopener noreferrer" target="_blank">
                {card}
              </a>
            ) : (
              <article className="rounded-xl border border-line bg-surface p-5" key={article.title}>{card}</article>
            );
          })}
        </div>
      </SectionShell>
    </section>
  );
}
