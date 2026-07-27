"use client";

import { useState } from "react";

export default function HeroPortrait({ src, alt }: { src?: string | null; alt?: string }) {
  const [current, setCurrent] = useState<string>(src || "/window.svg");

  return (
    <div className="hero-portrait-card">
      <img
        src={current}
        alt={alt || "portrait"}
        className="hero-portrait-img"
        onError={() => {
          if (current !== "/window.svg") setCurrent("/window.svg");
        }}
      />
    </div>
  );
}
