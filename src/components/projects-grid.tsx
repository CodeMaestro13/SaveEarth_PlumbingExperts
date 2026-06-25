import Image from "next/image";
import { MapPin } from "lucide-react";
import { MotionReveal } from "@/components/motion-reveal";
import { featuredProjects } from "@/data/site";

export function ProjectsGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {featuredProjects.map((project, index) => (
        <MotionReveal key={project.title} delay={index * 0.06}>
          <article className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-aqua">
                {project.category}
              </p>
              <h3 className="mt-2 text-xl font-bold text-navy">{project.title}</h3>
              <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-500">
                <MapPin className="h-4 w-4" />
                {project.location}
              </p>
              <p className="mt-4 leading-7 text-slate-600">{project.description}</p>
            </div>
          </article>
        </MotionReveal>
      ))}
    </div>
  );
}
