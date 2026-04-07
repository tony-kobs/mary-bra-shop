import React, { useMemo } from "react";
import { categoriesData } from "../../data/categories";

function getUniqueBrands(items) {
  return [...new Set(items.map((item) => item.brand).filter(Boolean))].sort();
}

function getUniqueColors(items) {
  const colorMap = new Map();

  items.forEach((item) => {
    Object.entries(item.colors || {}).forEach(([key, value]) => {
      if (!colorMap.has(key)) {
        colorMap.set(key, {
          key,
          label: value?.label || key,
          hex: value?.hex || "#d9d9d9",
        });
      }
    });
  });

  return Array.from(colorMap.values()).sort((a, b) =>
    a.label.localeCompare(b.label, "uk"),
  );
}

function getUniqueSizes(items) {
  return [
    ...new Set(
      items.flatMap((item) =>
        Array.isArray(item.sizes)
          ? item.sizes.map((size) => size.value).filter(Boolean)
          : [],
      ),
    ),
  ];
}

export default function FilterProduct({
  items = [],
  filters,
  onFilterChange,
  onResetFilters,
}) {
  const brands = useMemo(() => getUniqueBrands(items), [items]);
  const colors = useMemo(() => getUniqueColors(items), [items]);
  const sizes = useMemo(() => getUniqueSizes(items), [items]);

  const subcategories = useMemo(() => {
    const currentCategory = categoriesData.find(
      (category) => category.key === filters.category,
    );

    if (!currentCategory?.subcategories?.length) return [];

    return currentCategory.subcategories.filter(
      (subcategory) => !subcategory.key.startsWith("all-"),
    );
  }, [filters.category]);

  const hasActiveFilters =
    filters.brand !== "all" ||
    filters.category !== "all" ||
    filters.subcategory !== "all" ||
    filters.color !== "all" ||
    filters.size !== "all";

  const handleSelectChange = (field, value) => {
    onFilterChange?.(field, value);
  };

  return (
    <aside className="filter-sidebar-static" aria-label="Фільтр товарів">
      <div className="filter-sidebar-static__header">
        <span className="filter-sidebar-static__label">MaryBra Selection</span>
        <h3 className="filter-sidebar-static__title">Фільтр</h3>
      </div>

      <div className="filter-sidebar-static__body">
        <div className="filter-group">
          <label className="filter-group__label" htmlFor="filter-brand">
            Бренд
          </label>
          <select
            id="filter-brand"
            className="filter-group__select"
            value={filters.brand}
            onChange={(event) =>
              handleSelectChange("brand", event.target.value)
            }
          >
            <option value="all">Усі бренди</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-group__label" htmlFor="filter-category">
            Категорія
          </label>
          <select
            id="filter-category"
            className="filter-group__select"
            value={filters.category}
            onChange={(event) =>
              handleSelectChange("category", event.target.value)
            }
          >
            <option value="all">Усі категорії</option>
            {categoriesData
              .filter((category) => category.key !== "all")
              .map((category) => (
                <option key={category.key} value={category.key}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        {!!subcategories.length && (
          <div className="filter-group">
            <label className="filter-group__label" htmlFor="filter-subcategory">
              Підкатегорія
            </label>
            <select
              id="filter-subcategory"
              className="filter-group__select"
              value={filters.subcategory}
              onChange={(event) =>
                handleSelectChange("subcategory", event.target.value)
              }
            >
              <option value="all">Усі підкатегорії</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory.key} value={subcategory.key}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="filter-group">
          <span className="filter-group__label">Колір</span>
          <div className="filter-color-grid">
            <button
              type="button"
              className={`filter-chip ${filters.color === "all" ? "active" : ""}`}
              onClick={() => handleSelectChange("color", "all")}
            >
              Усі
            </button>

            {colors.map((color) => (
              <button
                key={color.key}
                type="button"
                className={`filter-color-chip ${
                  filters.color === color.key ? "active" : ""
                }`}
                onClick={() => handleSelectChange("color", color.key)}
              >
                <span
                  className="filter-color-chip__dot"
                  style={{ backgroundColor: color.hex }}
                />
                <span>{color.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-group__label">Розмір</span>
          <div className="filter-size-grid">
            <button
              type="button"
              className={`filter-chip ${filters.size === "all" ? "active" : ""}`}
              onClick={() => handleSelectChange("size", "all")}
            >
              Усі
            </button>

            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                className={`filter-chip ${
                  filters.size === size ? "active" : ""
                }`}
                onClick={() => handleSelectChange("size", size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="filter-sidebar-static__footer">
        <button
          type="button"
          className={`filter-reset-btn ${hasActiveFilters ? "active" : ""}`}
          onClick={onResetFilters}
        >
          Скинути фільтри
        </button>
      </div>
    </aside>
  );
}
