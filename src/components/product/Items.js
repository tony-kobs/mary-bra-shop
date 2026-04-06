import React from "react";
import Item from "./Item";

export default function Items({ items = [], onShowItem }) {
  if (!items.length) {
    return (
      <div className="items-empty" id="items-section">
        <p>Нічого не знайдено</p>
        <span>Спробуй змінити пошук або категорію</span>
      </div>
    );
  }

  return (
    <div className="items-wrapper" id="items-section">
      {items.map((item) => (
        <Item key={item.id} item={item} onShowItem={onShowItem} />
      ))}
    </div>
  );
}
