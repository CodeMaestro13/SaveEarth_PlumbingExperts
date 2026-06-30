import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  createServiceAction,
  deleteServiceAction,
  updateServiceAction
} from "@/lib/admin-actions";
import { requireAdmin } from "@/lib/admin-auth";
import { getAdminServices, type AdminService } from "@/lib/content";
import { hasDatabaseConfig } from "@/lib/db";
import { serviceIconOptions } from "@/lib/icons";

const inputClass =
  "mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-brandBlue";
const labelClass = "block text-sm font-bold text-navy";

function ServiceFields({ service }: { service?: AdminService }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {service ? <input type="hidden" name="id" value={service.id} /> : null}
      <input type="hidden" name="imagePath" value={service?.image ?? ""} />
      <label className={labelClass}>
        Title
        <input name="title" required defaultValue={service?.title} className={inputClass} />
      </label>
      <label className={labelClass}>
        Category
        <input name="category" required defaultValue={service?.category} className={inputClass} />
      </label>
      <label className={labelClass}>
        Icon
        <select name="iconKey" defaultValue={service?.iconKey ?? "wrench"} className={inputClass}>
          {serviceIconOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label className={labelClass}>
        Sort Order
        <input
          name="sortOrder"
          type="number"
          defaultValue={service?.sortOrder ?? 0}
          className={inputClass}
        />
      </label>
      <label className={`${labelClass} md:col-span-2`}>
        Description
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={service?.description}
          className={inputClass}
        />
      </label>
      <label className={`${labelClass} md:col-span-2`}>
        Features
        <textarea
          name="features"
          rows={4}
          placeholder="Add one feature per line"
          defaultValue={service?.features.join("\n")}
          className={inputClass}
        />
      </label>
      <label className={labelClass}>
        Image
        <input name="image" type="file" accept="image/*" className={inputClass} />
      </label>
      <label className="mt-8 flex items-center gap-2 text-sm font-bold text-navy">
        <input name="isActive" type="checkbox" defaultChecked={service?.isActive ?? true} />
        Publish on website
      </label>
    </div>
  );
}

export default async function AdminServicesPage() {
  await requireAdmin();

  let services: AdminService[] = [];
  let loadError = false;

  try {
    services = await getAdminServices();
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
          Create services for the homepage and Services page. Empty database content falls back to
          the static website data on the public site.
        </p>

        {!hasDatabaseConfig() || loadError ? (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5 text-amber-900">
            <p className="font-bold">Database is not reachable.</p>
            <p className="mt-1 text-sm">
              Configure the DB environment variables and whitelist the server IP before editing.
            </p>
          </div>
        ) : null}

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black text-navy">Add New Service</h2>
          <form action={createServiceAction} className="mt-5">
            <ServiceFields />
            <button
              type="submit"
              className="mt-5 rounded-md bg-brandBlue px-5 py-3 font-bold text-white transition hover:bg-navy"
            >
              Add Service
            </button>
          </form>
        </section>

        <div className="mt-8 grid gap-6">
          {services.map((service) => (
            <article key={service.id} className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brandBlue">
                    {service.category}
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-navy">{service.title}</h2>
                </div>
                <form action={deleteServiceAction}>
                  <input type="hidden" name="id" value={service.id} />
                  <button
                    type="submit"
                    className="rounded-md border border-red-200 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </form>
              </div>
              <form action={updateServiceAction}>
                <ServiceFields service={service} />
                {service.image ? (
                  <p className="mt-3 text-xs font-semibold text-slate-500">
                    Current image: {service.image}
                  </p>
                ) : null}
                <button
                  type="submit"
                  className="mt-5 rounded-md bg-navy px-5 py-3 font-bold text-white transition hover:bg-brandBlue"
                >
                  Save Changes
                </button>
              </form>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
