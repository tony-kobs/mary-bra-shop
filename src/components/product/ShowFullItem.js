import React, { useEffect, useMemo, useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function normalizeSizes(sizes) {
  if (!Array.isArray(sizes)) return [];

  return sizes.map((size) => {
    if (typeof size === "string") {
      return {
        value: size,
        label: size,
        inStock: true,
      };
    }

    return {
      value: size.value || size.label || size.size || "",
      label: size.label || size.value || size.size || "",
      inStock: size.inStock !== false,
    };
  });
}

export default function ShowFullItem({ item, onAdd, onShowItem }) {
  const colorEntries = useMemo(
    () => Object.entries(item?.colors || {}),
    [item?.colors],
  );

  const defaultColorKey = colorEntries[0]?.[0] || null;

  const [activeColor, setActiveColor] = useState(defaultColorKey);
  const [selectedSize, setSelectedSize] = useState("");
  const [showSizeError, setShowSizeError] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  useEffect(() => {
    const nextDefaultColor = Object.keys(item?.colors || {})[0] || null;
    setActiveColor(nextDefaultColor);
    setSelectedSize("");
    setShowSizeError(false);
    setShowAddedMessage(false);
  }, [item]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onShowItem(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onShowItem]);

  useEffect(() => {
    if (!showAddedMessage) return;

    const timer = setTimeout(() => {
      setShowAddedMessage(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [showAddedMessage]);

  if (!item) return null;

  const {
    title,
    brand,
    price,
    oldPrice,
    description,
    shortDescription,
    badges,
    image,
    inStock = true,
  } = item;

  const activeColorData =
    (activeColor && item.colors?.[activeColor]) || colorEntries[0]?.[1] || null;

  const colorLabel = activeColorData?.label || activeColor || "";
  const images = activeColorData?.images || (image ? [image] : []);
  const normalizedSizes = normalizeSizes(item.sizes);
  const hasSizes = normalizedSizes.length > 0;
  const hasDiscount = typeof oldPrice === "number" && oldPrice > price;

  const handleAddToCart = () => {
    if (hasSizes && !selectedSize) {
      setShowSizeError(true);
      return;
    }

    setShowSizeError(false);

    onAdd({
      ...item,
      selectedColor: activeColor,
      selectedColorLabel: colorLabel,
      selectedSize: selectedSize || null,
      previewImage: images[0] || image || "",
    });

    setShowAddedMessage(true);
  };

  return (
    <div
      className="show-full-item-backdrop"
      onClick={() => onShowItem(null)}
      role="presentation"
    >
      <div
        className="show-full-item-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button
          type="button"
          className="show-full-item-close"
          onClick={() => onShowItem(null)}
          aria-label="Закрити"
        >
          <FaXmark />
        </button>

        <div className="show-full-item-grid">
          <div className="show-full-item-gallery">
            <div className="show-full-item-badges">
              {badges?.isSale && (
                <span className="show-full-item-badge show-full-item-badge-sale">
                  Sale
                </span>
              )}
              {badges?.isNew && (
                <span className="show-full-item-badge show-full-item-badge-new">
                  New
                </span>
              )}
              {badges?.isTop && (
                <span className="show-full-item-badge show-full-item-badge-top">
                  Top
                </span>
              )}
              {!inStock && (
                <span className="show-full-item-badge show-full-item-badge-out">
                  Sold out
                </span>
              )}
            </div>

            {images.length > 1 ? (
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={12}
                slidesPerView={1}
                autoHeight={false}
                observer={true}
                observeParents={true}
                updateOnWindowResize={true}
                className="show-full-item-swiper"
              >
                {images.map((img, index) => (
                  <SwiperSlide key={`${img}-${index}`}>
                    <div className="show-full-item-image-wrap">
                      <img
                        src={`${process.env.PUBLIC_URL}/product-img/${img}`}
                        alt={`${title} ${index + 1}`}
                        className="show-full-item-image"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="show-full-item-image-wrap">
                <img
                  src={`${process.env.PUBLIC_URL}/product-img/${
                    images[0] || image
                  }`}
                  alt={title}
                  className="show-full-item-image"
                  loading="eager"
                  decoding="async"
                />
              </div>
            )}
          </div>

          <div className="show-full-item-content">
            <div className="show-full-item-head">
              {brand && <span className="show-full-item-brand">{brand}</span>}

              <h2 className="show-full-item-title">{title}</h2>

              {shortDescription && (
                <p className="show-full-item-short">{shortDescription}</p>
              )}

              <div className="show-full-item-price-wrap">
                {hasDiscount && (
                  <span className="show-full-item-old-price">
                    {oldPrice.toFixed(2)} ₴
                  </span>
                )}

                <div className="show-full-item-price-row">
                  <span className="show-full-item-price">
                    {price.toFixed(2)} ₴
                  </span>

                  {hasDiscount && (
                    <span className="show-full-item-discount-note">
                      Спеціальна ціна
                    </span>
                  )}
                </div>
              </div>
            </div>

            {colorEntries.length > 0 && (
              <div className="show-full-item-block">
                <div className="show-full-item-block-head">
                  <span className="show-full-item-block-label">Колір</span>
                  {colorLabel && (
                    <span className="show-full-item-block-value">
                      {colorLabel}
                    </span>
                  )}
                </div>

                <div className="show-full-item-colors">
                  {colorEntries.map(([colorKey, colorValue]) => (
                    <button
                      key={colorKey}
                      type="button"
                      className={`show-full-item-color ${
                        activeColor === colorKey ? "active" : ""
                      }`}
                      style={{ backgroundColor: colorValue.hex }}
                      onClick={() => setActiveColor(colorKey)}
                      onMouseEnter={() => setActiveColor(colorKey)}
                      aria-label={colorValue.label || colorKey}
                      title={colorValue.label || colorKey}
                    />
                  ))}
                </div>
              </div>
            )}

            {hasSizes && (
              <div className="show-full-item-block">
                <div className="show-full-item-block-head">
                  <span className="show-full-item-block-label">Розмір</span>
                  {selectedSize && (
                    <span className="show-full-item-block-value">
                      {selectedSize}
                    </span>
                  )}
                </div>

                <div className="show-full-item-sizes">
                  {normalizedSizes.map((size) => (
                    <button
                      key={size.value}
                      type="button"
                      className={`show-full-item-size ${
                        selectedSize === size.value ? "active" : ""
                      } ${!size.inStock ? "disabled" : ""}`}
                      onClick={() => {
                        if (!size.inStock) return;
                        setSelectedSize(size.value);
                        setShowSizeError(false);
                      }}
                      disabled={!size.inStock}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>

                {showSizeError && (
                  <span className="show-full-item-error">
                    Будь ласка, обери розмір
                  </span>
                )}
              </div>
            )}

            {description && (
              <div className="show-full-item-description">
                <span className="show-full-item-block-label">Опис</span>
                <p>{description}</p>
              </div>
            )}

            <div className="show-full-item-actions">
              <button
                type="button"
                className="show-full-item-add-btn"
                onClick={handleAddToCart}
                disabled={!inStock}
              >
                {inStock ? "Додати в кошик" : "Немає в наявності"}
              </button>

              <button
                type="button"
                className="show-full-item-secondary-btn"
                onClick={() => onShowItem(null)}
              >
                Продовжити перегляд
              </button>
            </div>

            {showAddedMessage && (
              <div className="show-full-item-success">
                <FaCheck />
                <span>Товар додано в кошик</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
