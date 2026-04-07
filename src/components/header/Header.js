import React from "react";
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
  const totalQuantity = orders.reduce(
    (sum, order) => sum + (order.quantity || 1),
    0,
  );

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
      </div>

      {cartOpen && (
        <CartDropdown
          orders={orders}
          onDelete={onDelete}
          onClose={() => setCartOpen(false)}
        />
      )}
    </header>
  );
}
