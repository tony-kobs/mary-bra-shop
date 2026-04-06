import React from "react";
import Item from "./Item";

export default function Items({ items, onAdd, onShowItem }) {
  return (
    <div className="items-wrapper">
      {items.map((item) => (
        <Item key={item.id} item={item} onAdd={onAdd} onShowItem={onShowItem} />
      ))}
    </div>
  );
}
