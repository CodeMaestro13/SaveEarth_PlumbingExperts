import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mx-auto mb-10 max-w-3xl",
        align === "center" ? "text-center" : "mx-0 text-left",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-aqua">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold text-navy md:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
