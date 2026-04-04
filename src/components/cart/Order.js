import React, { Component } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

export class Order extends Component {
  handleDelete = () => {
    this.props.onDelete(
      this.props.item.id,
      this.props.item.selectedColor,
      this.props.item.selectedSize,
    );
  };

  render() {
    const { item } = this.props;

    return (
      <div className="order-item">
        <div className="order-item-image-wrap">
          <img
            src={process.env.PUBLIC_URL + "/product-img/" + item.image}
            alt={item.title}
            className="order-item-image"
          />
        </div>

        <div className="order-item-info">
          <div className="order-item-top">
            <h3 className="order-item-title">
              {item.title}
              {item.quantity > 1 && (
                <span className="order-item-qty">×{item.quantity}</span>
              )}
            </h3>

            <button
              type="button"
              className="delete-order"
              onClick={this.handleDelete}
              aria-label="Видалити товар"
            >
              <FaRegTrashCan />
            </button>
          </div>

          <div className="order-item-meta">
            {item.selectedColor && (
              <span className="order-badge">Колір: {item.selectedColor}</span>
            )}
            {item.selectedSize && (
              <span className="order-badge">Розмір: {item.selectedSize}</span>
            )}
          </div>

          <b className="order-item-price">
            {(item.price * (item.quantity || 1)).toFixed(2)} грн
          </b>
        </div>
      </div>
    );
  }
}

export default Order;
