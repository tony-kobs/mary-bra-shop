import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
/* import "./css/show-full-item.css"; */

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
  if (item?.colors?.[activeColorKey]?.images) {
    return item.colors[activeColorKey].images;
  }

  if (item?.image) {
    return [item.image];
  }

  return [];
}

export default function ShowFullItem({ item, onAdd, onShowItem }) {
  const colorKeys = getColorKeys(item);
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

  if (!item) return null;

  const activeColorKey = previewColor || selectedColor;
  const currentImages = getCurrentImages(item, activeColorKey);

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

  return (
    <div className="show-full-item" onClick={() => onShowItem(null)}>
      <div className="full-item-wrapper" onClick={(e) => e.stopPropagation()}>
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
          <h2>{item.title || "Без назви"}</h2>
          <p>{item.desc || "Опис відсутній"}</p>

          <b>{formattedPrice}</b>

          {colorKeys.length > 0 && (
            <div className="options">
              <h4>Колір:</h4>
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
              <h4>Розмір:</h4>
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

          <button
            className="add-to-cart"
            onClick={handleAddToCart}
            disabled={!selectedSize}
          >
            Додати в кошик
          </button>
        </div>
      </div>
    </div>
  );
}
