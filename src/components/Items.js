import React, { Component } from "react";
import Item from "./Item";

export class Items extends Component {
  render() {
    return (
      <div className="items-wrapper">
        {this.props.items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onAdd={this.props.onAdd}
            onShowItem={this.props.onShowItem}
          />
        ))}
      </div>
    );
  }
}

export default Items;
