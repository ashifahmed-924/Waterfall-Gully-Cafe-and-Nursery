/**
 * Concentric terracotta pot rim rings — decorative SVG pattern.
 */
export default function PotRings({
  className = "",
  id = "pot-rings",
  stroke = "var(--clay-rose)",
  opacity = 0.35,
}) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={id}
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="60"
            cy="60"
            r="48"
            fill="none"
            stroke={stroke}
            strokeWidth="0.75"
            opacity={opacity}
          />
          <circle
            cx="60"
            cy="60"
            r="36"
            fill="none"
            stroke={stroke}
            strokeWidth="0.5"
            opacity={opacity * 0.7}
          />
          <circle
            cx="60"
            cy="60"
            r="24"
            fill="none"
            stroke={stroke}
            strokeWidth="0.5"
            opacity={opacity * 0.5}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
