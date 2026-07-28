import { getPool } from "./db";

export type ContentType = "home_intro_videos" | "static_ads" | "video_ads" | "courses";

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
  courses: "courses",
};

async function ensureContentTable(type: ContentType) {
  const table = TABLES[type];
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS ${table} (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title VARCHAR(255) NOT NULL,
      caption TEXT,
      url TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      sort_order INTEGER DEFAULT 0
    )
  `;
  const createIndexSql = `CREATE INDEX IF NOT EXISTS idx_${table}_sort ON ${table}(sort_order ASC, created_at ASC)`;

  await getPool().query(createTableSql);
  await getPool().query(createIndexSql);
}

async function withTableEnsure<T>(type: ContentType, callback: () => Promise<T>): Promise<T> {
  try {
    return await callback();
  } catch (error) {
    if (error instanceof Error && error.message.includes("does not exist")) {
      await ensureContentTable(type);
      return callback();
    }

    if (error instanceof Error && error.message.includes("DATABASE_URL")) {
      throw error;
    }

    throw error;
  }
}

export async function getContentItems(type: ContentType): Promise<ContentItem[]> {
  const table = TABLES[type];

  try {
    await ensureContentTable(type);
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
  return withTableEnsure(type, async () => {
    const result = await getPool().query(
      `INSERT INTO ${table} (title, caption, url, sort_order) VALUES ($1, $2, $3, $4) RETURNING id, title, caption, url, created_at, sort_order`,
      [payload.title || "Untitled", payload.caption || "", payload.url || "", payload.sort_order ?? 0]
    );

    return result.rows[0] || null;
  });
}

export async function deleteContentItem(type: ContentType, id: string) {
  const table = TABLES[type];
  return withTableEnsure(type, async () => {
    await getPool().query(`DELETE FROM ${table} WHERE id = $1`, [id]);
  });
}

export async function updateContentItem(
  type: ContentType,
  id: string,
  payload: Partial<ContentItem>
) {
  const table = TABLES[type];
  return withTableEnsure(type, async () => {
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
  });
}

