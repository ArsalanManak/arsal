import type { Metadata } from "next";
import { SiteShell } from "../components/site-shell";

const profileCards = [
  { label: "Role", value: "DTC Ads Video Editor", icon: "🎬" },
  { label: "Experience", value: "5+ years", icon: "⏳" },
  { label: "Availability", value: "Full Time", icon: "⚡" },
  { label: "Location", value: "Remote", icon: "📍" },
];

const skills = [
  "Adobe Premiere Pro",
  "Adobe After Effects",
  "Adobe Photoshop",
];

const aiTools = [
  "Higgsfield",
  "FlowAI",
  "HeyGen",
  "Kling",
  "Seedance",
  "VEO 3",
  "ElevenLabs",
  "SUNO",
];

const brands = ["RESILIA", "RYZE"];

export const metadata: Metadata = {
  title: "About | Arsal",
  description: "Learn about Arsal, a DTC ads video editor with 5+ years of experience.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="bg-[#0A2540] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-4xl space-y-8">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D62828]">About</p>
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              I edit ads that <span className="text-[#D62828]">stop the scroll</span> — and sell.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-[#cbd5e1]">
              My name is Arsal. I've spent the last 5+ years living inside Premiere and After Effects, cutting DTC ad creatives that drive real business outcomes for e-commerce brands.
            </p>
          </div>
        </div>
      </section>

      <section className="-mt-12 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {profileCards.map((card) => (
              <div
                key={card.label}
                className="rounded-[1.5rem] border border-[#0A2540]/10 bg-white px-6 py-7 shadow-[0_18px_60px_rgba(10,37,64,0.08)]"
              >
                <div className="flex items-center gap-3 text-[#D62828]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fde8e8] text-xl">
                    {card.icon}
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0A2540]/80">
                    {card.label}
                  </p>
                </div>
                <p className="mt-5 text-xl font-black text-[#0A2540]">{card.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-[#0A2540]/10 bg-[#FAFAFA] p-8">
            <h2 className="text-2xl font-bold text-[#0A2540]">Software skills</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span key={skill} className="rounded-full bg-[#0A2540] px-4 py-2 text-sm font-semibold text-white">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#0A2540]/10 bg-[#FAFAFA] p-8">
            <h2 className="text-2xl font-bold text-[#0A2540]">AI tools</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {aiTools.map((tool) => (
                <span key={tool} className="rounded-full border border-[#D62828]/20 bg-white px-4 py-2 text-sm font-semibold text-[#D62828]">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border border-[#0A2540]/10 bg-white p-8 shadow-[0_25px_80px_rgba(10,37,64,0.08)]">
          <h2 className="text-2xl font-bold text-[#0A2540]">Brands worked with</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            {brands.map((brand) => (
              <div key={brand} className="rounded-full border border-[#0A2540]/15 bg-[#FAFAFA] px-5 py-3 text-lg font-black tracking-[0.35em] text-[#0A2540]">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
