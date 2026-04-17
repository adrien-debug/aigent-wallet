import Image from "next/image";

interface PageHeroProps {
  src: string;
  alt: string;
  /** Tailwind max-height class — defaults to max-h-[420px] */
  maxHeight?: string;
}

/**
 * Full-width cinematic hero banner for marketing pages.
 * Fades into the page background at the bottom so content below
 * reads cleanly without a hard edge.
 */
export function PageHero({ src, alt, maxHeight = "max-h-[420px]" }: PageHeroProps) {
  return (
    <div className={`relative w-full overflow-hidden ${maxHeight}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
        quality={90}
      />
      {/* Light bottom fade only — no side vignette (was muddying the page). */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}
