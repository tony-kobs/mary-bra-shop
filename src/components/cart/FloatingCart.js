import React from "react";
import { FaBagShopping } from "react-icons/fa6";

const FloatingCart = ({ totalQuantity, show, onClick }) => {
  if (!show || totalQuantity <= 0) return null;

  return (
    <button
      type="button"
      className="floating-cart"
      onClick={onClick}
      aria-label="Відкрити кошик"
    >
      <FaBagShopping className="floating-cart-icon" />
      <span className="cart-count">{totalQuantity}</span>
      <span className="floating-cart-text">Кошик</span>
    </button>
  );
};

export default FloatingCart;
