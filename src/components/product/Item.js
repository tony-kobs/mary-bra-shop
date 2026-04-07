import React, { useMemo, useState } from "react";

export default function Item({ item, onShowItem }) {
  const {
    title,
    brand,
    price,
    oldPrice,
    shortDescription,
    badges,
    colors,
    image,
    inStock,
  } = item;

  const colorEntries = useMemo(() => Object.entries(colors || {}), [colors]);

  const defaultColorKey = colorEntries[0]?.[0] || null;
  const [activeColor, setActiveColor] = useState(defaultColorKey);

  const activeColorData =
    (activeColor && colors?.[activeColor]) || colorEntries[0]?.[1] || null;

  const images = activeColorData?.images || [];
  const mainImage = images[0] || image;
  const hoverImage = images[1] || images[0] || image;

  const hasDiscount = typeof oldPrice === "number" && oldPrice > price;
  const colorLabel = activeColorData?.label || activeColor;

  return (
    <article className={`item ${!inStock ? "item--out" : ""}`}>
      <div
        className="item-image-wrap"
        onClick={() => onShowItem(item)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onShowItem(item);
          }
        }}
        aria-label={`Відкрити товар ${title}`}
      >
        <div className="item-badges">
          {badges?.isSale && (
            <span className="item-badge item-badge-sale">Sale</span>
          )}
          {badges?.isNew && (
            <span className="item-badge item-badge-new">New</span>
          )}
          {badges?.isTop && (
            <span className="item-badge item-badge-top">Top</span>
          )}
          {!inStock && (
            <span className="item-badge item-badge-out">Sold out</span>
          )}
        </div>

        <img
          src={`${process.env.PUBLIC_URL}/product-img/${mainImage}`}
          alt={title}
          className="item-image item-image-main"
          loading="lazy"
          decoding="async"
        />

        <img
          src={`${process.env.PUBLIC_URL}/product-img/${hoverImage}`}
          alt={title}
          className={`item-image item-image-hover ${
            hoverImage === mainImage ? "item-image-hover--same" : ""
          }`}
          loading="lazy"
          decoding="async"
        />

        <div className="item-overlay">
          <span className="item-overlay__btn">Швидкий перегляд</span>
        </div>
      </div>

      <div className="item-info">
        <div className="item-copy">
          {brand && <span className="item-brand">{brand}</span>}

          <h3
            className="item-title"
            onClick={() => onShowItem(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onShowItem(item);
              }
            }}
          >
            {title}
          </h3>

          {shortDescription && <p className="item-desc">{shortDescription}</p>}
        </div>

        <div className="item-meta">
          {colorEntries.length > 0 && (
            <div className="item-colors-block">
              <div className="item-colors-head">
                <span className="item-colors-label">Колір</span>
                {colorLabel && (
                  <span className="item-colors-value">{colorLabel}</span>
                )}
              </div>

              <div className="item-colors">
                {colorEntries.map(([colorKey, colorValue]) => (
                  <button
                    key={colorKey}
                    type="button"
                    className={`item-color-swatch ${
                      activeColor === colorKey ? "active" : ""
                    }`}
                    style={{ backgroundColor: colorValue.hex }}
                    aria-label={colorValue.label || colorKey}
                    title={colorValue.label || colorKey}
                    onMouseEnter={() => setActiveColor(colorKey)}
                    onFocus={() => setActiveColor(colorKey)}
                    onClick={() => setActiveColor(colorKey)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="item-bottom">
            <div className="item-price-wrap">
              {hasDiscount && (
                <span className="item-old-price">{oldPrice.toFixed(2)} ₴</span>
              )}

              <div className="item-price-row">
                <span className="item-price">{price.toFixed(2)} ₴</span>

                {hasDiscount && (
                  <span className="item-discount-note">Спеціальна ціна</span>
                )}
              </div>
            </div>

            <button
              type="button"
              className="item-btn"
              onClick={() => onShowItem(item)}
            >
              Переглянути
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
