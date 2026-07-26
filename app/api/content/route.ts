import { NextRequest, NextResponse } from "next/server";
import { createContentItem, deleteContentItem, getContentItems, updateContentItem, ContentType } from "../../lib/content";

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type") as ContentType | null;
  if (!type) {
    return NextResponse.json({ items: [] });
  }

  try {
    const items = await getContentItems(type);
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Database is unavailable" },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type") as ContentType | null;
  if (!type) {
    return NextResponse.json({ error: "Missing type" }, { status: 400 });
  }

  try {
    const payload = await request.json();
    const item = await createContentItem(type, payload);
    return NextResponse.json({ item });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Database is unavailable" },
      { status: 503 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type") as ContentType | null;
  const id = request.nextUrl.searchParams.get("id");
  if (!type || !id) {
    return NextResponse.json({ error: "Missing type or id" }, { status: 400 });
  }

  try {
    const payload = await request.json();
    await updateContentItem(type, id, payload);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Database is unavailable" },
      { status: 503 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type") as ContentType | null;
  const id = request.nextUrl.searchParams.get("id");
  if (!type || !id) {
    return NextResponse.json({ error: "Missing type or id" }, { status: 400 });
  }

  try {
    await deleteContentItem(type, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Database is unavailable" },
      { status: 503 }
    );
  }
}
