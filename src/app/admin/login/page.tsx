import { redirect } from "next/navigation";
import { loginAdminAction } from "@/lib/admin-actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const params = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-cloud px-4 py-12">
      <form
        action={loginAdminAction}
        className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-premium"
      >
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-brandBlue">
          Admin Login
        </p>
        <h1 className="mt-3 text-3xl font-black text-navy">Manage website content</h1>
        {params?.error ? (
          <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            Invalid username or password.
          </p>
        ) : null}
        <label className="mt-6 block text-sm font-bold text-navy">
          Username
          <input
            name="username"
            type="text"
            required
            className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-slate-800 outline-none focus:border-brandBlue"
          />
        </label>
        <label className="mt-4 block text-sm font-bold text-navy">
          Password
          <input
            name="password"
            type="password"
            required
            className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-slate-800 outline-none focus:border-brandBlue"
          />
        </label>
        <button
          type="submit"
          className="mt-6 w-full rounded-md bg-brandBlue px-5 py-3 font-bold text-white transition hover:bg-navy"
        >
          Sign In
        </button>
      </form>
    </main>
  );
}
