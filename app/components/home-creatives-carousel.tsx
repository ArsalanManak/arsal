"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const carouselItems = [
  {
    type: "creatives",
    title: "Selected Work",
    subtitle: "Static ads & performance videos",
    link: "/creatives",
    color: "#D62828",
    icon: "🎬"
  },
  {
    type: "courses",
    title: "Learn by Watching",
    subtitle: "Course videos & walkthroughs",
    link: "/courses",
    color: "#7c3aed",
    icon: "📚"
  },
  {
    type: "about",
    title: "About Me",
    subtitle: "5+ years of DTC editing",
    link: "/about",
    color: "#0A2540",
    icon: "👨‍💻"
  },
  {
    type: "contact",
    title: "Let's Connect",
    subtitle: "Ready for your next project",
    link: "/contact",
    color: "#059669",
    icon: "✉️"
  }
];

export function HomeCreativesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D62828]">
          Explore
        </p>
        <h2 className="text-3xl font-black text-[#0A2540]">
          Discover my work across all areas
        </h2>
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-[#0A2540]/10 bg-white shadow-[0_24px_80px_rgba(10,37,64,0.08)]">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselItems.map((item, index) => (
            <div key={index} className="min-w-full p-12 lg:p-16">
              <Link href={item.link} className="block group">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div 
                    className="flex h-24 w-24 items-center justify-center rounded-3xl text-5xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-[#0A2540] transition-colors group-hover:text-[#D62828]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-lg text-[#6b7280]">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="mt-4 rounded-full border-2 border-[#0A2540]/15 px-6 py-3 font-semibold text-[#0A2540] transition-all group-hover:border-[#D62828] group-hover:bg-[#D62828] group-hover:text-white">
                    Explore {item.type}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Carousel indicators */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "w-8 bg-[#D62828]" 
                  : "w-2.5 bg-[#0A2540]/20 hover:bg-[#0A2540]/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
