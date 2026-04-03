import React, { Component } from "react";

export class Item extends Component {
  render() {
    return (
      <div className="item">
        <div className="item-image-wrap">
          <img
            src={
              process.env.PUBLIC_URL + "/product-img/" + this.props.item.image
            }
            alt={this.props.item.title}
            className="item-image"
            onClick={() => this.props.onShowItem(this.props.item)}
          />
        </div>
        <div className="item-info">
          <h3 className="item-title">{this.props.item.title}</h3>
          <div className="item-bottom">
            <span className="item-price">
              {this.props.item.price.toFixed(2)} ₴
            </span>
            <button
              className="item-btn"
              onClick={() => this.props.onAdd(this.props.item)}
            >
              Додати в кошик
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
