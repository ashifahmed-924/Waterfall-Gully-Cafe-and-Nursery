"use client";

import MenuRow from "./MenuRow";

/**
 * @param {{ prefix: string, items: Array<{ name: string, description?: string, status?: string }> }} props
 */
export default function MenuGroup({ prefix, items }) {
  return (
    <ul role="list" className="divide-y divide-transparent">
      {items.map((item, i) => {
        const num = String(i + 1).padStart(2, "0");
        return (
          <MenuRow
            key={`${prefix}-${item.name}`}
            index={`${prefix}${num}`}
            name={item.name}
            description={item.description}
            status={item.status ?? "ASK IN CAFE"}
          />
        );
      })}
    </ul>
  );
}
