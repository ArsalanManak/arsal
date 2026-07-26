"use client";

import { useEffect, useState } from "react";

export function ImageLightbox({ imageUrl, title }: { imageUrl: string; title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="block w-full text-left"
      >
        <div className="aspect-[4/5] overflow-hidden bg-[#FAFAFA]">
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      </button>
      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A2540]/80 px-4 py-6"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-h-[90vh] max-w-5xl rounded-[2rem] bg-white p-3 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-full bg-[#0A2540] px-3 py-2 text-sm font-semibold text-white"
            >
              Close
            </button>
            <img src={imageUrl} alt={title} className="max-h-[80vh] w-full rounded-[1.25rem] object-contain" />
          </div>
        </div>
      ) : null}
    </>
  );
}
