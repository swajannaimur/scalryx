import { videos } from "../../data/site-content";
import { SectionShell } from "../layout/section-shell";
import { Play, Video } from "lucide-react";

export function VideosSection() {
  return (
    <section aria-labelledby="videos-heading" className="border-y border-line py-16 sm:py-20" id="videos">
      <SectionShell>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[var(--assessment-accent-text)]">Recommended videos</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-content sm:text-4xl" id="videos-heading">Watch and apply.</h2>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {videos.map((video) => {
            const card = (
              <>
                <div aria-hidden="true" className="flex aspect-[16/9] items-center justify-center rounded-lg border border-line bg-blue-500/10 text-[var(--assessment-accent-text)]">
                  <span className="flex size-12 items-center justify-center rounded-full bg-[var(--assessment-accent-bg)] text-on-brand shadow-lg"><Play className="ml-0.5" fill="currentColor" size={19} /></span>
                </div>
                <p className="mt-5 flex items-center gap-2 text-sm font-medium text-[var(--assessment-accent-text)]"><Video aria-hidden="true" size={16} /> {video.category}</p>
                <h3 className="mt-2 text-xl font-semibold leading-snug text-content">{video.title}</h3>
                <p className="mt-3 text-base leading-7 text-muted">{video.summary}</p>
                <span className="mt-5 block text-sm font-medium text-subtle">{video.meta}</span>
              </>
            );

            return video.href ? (
              <a className="rounded-xl border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:border-blue-400/60 hover:bg-surface-raised" href={video.href} key={video.title} rel="noopener noreferrer" target="_blank">{card}</a>
            ) : (
              <article className="rounded-xl border border-line bg-surface p-5" key={video.title}>{card}</article>
            );
          })}
        </div>
      </SectionShell>
    </section>
  );
}
