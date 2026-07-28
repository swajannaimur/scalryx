import { videos } from "../../data/site-content";
import { SectionShell } from "../layout/section-shell";
import { Play, Video } from "lucide-react";

export function VideosSection() {
  return (
    <section aria-labelledby="videos-heading" className="border-y border-line py-16 sm:py-24" data-premium-section id="videos">
      <SectionShell>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="premium-eyebrow">Recommended videos</p>
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.035em] text-content sm:text-5xl" id="videos-heading">Watch. Diagnose. Apply.</h2>
          </div>
          <p className="max-w-md text-base leading-7 text-muted">
            Visual frameworks selected for operating leaders—not endless inspiration feeds.
          </p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {videos.map((video) => {
            const card = (
              <>
                <div aria-hidden="true" className="scan-line section-grid relative flex aspect-[16/9] overflow-hidden items-center justify-center rounded-xl border border-line-strong bg-[radial-gradient(circle_at_50%_45%,rgba(22,133,255,.22),transparent_55%),var(--panel-deep)] text-[var(--assessment-accent-text)]">
                  <span className="premium-button flex size-14 items-center justify-center rounded-full"><Play className="ml-0.5" fill="currentColor" size={20} /></span>
                </div>
                <p className="mt-5 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-[var(--assessment-accent-text)]"><Video aria-hidden="true" size={16} /> {video.category}</p>
                <h3 className="mt-2 text-xl font-bold leading-snug text-content">{video.title}</h3>
                <p className="mt-3 text-base leading-7 text-muted">{video.summary}</p>
                <span className="mt-5 block text-sm font-medium text-subtle">{video.meta}</span>
              </>
            );

            return video.href ? (
              <a className="premium-card rounded-2xl p-4 sm:p-5" href={video.href} key={video.title} rel="noopener noreferrer" target="_blank">{card}</a>
            ) : (
              <article className="premium-card rounded-2xl p-4 sm:p-5" key={video.title}>{card}</article>
            );
          })}
        </div>
      </SectionShell>
    </section>
  );
}
