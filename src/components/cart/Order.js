import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";

export default function Order({ item, onDelete }) {
  const {
    id,
    image,
    previewImage,
    title,
    brand,
    price,
    quantity = 1,
    selectedColor,
    selectedColorLabel,
    selectedSize,
    colors,
  } = item;

  const totalPrice = ((Number(price) || 0) * quantity).toFixed(2);

  const colorLabel =
    selectedColorLabel ||
    (selectedColor && colors?.[selectedColor]?.label) ||
    selectedColor;

  const displayImage = previewImage || image;

  const handleDelete = () => {
    onDelete(id, selectedColor, selectedSize);
  };

  return (
    <div className="order-item">
      <div className="order-item-image-wrap">
        <img
          src={`${process.env.PUBLIC_URL}/product-img/${displayImage}`}
          alt={title}
          className="order-item-image"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="order-item-info">
        <div className="order-item-top">
          <div className="order-item-text">
            {brand && <span className="order-item-brand">{brand}</span>}

            <h3 className="order-item-title">
              {title}
              {quantity > 1 && (
                <span className="order-item-qty">×{quantity}</span>
              )}
            </h3>
          </div>

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
          {colorLabel && (
            <span className="order-badge">Колір: {colorLabel}</span>
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
