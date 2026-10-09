/**
 * Greenhouse pane grid — subtle structural overlay.
 */
export default function GreenhouseGrid({
  className = "",
  id = "greenhouse-grid",
  cell = 48,
  stroke = "var(--celadon)",
  opacity = 0.22,
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
          width={cell}
          height={cell}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${cell} 0 L 0 0 0 ${cell}`}
            fill="none"
            stroke={stroke}
            strokeWidth="0.75"
            opacity={opacity}
          />
          <circle
            cx={cell / 2}
            cy={cell / 2}
            r="1.25"
            fill={stroke}
            opacity={opacity * 0.6}
          />
        </pattern>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.35" />
          <stop offset="45%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <rect width="100%" height="100%" fill={`url(#${id}-fade)`} />
    </svg>
  );
}
