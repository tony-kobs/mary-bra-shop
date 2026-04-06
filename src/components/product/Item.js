import React from "react";

export default function Item({ item, onAdd, onShowItem }) {
  const { image, title, price } = item;

  return (
    <div className="item" id="items-section">
      <div className="item-image-wrap">
        <img
          src={`${process.env.PUBLIC_URL}/product-img/${image}`}
          alt={title}
          className="item-image"
          onClick={() => onShowItem(item)}
        />
      </div>

      <div className="item-info">
        <h3 className="item-title">{title}</h3>

        <div className="item-bottom">
          <span className="item-price">{price.toFixed(2)} ₴</span>

          <button className="item-btn" onClick={() => onAdd(item)}>
            Додати в кошик
          </button>
        </div>
      </div>
    </div>
  );
}
