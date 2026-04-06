import { FaBagShopping } from "react-icons/fa6";

export default function HeaderCartButton({
  cartOpen,
  setCartOpen,
  totalQuantity,
}) {
  return (
    <button
      type="button"
      className="shop-cart-button"
      onClick={() => setCartOpen((prev) => !prev)}
      aria-label="Відкрити кошик"
    >
      <FaBagShopping className={`shop-cart-icon ${cartOpen ? "active" : ""}`} />
      {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
    </button>
  );
}
