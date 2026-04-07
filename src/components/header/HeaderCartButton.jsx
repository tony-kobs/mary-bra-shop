import { FaBagShopping } from "react-icons/fa6";

export default function HeaderCartButton({
  cartOpen,
  setCartOpen,
  totalQuantity,
}) {
  return (
    <button
      type="button"
      className={`shop-cart-button ${cartOpen ? "active" : ""}`}
      onClick={() => setCartOpen(true)}
      aria-label="Відкрити кошик"
    >
      <FaBagShopping className="shop-cart-icon" />
      {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
    </button>
  );
}
