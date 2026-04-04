import React from "react";
import { FaBagShopping } from "react-icons/fa6";

const FloatingCart = ({ totalQuantity, show, onClick }) => {
  if (!show || totalQuantity <= 0) return null;

  return (
    <div className="floating-cart" onClick={onClick}>
      <FaBagShopping className="floating-cart-icon" />
      <span className="cart-count">{totalQuantity}</span>
    </div>
  );
};

export default FloatingCart;
