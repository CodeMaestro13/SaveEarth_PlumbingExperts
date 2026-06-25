import { stats, trustItems } from "@/data/site";
import { MotionReveal } from "@/components/motion-reveal";

export function StatsSection() {
  return (
    <section className="bg-white py-10">
      <div className="container grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <MotionReveal className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-2">
          {stats.map((stat) => (
            <div key={stat.label} className="border-l-4 border-brandBlue bg-cloud p-5">
              <p className="text-3xl font-black text-navy">{stat.value}</p>
              <p className="mt-1 text-sm font-semibold text-slate-600">{stat.label}</p>
            </div>
          ))}
        </MotionReveal>
        <MotionReveal delay={0.1} className="grid gap-4 sm:grid-cols-2">
          {trustItems.map((item) => (
            <div key={item.title} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-brandBlue">
                <item.icon className="h-5 w-5" />
              </span>
              <p className="font-bold text-navy">{item.title}</p>
            </div>
          ))}
        </MotionReveal>
      </div>
    </section>
  );
}
