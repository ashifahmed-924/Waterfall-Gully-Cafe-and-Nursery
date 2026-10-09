/**
 * Decorative leaf vein SVG pattern — use as background or inline accent.
 */
export default function LeafVein({
  className = "",
  id = "leaf-vein-pattern",
  opacity = 0.12,
  color = "var(--juniper)",
}) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id={id}
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-8)"
        >
          <path
            d="M60 8 C45 35, 28 55, 60 112 C92 55, 75 35, 60 8 Z"
            fill="none"
            stroke={color}
            strokeWidth="0.75"
            opacity={opacity}
          />
          <path
            d="M60 18 L60 100 M60 40 L42 58 M60 52 L78 68 M60 68 L48 82"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            opacity={opacity * 0.85}
            strokeLinecap="round"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
