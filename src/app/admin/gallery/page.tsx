import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  createProjectAction,
  deleteProjectAction,
  updateProjectAction
} from "@/lib/admin-actions";
import { requireAdmin } from "@/lib/admin-auth";
import { getAdminProjects, type AdminProject } from "@/lib/content";
import { hasDatabaseConfig } from "@/lib/db";

const inputClass =
  "mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-brandBlue";
const labelClass = "block text-sm font-bold text-navy";

function ProjectFields({ project }: { project?: AdminProject }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {project ? <input type="hidden" name="id" value={project.id} /> : null}
      <input type="hidden" name="imagePath" value={project?.image ?? ""} />
      <label className={labelClass}>
        Title
        <input name="title" required defaultValue={project?.title} className={inputClass} />
      </label>
      <label className={labelClass}>
        Category
        <input name="category" required defaultValue={project?.category} className={inputClass} />
      </label>
      <label className={labelClass}>
        Location
        <input name="location" required defaultValue={project?.location} className={inputClass} />
      </label>
      <label className={labelClass}>
        Sort Order
        <input
          name="sortOrder"
          type="number"
          defaultValue={project?.sortOrder ?? 0}
          className={inputClass}
        />
      </label>
      <label className={`${labelClass} md:col-span-2`}>
        Description
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={project?.description}
          className={inputClass}
        />
      </label>
      <label className={labelClass}>
        Image
        <input name="image" type="file" accept="image/*" className={inputClass} />
      </label>
      <label className="mt-8 flex items-center gap-2 text-sm font-bold text-navy">
        <input name="isActive" type="checkbox" defaultChecked={project?.isActive ?? true} />
        Publish on website
      </label>
    </div>
  );
}

export default async function AdminGalleryPage() {
  await requireAdmin();

  let projects: AdminProject[] = [];
  let loadError = false;

  try {
    projects = await getAdminProjects();
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
        <h1 className="mt-4 text-4xl font-black text-navy">Manage Gallery</h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Create gallery projects for the Gallery page. Categories are generated automatically from
          published gallery items.
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
          <h2 className="text-2xl font-black text-navy">Add New Gallery Project</h2>
          <form action={createProjectAction} className="mt-5">
            <ProjectFields />
            <button
              type="submit"
              className="mt-5 rounded-md bg-brandBlue px-5 py-3 font-bold text-white transition hover:bg-navy"
            >
              Add Project
            </button>
          </form>
        </section>

        <div className="mt-8 grid gap-6">
          {projects.map((project) => (
            <article key={project.id} className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brandBlue">
                    {project.category} / {project.location}
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-navy">{project.title}</h2>
                </div>
                <form action={deleteProjectAction}>
                  <input type="hidden" name="id" value={project.id} />
                  <button
                    type="submit"
                    className="rounded-md border border-red-200 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </form>
              </div>
              <form action={updateProjectAction}>
                <ProjectFields project={project} />
                {project.image ? (
                  <p className="mt-3 text-xs font-semibold text-slate-500">
                    Current image: {project.image}
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
