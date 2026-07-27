import { backendRequest, getBackendAssetUrl } from "@/lib/backend-api";
import type { Project, Service } from "@/types/site";

type BackendImage = {
  image: string;
  imagePath?: string;
};

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

function normalizeImage<T extends BackendImage>(item: T): T {
  return {
    ...item,
    image:
      item.imagePath?.startsWith("/uploads/")
        ? getBackendAssetUrl(item.imagePath)
        : item.image
  };
}

export async function getPublicServices(): Promise<Service[]> {
  const data = await backendRequest<{
    services?: Array<Service & { imagePath?: string }>;
  }>("/services");
  return Array.isArray(data.services) ? data.services.map(normalizeImage) : [];
}

export async function getAdminServices(): Promise<AdminService[]> {
  const data = await backendRequest<{
    services?: Array<AdminService & { imagePath?: string }>;
  }>("/services?all=1", {}, true);
  return Array.isArray(data.services) ? data.services.map(normalizeImage) : [];
}

export async function getPublicServiceCategories(): Promise<AdminServiceCategory[]> {
  const data = await backendRequest<{ categories: AdminServiceCategory[] }>("/categories");
  return data.categories;
}

export async function getAdminServiceCategories(): Promise<AdminServiceCategory[]> {
  const data = await backendRequest<{ categories: AdminServiceCategory[] }>(
    "/categories?all=1",
    {},
    true
  );
  return data.categories;
}

export async function getPublicProjects(): Promise<Project[]> {
  const data = await backendRequest<{
    projects?: Array<Project & { imagePath?: string }>;
  }>("/projects");
  return Array.isArray(data.projects) ? data.projects.map(normalizeImage) : [];
}

export async function getAdminProjects(): Promise<AdminProject[]> {
  const data = await backendRequest<{
    projects?: Array<AdminProject & { imagePath?: string }>;
  }>("/projects?all=1", {}, true);
  return Array.isArray(data.projects) ? data.projects.map(normalizeImage) : [];
}

export async function getGalleryCategories() {
  const projects = await getPublicProjects();
  return ["All", ...Array.from(new Set(projects.map((project) => project.category)))];
}
