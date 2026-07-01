"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/site";

type GalleryFilterProps = {
  categories: string[];
  projects: Project[];
};

export function GalleryFilter({ categories, projects: allProjects }: GalleryFilterProps) {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const projects = useMemo(
    () =>
      active === "All"
        ? allProjects
        : allProjects.filter((project) => project.category === active),
    [active, allProjects]
  );

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={cn(
              "rounded-md border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition focus-ring",
              active === category
                ? "border-brandBlue bg-brandBlue text-white"
                : "bg-white hover:border-brandBlue"
            )}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <button
            key={project.title}
            onClick={() => setSelected(project)}
            className="group overflow-hidden rounded-lg border border-slate-200 bg-white text-left shadow-soft focus-ring"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-navy/0 transition group-hover:bg-navy/[0.28]" />
            </div>
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brandBlue">
                {project.category}
              </p>
              <h3 className="mt-2 text-lg font-bold text-navy">{project.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{project.location}</p>
            </div>
          </button>
        ))}
      </div>

      {selected ? (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-navy/85 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-4xl overflow-hidden rounded-lg bg-white">
            <Button
              size="icon"
              variant="white"
              className="absolute right-3 top-3 z-10"
              onClick={() => setSelected(null)}
              aria-label="Close image preview"
            >
              <X className="h-5 w-5" />
            </Button>
            <div className="relative aspect-[16/10]">
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brandBlue">
                {selected.category}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-navy">{selected.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{selected.description}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
