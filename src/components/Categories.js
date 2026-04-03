import React, { Component } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

export class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCategory: null,
      categories: [
        { key: "all", name: "Весь Товар", subcategories: [] },
        {
          key: "bras",
          name: "Бюстгальтери",
          subcategories: [
            { key: "bras1", name: "Тонкий паралон" },
            { key: "bras2", name: "Коректор" },
            { key: "bras3", name: "Пушап" },
            { key: "bras4", name: "Без паралону" },
            { key: "bras5", name: "Без кісточок" },
            { key: "bras6", name: "Балконет" },
            { key: "all-bras", name: "Дивитись усі" },
          ],
        },
        {
          key: "pants",
          name: "Трусики",
          subcategories: [
            { key: "pants1", name: "Сліпи" },
            { key: "pants2", name: "Бріфи" },
            { key: "pants3", name: "Висока посадка" },
            { key: "pants4", name: "Стрінги" },
            { key: "pants5", name: "Бразилійки" },
            { key: "all-pants", name: "Дивитись усі" },
          ],
        },
        {
          key: "sets",
          name: "Комплекти",
          subcategories: [
            { key: "sets1", name: "Чашка В" },
            { key: "sets2", name: "Чашка С" },
            { key: "sets3", name: "Чашка D" },
            { key: "sets4", name: "Чашка Е" },
            { key: "all-sets", name: "Дивитись усі" },
          ],
        },
        { key: "tops", name: "Топи", subcategories: [] },
        { key: "weight", name: "Утяжка", subcategories: [] },
        { key: "swimwear", name: "Купальники", subcategories: [] },
        { key: "nightwear", name: "Піжами", subcategories: [] },
        { key: "nike", name: "Акція", subcategories: [] },
      ],
    };
    this.overlayRef = React.createRef();
  }

  handleCategoryClick = (cat) => {
    if (!cat.subcategories || cat.subcategories.length === 0) {
      this.setState({ openCategory: null });
      this.props.onChoose(cat.key);
      return;
    }
    this.setState((prev) => ({
      openCategory: prev.openCategory === cat.key ? null : cat.key,
    }));
  };

  handleSubcategoryClick = (categoryKey, subcategoryKey) => {
    this.setState({ openCategory: null });
    this.props.onChoose(categoryKey, subcategoryKey);
  };

  handleOverlayClick = (e) => {
    if (e.target === this.overlayRef.current) {
      this.setState({ openCategory: null });
    }
  };

  render() {
    return (
      <div className="categories">
        {this.state.categories.map((cat) => {
          const isOpen = this.state.openCategory === cat.key;
          return (
            <div key={cat.key} className="category-wrapper">
              <div
                className={`category ${isOpen ? "active" : ""}`}
                onClick={() => this.handleCategoryClick(cat)}
              >
                <span>{cat.name}</span>
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <span className="category-arrow">
                    {isOpen ? <FaAngleUp /> : <FaAngleDown />}
                  </span>
                )}
              </div>

              {isOpen && cat.subcategories.length > 0 && (
                <div className="subcategories-dropdown">
                  {cat.subcategories.map((sub) => (
                    <div
                      key={sub.key}
                      className="subcategory-item"
                      onClick={() =>
                        this.handleSubcategoryClick(cat.key, sub.key)
                      }
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
}

export default Categories;
