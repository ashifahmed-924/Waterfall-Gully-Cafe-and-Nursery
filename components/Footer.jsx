import Link from "next/link";
import { waterfallGully } from "@/data/waterfallGully";

const FOOTER_LINKS = [
  { label: "Cafe", href: "#intro" },
  { label: "Menu", href: "#menu" },
  { label: "Nursery", href: "#nursery" },
  { label: "Gift cards", href: waterfallGully.links.giftCardUrl, external: true },
  { label: "Loyalty", href: waterfallGully.links.loyaltyUrl, external: true },
  { label: "Visit", href: "#visit" },
];

const ROOT_LINE =
  "M0 24 Q80 8 160 20 T320 16 T480 28 T640 24";

function InstagramIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

function YoutubeIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="2.5"
        y="6"
        width="19"
        height="12"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5z" fill="currentColor" />
    </svg>
  );
}

function TwitterIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 3H21l-6.51 7.44L22 21h-5.898l-4.61-5.88L6.2 21H3.44l6.96-7.96L2 3h6.04l4.17 5.39L18.244 3zm-1.03 16.2h1.64L7.88 4.7H6.12l11.094 14.5z" />
    </svg>
  );
}

const SOCIALS = [
  {
    label: "Instagram",
    hrefKey: "instagram",
    Icon: InstagramIcon,
  },
  {
    label: "Facebook",
    hrefKey: "facebook",
    Icon: FacebookIcon,
  },
  {
    label: "YouTube",
    hrefKey: "youtube",
    Icon: YoutubeIcon,
  },
  {
    label: "Twitter",
    hrefKey: "twitter",
    Icon: TwitterIcon,
  },
];

export default function Footer({ className = "" }) {
  const { address, phoneDisplay, phoneTel, shortName, links, socialHubUrl } =
    waterfallGully;

  return (
    <footer
      className={`relative overflow-hidden bg-basalt text-chalk/90 ${className}`}
      role="contentinfo"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-celadon/40 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-[var(--content-max)] px-4 py-14 md:px-6 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-tight text-chalk">
              {shortName.toUpperCase()}
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.35em] text-celadon">
              Cafe + Nursery
            </p>
            <address className="mt-6 not-italic text-sm leading-relaxed text-chalk/75">
              {address.formatted}
              <br />
              <a
                href={`tel:${phoneTel}`}
                className="mt-2 inline-block text-chalk underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-safflower"
              >
                {phoneDisplay}
              </a>
            </address>

            <ul
              className="mt-7 flex flex-wrap items-center gap-2.5"
              aria-label="Social media"
            >
              {SOCIALS.map(({ label, hrefKey, Icon }) => {
                const href = links[hrefKey] || socialHubUrl;
                return (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex size-10 items-center justify-center rounded-full border border-chalk/20 text-chalk/80 transition hover:border-safflower/60 hover:bg-chalk/5 hover:text-safflower focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-safflower"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.22em]">
              {FOOTER_LINKS.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      className="text-chalk/80 transition hover:text-safflower focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-safflower"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-chalk/80 transition hover:text-safflower focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-safflower"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <svg
          className="mt-12 h-8 w-full opacity-40"
          viewBox="0 0 640 32"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={ROOT_LINE}
            fill="none"
            stroke="var(--celadon)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-chalk/50">
          © 2026 Waterfall Gully Cafe & Nursery
        </p>
      </div>
    </footer>
  );
}
