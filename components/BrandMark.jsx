import Link from "next/link";

/**
 * Wordmark — soft Fraunces display for garden + cafe identity.
 */
export default function BrandMark({
  href = "#home",
  className = "",
  compact = false,
  asHeading = false,
  light = false,
}) {
  const inner = (
    <span
      className={`font-display font-medium tracking-tight ${
        light ? "text-chalk" : "text-juniper-dark"
      } ${compact ? "text-[0.95rem] leading-tight md:text-base" : "text-lg leading-none md:text-xl"}`}
    >
      <span className="inline">Waterfall</span>{" "}
      <span className={light ? "text-pale-celadon" : "text-juniper"}>Gully</span>
      {!compact && (
        <span className="sr-only"> Cafe and Nursery, Rosebud</span>
      )}
    </span>
  );

  const shared =
    "inline-flex items-center no-underline transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-safflower rounded-sm";

  if (asHeading) {
    return (
      <h1 className={`m-0 ${className}`}>
        <Link href={href} className={shared} data-cursor="VIEW">
          {inner}
        </Link>
      </h1>
    );
  }

  return (
    <Link
      href={href}
      className={`${shared} ${className}`}
      aria-label="Waterfall Gully Cafe and Nursery — home"
      data-cursor="VIEW"
    >
      {inner}
    </Link>
  );
}
