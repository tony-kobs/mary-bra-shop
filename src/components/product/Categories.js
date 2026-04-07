import React, { useMemo, useState } from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaMagnifyingGlass,
  FaXmark,
} from "react-icons/fa6";
import { categoriesData } from "../../data/categories.js";

export default function Categories({
  onChoose,
  onCatalogSearch,
  onResetFilters,
  selectedCategory,
  selectedSubcategory,
  catalogSearchQuery,
}) {
  const [openCategory, setOpenCategory] = useState(null);

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedSubcategory !== "all" ||
    catalogSearchQuery.trim() !== "";

  const selectedCategoryData = useMemo(() => {
    return categoriesData.find((cat) => cat.key === selectedCategory) || null;
  }, [selectedCategory]);

  const selectedSubcategoryName = useMemo(() => {
    if (!selectedCategoryData || selectedSubcategory === "all") return "";

    const foundSubcategory = selectedCategoryData.subcategories?.find(
      (sub) => sub.key === selectedSubcategory,
    );

    return foundSubcategory?.name || "";
  }, [selectedCategoryData, selectedSubcategory]);

  const handleCategoryClick = (cat) => {
    if (cat.key === "all") {
      setOpenCategory(null);
      onChoose("all", "all");
      return;
    }

    if (!cat.subcategories?.length) {
      setOpenCategory(null);
      onChoose(cat.key, "all");
      return;
    }

    setOpenCategory((prev) => (prev === cat.key ? null : cat.key));
    onChoose(cat.key, "all");
  };

  const handleSubcategoryClick = (categoryKey, subcategoryKey) => {
    onChoose(categoryKey, subcategoryKey);
  };

  const handleSearchChange = (e) => {
    onCatalogSearch(e.target.value);
  };

  return (
    <section className="catalog-filters">
      <div className="catalog-filters__top">
        <div className="catalog-filters__heading">
          <span className="catalog-filters__label">MaryBra Shop</span>
          <h2 className="catalog-filters__title">Каталог білизни</h2>
        </div>

        <div className="catalog-filters__controls">
          <div className="catalog-search">
            <FaMagnifyingGlass className="catalog-search__icon" />

            <input
              type="text"
              className="catalog-search__input"
              placeholder="Пошук у каталозі..."
              value={catalogSearchQuery}
              onChange={handleSearchChange}
            />

            {catalogSearchQuery.trim() && (
              <button
                type="button"
                className="catalog-search__clear"
                onClick={() => onCatalogSearch("")}
                aria-label="Очистити пошук у каталозі"
              >
                <FaXmark />
              </button>
            )}
          </div>

          <button
            type="button"
            className={`catalog-reset-btn ${hasActiveFilters ? "active" : ""}`}
            onClick={onResetFilters}
          >
            Скинути фільтри
          </button>
        </div>
      </div>

      <div className="categories">
        {categoriesData.map((cat) => {
          const isOpen = openCategory === cat.key;
          const isActiveCategory = selectedCategory === cat.key;

          return (
            <div
              key={cat.key}
              className={`category-wrapper ${isActiveCategory ? "active" : ""}`}
            >
              <button
                type="button"
                className={`category ${isActiveCategory ? "active" : ""}`}
                onClick={() => handleCategoryClick(cat)}
              >
                <span>{cat.name}</span>

                {cat.subcategories?.length > 0 && cat.key !== "all" && (
                  <span className="category-arrow">
                    {isOpen ? <FaAngleUp /> : <FaAngleDown />}
                  </span>
                )}
              </button>

              {isOpen && cat.subcategories?.length > 0 && (
                <div className="subcategories-dropdown">
                  {cat.subcategories.map((sub) => {
                    const isActiveSubcategory =
                      isActiveCategory && selectedSubcategory === sub.key;

                    return (
                      <button
                        type="button"
                        key={sub.key}
                        className={`subcategory-item ${
                          isActiveSubcategory ? "active" : ""
                        }`}
                        onClick={() => handleSubcategoryClick(cat.key, sub.key)}
                      >
                        {sub.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {hasActiveFilters && (
        <div className="catalog-current-state">
          {selectedCategoryData && selectedCategory !== "all" && (
            <span className="catalog-current-state__item">
              Категорія: <strong>{selectedCategoryData.name}</strong>
            </span>
          )}

          {selectedSubcategoryName && (
            <span className="catalog-current-state__item">
              Підкатегорія: <strong>{selectedSubcategoryName}</strong>
            </span>
          )}

          {catalogSearchQuery.trim() && (
            <span className="catalog-current-state__item">
              Пошук: <strong>{catalogSearchQuery}</strong>
            </span>
          )}
        </div>
      )}
    </section>
  );
}
