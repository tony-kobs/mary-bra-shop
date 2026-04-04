import React, { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
/* import "./css/show-full-item.css"; */

export class ShowFullItem extends Component {
  constructor(props) {
    super(props);

    const item = props.item;
    const colorKeys = item?.colors ? Object.keys(item.colors) : [];
    const firstColor = colorKeys[0] || null;

    this.state = {
      selectedColor: firstColor,
      previewColor: null,
      selectedSize: this.getFirstAvailableSize(item),
    };
  }

  getFirstAvailableSize(item) {
    if (!item?.sizes?.length) return null;

    const firstAvailable = item.sizes.find((size) =>
      typeof size === "string" ? true : size.available,
    );

    if (!firstAvailable) return null;

    return typeof firstAvailable === "string"
      ? firstAvailable
      : firstAvailable.value;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item !== this.props.item && this.props.item) {
      const colorKeys = this.props.item.colors
        ? Object.keys(this.props.item.colors)
        : [];
      const firstColor = colorKeys[0] || null;

      this.setState({
        selectedColor: firstColor,
        previewColor: null,
        selectedSize: this.getFirstAvailableSize(this.props.item),
      });
    }
  }

  handleColorChange = (color) => {
    this.setState({
      selectedColor: color,
      previewColor: null,
    });
  };

  handleColorHover = (color) => {
    this.setState({ previewColor: color });
  };

  handleColorLeave = () => {
    this.setState({ previewColor: null });
  };

  handleSizeChange = (sizeObj) => {
    const sizeValue = typeof sizeObj === "string" ? sizeObj : sizeObj.value;
    const available = typeof sizeObj === "string" ? true : sizeObj.available;

    if (!available) return;
    this.setState({ selectedSize: sizeValue });
  };

  handleAddToCart = () => {
    const { item, onAdd } = this.props;
    const { selectedColor, selectedSize } = this.state;

    const activeColor = item.colors?.[selectedColor];
    const activeImage = activeColor?.images?.[0] || item.image || "";

    onAdd({
      ...item,
      selectedColor,
      selectedSize,
      image: activeImage,
    });
  };

  render() {
    const { item } = this.props;
    const { selectedColor, previewColor, selectedSize } = this.state;

    if (!item) return null;

    const colorKeys = Object.keys(item.colors || {});
    const activeColorKey = previewColor || selectedColor;

    let currentImages = [];
    if (item.colors?.[activeColorKey]?.images) {
      currentImages = item.colors[activeColorKey].images;
    } else if (item.image) {
      currentImages = [item.image];
    }

    return (
      <div
        className="show-full-item"
        onClick={() => this.props.onShowItem(null)}
      >
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
                      src={process.env.PUBLIC_URL + "/product-img/" + img}
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
            <b>
              {typeof item.price === "number"
                ? `${item.price.toFixed(2)} грн`
                : `${item.price} грн`}
            </b>

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
                        onClick={() => this.handleColorChange(colorKey)}
                        onMouseEnter={() => this.handleColorHover(colorKey)}
                        onMouseLeave={this.handleColorLeave}
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
                        onClick={() => this.handleSizeChange(sizeObj)}
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
              onClick={this.handleAddToCart}
              disabled={!selectedSize}
            >
              Додати в кошик
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowFullItem;
