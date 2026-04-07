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

      selectedCategory: "all",
      selectedSubcategory: "all",
      catalogSearchQuery: "",
    };

    this.catalogSearchTimeout = null;
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);

    if (this.catalogSearchTimeout) {
      clearTimeout(this.catalogSearchTimeout);
    }
  }

  render() {
    const {
      orders,
      currentItems,
      showFullItem,
      fullItem,
      showFloatingCart,
      cartOpen,
      selectedCategory,
      selectedSubcategory,
      catalogSearchQuery,
    } = this.state;

    const totalQuantity = this.getTotalQuantity();

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

          <Categories
            onChoose={this.handleCategoryFilter}
            onCatalogSearch={this.handleCatalogSearch}
            onResetFilters={this.resetCatalogFilters}
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            catalogSearchQuery={catalogSearchQuery}
          />

          <Items items={currentItems} onShowItem={this.onShowItem} />
        </main>

        {showFullItem && (
          <ShowFullItem
            item={fullItem}
            onAdd={this.addToOrder}
            onShowItem={this.onShowItem}
          />
        )}

        <FloatingCart
          totalQuantity={totalQuantity}
          show={showFloatingCart}
          onClick={this.handleFloatingCartClick}
        />

        <Footer />
      </div>
    );
  }

  // ============================ UI methods ============================

  handleFloatingCartClick = () => {
    this.onShowItem(null);
    this.setCartOpen(true);
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

  onShowItem = (item) => {
    this.setState({
      fullItem: item,
      showFullItem: !!item,
    });
  };

  setCartOpen = (value) => {
    this.setState({ cartOpen: value });
  };

  // ============================ Header search ============================

  handleSearchSubmit = (query) => {
    const normalizedQuery = (query || "").trim().toLowerCase();
    const { items } = this.state;

    if (!normalizedQuery) {
      this.setState(
        {
          currentItems: items,
        },
        this.scrollToItems,
      );
      return;
    }

    const filteredItems = items.filter((item) => {
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

  // ============================ Catalog filters ============================

  applyCatalogFilters = ({
    category = this.state.selectedCategory,
    subcategory = this.state.selectedSubcategory,
    searchQuery = this.state.catalogSearchQuery,
  } = {}) => {
    const { items } = this.state;
    const normalizedQuery = (searchQuery || "").trim().toLowerCase();

    let filteredItems = [...items];

    if (category !== "all") {
      filteredItems = filteredItems.filter(
        (item) => item.category === category,
      );
    }

    if (
      subcategory &&
      subcategory !== "all" &&
      !subcategory.startsWith("all-")
    ) {
      filteredItems = filteredItems.filter(
        (item) => item.subcategory === subcategory,
      );
    }

    if (normalizedQuery) {
      filteredItems = filteredItems.filter((item) => {
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
    }

    this.setState({
      currentItems: filteredItems,
      selectedCategory: category,
      selectedSubcategory: subcategory || "all",
      catalogSearchQuery: searchQuery || "",
    });
  };

  handleCategoryFilter = (category, subcategory = "all") => {
    this.applyCatalogFilters({
      category,
      subcategory,
      searchQuery: this.state.catalogSearchQuery,
    });

    requestAnimationFrame(() => {
      this.scrollToItems();
    });
  };

  handleCatalogSearch = (query) => {
    const safeQuery = query || "";

    this.setState({
      catalogSearchQuery: safeQuery,
    });

    if (this.catalogSearchTimeout) {
      clearTimeout(this.catalogSearchTimeout);
    }

    this.catalogSearchTimeout = setTimeout(() => {
      this.applyCatalogFilters({
        category: this.state.selectedCategory,
        subcategory: this.state.selectedSubcategory,
        searchQuery: safeQuery,
      });
    }, 250);
  };

  resetCatalogFilters = () => {
    if (this.catalogSearchTimeout) {
      clearTimeout(this.catalogSearchTimeout);
    }

    this.applyCatalogFilters({
      category: "all",
      subcategory: "all",
      searchQuery: "",
    });

    requestAnimationFrame(() => {
      this.scrollToItems();
    });
  };

  // ============================ Cart methods ============================

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
          cartOpen: true,
        };
      }

      return {
        orders: [...prevState.orders, { ...item, quantity: 1 }],
        cartOpen: true,
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

  // ============================ Helpers ============================

  getTotalQuantity = () => {
    const { orders } = this.state;

    return orders.reduce((sum, order) => sum + (order.quantity || 1), 0);
  };
}

export default App;
