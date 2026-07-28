import type { Metadata } from "next";
import { SiteShell } from "../components/site-shell";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: "in" },
  { label: "Twitter", href: "https://twitter.com", icon: "x" },
  { label: "YouTube", href: "https://www.youtube.com", icon: "yt" },
  { label: "Facebook", href: "https://www.facebook.com", icon: "fb" },
  { label: "TikTok", href: "https://www.tiktok.com", icon: "tt" },
  { label: "Instagram", href: "https://www.instagram.com", icon: "ig" },
];

export const metadata: Metadata = {
  title: "Contact | Arsal",
  description: "Get in touch with Arsal for DTC video editing and ad creative projects.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-20 lg:px-8">
        <div className="max-w-3xl space-y-5 animate-fade-in-up">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D62828]">
            Contact
          </p>
          <h1 className="text-4xl font-black tracking-tight text-[#0A2540] sm:text-5xl">
            Let’s make your next launch feel impossible to ignore.
          </h1>
          <p className="text-lg leading-8 text-[#374151]">
            Whether you need a sharp paid social cutdown, a high-energy product launch edit, or a full creative package, I’m ready to jump in.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-[#0A2540]/10 bg-white p-8 shadow-[0_25px_80px_rgba(10,37,64,0.08)] animate-slide-in-left hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-[#0A2540]">Reach me directly</h2>
            <div className="mt-6 space-y-4">
              <a href="https://wa.me/923037764619" target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl border border-[#0A2540]/10 bg-[#FAFAFA] px-4 py-4 transition hover:border-[#D62828]/40 hover:scale-[1.01] hover:bg-[#D62828]/5">
                <span className="font-semibold text-[#0A2540]">Chat on WhatsApp</span>
                <span className="text-[#D62828]">+92 303 7764619</span>
              </a>
              <a href="mailto:arsalanayaz933@gmail.com" className="flex items-center justify-between rounded-2xl border border-[#0A2540]/10 bg-[#FAFAFA] px-4 py-4 transition hover:border-[#D62828]/40 hover:scale-[1.01] hover:bg-[#D62828]/5">
                <span className="font-semibold text-[#0A2540]">Email</span>
                <span className="text-[#D62828]">arsalanayaz933@gmail.com</span>
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#0A2540]/10 bg-[#FAFAFA] p-8 animate-slide-in-right hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-[#0A2540]">Follow along</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="rounded-2xl border border-[#0A2540]/10 bg-white px-4 py-3 text-center font-semibold text-[#0A2540] transition hover:-translate-y-1 hover:border-[#D62828]/40 hover:text-[#D62828] hover:bg-[#D62828]/5">
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
