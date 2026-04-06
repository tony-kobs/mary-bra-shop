import React from "react";
import Header from "./components/header/Header.js";
import products from "./data/products.js";
import Footer from "./components/layout/Footer";
import Items from "./components/product/Items";
import Categories from "./components/product/Categories";
import ShowFullItem from "./components/product/ShowFullItem";
import BannerSliders from "./components/layout/BannerSliders";
import PresentationBar from "./components/layout/PresentationBar";
import FloatingCart from "./components/cart/FloatingCart";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      items: products,
      currentItems: products,
      showFullItem: false,
      fullItem: null,
      showFloatingCart: true,
      cartOpen: false,
      searchQuery: "",
    };
  }

  render() {
    const {
      orders,
      currentItems,
      showFullItem,
      fullItem,
      showFloatingCart,
      cartOpen,
    } = this.state;

    const totalQuantity = this.getTotalQuantity();

    const showItemModal = showFullItem && (
      <ShowFullItem
        onAdd={this.addToOrder}
        item={fullItem}
        onShowItem={this.onShowItem}
      />
    );

    const floatingCartButton = (
      <FloatingCart
        totalQuantity={totalQuantity}
        show={showFloatingCart}
        onClick={this.handleFloatingCartClick}
      />
    );

    return (
      <div className="container">
        <Header
          orders={orders}
          onDelete={this.deleteOrder}
          cartOpen={cartOpen}
          setCartOpen={this.setCartOpen}
          onSearchSubmit={this.handleSearchSubmit}
        />
        <main>
          <PresentationBar />
          <BannerSliders />
          <Categories onChoose={this.handleCategoryFilter} />
          <Items items={currentItems} onShowItem={this.onShowItem} />
        </main>

        {showItemModal}

        {floatingCartButton}

        <Footer />
      </div>
    );
  }

  //============================Lifecycle methods============================//

  componentDidMount = () => {
    window.addEventListener("scroll", this.handleScroll);
  };

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScroll);
  };

  //============================UI methods============================//

  handleFloatingCartClick = () => {
    this.scrollToHeader();
    this.onShowItem(null);
  };

  handleScroll = () => {
    const scrollY = window.scrollY;

    this.setState({
      showFloatingCart: scrollY > 120,
    });
  };

  scrollToItems = () => {
    const section = document.getElementById("items-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  scrollToHeader = () => {
    const header = document.getElementById("header");
    if (header) {
      header.scrollIntoView({ behavior: "smooth" });
    }

    this.setState({ cartOpen: true });
  };

  onShowItem = (item) => {
    this.setState({
      fullItem: item,
      showFullItem: !!item,
    });
  };

  setCartOpen = (value) => {
    this.setState({ cartOpen: value });
  };

  //============================Search and filtering methods============================//

  handleSearchSubmit = (query) => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      this.setState(
        {
          currentItems: this.state.items,
        },
        this.scrollToItems,
      );
      return;
    }

    const filteredItems = this.state.items.filter((item) => {
      const title = item.title?.toLowerCase() || "";
      const shortDescription = item.shortDescription?.toLowerCase() || "";
      const description = item.description?.toLowerCase() || "";
      const brand = item.brand?.toLowerCase() || "";
      const sku = item.sku?.toLowerCase() || "";

      return (
        title.includes(normalizedQuery) ||
        shortDescription.includes(normalizedQuery) ||
        description.includes(normalizedQuery) ||
        brand.includes(normalizedQuery) ||
        sku.includes(normalizedQuery)
      );
    });

    this.setState(
      {
        currentItems: filteredItems,
      },
      this.scrollToItems,
    );
  };

  handleCategoryFilter = (category, subcategory = null) => {
    const { items } = this.state;

    if (category === "all") {
      this.setState({ currentItems: items });
      return;
    }

    if (subcategory && !subcategory.startsWith("all-")) {
      this.setState({
        currentItems: items.filter(
          (item) =>
            item.category === category && item.subcategory === subcategory,
        ),
      });
      return;
    }

    this.setState({
      currentItems: items.filter((item) => item.category === category),
    });
  };

  //============================Cart methods============================//

  addToOrder = (item) => {
    this.setState((prevState) => {
      const existing = prevState.orders.find(
        (order) =>
          order.id === item.id &&
          order.selectedColor === item.selectedColor &&
          order.selectedSize === item.selectedSize,
      );

      if (existing) {
        return {
          orders: prevState.orders.map((order) =>
            order.id === item.id &&
            order.selectedColor === item.selectedColor &&
            order.selectedSize === item.selectedSize
              ? { ...order, quantity: (order.quantity || 1) + 1 }
              : order,
          ),
        };
      }

      return {
        orders: [...prevState.orders, { ...item, quantity: 1 }],
      };
    });
  };

  deleteOrder = (id, selectedColor, selectedSize) => {
    this.setState((prevState) => ({
      orders: prevState.orders
        .map((order) =>
          order.id === id &&
          order.selectedColor === selectedColor &&
          order.selectedSize === selectedSize
            ? { ...order, quantity: order.quantity - 1 }
            : order,
        )
        .filter((order) => order.quantity > 0),
    }));
  };

  //============================Other methods============================//

  getTotalQuantity = () => {
    const { orders } = this.state;

    return orders.reduce((sum, order) => sum + (order.quantity || 1), 0);
  };
}

export default App;
