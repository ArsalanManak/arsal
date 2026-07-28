import type { Metadata } from "next";
import { SiteShell } from "../components/site-shell";
import { BrandLogo } from "../components/brand-logo";

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
  "Claude",
  "Gemini",
  "ChatGPT",
];

const brands = [
  { 
    name: "RESILIA", 
    color: "#D62828", 
    description: "Performance-driven DTC brand",
    image: "https://m.media-amazon.com/images/I/71Em1F-11PL.jpg"
  },
  { 
    name: "RYZE", 
    color: "#0A2540", 
    description: "Innovative e-commerce solutions",
    image: "https://target.scene7.com/is/image/Target/GUEST_86434910-89e1-4d12-9c55-8d9327b15460"
  }
];

export const metadata: Metadata = {
  title: "About | Arsal",
  description: "Learn about Arsal, a DTC ads video editor with 5+ years of experience.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="bg-[#0A2540] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-4xl space-y-8 animate-fade-in-up">
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
            {profileCards.map((card, index) => (
              <div
                key={card.label}
                className={`rounded-[1.5rem] border border-[#0A2540]/10 bg-white px-6 py-7 shadow-[0_18px_60px_rgba(10,37,64,0.08)] animate-scale-in hover:scale-105 transition-transform stagger-${index + 1}`}
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
        <div className="rounded-[2rem] border border-[#0A2540]/10 bg-[#FAFAFA] p-8 animate-slide-in-left hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold text-[#0A2540]">Software skills</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill} className="rounded-full bg-[#0A2540] px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-110 hover:bg-[#D62828]">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border-4 border-[#D62828] bg-gradient-to-br from-[#D62828]/10 to-[#0A2540]/10 p-8 shadow-[0_25px_80px_rgba(214,40,40,0.2)] animate-slide-in-right">
          <h2 className="text-3xl font-black text-[#D62828] uppercase tracking-wider">AI Tools</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {aiTools.map((tool) => (
              <div 
                key={tool}
                className="group animate-gradient-border rounded-2xl bg-white p-4 text-center transition-all hover:scale-105 hover:bg-[#D62828] hover:shadow-xl"
              >
                <span className="text-lg font-black text-[#D62828] transition-colors group-hover:text-white">
                  {tool}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border border-[#0A2540]/10 bg-gradient-to-br from-[#D62828]/5 to-[#0A2540]/5 p-8 shadow-[0_25px_80px_rgba(10,37,64,0.08)] animate-fade-in-up hover:shadow-xl transition-shadow">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D62828]">Teaching</p>
            <h2 className="text-2xl font-bold text-[#0A2540]">Sharing knowledge with the next generation</h2>
          </div>
          <p className="mb-6 text-lg leading-8 text-[#374151]">
            Beyond client work, I'm passionate about teaching video editing and creative production. I create comprehensive courses and tutorials that help aspiring editors master the craft of DTC ad creation.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Premiere Pro Mastery", icon: "🎬" },
              { title: "After Effects for Ads", icon: "✨" },
              { title: "AI-Powered Editing", icon: "🤖" },
              { title: "DTC Ad Strategy", icon: "📈" },
              { title: "Motion Graphics", icon: "🎨" },
              { title: "Sound Design", icon: "🔊" }
            ].map((course) => (
              <div 
                key={course.title}
                className="rounded-2xl border border-[#0A2540]/10 bg-white p-5 transition-all hover:scale-[1.03] hover:border-[#D62828]/30 hover:shadow-md animate-scale-in"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{course.icon}</span>
                  <div>
                    <h3 className="font-bold text-[#0A2540]">{course.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <a 
              href="/courses" 
              className="inline-flex items-center gap-2 rounded-full bg-[#D62828] px-6 py-3 font-semibold text-white transition hover:scale-[1.05] hover:bg-[#b91c1c]"
            >
              View All Courses
              <span>→</span>
            </a>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border-4 border-[#0A2540] bg-white p-8 shadow-[0_25px_80px_rgba(10,37,64,0.15)] animate-fade-in-up">
          <h2 className="text-3xl font-black text-[#0A2540] uppercase tracking-wider">Brands worked with</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {brands.map((brand) => (
              <div 
                key={brand.name} 
                className="group animate-gradient-border rounded-3xl bg-white transition-all hover:scale-[1.03] hover:shadow-2xl"
              >
                <div className="relative h-80 w-full overflow-hidden rounded-3xl">
                  <img 
                    src={brand.image} 
                    alt={brand.name}
                    className="h-full w-full object-cover transition-transform hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 
                      className="text-4xl font-black text-white uppercase tracking-wider"
                      style={{ textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000" }}
                    >
                      {brand.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-lg font-bold text-[#0A2540] transition-colors group-hover:text-[#D62828]">{brand.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
