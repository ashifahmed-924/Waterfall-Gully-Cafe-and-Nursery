/**
 * Subtle botanical dot-and-leaf repeat for section backgrounds.
 */
export default function GardenPattern({
  className = "",
  id = "garden-pattern",
  fill = "var(--juniper)",
  opacity = 0.08,
}) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id={id}
          width="64"
          height="64"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="8" cy="8" r="1.5" fill={fill} opacity={opacity} />
          <circle cx="40" cy="24" r="1" fill={fill} opacity={opacity * 0.8} />
          <path
            d="M52 48c-6 2-10 8-8 14 6-2 12-8 8-14z"
            fill={fill}
            opacity={opacity * 1.2}
          />
          <path
            d="M16 44c4-6 12-8 18-4-6 4-10 12-18 4z"
            fill={fill}
            opacity={opacity}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
