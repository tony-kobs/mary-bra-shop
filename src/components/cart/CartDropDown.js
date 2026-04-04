import React from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import Order from "./Order";

export default function CartDropdown({ orders, onDelete, onClose }) {
  const totalPrice = orders.reduce(
    (acc, order) =>
      acc + Number.parseFloat(order.price) * (order.quantity || 1),
    0,
  );

  if (orders.length === 0) {
    return (
      <div className="empty-cart">
        <p>Корзина пуста</p>
        <FaRegCircleXmark onClick={onClose} />
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
