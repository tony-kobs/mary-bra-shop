import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp, FaXmark } from "react-icons/fa6";
import { categoriesData } from "../../data/categories.js";

export default function Categories({
  onChoose,
  selectedCategory,
  selectedSubcategory,
}) {
  const [openCategory, setOpenCategory] = useState(null);
  const categoriesRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target)
      ) {
        setOpenCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedCategoryData = useMemo(() => {
    return categoriesData.find((cat) => cat.key === selectedCategory) || null;
  }, [selectedCategory]);

  const selectedSubcategoryData = useMemo(() => {
    if (!selectedCategoryData || selectedSubcategory === "all") return null;

    return (
      selectedCategoryData.subcategories?.find(
        (sub) => sub.key === selectedSubcategory,
      ) || null
    );
  }, [selectedCategoryData, selectedSubcategory]);

  const handleCategoryClick = (categoryKey, hasSubcategories) => {
    if (categoryKey === "all") {
      setOpenCategory(null);
      onChoose?.("all", "all");
      return;
    }

    if (!hasSubcategories) {
      setOpenCategory((prev) => (prev === categoryKey ? null : categoryKey));
      return;
    }

    setOpenCategory((prev) => (prev === categoryKey ? null : categoryKey));
  };

  const handleSubcategoryClick = (categoryKey, subcategoryKey) => {
    onChoose?.(categoryKey, subcategoryKey);
    setOpenCategory(null);
  };

  const handleResetAll = () => {
    onChoose?.("all", "all");
    setOpenCategory(null);
  };

  const handleClearCategory = () => {
    onChoose?.("all", "all");
    setOpenCategory(null);
  };

  const handleClearSubcategory = () => {
    if (selectedCategory && selectedCategory !== "all") {
      onChoose?.(selectedCategory, "all");
    }
    setOpenCategory(null);
  };

  const hasSelectedFilters =
    selectedCategory !== "all" || selectedSubcategory !== "all";

  return (
    <section className="catalog-filters">
      <div className="catalog-filters__top">
        <div className="catalog-filters__heading">
          <span className="catalog-filters__label">MaryBra Shop</span>
          <h2 className="catalog-filters__title">Категорії білизни</h2>
        </div>
      </div>

      <div className="categories" ref={categoriesRef}>
        {categoriesData.map((cat) => {
          const isOpen = openCategory === cat.key;
          const isActiveCategory = selectedCategory === cat.key;
          const hasSubcategories = Array.isArray(cat.subcategories)
            ? cat.subcategories.length > 0
            : false;
          const showArrow = cat.key !== "all";

          return (
            <div
              key={cat.key}
              className={`category-wrapper ${isActiveCategory ? "active" : ""}`}
            >
              <button
                type="button"
                className={`category ${isActiveCategory ? "active" : ""}`}
                onClick={() => handleCategoryClick(cat.key, hasSubcategories)}
              >
                <span>{cat.name}</span>

                {showArrow && (
                  <span className="category-arrow">
                    {isOpen ? <FaAngleUp /> : <FaAngleDown />}
                  </span>
                )}
              </button>

              {isOpen && hasSubcategories && (
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

      {hasSelectedFilters && (
        <div className="catalog-current-state">
          <button
            type="button"
            className="catalog-current-state__reset"
            onClick={handleResetAll}
          >
            Скинути все
          </button>

          {selectedCategoryData && selectedCategory !== "all" && (
            <span className="catalog-current-state__item">
              Категорія: <strong>{selectedCategoryData.name}</strong>
              <button
                type="button"
                className="catalog-current-state__clear"
                onClick={handleClearCategory}
                aria-label="Скинути категорію"
              >
                <FaXmark />
              </button>
            </span>
          )}

          {selectedSubcategoryData && (
            <span className="catalog-current-state__item">
              Підкатегорія: <strong>{selectedSubcategoryData.name}</strong>
              <button
                type="button"
                className="catalog-current-state__clear"
                onClick={handleClearSubcategory}
                aria-label="Скинути підкатегорію"
              >
                <FaXmark />
              </button>
            </span>
          )}
        </div>
      )}
    </section>
  );
}
