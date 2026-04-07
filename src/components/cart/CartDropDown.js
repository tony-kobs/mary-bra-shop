import React, { useEffect } from "react";
import { FaArrowRight, FaRegCircleXmark } from "react-icons/fa6";
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

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div className="cart-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="cart-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Кошик"
      >
        <div className="cart-modal-header">
          <div className="cart-modal-heading">
            <span className="cart-modal-label">MaryBra Shop</span>
            <h3 className="cart-modal-title">Твій кошик</h3>
            <p className="cart-modal-subtitle">
              {totalQuantity > 0
                ? `${totalQuantity} товар(ів) у кошику`
                : "Додай моделі до кошика, щоб продовжити вибір."}
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

            <button type="button" className="cart-empty-btn" onClick={onClose}>
              Повернутися до каталогу
            </button>
          </div>
        ) : (
          <>
            <div className="cart-modal-body">
              <div className="order-cart">
                {orders.map((order) => (
                  <Order
                    key={`${order.id}-${order.selectedColor}-${order.selectedSize}`}
                    item={order}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            </div>

            <div className="cart-modal-footer">
              <div className="cart-summary">
                <span className="cart-summary__label">Загальна вартість</span>
                <p className="total-price">{totalPrice.toFixed(2)} грн</p>
              </div>

              <div className="cart-actions">
                <button
                  type="button"
                  className="cart-secondary-btn"
                  onClick={onClose}
                >
                  Продовжити покупки
                </button>

                <button type="button" className="checkout-btn">
                  Оформити замовлення
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
