import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaXmark } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function getFirstAvailableSize(item) {
  if (!item?.sizes?.length) return null;

  const firstAvailable = item.sizes.find((size) =>
    typeof size === "string" ? true : size.available,
  );

  if (!firstAvailable) return null;

  return typeof firstAvailable === "string"
    ? firstAvailable
    : firstAvailable.value;
}

function getColorKeys(item) {
  return item?.colors ? Object.keys(item.colors) : [];
}

function getCurrentImages(item, activeColorKey) {
  if (item?.colors?.[activeColorKey]?.images?.length) {
    return item.colors[activeColorKey].images;
  }

  if (item?.image) {
    return [item.image];
  }

  return [];
}

export default function ShowFullItem({ item, onAdd, onShowItem }) {
  const colorKeys = useMemo(() => getColorKeys(item), [item]);
  const firstColor = colorKeys[0] || null;

  const [selectedColor, setSelectedColor] = useState(firstColor);
  const [previewColor, setPreviewColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(getFirstAvailableSize(item));

  useEffect(() => {
    if (!item) return;

    const nextColorKeys = getColorKeys(item);
    const nextFirstColor = nextColorKeys[0] || null;

    setSelectedColor(nextFirstColor);
    setPreviewColor(null);
    setSelectedSize(getFirstAvailableSize(item));
  }, [item]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onShowItem(null);
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onShowItem]);

  if (!item) return null;

  const activeColorKey = previewColor || selectedColor;
  const currentImages = getCurrentImages(item, activeColorKey);

  const activeColorData = item.colors?.[selectedColor];
  const activeColorLabel = activeColorData?.label || selectedColor || "—";

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setPreviewColor(null);
  };

  const handleSizeChange = (sizeObj) => {
    const sizeValue = typeof sizeObj === "string" ? sizeObj : sizeObj.value;
    const available = typeof sizeObj === "string" ? true : sizeObj.available;

    if (!available) return;

    setSelectedSize(sizeValue);
  };

  const handleAddToCart = () => {
    const activeColor = item.colors?.[selectedColor];
    const activeImage = activeColor?.images?.[0] || item.image || "";

    onAdd({
      ...item,
      selectedColor,
      selectedSize,
      image: activeImage,
    });
  };

  const formattedPrice =
    typeof item.price === "number"
      ? `${item.price.toFixed(2)} грн`
      : `${item.price} грн`;

  const formattedOldPrice =
    typeof item.oldPrice === "number"
      ? `${item.oldPrice.toFixed(2)} грн`
      : null;

  const hasDiscount =
    typeof item.oldPrice === "number" && item.oldPrice > item.price;

  return (
    <div className="show-full-item" onClick={() => onShowItem(null)}>
      <div className="full-item-wrapper" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="full-item-close"
          onClick={() => onShowItem(null)}
          aria-label="Закрити"
        >
          <FaXmark />
        </button>

        <div className="full-item-image-container">
          {currentImages.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              spaceBetween={0}
              navigation
              pagination={{ clickable: true }}
              className="full-item-swiper"
            >
              {currentImages.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${process.env.PUBLIC_URL}/product-img/${img}`}
                    alt={item.title}
                    className="full-item-main-image"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="full-item-no-image">Немає зображення</div>
          )}
        </div>

        <div className="full-item-info">
          <div className="full-item-head">
            <div className="full-item-brand-row">
              {item.brand && (
                <span className="full-item-brand">{item.brand}</span>
              )}
              {item.sku && (
                <span className="full-item-sku">SKU: {item.sku}</span>
              )}
            </div>

            <h2>{item.title || "Без назви"}</h2>

            <div className="full-item-price-row">
              {hasDiscount && (
                <span className="full-item-old-price">{formattedOldPrice}</span>
              )}
              <b>{formattedPrice}</b>
            </div>

            {item.shortDescription && (
              <p className="full-item-short-description">
                {item.shortDescription}
              </p>
            )}
          </div>

          <div className="full-item-content">
            <div className="options">
              <h4>Опис</h4>
              <p>{item.description || "Опис відсутній"}</p>
            </div>

            {colorKeys.length > 0 && (
              <div className="options">
                <div className="option-header">
                  <h4>Колір</h4>
                  <span className="option-value">{activeColorLabel}</span>
                </div>

                <div className="colors">
                  {colorKeys.map((colorKey) => {
                    const colorData = item.colors[colorKey];
                    const colorHex = colorData?.hex || "#ccc";
                    const colorLabel = colorData?.label || colorKey;
                    const isActive = selectedColor === colorKey;

                    return (
                      <button
                        key={colorKey}
                        type="button"
                        className={`color-swatch ${isActive ? "active" : ""}`}
                        style={{ backgroundColor: colorHex }}
                        title={colorLabel}
                        aria-label={colorLabel}
                        onClick={() => handleColorChange(colorKey)}
                        onMouseEnter={() => setPreviewColor(colorKey)}
                        onMouseLeave={() => setPreviewColor(null)}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {item.sizes?.length > 0 && (
              <div className="options">
                <div className="option-header">
                  <h4>Розмір</h4>
                  <span className="option-value">
                    {selectedSize || "Оберіть"}
                  </span>
                </div>

                <div className="sizes">
                  {item.sizes.map((sizeObj) => {
                    const sizeValue =
                      typeof sizeObj === "string" ? sizeObj : sizeObj.value;
                    const available =
                      typeof sizeObj === "string" ? true : sizeObj.available;
                    const isActive = selectedSize === sizeValue;

                    return (
                      <button
                        key={sizeValue}
                        type="button"
                        className={`size ${isActive ? "active" : ""} ${
                          !available ? "disabled" : ""
                        }`}
                        onClick={() => handleSizeChange(sizeObj)}
                        disabled={!available}
                      >
                        {sizeValue}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {(item.composition || item.care) && (
              <div className="full-item-details">
                {item.composition && (
                  <div className="full-item-detail-block">
                    <h5>Склад</h5>
                    <p>{item.composition}</p>
                  </div>
                )}

                {item.care && (
                  <div className="full-item-detail-block">
                    <h5>Догляд</h5>
                    <p>{item.care}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="full-item-footer">
            <div className="full-item-selection">
              <span>Обрано:</span>
              <strong>
                {activeColorLabel}
                {selectedSize ? ` / ${selectedSize}` : ""}
              </strong>
            </div>

            <button
              className="add-to-cart"
              onClick={handleAddToCart}
              disabled={!selectedSize || item.inStock === false}
            >
              {item.inStock === false ? "Немає в наявності" : "Додати в кошик"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
