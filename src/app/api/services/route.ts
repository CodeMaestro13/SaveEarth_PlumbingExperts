import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { services as fallbackServices } from "@/data/site";
import { ensureContentTables, getPool } from "@/lib/db";

type ServiceRow = RowDataPacket & {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
};

function mapService(row: ServiceRow) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    category: row.category
  };
}

export async function GET() {
  try {
    const ready = await ensureContentTables();
    const pool = getPool();

    if (!ready || !pool) {
      return NextResponse.json({
        services: fallbackServices.map((service) => ({
          title: service.title,
          slug: service.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          category: service.category
        }))
      });
    }

    const [rows] = await pool.query<ServiceRow[]>(
      "SELECT id, title, slug, description, category FROM services WHERE is_active = 1 ORDER BY sort_order ASC, id DESC"
    );

    return NextResponse.json({
      services: rows.length ? rows.map(mapService) : fallbackServices.map((service) => ({
        title: service.title,
        slug: service.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        category: service.category
      }))
    });
  } catch (error) {
    console.error("Failed to load services for popup", error);

    return NextResponse.json({
      services: fallbackServices.map((service) => ({
        title: service.title,
        slug: service.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        category: service.category
      }))
    });
  }
}
