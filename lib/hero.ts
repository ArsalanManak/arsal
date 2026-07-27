import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data");
const HERO_FILE = path.join(DATA_PATH, "hero.json");

export function getHeroImageUrl(): string | null {
  try {
    if (!fs.existsSync(HERO_FILE)) return null;
    const raw = fs.readFileSync(HERO_FILE, "utf8");
    const data = JSON.parse(raw);
    return data?.url || null;
  } catch (err) {
    console.error("getHeroImageUrl error", err);
    return null;
  }
}

export function saveHeroImageUrl(url: string) {
  try {
    if (!fs.existsSync(DATA_PATH)) fs.mkdirSync(DATA_PATH, { recursive: true });
    fs.writeFileSync(HERO_FILE, JSON.stringify({ url }, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("saveHeroImageUrl error", err);
    return false;
  }
}
