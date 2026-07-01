import Link from "next/link";
import Image from "next/image";
import { Images, LogOut, Plus, Wrench } from "lucide-react";
import { logoutAdminAction } from "@/lib/admin-actions";
import { requireAdmin } from "@/lib/admin-auth";
import {
  getAdminProjects,
  getAdminServices,
  type AdminProject,
  type AdminService
} from "@/lib/content";
import { hasDatabaseConfig } from "@/lib/db";

export default async function AdminDashboardPage() {
  await requireAdmin();

  let services: AdminService[] = [];
  let projects: AdminProject[] = [];
  let loadError = false;

  try {
    [services, projects] = await Promise.all([getAdminServices(), getAdminProjects()]);
  } catch {
    loadError = true;
  }

  return (
    <main className="min-h-screen bg-cloud py-10">
      <div className="container">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brandBlue">
              Admin Panel
            </p>
            <h1 className="mt-2 text-4xl font-black text-navy">Website content</h1>
          </div>
          <form action={logoutAdminAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 font-bold text-navy transition hover:border-brandBlue"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </form>
        </div>

        {!hasDatabaseConfig() || loadError ? (
          <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-5 text-amber-900">
            <p className="font-bold">Database is not reachable.</p>
            <p className="mt-1 text-sm">
              Check DB environment variables and server access before editing content.
            </p>
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-brandBlue">
                  <Wrench className="h-5 w-5" />
                  <p className="text-sm font-bold uppercase tracking-[0.16em]">Services</p>
                </div>
                <h2 className="mt-2 text-2xl font-black text-navy">{services.length} added</h2>
              </div>
              <Link
                href="/admin/services"
                className="inline-flex items-center gap-2 rounded-md bg-brandBlue px-4 py-2 text-sm font-bold text-white transition hover:bg-navy"
              >
                <Plus className="h-4 w-4" />
                Manage Services
              </Link>
            </div>

            <div className="mt-5 overflow-hidden rounded-md border border-slate-200">
              {services.length ? (
                services.map((service) => (
                  <div
                    key={service.id}
                    className="grid gap-3 border-b border-slate-200 p-4 last:border-b-0 sm:grid-cols-[72px_1fr_auto] sm:items-center"
                  >
                    <div className="relative h-16 w-full overflow-hidden rounded-md bg-slate-100 sm:w-[72px]">
                      <Image src={service.image} alt={service.title} fill className="object-cover" sizes="72px" />
                    </div>
                    <div>
                      <p className="font-black text-navy">{service.title}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        {service.category} · {service.isActive ? "Published" : "Hidden"}
                      </p>
                    </div>
                    <Link href="/admin/services" className="text-sm font-bold text-brandBlue">
                      Edit
                    </Link>
                  </div>
                ))
              ) : (
                <p className="p-4 text-sm font-semibold text-slate-500">No services added yet.</p>
              )}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-brandBlue">
                  <Images className="h-5 w-5" />
                  <p className="text-sm font-bold uppercase tracking-[0.16em]">Gallery</p>
                </div>
                <h2 className="mt-2 text-2xl font-black text-navy">{projects.length} added</h2>
              </div>
              <Link
                href="/admin/gallery"
                className="inline-flex items-center gap-2 rounded-md bg-brandBlue px-4 py-2 text-sm font-bold text-white transition hover:bg-navy"
              >
                <Plus className="h-4 w-4" />
                Manage Gallery
              </Link>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {projects.length ? (
                projects.map((project) => (
                  <Link
                    key={project.id}
                    href="/admin/gallery"
                    className="overflow-hidden rounded-md border border-slate-200 bg-white transition hover:border-brandBlue"
                  >
                    <div className="relative aspect-[4/3] bg-slate-100">
                      <Image src={project.image} alt={project.title} fill className="object-cover" sizes="240px" />
                    </div>
                    <div className="p-3">
                      <p className="font-black text-navy">{project.title}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        {project.category} · {project.location}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="rounded-md border border-slate-200 p-4 text-sm font-semibold text-slate-500 sm:col-span-2">
                  No gallery projects added yet.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
