import { Video } from "lucide-react";
import { videos } from "../../data/site-content";
import { SectionShell } from "../layout/section-shell";

export function VideosSection() {
  return (
    <section
      aria-labelledby="videos-heading"
      className="soft-section border-y border-line py-16 sm:py-24"
      data-editorial-section
      id="videos"
    >
      <SectionShell>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="section-label">Recommended videos</p>
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-content sm:text-5xl" id="videos-heading">
              Watch the framework. Apply it to your numbers.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted">
            Concise explainers selected for operating leaders, not an endless inspiration feed.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {videos.map((video, index) => {
            const content = (
              <>
                <div className="relative flex aspect-[16/9] items-end justify-between overflow-hidden rounded-xl border border-[#d8e0e7] bg-[var(--brand-soft)] p-4 text-[var(--brand-navy)]">
                  <span className="icon-tile flex size-11 items-center justify-center rounded-xl bg-white">
                    <Video aria-hidden="true" size={20} strokeWidth={1.8} />
                  </span>
                  <span className="text-4xl font-bold tracking-[-0.06em] text-[#c6d2de]">0{index + 1}</span>
                </div>
                <div className="mt-5 flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.08em] text-[var(--brand-navy)]">
                  <span>{video.category}</span>
                  <span className="text-subtle">{video.meta}</span>
                </div>
                <h3 className="mt-3 text-xl font-bold leading-snug tracking-[-0.025em] text-content">{video.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{video.summary}</p>
              </>
            );

            return video.href ? (
              <a className="editorial-card rounded-2xl p-4 sm:p-5" href={video.href} key={video.title} rel="noopener noreferrer" target="_blank">
                {content}
              </a>
            ) : (
              <article className="editorial-card rounded-2xl p-4 sm:p-5" key={video.title}>{content}</article>
            );
          })}
        </div>
      </SectionShell>
    </section>
  );
}
