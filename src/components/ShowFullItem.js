import React, { Component } from "react";

export class ShowFullItem extends Component {
  render() {
    if (!this.props.item) return null;
    return (
      <div
        className="show-full-item"
        onClick={() => this.props.onShowItem(null)}
      >
        <div className="full-item-wrapper" onClick={(e) => e.stopPropagation()}>
          <img
            src={"./product-img/" + this.props.item.image}
            alt={this.props.item.title}
            onClick={() => this.props.onShowItem(null)}
          />

          <div className="full-item-info">
            <h2>{this.props.item.title}</h2>
            <p>{this.props.item.desc}</p>
            <b>{this.props.item.price.toFixed(2)} грн</b>

            <button
              className="add-to-cart"
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

export default ShowFullItem;
