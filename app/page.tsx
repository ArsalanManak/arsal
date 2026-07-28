import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "./components/site-shell";
import { getContentItems } from "./lib/content";
import { getHeroImageUrl } from "../lib/hero";
import { getYouTubeEmbedUrl } from "./lib/video-utils";
import HeroPortrait from "./components/hero-portrait";
import { HomeCreativesCarousel } from "./components/home-creatives-carousel";

export const metadata: Metadata = {
  title: "Arsal | DTC Ads Video Editor",
  description: "Portfolio of DTC ads video editing work from Arsal, featuring intro videos, static ads, and video ad creative.",
};

const brandLogos = ["RESILIA", "RYZE"];

export default async function HomePage() {
  const introVideos = await getContentItems("home_intro_videos");
  const heroImage = getHeroImageUrl();

  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(214,40,40,0.13),_transparent_35%),linear-gradient(135deg,_#FAFAFA_0%,_#ffffff_100%)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-[#0A2540]/15 bg-white px-4 py-2 text-sm font-semibold text-[#0A2540] shadow-sm animate-fade-in-up">
              5+ years crafting high-converting DTC ad edits
            </div>
            <div className="space-y-4 animate-fade-in-up stagger-1">
              <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-[#0A2540] sm:text-6xl lg:text-7xl">
                Arsal
                <span className="mt-3 block text-[#D62828]">DTC Ads Video Editor</span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#374151]">
                I turn raw footage into scroll-stopping ad creatives that feel sharp, fast, and built for performance.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 animate-fade-in-up stagger-2">
              <Link href="/creatives" className="rounded-full bg-[#D62828] px-6 py-3 font-semibold text-white transition hover:scale-[1.03] hover-bounce animate-pulse-glow">
                View Creatives
              </Link>
              <Link href="/courses" className="rounded-full border border-[#0A2540]/15 bg-white px-6 py-3 font-semibold text-[#0A2540] transition hover:scale-[1.03] hover-bounce">
                View Courses
              </Link>
              <Link href="/contact" className="rounded-full border border-[#0A2540]/15 bg-white px-6 py-3 font-semibold text-[#0A2540] transition hover:scale-[1.03] hover-bounce">
                Contact Me
              </Link>
            </div>
            <div className="rounded-[1.5rem] border border-[#0A2540]/10 bg-white p-6 shadow-[0_24px_80px_rgba(10,37,64,0.08)] animate-fade-in-up stagger-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D62828]">Worked with</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {brandLogos.map((brand) => (
                  <span key={brand} className="rounded-full border border-[#0A2540]/10 bg-[#FAFAFA] px-4 py-2 text-sm font-black tracking-[0.25em] text-[#0A2540] transition-transform hover:scale-110">
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="hero-blob" aria-hidden />
            <div className="rounded-[2rem] p-4 hero-portrait-wrapper bg-transparent border-0 shadow-none">
              <HeroPortrait src={heroImage || "/window.svg"} alt="Portrait" />
            </div>

            {/* floating badge bubbles positioned around the portrait */}
            <div className="hero-bubble small bubble-float bubble-delay-1" style={{ left: "8%", top: "6%" }}>
              <span className="dot" style={{ background: "#7c3aed" }} />UGC-style hooks
            </div>
            <div className="hero-bubble purple bubble-float bubble-delay-2" style={{ right: "6%", top: "-6%" }}>
              ⚡ Fast turnaround — 24–48h
            </div>
            <div className="hero-bubble bubble-float bubble-delay-3" style={{ right: "-6%", bottom: "-6%" }}>
              ★★★★★ Conversion-first edits
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D62828]">Intro videos</p>
            <h2 className="text-3xl font-black text-[#0A2540]">A showreel-first hook for every new visitor</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#4b5563]">
            These intro videos are managed from the admin panel and update live for every visitor.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {introVideos.map((video) => {
            const embedUrl = getYouTubeEmbedUrl(video.url);
            return (
              <div key={video.id} className="overflow-hidden rounded-[2rem] border border-[#0A2540]/10 bg-white shadow-[0_24px_80px_rgba(10,37,64,0.08)]">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="aspect-video w-full"
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-[#FAFAFA] text-sm text-[#6b7280]">
                    Invalid video URL
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#0A2540]">{video.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#6b7280]">{video.caption}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <HomeCreativesCarousel />
    </SiteShell>
  );
}
