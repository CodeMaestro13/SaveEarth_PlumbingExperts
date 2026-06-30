"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import {
  createAdminSession,
  destroyAdminSession,
  requireAdmin,
  validateAdminCredentials
} from "@/lib/admin-auth";
import { ensureContentTables, getPool } from "@/lib/db";

const maxUploadSize = 5 * 1024 * 1024;
const allowedImageTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"]
]);

const serviceSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  title: z.string().trim().min(2).max(160),
  description: z.string().trim().min(10),
  category: z.string().trim().min(2).max(120),
  iconKey: z.string().trim().min(1).max(60),
  imagePath: z.string().trim().optional(),
  features: z.string().trim().optional(),
  sortOrder: z.coerce.number().int().default(0),
  isActive: z.boolean().default(false)
});

const projectSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  title: z.string().trim().min(2).max(180),
  description: z.string().trim().min(10),
  category: z.string().trim().min(2).max(120),
  location: z.string().trim().min(2).max(120),
  imagePath: z.string().trim().optional(),
  sortOrder: z.coerce.number().int().default(0),
  isActive: z.boolean().default(false)
});

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || `item-${Date.now()}`;
}

function textListToJson(value?: string) {
  return JSON.stringify(
    (value ?? "")
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean)
  );
}

async function getUploadedImage(formData: FormData, folder: "services" | "gallery", slug: string) {
  const file = formData.get("image");

  if (!(file instanceof File) || file.size === 0) {
    return null;
  }

  const extension = allowedImageTypes.get(file.type);

  if (!extension) {
    throw new Error("Only JPG, PNG, WebP, and GIF images are allowed.");
  }

  if (file.size > maxUploadSize) {
    throw new Error("Image size must be 5MB or less.");
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  const fileName = `${Date.now()}-${slug}.${extension}`;
  const destination = path.join(uploadDir, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await mkdir(uploadDir, { recursive: true });
  await writeFile(destination, buffer);

  return `/uploads/${folder}/${fileName}`;
}

async function requirePool() {
  await requireAdmin();
  await ensureContentTables();
  const pool = getPool();

  if (!pool) {
    throw new Error("Database environment variables are not configured.");
  }

  return pool;
}

export async function loginAdminAction(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!(await validateAdminCredentials(username, password))) {
    redirect("/admin/login?error=1");
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAdminAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function createServiceAction(formData: FormData) {
  const pool = await requirePool();
  const data = serviceSchema.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    iconKey: formData.get("iconKey"),
    imagePath: formData.get("imagePath"),
    features: formData.get("features"),
    sortOrder: formData.get("sortOrder"),
    isActive: formData.get("isActive") === "on"
  });
  const slug = slugify(data.title);
  const uploadedImage = await getUploadedImage(formData, "services", slug);
  const imagePath =
    uploadedImage || data.imagePath || "/images/india-projects/indian-apartment-plumbing.png";

  await pool.query(
    `INSERT INTO services
      (title, slug, description, category, icon_key, image_path, features, sort_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.title,
      slug,
      data.description,
      data.category,
      data.iconKey,
      imagePath,
      textListToJson(data.features),
      data.sortOrder,
      data.isActive ? 1 : 0
    ]
  );

  revalidatePath("/");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function updateServiceAction(formData: FormData) {
  const pool = await requirePool();
  const data = serviceSchema.required({ id: true }).parse({
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    iconKey: formData.get("iconKey"),
    imagePath: formData.get("imagePath"),
    features: formData.get("features"),
    sortOrder: formData.get("sortOrder"),
    isActive: formData.get("isActive") === "on"
  });
  const slug = slugify(data.title);
  const uploadedImage = await getUploadedImage(formData, "services", slug);
  const imagePath = uploadedImage || data.imagePath || "/images/india-projects/indian-apartment-plumbing.png";

  await pool.query(
    `UPDATE services
     SET title = ?, slug = ?, description = ?, category = ?, icon_key = ?,
       image_path = ?, features = ?, sort_order = ?, is_active = ?
     WHERE id = ?`,
    [
      data.title,
      slug,
      data.description,
      data.category,
      data.iconKey,
      imagePath,
      textListToJson(data.features),
      data.sortOrder,
      data.isActive ? 1 : 0,
      data.id
    ]
  );

  revalidatePath("/");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function deleteServiceAction(formData: FormData) {
  const pool = await requirePool();
  const id = z.coerce.number().int().positive().parse(formData.get("id"));

  await pool.query("DELETE FROM services WHERE id = ?", [id]);

  revalidatePath("/");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function createProjectAction(formData: FormData) {
  const pool = await requirePool();
  const data = projectSchema.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    location: formData.get("location"),
    imagePath: formData.get("imagePath"),
    sortOrder: formData.get("sortOrder"),
    isActive: formData.get("isActive") === "on"
  });
  const slug = slugify(data.title);
  const uploadedImage = await getUploadedImage(formData, "gallery", slug);
  const imagePath =
    uploadedImage || data.imagePath || "/images/india-projects/indian-apartment-plumbing.png";

  await pool.query(
    `INSERT INTO gallery_projects
      (title, slug, category, location, description, image_path, sort_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.title,
      slug,
      data.category,
      data.location,
      data.description,
      imagePath,
      data.sortOrder,
      data.isActive ? 1 : 0
    ]
  );

  revalidatePath("/");
  revalidatePath("/gallery");
  redirect("/admin/gallery");
}

export async function updateProjectAction(formData: FormData) {
  const pool = await requirePool();
  const data = projectSchema.required({ id: true }).parse({
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    location: formData.get("location"),
    imagePath: formData.get("imagePath"),
    sortOrder: formData.get("sortOrder"),
    isActive: formData.get("isActive") === "on"
  });
  const slug = slugify(data.title);
  const uploadedImage = await getUploadedImage(formData, "gallery", slug);
  const imagePath = uploadedImage || data.imagePath || "/images/india-projects/indian-apartment-plumbing.png";

  await pool.query(
    `UPDATE gallery_projects
     SET title = ?, slug = ?, category = ?, location = ?, description = ?,
       image_path = ?, sort_order = ?, is_active = ?
     WHERE id = ?`,
    [
      data.title,
      slug,
      data.category,
      data.location,
      data.description,
      imagePath,
      data.sortOrder,
      data.isActive ? 1 : 0,
      data.id
    ]
  );

  revalidatePath("/");
  revalidatePath("/gallery");
  redirect("/admin/gallery");
}

export async function deleteProjectAction(formData: FormData) {
  const pool = await requirePool();
  const id = z.coerce.number().int().positive().parse(formData.get("id"));

  await pool.query("DELETE FROM gallery_projects WHERE id = ?", [id]);

  revalidatePath("/");
  revalidatePath("/gallery");
  redirect("/admin/gallery");
}
