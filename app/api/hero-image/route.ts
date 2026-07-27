import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data");
const HERO_FILE = path.join(DATA_PATH, "hero.json");

export async function GET() {
  try {
    if (!fs.existsSync(HERO_FILE)) {
      return new Response(JSON.stringify({ url: null }), { status: 200 });
    }
    const raw = fs.readFileSync(HERO_FILE, "utf8");
    const data = JSON.parse(raw);
    return new Response(JSON.stringify({ url: data.url || null }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ url: null }), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const url = (body.url || "").trim();
    if (!url) return new Response(JSON.stringify({ error: "Missing url" }), { status: 400 });

    if (!fs.existsSync(DATA_PATH)) fs.mkdirSync(DATA_PATH, { recursive: true });
    fs.writeFileSync(HERO_FILE, JSON.stringify({ url }, null, 2), "utf8");
    return new Response(JSON.stringify({ ok: true, url }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Save failed" }), { status: 500 });
  }
}
