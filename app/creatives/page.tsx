import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "../components/site-shell";
import { getContentItems } from "../lib/content";
import { CreativesView } from "./creatives-view";

export const metadata: Metadata = {
  title: "Creatives | Arsal",
  description: "Browse static ads and video ads edited by Arsal for DTC campaigns.",
};

export default async function CreativesPage() {
  const [staticAds, videoAds] = await Promise.all([
    getContentItems("static_ads"),
    getContentItems("video_ads"),
  ]);

  return (
    <SiteShell>
      <section className="bg-[#0A2540] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-4xl space-y-6 animate-fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D62828]">
              Creatives
            </p>
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Selected work.
            </h1>
            <p className="text-lg leading-8 text-[#cbd5e1]">
              A living gallery of static ad designs and performance video ads.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <CreativesView staticAds={staticAds} videoAds={videoAds} />
      </section>
    </SiteShell>
  );
}
