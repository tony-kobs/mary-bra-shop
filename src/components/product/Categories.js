import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { categoriesData } from "../../data/categories.js";

export default function Categories({ onChoose }) {
  const [openCategory, setOpenCategory] = useState(null);

  const handleCategoryClick = (cat) => {
    if (!cat.subcategories?.length) {
      setOpenCategory(null);
      onChoose(cat.key);
      return;
    }

    setOpenCategory((prev) => (prev === cat.key ? null : cat.key));
  };

  const handleSubcategoryClick = (categoryKey, subcategoryKey) => {
    setOpenCategory(null);
    onChoose(categoryKey, subcategoryKey);
  };

  return (
    <div className="categories">
      {categoriesData.map((cat) => {
        const isOpen = openCategory === cat.key;

        return (
          <div key={cat.key} className="category-wrapper">
            <div
              className={`category ${isOpen ? "active" : ""}`}
              onClick={() => handleCategoryClick(cat)}
            >
              <span>{cat.name}</span>

              {cat.subcategories?.length > 0 && (
                <span className="category-arrow">
                  {isOpen ? <FaAngleUp /> : <FaAngleDown />}
                </span>
              )}
            </div>

            {isOpen && cat.subcategories?.length > 0 && (
              <div className="subcategories-dropdown">
                {cat.subcategories.map((sub) => (
                  <div
                    key={sub.key}
                    className="subcategory-item"
                    onClick={() => handleSubcategoryClick(cat.key, sub.key)}
                  >
                    {sub.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
