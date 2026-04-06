import React from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import Order from "./Order";

function calculateTotalPrice(orders) {
  return orders.reduce((total, order) => {
    const price = Number.parseFloat(order.price) || 0;
    const quantity = order.quantity || 1;

    return total + price * quantity;
  }, 0);
}

export default function CartDropdown({ orders, onDelete, onClose }) {
  const totalPrice = calculateTotalPrice(orders);

  if (orders.length === 0) {
    return (
      <div className="empty-cart">
        <p>Корзина пуста</p>

        <button
          type="button"
          className="close-cart-btn"
          onClick={onClose}
          aria-label="Закрити кошик"
        >
          <FaRegCircleXmark />
        </button>
      </div>
    );
  }

  return (
    <div className="order-cart">
      {orders.map((order) => (
        <Order key={order.id} item={order} onDelete={onDelete} />
      ))}

      <p className="total-price">
        Загальна вартість: <span>{totalPrice.toFixed(2)} грн.</span>
      </p>
    </div>
  );
}
