"use client";

import { useEffect, useState, FormEvent } from "react";
import type { ContentItem, ContentType } from "../lib/content";

const CONTENT_TYPES: Array<{ key: ContentType; label: string }> = [
  { key: "home_intro_videos", label: "Home Intro Videos" },
  { key: "static_ads", label: "Static Ads" },
  { key: "video_ads", label: "Video Ads" },
  { key: "courses", label: "Courses" },
];

const PASSCODE = "arsal2026";

function getInitialState() {
  return {
    title: "",
    caption: "",
    url: "",
  };
}

export default function AdminPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [items, setItems] = useState<Record<ContentType, ContentItem[]>>({
    home_intro_videos: [],
    static_ads: [],
    video_ads: [],
    courses: [],
  });
  const [heroUrl, setHeroUrl] = useState("");
  const [formState, setFormState] = useState<Record<ContentType, ReturnType<typeof getInitialState>>>({
    home_intro_videos: getInitialState(),
    static_ads: getInitialState(),
    video_ads: getInitialState(),
    courses: getInitialState(),
  });
  const [activeType, setActiveType] = useState<ContentType>("home_intro_videos");
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [status, setStatus] = useState("Enter the shared passcode to manage the site.");

  useEffect(() => {
    if (!isUnlocked) return;
    void loadContent();
  }, [isUnlocked]);

  const loadContent = async () => {
    for (const type of CONTENT_TYPES) {
      const response = await fetch(`/api/content?type=${type.key}`, { cache: "no-store" });
      const data = await response.json();

      if (!response.ok) {
        setStatus(data.error || `Failed to load ${type.label}.`);
        continue;
      }

      setItems((prev) => ({ ...prev, [type.key]: data.items || [] }));
    }

    try {
      const res = await fetch("/api/hero-image");
      if (res.ok) {
        const d = await res.json();
        setHeroUrl(d.url || "");
      }
    } catch (err) {
      /* ignore */
    }
  };

  const handleUnlock = (event: FormEvent) => {
    event.preventDefault();
    if (passcode === PASSCODE) {
      setIsUnlocked(true);
      setStatus("Access granted. You can manage the content below.");
    } else {
      setStatus("Incorrect passcode. Please try again.");
    }
  };

  const handleSubmit = async (event: FormEvent, type: ContentType) => {
    event.preventDefault();
    const payload = formState[type];

    if (editingItem) {
      const url = payload.url.split(/\r?\n/)[0].trim();
      if (!url) {
        setStatus("Please provide a valid link to update the item.");
        return;
      }

      const response = await fetch(`/api/content?type=${type}&id=${editingItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: payload.title, caption: payload.caption, url }),
      });

      if (response.ok) {
        setItems((prev) => ({
          ...prev,
          [type]: prev[type].map((item) =>
            item.id === editingItem.id
              ? { ...item, title: payload.title, caption: payload.caption, url }
              : item
          ),
        }));
        setStatus("Item updated successfully.");
      } else {
        setStatus("Failed to update item.");
      }

      setEditingItem(null);
      setFormState((prev) => ({ ...prev, [type]: getInitialState() }));
      return;
    }

    const links = payload.url
      .split(/\r?\n/)
      .map((link) => link.trim())
      .filter(Boolean);

    if (links.length === 0) {
      setStatus("Please paste at least one link before saving.");
      return;
    }

    const createdItems: ContentItem[] = [];

    for (const link of links) {
      const response = await fetch(`/api/content?type=${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, url: link }),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus(data.error || "Failed to add one or more items.");
        return;
      }

      if (data.item) {
        createdItems.push(data.item);
      }
    }

    if (createdItems.length === 0) {
      setStatus("No items were created. Please check your input and try again.");
      return;
    }

    setItems((prev) => ({ ...prev, [type]: [...(prev[type] || []), ...createdItems] }));
    setFormState((prev) => ({ ...prev, [type]: getInitialState() }));
    setStatus(
      createdItems.length > 1
        ? `Added ${createdItems.length} items successfully.`
        : "Item added successfully."
    );
  };

  const handleEdit = (type: ContentType, item: ContentItem) => {
    setActiveType(type);
    setEditingItem(item);
    setFormState((prev) => ({
      ...prev,
      [type]: { title: item.title, caption: item.caption, url: item.url },
    }));
    setStatus("Editing item. Make changes and press Save.");
  };

  const handleCancelEdit = () => {
    if (!editingItem) return;
    setEditingItem(null);
    setFormState((prev) => ({ ...prev, [activeType]: getInitialState() }));
    setStatus("Edit cancelled.");
  };

  const handleDelete = async (type: ContentType, id: string) => {
    await fetch(`/api/content?type=${type}&id=${id}`, { method: "DELETE" });
    setItems((prev) => ({ ...prev, [type]: prev[type].filter((item) => item.id !== id) }));
    if (editingItem?.id === id) {
      setEditingItem(null);
      setFormState((prev) => ({ ...prev, [type]: getInitialState() }));
    }
    setStatus("Item removed.");
  };

  if (!isUnlocked) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] px-6 py-24 text-[#0A2540]">
        <div className="mx-auto max-w-md rounded-[2rem] border border-[#0A2540]/10 bg-white p-8 shadow-[0_25px_70px_rgba(10,37,64,0.08)]">
          <h1 className="text-3xl font-black">Admin Access</h1>
          <p className="mt-3 text-sm leading-7 text-[#4b5563]">
            Use the shared passcode to manage intro videos, creative galleries, and course videos.
          </p>
          <form onSubmit={handleUnlock} className="mt-8 space-y-4">
            <label className="block text-sm font-semibold text-[#0A2540]">
              Passcode
              <input
                value={passcode}
                onChange={(event) => setPasscode(event.target.value)}
                type="password"
                className="mt-2 w-full rounded-2xl border border-[#0A2540]/15 bg-[#FAFAFA] px-4 py-3 outline-none ring-0"
                placeholder="Enter passcode"
              />
            </label>
            <button type="submit" className="w-full rounded-full bg-[#D62828] px-4 py-3 font-semibold text-white">
              Unlock admin panel
            </button>
          </form>
          <p className="mt-4 text-sm text-[#6b7280]">{status}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] px-6 py-20 text-[#0A2540]">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D62828]">Admin</p>
            <h1 className="text-4xl font-black tracking-tight">Manage your portfolio content</h1>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#4b5563]">{status}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {CONTENT_TYPES.map((type) => (
            <button
              key={type.key}
              type="button"
              onClick={() => setActiveType(type.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeType === type.key ? "bg-[#0A2540] text-white" : "bg-white text-[#0A2540] border border-[#0A2540]/10"}`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-[#0A2540]/10 bg-white p-6">
          <h3 className="text-lg font-semibold">Hero image (Cloudinary URL)</h3>
          <p className="mt-2 text-sm text-[#6b7280]">Paste the Cloudinary (or any image) URL to use in the homepage hero.</p>
          <div className="mt-3 flex items-center gap-3">
            <input value={heroUrl} onChange={(e) => setHeroUrl(e.target.value)} placeholder="https://res.cloudinary.com/.../image.jpg" className="w-full rounded-2xl border border-[#0A2540]/15 bg-[#FAFAFA] px-4 py-3" />
            <button onClick={async () => {
              try {
                setStatus('Saving hero image...');
                const res = await fetch('/api/hero-image', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: heroUrl }) });
                if (res.ok) {
                  setStatus('Hero image saved. Refresh homepage to see change.');
                } else {
                  setStatus('Save failed.');
                }
              } catch (err) {
                setStatus('Save failed.');
              }
            }} className="rounded-full bg-[#0A2540] px-4 py-2 text-white">Save</button>
          </div>
          <div className="mt-4">
            <img src={heroUrl || '/window.svg'} alt="hero preview" className="hero-portrait-img w-48" style={{ background: 'transparent' }} />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <form onSubmit={(event) => handleSubmit(event, activeType)} className="rounded-[2rem] border border-[#0A2540]/10 bg-white p-8 shadow-[0_25px_70px_rgba(10,37,64,0.08)]">
            <h2 className="text-2xl font-bold">{editingItem ? "Edit item" : "Add item"}</h2>
            <div className="mt-6 space-y-4">
              <label className="block text-sm font-semibold">
                Title
                <input
                  value={formState[activeType].title}
                  onChange={(event) => setFormState((prev) => ({ ...prev, [activeType]: { ...prev[activeType], title: event.target.value } }))}
                  className="mt-2 w-full rounded-2xl border border-[#0A2540]/15 bg-[#FAFAFA] px-4 py-3"
                  placeholder="Campaign title"
                />
              </label>
              <label className="block text-sm font-semibold">
                Caption
                <input
                  value={formState[activeType].caption}
                  onChange={(event) => setFormState((prev) => ({ ...prev, [activeType]: { ...prev[activeType], caption: event.target.value } }))}
                  className="mt-2 w-full rounded-2xl border border-[#0A2540]/15 bg-[#FAFAFA] px-4 py-3"
                  placeholder="Short caption"
                />
              </label>
              <label className="block text-sm font-semibold">
                Links
                <textarea
                  value={formState[activeType].url}
                  onChange={(event) => setFormState((prev) => ({ ...prev, [activeType]: { ...prev[activeType], url: event.target.value } }))}
                  className="mt-2 min-h-32 w-full rounded-2xl border border-[#0A2540]/15 bg-[#FAFAFA] px-4 py-3"
                  placeholder="Paste one YouTube or Cloudinary link per line to add multiple items at once"
                />
              </label>
              <div className="flex flex-col gap-3">
                <button type="submit" className="w-full rounded-full bg-[#D62828] px-4 py-3 font-semibold text-white">
                  {editingItem ? "Update item" : "Save item"}
                </button>
                {editingItem ? (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="w-full rounded-full border border-[#0A2540]/10 bg-white px-4 py-3 text-[#0A2540] font-semibold"
                  >
                    Cancel edit
                  </button>
                ) : null}
              </div>
            </div>
          </form>

          <div className="space-y-4">
            {items[activeType].length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-[#0A2540]/20 bg-white p-8 text-center text-sm text-[#6b7280]">
                No items available yet for this section.
              </div>
            ) : (
              <>
                {items[activeType].map((item) => (
                  <div key={item.id} className="rounded-[1.5rem] border border-[#0A2540]/10 bg-white p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-[#0A2540]">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-[#6b7280]">{item.caption}</p>
                        <p className="mt-2 break-all text-xs text-[#0A2540]/70">{item.url}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(activeType, item)}
                          className="rounded-full border border-[#0A2540]/10 bg-white px-3 py-2 text-sm font-semibold text-[#0A2540]"
                        >
                          Edit
                        </button>
                        <button type="button" onClick={() => handleDelete(activeType, item.id)} className="rounded-full border border-[#D62828]/20 px-3 py-2 text-sm font-semibold text-[#D62828]">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
