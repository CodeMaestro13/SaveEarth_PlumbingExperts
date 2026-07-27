import Link from "next/link";
import { ArrowLeft, ShieldCheck, Trash2 } from "lucide-react";
import {
  createAdminAction,
  deleteAdminAction,
  updateAdminAction
} from "@/lib/admin-actions";
import { requireAdmin } from "@/lib/admin-auth";
import { backendRequest } from "@/lib/backend-api";

type AdminAccount = {
  id: number;
  username: string;
  displayName?: string;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
};

const inputClass =
  "mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-brandBlue";
const labelClass = "block text-sm font-bold text-navy";

export default async function AdminAccountsPage() {
  await requireAdmin();
  const data = await backendRequest<{ admins: AdminAccount[] }>("/admins", {}, true);

  return (
    <main className="min-h-screen bg-cloud py-10">
      <div className="container max-w-5xl">
        <Link href="/admin" className="inline-flex items-center gap-2 font-bold text-brandBlue">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        <div className="mt-4 flex items-center gap-3">
          <ShieldCheck className="h-9 w-9 text-brandBlue" />
          <div>
            <h1 className="text-4xl font-black text-navy">Manage Administrators</h1>
            <p className="mt-2 text-slate-600">
              Add accounts, reset passwords, or control access to the admin panel.
            </p>
          </div>
        </div>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black text-navy">Add New Administrator</h2>
          <form action={createAdminAction} className="mt-5 grid gap-4 md:grid-cols-2">
            <label className={labelClass}>
              Display Name
              <input name="displayName" className={inputClass} />
            </label>
            <label className={labelClass}>
              Username
              <input name="username" required minLength={3} className={inputClass} />
            </label>
            <label className={labelClass}>
              Password
              <input name="password" type="password" required minLength={8} className={inputClass} />
            </label>
            <label className="mt-8 flex items-center gap-2 text-sm font-bold text-navy">
              <input name="isActive" type="checkbox" defaultChecked />
              Active account
            </label>
            <div className="md:col-span-2">
              <button type="submit" className="rounded-md bg-brandBlue px-5 py-3 font-bold text-white hover:bg-navy">
                Add Administrator
              </button>
            </div>
          </form>
        </section>

        <section className="mt-8 space-y-4">
          {data.admins.map((admin) => (
            <div key={admin.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
              <form action={updateAdminAction} className="grid gap-4 md:grid-cols-2">
                <input type="hidden" name="id" value={admin.id} />
                <label className={labelClass}>
                  Display Name
                  <input name="displayName" defaultValue={admin.displayName || ""} className={inputClass} />
                </label>
                <label className={labelClass}>
                  Username
                  <input name="username" required minLength={3} defaultValue={admin.username} className={inputClass} />
                </label>
                <label className={labelClass}>
                  New Password
                  <input
                    name="password"
                    type="password"
                    minLength={8}
                    placeholder="Leave blank to keep current password"
                    className={inputClass}
                  />
                </label>
                <label className="mt-8 flex items-center gap-2 text-sm font-bold text-navy">
                  <input name="isActive" type="checkbox" defaultChecked={admin.isActive} />
                  Active account
                </label>
                <div className="flex flex-wrap items-center justify-between gap-3 md:col-span-2">
                  <p className="text-xs text-slate-500">
                    Last login: {admin.lastLoginAt || "Never"}
                  </p>
                  <button type="submit" className="rounded-md bg-brandBlue px-4 py-2 font-bold text-white hover:bg-navy">
                    Save Changes
                  </button>
                </div>
              </form>
              <form action={deleteAdminAction} className="mt-3 border-t border-slate-200 pt-3">
                <input type="hidden" name="id" value={admin.id} />
                <button type="submit" className="inline-flex items-center gap-2 text-sm font-bold text-red-700">
                  <Trash2 className="h-4 w-4" />
                  Delete Administrator
                </button>
              </form>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
