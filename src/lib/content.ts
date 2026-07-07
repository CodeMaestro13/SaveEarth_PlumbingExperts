import type { RowDataPacket } from "mysql2";
import { galleryProjects, services as fallbackServices } from "@/data/site";
import { ensureContentTables, getPool } from "@/lib/db";
import type { Project, Service } from "@/types/site";

export type AdminService = Service & {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type AdminServiceCategory = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type AdminProject = Project & {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
};

type ServiceRow = RowDataPacket & {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  icon_key: string;
  image_path: string;
  features: string | string[];
  sort_order: number;
  is_active: number;
  created_at?: Date;
  updated_at?: Date;
};

type ProjectRow = RowDataPacket & {
  id: number;
  title: string;
  slug: string;
  category: string;
  location: string;
  description: string;
  image_path: string;
  sort_order: number;
  is_active: number;
  created_at?: Date;
  updated_at?: Date;
};

type ServiceCategoryRow = RowDataPacket & {
  id: number;
  name: string;
  slug: string;
  description: string;
  sort_order: number;
  is_active: number;
  created_at?: Date;
  updated_at?: Date;
};

function parseFeatures(features: string | string[]) {
  if (Array.isArray(features)) {
    return features;
  }

  try {
    const parsed = JSON.parse(features);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function mapService(row: ServiceRow): AdminService {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    category: row.category,
    iconKey: row.icon_key,
    image: row.image_path,
    features: parseFeatures(row.features),
    sortOrder: row.sort_order,
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapProject(row: ProjectRow): AdminProject {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    location: row.location,
    description: row.description,
    image: row.image_path,
    sortOrder: row.sort_order,
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapServiceCategory(row: ServiceCategoryRow): AdminServiceCategory {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description || undefined,
    sortOrder: row.sort_order,
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export async function getPublicServices(): Promise<Service[]> {
  try {
    const ready = await ensureContentTables();
    const pool = getPool();

    if (!ready || !pool) {
      return fallbackServices;
    }

    const [rows] = await pool.query<ServiceRow[]>(
      "SELECT * FROM services WHERE is_active = 1 ORDER BY sort_order ASC, id DESC"
    );

    return rows.length ? rows.map(mapService) : fallbackServices;
  } catch {
    return fallbackServices;
  }
}

export async function getAdminServices(): Promise<AdminService[]> {
  const ready = await ensureContentTables();
  const pool = getPool();

  if (!ready || !pool) {
    return [];
  }

  const [rows] = await pool.query<ServiceRow[]>(
    "SELECT * FROM services ORDER BY sort_order ASC, id DESC"
  );

  return rows.map(mapService);
}

export async function getPublicServiceCategories(): Promise<AdminServiceCategory[]> {
  try {
    const ready = await ensureContentTables();
    const pool = getPool();

    if (!ready || !pool) {
      return Array.from(new Set(fallbackServices.map((service) => service.category))).map((name, index) => ({
        id: index + 1,
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        sortOrder: index,
        isActive: true
      }));
    }

    const [rows] = await pool.query<ServiceCategoryRow[]>(
      "SELECT * FROM service_categories WHERE is_active = 1 ORDER BY sort_order ASC, id DESC"
    );

    return rows.length
      ? rows.map(mapServiceCategory)
      : Array.from(new Set(fallbackServices.map((service) => service.category))).map((name, index) => ({
          id: index + 1,
          name,
          slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          sortOrder: index,
          isActive: true
        }));
  } catch {
    return Array.from(new Set(fallbackServices.map((service) => service.category))).map((name, index) => ({
      id: index + 1,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      sortOrder: index,
      isActive: true
    }));
  }
}

export async function getAdminServiceCategories(): Promise<AdminServiceCategory[]> {
  const ready = await ensureContentTables();
  const pool = getPool();

  if (!ready || !pool) {
    return [];
  }

  const [rows] = await pool.query<ServiceCategoryRow[]>(
    "SELECT * FROM service_categories ORDER BY sort_order ASC, id DESC"
  );

  return rows.map(mapServiceCategory);
}

export async function getPublicProjects(): Promise<Project[]> {
  try {
    const ready = await ensureContentTables();
    const pool = getPool();

    if (!ready || !pool) {
      return galleryProjects;
    }

    const [rows] = await pool.query<ProjectRow[]>(
      "SELECT * FROM gallery_projects WHERE is_active = 1 ORDER BY sort_order ASC, id DESC"
    );

    return rows.length ? rows.map(mapProject) : galleryProjects;
  } catch {
    return galleryProjects;
  }
}

export async function getAdminProjects(): Promise<AdminProject[]> {
  const ready = await ensureContentTables();
  const pool = getPool();

  if (!ready || !pool) {
    return [];
  }

  const [rows] = await pool.query<ProjectRow[]>(
    "SELECT * FROM gallery_projects ORDER BY sort_order ASC, id DESC"
  );

  return rows.map(mapProject);
}

export async function getGalleryCategories() {
  const projects = await getPublicProjects();
  const categories = Array.from(new Set(projects.map((project) => project.category)));
  return ["All", ...categories];
}
