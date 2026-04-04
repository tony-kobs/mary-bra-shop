import React, { useRef, useEffect, useState } from "react";
import { FaBagShopping } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaViber } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";

import Order from "../cart/Order";

export default function Header(props) {
  const isCartOpen = props.cartOpen;
  const setIsCartOpen = props.setCartOpen;
  const cartRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setIsCartOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsCartOpen]);

  useEffect(() => {
    if (isSearchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchActive]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (props.onSearch) {
      props.onSearch(query);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (props.onSearch) {
      props.onSearch(searchQuery);
    }

    if (props.onSearchSubmit) {
      props.onSearchSubmit();
    }

    setSearchQuery("");
  };

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
          <li
            className={`nav-item nav-item-search ${isSearchActive ? "search-active" : ""}`}
            ref={searchRef}
          >
            <button
              className="nav-links search-toggle"
              onClick={() => setIsSearchActive((prev) => !prev)}
            >
              <FaMagnifyingGlass className="nav-icons" />
            </button>
            <form className="search-field" onSubmit={handleSearchSubmit}>
              <input
                ref={searchInputRef}
                type="text"
                className="search-input"
                placeholder="Пошук товарів..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </form>
          </li>
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
