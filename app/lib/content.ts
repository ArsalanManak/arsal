import { getPool } from "./db";

export type ContentType = "home_intro_videos" | "static_ads" | "video_ads";

export type ContentItem = {
  id: string;
  title: string;
  caption: string;
  url: string;
  created_at?: string;
  sort_order?: number;
};

const TABLES: Record<ContentType, string> = {
  home_intro_videos: "home_intro_videos",
  static_ads: "static_ads",
  video_ads: "video_ads",
};

export async function getContentItems(type: ContentType): Promise<ContentItem[]> {
  const table = TABLES[type];

  try {
    const result = await getPool().query(
      `SELECT id, title, caption, url, created_at, sort_order FROM ${table} ORDER BY sort_order ASC, created_at ASC`
    );
    return result.rows;
  } catch (error) {
    if (error instanceof Error && error.message.includes("DATABASE_URL")) {
      return [];
    }

    throw error;
  }
}

export async function createContentItem(
  type: ContentType,
  payload: Partial<ContentItem>
): Promise<ContentItem | null> {
  const table = TABLES[type];
  const result = await getPool().query(
    `INSERT INTO ${table} (title, caption, url, sort_order) VALUES ($1, $2, $3, $4) RETURNING id, title, caption, url, created_at, sort_order`,
    [payload.title || "Untitled", payload.caption || "", payload.url || "", payload.sort_order ?? 0]
  );

  return result.rows[0] || null;
}

export async function deleteContentItem(type: ContentType, id: string) {
  const table = TABLES[type];
  await getPool().query(`DELETE FROM ${table} WHERE id = $1`, [id]);
}

export async function updateContentItem(
  type: ContentType,
  id: string,
  payload: Partial<ContentItem>
) {
  const table = TABLES[type];
  const fields = [];
  const values: any[] = [];
  let index = 1;

  if (payload.title !== undefined) {
    fields.push(`title = $${index++}`);
    values.push(payload.title);
  }
  if (payload.caption !== undefined) {
    fields.push(`caption = $${index++}`);
    values.push(payload.caption);
  }
  if (payload.url !== undefined) {
    fields.push(`url = $${index++}`);
    values.push(payload.url);
  }
  if (payload.sort_order !== undefined) {
    fields.push(`sort_order = $${index++}`);
    values.push(payload.sort_order);
  }

  if (fields.length === 0) {
    return;
  }

  await getPool().query(`UPDATE ${table} SET ${fields.join(", ")} WHERE id = $${index}`, [
    ...values,
    id,
  ]);
}

