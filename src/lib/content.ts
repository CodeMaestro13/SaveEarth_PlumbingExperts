import { backendRequest } from "@/lib/backend-api";
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

export async function getPublicServices(): Promise<Service[]> {
  const data = await backendRequest<{ services: Service[] }>("/services");
  return data.services;
}

export async function getAdminServices(): Promise<AdminService[]> {
  const data = await backendRequest<{ services: AdminService[] }>("/services?all=1", {}, true);
  return data.services;
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
  const data = await backendRequest<{ projects: Project[] }>("/projects");
  return data.projects;
}

export async function getAdminProjects(): Promise<AdminProject[]> {
  const data = await backendRequest<{ projects: AdminProject[] }>("/projects?all=1", {}, true);
  return data.projects;
}

export async function getGalleryCategories() {
  const projects = await getPublicProjects();
  return ["All", ...Array.from(new Set(projects.map((project) => project.category)))];
}
