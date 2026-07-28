import type { Metadata } from "next";
import { SiteShell } from "../components/site-shell";
import { getContentItems } from "../lib/content";
import { getYouTubeEmbedUrl } from "../lib/video-utils";

export const metadata: Metadata = {
  title: "Courses | Arsal",
  description: "Browse course videos and learning content curated by Arsal.",
};

export default async function CoursesPage() {
  const courses = await getContentItems("courses");

  return (
    <SiteShell>
      <section className="bg-[#0A2540] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-4xl space-y-6 animate-fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D62828]">
              Courses
            </p>
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Learn by watching.
            </h1>
            <p className="text-lg leading-8 text-[#cbd5e1]">
              A growing collection of course-style videos and walkthroughs for creators who want to sharpen their ad editing process.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="rounded-[2rem] border border-[#0A2540]/10 bg-white p-8 shadow-[0_18px_60px_rgba(10,37,64,0.08)] animate-scale-in">
          {courses.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {courses.map((course) => {
                const embedUrl = getYouTubeEmbedUrl(course.url);
                return (
                  <div key={course.id} className="overflow-hidden rounded-[1.5rem] border border-[#0A2540]/10 bg-[#FAFAFA] shadow-[0_20px_60px_rgba(10,37,64,0.06)] transition-all hover:scale-[1.02] hover:shadow-lg">
                    {embedUrl ? (
                      <iframe
                        src={embedUrl}
                        title={course.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="aspect-video w-full"
                      />
                    ) : (
                      <div className="flex aspect-video items-center justify-center bg-white text-sm text-[#6b7280]">
                        Invalid video URL
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[#0A2540]">{course.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#6b7280]">{course.caption}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-[16rem] items-center justify-center rounded-[1.5rem] border border-dashed border-[#0A2540]/20 bg-[#FAFAFA] text-sm text-[#6b7280]">
              No course videos yet.
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
