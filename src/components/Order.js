import React, { Component } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

export class Order extends Component {
  render() {
    return (
      <div className="order-item">
        <img
          src={"./product-img/" + this.props.item.image}
          alt={this.props.item.title}
        />
        <h3>
          {this.props.item.title}{" "}
          {this.props.item.quantity > 1 && `(${this.props.item.quantity})`}
        </h3>
        <b>
          {(this.props.item.price * (this.props.item.quantity || 1)).toFixed(2)}
          грн.
        </b>
        <FaRegTrashCan
          className="delete-order"
          onClick={() => this.props.onDelete(this.props.item.id)}
        />
      </div>
    );
  }
}

export default Order;
