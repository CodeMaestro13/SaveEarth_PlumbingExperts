import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminServicesList } from "@/components/admin-crud-lists";
import {
  createServiceAction,
  createServiceCategoryAction,
  deleteServiceAction,
  deleteServiceCategoryAction,
  updateServiceAction,
  updateServiceCategoryAction
} from "@/lib/admin-actions";
import { requireAdmin } from "@/lib/admin-auth";
import {
  getAdminServiceCategories,
  getAdminServices,
  type AdminService,
  type AdminServiceCategory
} from "@/lib/content";
import { hasDatabaseConfig } from "@/lib/db";
import { serviceIconOptions } from "@/lib/icons";

const inputClass =
  "mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-brandBlue";
const labelClass = "block text-sm font-bold text-navy";

function ServiceFields({ categories }: { categories: AdminServiceCategory[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <input type="hidden" name="imagePath" value="" />
      <label className={labelClass}>
        Title
        <input name="title" required className={inputClass} />
      </label>
      <label className={labelClass}>
        Category
        {categories.length ? (
          <select name="category" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        ) : (
          <input name="category" required className={inputClass} placeholder="Add a category first" />
        )}
      </label>
      <label className={labelClass}>
        Icon
        <select name="iconKey" defaultValue="wrench" className={inputClass}>
          {serviceIconOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label className={labelClass}>
        Sort Order
        <input name="sortOrder" type="number" defaultValue={0} className={inputClass} />
      </label>
      <label className={`${labelClass} md:col-span-2`}>
        Description
        <textarea name="description" required rows={3} className={inputClass} />
      </label>
      <label className={`${labelClass} md:col-span-2`}>
        Features
        <textarea name="features" rows={4} placeholder="Add one feature per line" className={inputClass} />
      </label>
      <label className={labelClass}>
        Image
        <input name="image" type="file" accept="image/*" className={inputClass} />
      </label>
      <label className="mt-8 flex items-center gap-2 text-sm font-bold text-navy">
        <input name="isActive" type="checkbox" defaultChecked />
        Publish on website
      </label>
    </div>
  );
}

function CategoryManager({ categories }: { categories: AdminServiceCategory[] }) {
  return (
    <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-black text-navy">Manage Service Categories</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Create categories once and reuse them for all services.
          </p>
        </div>
      </div>

      <form action={createServiceCategoryAction} className="mt-5 grid gap-4 md:grid-cols-[1.2fr_1fr_0.4fr_auto]">
        <label className={labelClass}>
          Category Name
          <input name="name" required className={inputClass} placeholder="Plumbing" />
        </label>
        <label className={labelClass}>
          Description
          <input name="description" className={inputClass} placeholder="Optional" />
        </label>
        <label className={labelClass}>
          Sort Order
          <input name="sortOrder" type="number" defaultValue={0} className={inputClass} />
        </label>
        <label className="flex items-center gap-2 text-sm font-bold text-navy md:pt-8">
          <input name="isActive" type="checkbox" defaultChecked />
          Active
        </label>
        <button type="submit" className="rounded-md bg-brandBlue px-5 py-3 font-bold text-white transition hover:bg-navy md:col-span-4">
          Add Category
        </button>
      </form>

      <div className="mt-6 space-y-3">
        {categories.length ? (
          categories.map((category) => (
            <div key={category.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <form action={updateServiceCategoryAction} className="grid gap-3 md:grid-cols-[1.2fr_1fr_0.4fr_auto_auto]">
                <input type="hidden" name="id" value={category.id} />
                <label className={labelClass}>
                  Name
                  <input name="name" required defaultValue={category.name} className={inputClass} />
                </label>
                <label className={labelClass}>
                  Description
                  <input name="description" defaultValue={category.description ?? ""} className={inputClass} />
                </label>
                <label className={labelClass}>
                  Sort
                  <input name="sortOrder" type="number" defaultValue={category.sortOrder ?? 0} className={inputClass} />
                </label>
                <label className="flex items-center gap-2 text-sm font-bold text-navy md:pt-8">
                  <input name="isActive" type="checkbox" defaultChecked={category.isActive} />
                  Active
                </label>
                <div className="flex items-center gap-2 md:pt-8">
                  <button type="submit" className="rounded-md bg-navy px-4 py-2 text-sm font-bold text-white transition hover:bg-brandBlue">
                    Save
                  </button>
                  <button
                    type="submit"
                    formAction={deleteServiceCategoryAction}
                    className="rounded-md border border-red-200 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </form>
            </div>
          ))
        ) : (
          <p className="rounded-lg border border-dashed border-slate-300 p-4 text-sm font-semibold text-slate-500">
            No categories yet. Add the first one above.
          </p>
        )}
      </div>
    </section>
  );
}

export default async function AdminServicesPage() {
  await requireAdmin();

  let services: AdminService[] = [];
  let categories: AdminServiceCategory[] = [];
  let loadError = false;

  try {
    services = await getAdminServices();
    categories = await getAdminServiceCategories();
  } catch {
    loadError = true;
  }

  return (
    <main className="min-h-screen bg-cloud py-10">
      <div className="container">
        <Link href="/admin" className="inline-flex items-center gap-2 font-bold text-brandBlue">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
        <h1 className="mt-4 text-4xl font-black text-navy">Manage Services</h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Add new services, then edit or delete saved database rows from the compact list below.
        </p>

        {!hasDatabaseConfig() || loadError ? (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5 text-amber-900">
            <p className="font-bold">Database is not reachable.</p>
            <p className="mt-1 text-sm">Check DB environment variables and server access before editing.</p>
          </div>
        ) : null}

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black text-navy">Add New Service</h2>
          <form action={createServiceAction} className="mt-5">
            <ServiceFields categories={categories} />
            <button
              type="submit"
              className="mt-5 rounded-md bg-brandBlue px-5 py-3 font-bold text-white transition hover:bg-navy"
            >
              Add Service
            </button>
          </form>
        </section>

        <CategoryManager categories={categories} />

        <AdminServicesList
          services={services}
          categories={categories}
          updateAction={updateServiceAction}
          deleteAction={deleteServiceAction}
        />
      </div>
    </main>
  );
}
