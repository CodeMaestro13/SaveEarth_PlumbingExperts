import Link from "next/link";
import { Images, LogOut, Wrench } from "lucide-react";
import { logoutAdminAction } from "@/lib/admin-actions";
import { requireAdmin } from "@/lib/admin-auth";
import { hasDatabaseConfig } from "@/lib/db";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const cards = [
    {
      title: "Services",
      description: "Add, edit, hide, delete, and reorder services.",
      href: "/admin/services",
      icon: Wrench
    },
    {
      title: "Gallery",
      description: "Manage project photos, categories, locations, and descriptions.",
      href: "/admin/gallery",
      icon: Images
    }
  ];

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

        {!hasDatabaseConfig() ? (
          <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-5 text-amber-900">
            <p className="font-bold">Database is not configured.</p>
            <p className="mt-1 text-sm">
              Add DB and admin environment variables before using the admin content forms.
            </p>
          </div>
        ) : null}

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-lg border border-slate-200 bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:border-brandBlue"
            >
              <card.icon className="h-8 w-8 text-brandBlue" />
              <h2 className="mt-5 text-2xl font-black text-navy">{card.title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
