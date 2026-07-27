"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  createAdminSession,
  destroyAdminSession,
  requireAdmin,
  validateAdminCredentials
} from "@/lib/admin-auth";
import { backendRequest } from "@/lib/backend-api";

async function sendForm(path: string, formData: FormData) {
  await requireAdmin();
  await backendRequest(path, { method: "POST", body: formData }, true);
}

async function remove(path: string) {
  await requireAdmin();
  await backendRequest(path, { method: "DELETE" }, true);
}

function refreshContent() {
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/gallery");
  revalidatePath("/admin");
}

export async function loginAdminAction(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const token = await validateAdminCredentials(username, password);
  if (!token) {
    redirect("/admin/login?error=1");
  }

  await createAdminSession(token);
  redirect("/admin");
}

export async function logoutAdminAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function createServiceAction(formData: FormData) {
  await sendForm("/services", formData);
  refreshContent();
  redirect("/admin/services");
}

export async function updateServiceAction(formData: FormData) {
  const id = z.coerce.number().int().positive().parse(formData.get("id"));
  await sendForm(`/services/${id}`, formData);
  refreshContent();
  redirect("/admin/services");
}

export async function deleteServiceAction(formData: FormData) {
  const id = z.coerce.number().int().positive().parse(formData.get("id"));
  await remove(`/services/${id}`);
  refreshContent();
  redirect("/admin/services");
}

export async function createServiceCategoryAction(formData: FormData) {
  await sendForm("/categories", formData);
  refreshContent();
  redirect(String(formData.get("returnTo") || "/admin/services"));
}

export async function updateServiceCategoryAction(formData: FormData) {
  const id = z.coerce.number().int().positive().parse(formData.get("id"));
  await sendForm(`/categories/${id}`, formData);
  refreshContent();
  redirect(String(formData.get("returnTo") || "/admin/services"));
}

export async function deleteServiceCategoryAction(formData: FormData) {
  const id = z.coerce.number().int().positive().parse(formData.get("id"));
  await remove(`/categories/${id}`);
  refreshContent();
  redirect(String(formData.get("returnTo") || "/admin/services"));
}

export async function createProjectAction(formData: FormData) {
  await sendForm("/projects", formData);
  refreshContent();
  redirect("/admin/gallery");
}

export async function updateProjectAction(formData: FormData) {
  const id = z.coerce.number().int().positive().parse(formData.get("id"));
  await sendForm(`/projects/${id}`, formData);
  refreshContent();
  redirect("/admin/gallery");
}

export async function deleteProjectAction(formData: FormData) {
  const id = z.coerce.number().int().positive().parse(formData.get("id"));
  await remove(`/projects/${id}`);
  refreshContent();
  redirect("/admin/gallery");
}

export async function createAdminAction(formData: FormData) {
  await sendForm("/admins", formData);
  revalidatePath("/admin/admins");
  redirect("/admin/admins");
}

export async function updateAdminAction(formData: FormData) {
  const id = z.coerce.number().int().positive().parse(formData.get("id"));
  await sendForm(`/admins/${id}`, formData);
  revalidatePath("/admin/admins");
  redirect("/admin/admins");
}

export async function deleteAdminAction(formData: FormData) {
  const id = z.coerce.number().int().positive().parse(formData.get("id"));
  await remove(`/admins/${id}`);
  revalidatePath("/admin/admins");
  redirect("/admin/admins");
}
