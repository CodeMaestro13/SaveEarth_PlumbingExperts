import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminServicesList } from "@/components/admin-crud-lists";
import { CategorySelectField } from "@/components/category-select-field";
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
      <CategorySelectField
        categories={categories}
        createCategoryAction={createServiceCategoryAction}
        updateCategoryAction={updateServiceCategoryAction}
        deleteCategoryAction={deleteServiceCategoryAction}
        name="category"
        label="Category"
      />
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
  return null;
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

        <AdminServicesList
          services={services}
          categories={categories}
          updateAction={updateServiceAction}
          deleteAction={deleteServiceAction}
          createCategoryAction={createServiceCategoryAction}
          updateCategoryAction={updateServiceCategoryAction}
          deleteCategoryAction={deleteServiceCategoryAction}
        />
      </div>
    </main>
  );
}
