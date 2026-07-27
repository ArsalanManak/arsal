"use client";

import { useState } from "react";
import { ImageLightbox } from "../components/image-lightbox";
import { getYouTubeEmbedUrl } from "../lib/video-utils";

type CreativeItem = {
  id: string;
  title: string;
  caption: string;
  url: string;
};

export function CreativesView({
  staticAds,
  videoAds,
}: {
  staticAds: CreativeItem[];
  videoAds: CreativeItem[];
}) {
  const [activeTab, setActiveTab] = useState<"static" | "video">("video");

  return (
    <div>
      <div className="rounded-[2rem] border border-[#0A2540]/10 bg-white p-4 shadow-[0_18px_60px_rgba(10,37,64,0.08)]">
        <div className="flex flex-wrap items-center gap-3 rounded-full border border-[#0A2540]/10 bg-[#FAFAFA] p-2">
          <button
            type="button"
            onClick={() => setActiveTab("video")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition ${
              activeTab === "video"
                ? "bg-[#0A2540] text-white shadow-[0_10px_30px_rgba(10,37,64,0.15)]"
                : "text-[#0A2540] hover:bg-white"
            }`}
          >
            <span className="text-base">▶️</span>
            Video Ads ({videoAds.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("static")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition ${
              activeTab === "static"
                ? "bg-[#0A2540] text-white shadow-[0_10px_30px_rgba(10,37,64,0.15)]"
                : "text-[#0A2540] hover:bg-white"
            }`}
          >
            <span className="text-base">🖼️</span>
            Static Ads ({staticAds.length})
          </button>
        </div>

        <div className="mt-8 rounded-[2rem] border border-dashed border-[#0A2540]/20 bg-[#FAFAFA] p-8 min-h-[18rem]">
          {activeTab === "static" ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {staticAds.length > 0 ? (
                staticAds.map((item) => (
                  <div
                    key={item.id}
                    className="group overflow-hidden rounded-[1.5rem] border border-[#0A2540]/10 bg-white shadow-[0_20px_60px_rgba(10,37,64,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(214,40,40,0.15)]"
                  >
                    <ImageLightbox imageUrl={item.url} title={item.title} />
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-[#0A2540]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#6b7280]">{item.caption}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex h-52 items-center justify-center text-sm text-[#6b7280]">
                  No static ads yet.
                </div>
              )}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {videoAds.length > 0 ? (
                videoAds.map((item) => {
                  const embedUrl = getYouTubeEmbedUrl(item.url);
                  return (
                    <div
                      key={item.id}
                      className="overflow-hidden rounded-[1.5rem] border border-[#0A2540]/10 bg-white shadow-[0_20px_60px_rgba(10,37,64,0.06)]"
                    >
                      {embedUrl ? (
                        <iframe
                          src={embedUrl}
                          title={item.title}
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
                    </div>
                  );
                })
              ) : (
                <div className="flex h-52 items-center justify-center text-sm text-[#6b7280]">
                  No video ads yet.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
