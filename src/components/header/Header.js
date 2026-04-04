import React, { useRef, useEffect } from "react";
import CartDropdown from "../cart/CartDropDown";
import HeaderSearch from "./HeaderSearch";
import {
  FaBagShopping,
  FaTiktok,
  FaViber,
  FaInstagram,
  FaTelegram,
  FaFacebook,
} from "react-icons/fa6";

export default function Header({
  orders,
  onDelete,
  cartOpen,
  setCartOpen,
  onSearch,
  onSearchSubmit,
}) {
  const cartRef = useRef(null);

  const totalQuantity = orders.reduce(
    (sum, order) => sum + (order.quantity || 1),
    0,
  );

  const socialLinks = [
    { href: "/products", icon: FaTiktok, label: "TikTok" },
    { href: "/about", icon: FaViber, label: "Viber" },
    {
      href: "https://www.instagram.com/mary_bra_shop/",
      icon: FaInstagram,
      label: "Instagram",
    },
    { href: "/contact", icon: FaFacebook, label: "Facebook" },
    { href: "/contact", icon: FaTelegram, label: "Telegram" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setCartOpen]);

  return (
    <header id="header">
      <div className="navbar">
        <a href="/" className="logo">
          MaryBra Shop
        </a>
        <div className="nav-list-wrapper">
          <HeaderSearch onSearch={onSearch} onSearchSubmit={onSearchSubmit} />
          <ul className="nav-list">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <li className="nav-item" key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="nav-links"
                  aria-label={label}
                >
                  <Icon className="nav-icons" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button className="shop-cart-button">
          <FaBagShopping
            onClick={() => setCartOpen((prev) => !prev)}
            className={`shop-cart-icon ${cartOpen ? "active" : ""}`}
          />
          {totalQuantity > 0 && (
            <span className="cart-count">{totalQuantity}</span>
          )}
        </button>

        {cartOpen && (
          <div className="shop-cart" ref={cartRef}>
            <CartDropdown
              orders={orders}
              onDelete={onDelete}
              onClose={() => setCartOpen(false)}
            />
          </div>
        )}
      </div>
    </header>
  );
}
