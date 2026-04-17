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
        "flex flex-col max-w-4xl",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-base font-medium text-white/60">{eyebrow}</p>
      ) : null}
      <h2 className="mt-4 text-balance text-5xl font-medium tracking-tighter text-white sm:text-6xl lg:text-7xl lg:leading-[1.05]">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 max-w-2xl text-pretty text-xl text-white/50 sm:text-2xl">
          {description}
        </p>
      ) : null}
    </div>
  );
}
