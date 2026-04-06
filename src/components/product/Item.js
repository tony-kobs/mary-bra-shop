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

  return (
    <article className="item">
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
            <span className="item-badge item-badge-sale">SALE</span>
          )}
          {badges?.isNew && (
            <span className="item-badge item-badge-new">NEW</span>
          )}
          {badges?.isTop && (
            <span className="item-badge item-badge-top">TOP</span>
          )}
          {!inStock && (
            <span className="item-badge item-badge-out">SOLD OUT</span>
          )}
        </div>

        <img
          src={`${process.env.PUBLIC_URL}/product-img/${mainImage}`}
          alt={title}
          className="item-image item-image-main"
        />

        <img
          src={`${process.env.PUBLIC_URL}/product-img/${hoverImage}`}
          alt={title}
          className="item-image item-image-hover"
        />
      </div>

      <div className="item-info">
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

        {colorEntries.length > 0 && (
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
                onClick={() => setActiveColor(colorKey)}
              />
            ))}
          </div>
        )}

        <div className="item-bottom">
          <div className="item-price-wrap">
            {hasDiscount && (
              <span className="item-old-price">{oldPrice.toFixed(2)} ₴</span>
            )}
            <span className="item-price">{price.toFixed(2)} ₴</span>
          </div>

          <button
            type="button"
            className="item-btn"
            onClick={() => onShowItem(item)}
          >
            Обрати
          </button>
        </div>
      </div>
    </article>
  );
}
