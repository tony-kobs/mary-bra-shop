import React, { useEffect, useMemo, useState } from "react";
import Item from "./Item";

const PAGINATION_THRESHOLD = 100;
const ITEMS_PER_PAGE = 16;

export default function Items({ items = [], onShowItem }) {
  const [currentPage, setCurrentPage] = useState(1);

  const isPaginationEnabled = items.length > PAGINATION_THRESHOLD;
  const totalPages = isPaginationEnabled
    ? Math.ceil(items.length / ITEMS_PER_PAGE)
    : 1;

  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  const visibleItems = useMemo(() => {
    if (!isPaginationEnabled) return items;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return items.slice(startIndex, endIndex);
  }, [items, currentPage, isPaginationEnabled]);

  const paginationNumbers = useMemo(() => {
    if (!isPaginationEnabled) return [];

    const pages = [];

    if (totalPages <= 7) {
      for (let page = 1; page <= totalPages; page += 1) {
        pages.push(page);
      }
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let page = start; page <= end; page += 1) {
      pages.push(page);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages, isPaginationEnabled]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    setCurrentPage(page);

    const section = document.getElementById("items-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!items.length) {
    return (
      <div className="items-empty" id="items-section">
        <p>Нічого не знайдено</p>
        <span>Спробуй змінити пошук або категорію</span>
      </div>
    );
  }

  return (
    <section className="catalog-products-section" id="items-section">
      <div className="catalog-products-top">
        <div className="catalog-products-top__info">
          <span className="catalog-products-top__label">MaryBra Selection</span>
          <h2 className="catalog-products-top__title">Вибрані моделі</h2>
        </div>

        <div className="catalog-products-top__meta">
          <span className="catalog-products-top__count">
            Всього товарів: <strong>{items.length}</strong>
          </span>

          {isPaginationEnabled && (
            <span className="catalog-products-top__count">
              Сторінка <strong>{currentPage}</strong> з{" "}
              <strong>{totalPages}</strong>
            </span>
          )}
        </div>
      </div>

      <div className="items-wrapper">
        {visibleItems.map((item) => (
          <Item key={item.id} item={item} onShowItem={onShowItem} />
        ))}
      </div>

      {isPaginationEnabled && (
        <div className="catalog-pagination">
          <button
            type="button"
            className="catalog-pagination__nav"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Назад
          </button>

          <div className="catalog-pagination__pages">
            {paginationNumbers.map((page, index) =>
              page === "..." ? (
                <span
                  key={`dots-${index}`}
                  className="catalog-pagination__dots"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  type="button"
                  className={`catalog-pagination__page ${
                    currentPage === page ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ),
            )}
          </div>

          <button
            type="button"
            className="catalog-pagination__nav"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Далі
          </button>
        </div>
      )}
    </section>
  );
}
