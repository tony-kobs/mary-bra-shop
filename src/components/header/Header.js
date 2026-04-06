import React, { useRef, useEffect } from "react";
import CartDropdown from "../cart/CartDropDown";
import HeaderSearch from "./HeaderSearch";
import HeaderSocials from "./HeaderSocials";
import HeaderCartButton from "./HeaderCartButton";
import { headerSocialLinks } from "./headerSocialLinks";

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setCartOpen]);

  return (
    <header id="header">
      <div className="navbar">
        <a href="/" className="logo">
          MaryBra Shop
        </a>

        <div className="nav-list-wrapper">
          <HeaderSearch onSearch={onSearch} onSearchSubmit={onSearchSubmit} />
          <HeaderSocials links={headerSocialLinks} />
        </div>

        <HeaderCartButton
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          totalQuantity={totalQuantity}
        />

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
