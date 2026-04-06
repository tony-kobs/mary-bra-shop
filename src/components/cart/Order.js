import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";

export default function Order({ item, onDelete }) {
  const {
    id,
    image,
    title,
    price,
    quantity = 1,
    selectedColor,
    selectedSize,
  } = item;

  const totalPrice = (price * quantity).toFixed(2);

  const handleDelete = () => {
    onDelete(id, selectedColor, selectedSize);
  };

  return (
    <div className="order-item">
      <div className="order-item-image-wrap">
        <img
          src={`${process.env.PUBLIC_URL}/product-img/${image}`}
          alt={title}
          className="order-item-image"
        />
      </div>

      <div className="order-item-info">
        <div className="order-item-top">
          <h3 className="order-item-title">
            {title}
            {quantity > 1 && (
              <span className="order-item-qty">×{quantity}</span>
            )}
          </h3>

          <button
            type="button"
            className="delete-order"
            onClick={handleDelete}
            aria-label="Видалити товар"
          >
            <FaRegTrashCan />
          </button>
        </div>

        <div className="order-item-meta">
          {selectedColor && (
            <span className="order-badge">Колір: {selectedColor}</span>
          )}

          {selectedSize && (
            <span className="order-badge">Розмір: {selectedSize}</span>
          )}
        </div>

        <b className="order-item-price">{totalPrice} грн</b>
      </div>
    </div>
  );
}
