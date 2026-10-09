"use client";

export default function MenuRow({
  index,
  name,
  description,
  status = "ASK IN CAFE",
}) {
  return (
    <li className="min-h-[60px] border-b border-juniper/12 py-3">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-wisteria">
          {index}
        </span>
        <span className="flex-1 font-display text-lg text-juniper-dark">
          {name}
        </span>
        <span className="font-utility text-[0.6875rem] font-semibold uppercase tracking-wide text-deep-clay">
          {status}
        </span>
      </div>
      {description ? (
        <p className="mt-1 pl-[2.75rem] font-body text-sm text-basalt/75 md:pl-[3.25rem]">
          {description}
        </p>
      ) : null}
      <div
        className="mt-2 h-px w-full bg-gradient-to-r from-celadon/80 via-wisteria/40 to-transparent"
        aria-hidden="true"
      />
    </li>
  );
}
