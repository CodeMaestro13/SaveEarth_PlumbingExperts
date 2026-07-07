"use client";

import Image from "next/image";
import { Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import type { AdminProject, AdminService, AdminServiceCategory } from "@/lib/content";
import { CategorySelectField } from "@/components/category-select-field";
import { serviceIconOptions } from "@/lib/icons";

type ServerAction = (formData: FormData) => void | Promise<void>;

const inputClass =
  "mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-brandBlue";
const labelClass = "block text-sm font-bold text-navy";

function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-navy/70 p-4" role="dialog" aria-modal="true">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-lg bg-white shadow-premium">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <h2 className="text-xl font-black text-navy">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-navy transition hover:border-brandBlue"
            aria-label="Close popup"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function ServiceFields({
  service,
  categories,
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction
}: {
  service: AdminService;
  categories: AdminServiceCategory[];
  createCategoryAction: ServerAction;
  updateCategoryAction?: ServerAction;
  deleteCategoryAction?: ServerAction;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <input type="hidden" name="id" value={service.id} />
      <input type="hidden" name="imagePath" value={service.image} />
      <label className={labelClass}>
        Title
        <input name="title" required defaultValue={service.title} className={inputClass} />
      </label>
      {categories.length ? (
        <CategorySelectField
          categories={categories}
          defaultValue={service.category ?? ""}
          createCategoryAction={createCategoryAction}
          updateCategoryAction={updateCategoryAction}
          deleteCategoryAction={deleteCategoryAction}
          name="category"
          label="Category"
        />
      ) : (
        <label className={labelClass}>
          Category
          <input name="category" required defaultValue={service.category} className={inputClass} />
        </label>
      )}
      <label className={labelClass}>
        Icon
        <select name="iconKey" defaultValue={service.iconKey ?? "wrench"} className={inputClass}>
          {serviceIconOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label className={labelClass}>
        Sort Order
        <input name="sortOrder" type="number" defaultValue={service.sortOrder ?? 0} className={inputClass} />
      </label>
      <label className={`${labelClass} md:col-span-2`}>
        Description
        <textarea name="description" required rows={3} defaultValue={service.description} className={inputClass} />
      </label>
      <label className={`${labelClass} md:col-span-2`}>
        Features
        <textarea
          name="features"
          rows={4}
          placeholder="Add one feature per line"
          defaultValue={service.features.join("\n")}
          className={inputClass}
        />
      </label>
      <label className={labelClass}>
        Image
        <input name="image" type="file" accept="image/*" className={inputClass} />
      </label>
      <label className="mt-8 flex items-center gap-2 text-sm font-bold text-navy">
        <input name="isActive" type="checkbox" defaultChecked={service.isActive} />
        Publish on website
      </label>
    </div>
  );
}

function ProjectFields({
  project,
  categories,
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction
}: {
  project: AdminProject;
  categories: AdminServiceCategory[];
  createCategoryAction: ServerAction;
  updateCategoryAction?: ServerAction;
  deleteCategoryAction?: ServerAction;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <input type="hidden" name="id" value={project.id} />
      <input type="hidden" name="imagePath" value={project.image} />
      <label className={labelClass}>
        Title
        <input name="title" required defaultValue={project.title} className={inputClass} />
      </label>
      {categories.length ? (
        <CategorySelectField
          categories={categories}
          defaultValue={project.category ?? ""}
          createCategoryAction={createCategoryAction}
          updateCategoryAction={updateCategoryAction}
          deleteCategoryAction={deleteCategoryAction}
          name="category"
          label="Category"
        />
      ) : (
        <label className={labelClass}>
          Category
          <input name="category" required defaultValue={project.category} className={inputClass} />
        </label>
      )}
      <label className={labelClass}>
        Location
        <input name="location" required defaultValue={project.location} className={inputClass} />
      </label>
      <label className={labelClass}>
        Sort Order
        <input name="sortOrder" type="number" defaultValue={project.sortOrder ?? 0} className={inputClass} />
      </label>
      <label className={`${labelClass} md:col-span-2`}>
        Description
        <textarea name="description" required rows={3} defaultValue={project.description} className={inputClass} />
      </label>
      <label className={labelClass}>
        Image
        <input name="image" type="file" accept="image/*" className={inputClass} />
      </label>
      <label className="mt-8 flex items-center gap-2 text-sm font-bold text-navy">
        <input name="isActive" type="checkbox" defaultChecked={project.isActive} />
        Publish on website
      </label>
    </div>
  );
}

export function AdminServicesList({
  services,
  categories,
  updateAction,
  deleteAction,
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction
}: {
  services: AdminService[];
  categories: AdminServiceCategory[];
  updateAction: ServerAction;
  deleteAction: ServerAction;
  createCategoryAction: ServerAction;
  updateCategoryAction?: ServerAction;
  deleteCategoryAction?: ServerAction;
}) {
  const [editing, setEditing] = useState<AdminService | null>(null);
  const [deleting, setDeleting] = useState<AdminService | null>(null);

  return (
    <>
      <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
        {services.length ? (
          services.map((service) => (
            <article key={service.id} className="grid grid-cols-[48px_1fr_auto_auto] items-center gap-3 border-b border-slate-200 px-4 py-3 last:border-b-0">
              <div className="relative h-12 w-12 overflow-hidden rounded-md bg-slate-100">
                <Image src={service.image} alt={service.title} fill className="object-cover" sizes="48px" />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-black text-navy">{service.title}</h2>
                <p className="mt-1 truncate text-xs font-semibold text-slate-500">
                  {service.category} | {service.isActive ? "Published" : "Hidden"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditing(service)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-brandBlue transition hover:border-brandBlue hover:bg-blue-50"
                title="Edit service"
                aria-label={`Edit ${service.title}`}
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeleting(service)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-red-200 text-red-700 transition hover:bg-red-50"
                title="Delete service"
                aria-label={`Delete ${service.title}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </article>
          ))
        ) : (
          <p className="p-4 text-sm font-semibold text-slate-500">No services added yet.</p>
        )}
      </div>

      {editing ? (
        <Modal title={`Edit ${editing.title}`} onClose={() => setEditing(null)}>
          <form action={updateAction}>
            <ServiceFields
              service={editing}
              categories={categories}
              createCategoryAction={createCategoryAction}
              updateCategoryAction={updateCategoryAction}
              deleteCategoryAction={deleteCategoryAction}
            />
            <button type="submit" className="mt-5 rounded-md bg-navy px-5 py-3 font-bold text-white transition hover:bg-brandBlue">
              Save Changes
            </button>
          </form>
        </Modal>
      ) : null}

      {deleting ? (
        <Modal title="Delete service" onClose={() => setDeleting(null)}>
          <p className="text-sm font-semibold text-slate-700">
            Delete <span className="font-black text-navy">{deleting.title}</span>?
          </p>
          <form action={deleteAction} className="mt-5 flex gap-3">
            <input type="hidden" name="id" value={deleting.id} />
            <button type="submit" className="rounded-md bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700">
              Delete
            </button>
            <button
              type="button"
              onClick={() => setDeleting(null)}
              className="rounded-md border border-slate-300 px-5 py-3 font-bold text-navy transition hover:border-brandBlue"
            >
              Cancel
            </button>
          </form>
        </Modal>
      ) : null}
    </>
  );
}

export function AdminProjectsList({
  projects,
  categories,
  updateAction,
  deleteAction,
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction
}: {
  projects: AdminProject[];
  categories: AdminServiceCategory[];
  updateAction: ServerAction;
  deleteAction: ServerAction;
  createCategoryAction: ServerAction;
  updateCategoryAction?: ServerAction;
  deleteCategoryAction?: ServerAction;
}) {
  const [editing, setEditing] = useState<AdminProject | null>(null);
  const [deleting, setDeleting] = useState<AdminProject | null>(null);

  return (
    <>
      <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
        {projects.length ? (
          projects.map((project) => (
            <article key={project.id} className="grid grid-cols-[48px_1fr_auto_auto] items-center gap-3 border-b border-slate-200 px-4 py-3 last:border-b-0">
              <div className="relative h-12 w-12 overflow-hidden rounded-md bg-slate-100">
                <Image src={project.image} alt={project.title} fill className="object-cover" sizes="48px" />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-black text-navy">{project.title}</h2>
                <p className="mt-1 truncate text-xs font-semibold text-slate-500">
                  {project.category} | {project.location} | {project.isActive ? "Published" : "Hidden"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditing(project)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-brandBlue transition hover:border-brandBlue hover:bg-blue-50"
                title="Edit gallery project"
                aria-label={`Edit ${project.title}`}
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeleting(project)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-red-200 text-red-700 transition hover:bg-red-50"
                title="Delete gallery project"
                aria-label={`Delete ${project.title}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </article>
          ))
        ) : (
          <p className="p-4 text-sm font-semibold text-slate-500">No gallery projects added yet.</p>
        )}
      </div>

      {editing ? (
        <Modal title={`Edit ${editing.title}`} onClose={() => setEditing(null)}>
          <form action={updateAction}>
            <ProjectFields
              project={editing}
              categories={categories}
              createCategoryAction={createCategoryAction}
              updateCategoryAction={updateCategoryAction}
              deleteCategoryAction={deleteCategoryAction}
            />
            <button type="submit" className="mt-5 rounded-md bg-navy px-5 py-3 font-bold text-white transition hover:bg-brandBlue">
              Save Changes
            </button>
          </form>
        </Modal>
      ) : null}

      {deleting ? (
        <Modal title="Delete gallery project" onClose={() => setDeleting(null)}>
          <p className="text-sm font-semibold text-slate-700">
            Delete <span className="font-black text-navy">{deleting.title}</span>?
          </p>
          <form action={deleteAction} className="mt-5 flex gap-3">
            <input type="hidden" name="id" value={deleting.id} />
            <button type="submit" className="rounded-md bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700">
              Delete
            </button>
            <button
              type="button"
              onClick={() => setDeleting(null)}
              className="rounded-md border border-slate-300 px-5 py-3 font-bold text-navy transition hover:border-brandBlue"
            >
              Cancel
            </button>
          </form>
        </Modal>
      ) : null}
    </>
  );
}
