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
      {/* top-to-bottom fade: transparent → page background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/20 to-background" />
      {/* subtle side vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
    </div>
  );
}
