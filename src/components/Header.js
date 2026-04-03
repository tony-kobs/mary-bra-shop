import React, { useRef, useEffect } from "react";
import { FaBagShopping } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaViber } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";

import Order from "./Order";

export default function Header(props) {
  /* const [isCartOpen, setIsCartOpen] = React.useState(false); */
  const isCartOpen = props.cartOpen;
  const setIsCartOpen = props.setCartOpen;
  const cartRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsCartOpen]);

  const shownOrders = () => {
    const summa = props.orders.reduce(
      (acc, order) =>
        acc + Number.parseFloat(order.price) * (order.quantity || 1),
      0,
    );
    return (
      <div className="order-cart">
        {props.orders.map((order) => (
          <Order key={order.id} item={order} onDelete={props.onDelete} />
        ))}
        <p className="total-price">
          Загальна вартість: <span>{summa.toFixed(2)} грн.</span>
        </p>
      </div>
    );
  };

  const shownEmptyCart = () => {
    return (
      <div className="empty-cart" ref={cartRef}>
        <p>Корзина пуста</p>
        <FaRegCircleXmark onClick={() => setIsCartOpen(false)} />
      </div>
    );
  };

  return (
    <header id="header">
      <div className="navbar">
        <a href="/" className="logo">
          MaryBra Shop
        </a>
        <ul className="nav-list">
          <li className="nav-item">
            <a
              href="/products"
              target="_blank"
              rel="noreferrer"
              className="nav-links"
            >
              <FaTiktok className="nav-icons" />
            </a>
          </li>
          <li className="nav-item">
            <a
              href="/about"
              target="_blank"
              rel="noreferrer"
              className="nav-links"
            >
              <FaViber className="nav-icons" />
            </a>
          </li>
          <li className="nav-item">
            <a
              href="https://www.instagram.com/mary_bra_shop/"
              target="_blank"
              rel="noreferrer"
              className="nav-links"
            >
              <FaInstagram className="nav-icons" />
            </a>
          </li>
          <li className="nav-item">
            <a
              href="/contact"
              target="_blank"
              rel="noreferrer"
              className="nav-links"
            >
              <FaFacebook className="nav-icons" />
            </a>
          </li>
          <li className="nav-item">
            <a
              href="/contact"
              target="_blank"
              rel="noreferrer"
              className="nav-links"
            >
              <FaTelegram className="nav-icons" />
            </a>
          </li>
        </ul>
        <button className="shop-cart-button">
          <FaBagShopping
            onClick={() => setIsCartOpen((prev) => !prev)}
            className={`shop-cart-icon ${isCartOpen && "active"}`}
          />
          {props.orders.length > 0 && (
            <span className="cart-count">
              {props.orders.reduce(
                (sum, order) => sum + (order.quantity || 1),
                0,
              )}
            </span>
          )}
        </button>

        {isCartOpen && (
          <div className="shop-cart" ref={cartRef}>
            {props.orders.length > 0 ? shownOrders() : shownEmptyCart()}
          </div>
        )}
      </div>
    </header>
  );
}
