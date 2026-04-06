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

function calculateTotalQuantity(orders) {
  return orders.reduce((total, order) => total + (order.quantity || 1), 0);
}

export default function CartDropdown({ orders, onDelete, onClose }) {
  const totalPrice = calculateTotalPrice(orders);
  const totalQuantity = calculateTotalQuantity(orders);

  return (
    <div className="cart-dropdown">
      <div className="shop-cart-header">
        <div>
          <h3 className="shop-cart-title">Кошик</h3>
          <p className="shop-cart-subtitle">
            {totalQuantity > 0
              ? `${totalQuantity} товар(ів) у кошику`
              : "Додай товари до кошика"}
          </p>
        </div>

        <button
          type="button"
          className="close-cart-btn"
          onClick={onClose}
          aria-label="Закрити кошик"
        >
          <FaRegCircleXmark />
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="empty-cart">
          <p>Кошик поки що порожній</p>
          <span>Обери модель, колір і розмір — і вона з’явиться тут.</span>
        </div>
      ) : (
        <>
          <div className="order-cart">
            {orders.map((order) => (
              <Order
                key={`${order.id}-${order.selectedColor}-${order.selectedSize}`}
                item={order}
                onDelete={onDelete}
              />
            ))}
          </div>

          <div className="shop-cart-footer">
            <p className="total-price">
              Загальна вартість: <span>{totalPrice.toFixed(2)} грн</span>
            </p>

            <button type="button" className="checkout-btn">
              Оформити замовлення
            </button>
          </div>
        </>
      )}
    </div>
  );
}
