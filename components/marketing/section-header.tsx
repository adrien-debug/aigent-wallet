import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col max-w-3xl",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? <p className="text-sm font-medium text-primary">{eyebrow}</p> : null}
      <h2 className="mt-4 text-balance text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 text-pretty text-lg text-white/60 sm:text-xl">
          {description}
        </p>
      ) : null}
    </div>
  );
}
