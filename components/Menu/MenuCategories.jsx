"use client";

const CATEGORY_PREFIX = {
  breakfast: "B",
  "light-meals": "L",
  cabinet: "C",
  drinks: "D",
};

export function getCategoryPrefix(categoryId) {
  return CATEGORY_PREFIX[categoryId] ?? "M";
}

export default function MenuCategories({
  categories,
  activeId,
  onSelect,
  listId = "menu-category-list",
}) {
  return (
    <nav aria-label="Menu categories">
      <p className="section-eyebrow mb-3">Browse</p>
      <ul
        id={listId}
        role="tablist"
        aria-orientation="horizontal"
        className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {categories.map((cat) => {
          const isActive = cat.id === activeId;
          const prefix = getCategoryPrefix(cat.id);
          return (
            <li key={cat.id} className="shrink-0 lg:shrink">
              <button
                type="button"
                role="tab"
                id={`menu-tab-${cat.id}`}
                aria-selected={isActive}
                aria-controls="menu-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => onSelect(cat.id)}
                className={`flex min-h-[56px] min-w-[9rem] items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors lg:min-w-0 lg:w-full ${
                  isActive
                    ? "border-juniper/25 bg-parchment shadow-[var(--shadow-soft)]"
                    : "border-transparent bg-transparent hover:bg-pale-celadon/50"
                }`}
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full font-utility text-xs font-semibold ${
                    isActive
                      ? "bg-juniper text-chalk"
                      : "bg-pale-celadon text-juniper-dark"
                  }`}
                  aria-hidden="true"
                >
                  {prefix}
                </span>
                <span className="font-display text-lg leading-tight text-juniper-dark">
                  {cat.title}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
