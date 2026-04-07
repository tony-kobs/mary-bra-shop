import React from "react";
import Header from "./components/header/Header.js";
import products from "./data/products.js";
import Footer from "./components/layout/Footer";
import Items from "./components/product/Items";
import Categories from "./components/product/Categories";
import FilterProduct from "./components/product/FilterProduct";
import ShowFullItem from "./components/product/ShowFullItem";
import BannerSliders from "./components/layout/BannerSliders";
import PresentationBar from "./components/layout/PresentationBar";
import FloatingCart from "./components/cart/FloatingCart";

const defaultFilters = {
  brand: "all",
  category: "all",
  subcategory: "all",
  color: "all",
  size: "all",
};

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

      filters: defaultFilters,
      headerSearchQuery: "",
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const {
      orders,
      currentItems,
      showFullItem,
      fullItem,
      showFloatingCart,
      cartOpen,
      filters,
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
            onChoose={this.handleCategoryChoose}
            selectedCategory={filters.category}
            selectedSubcategory={filters.subcategory}
          />

          <Items
            items={currentItems}
            onShowItem={this.onShowItem}
            filterSidebar={
              <FilterProduct
                items={products}
                filters={filters}
                onFilterChange={this.handleFilterChange}
                onResetFilters={this.resetCatalogFilters}
              />
            }
          />
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

  getFilteredItems = ({ filters, headerSearchQuery }) => {
    const { items } = this.state;
    const normalizedHeaderQuery = (headerSearchQuery || "")
      .trim()
      .toLowerCase();

    return items.filter((item) => {
      const title = item.title?.toLowerCase() || "";
      const shortDescription = item.shortDescription?.toLowerCase() || "";
      const description = item.description?.toLowerCase() || "";
      const brand = item.brand?.toLowerCase() || "";
      const sku = item.sku?.toLowerCase() || "";
      const itemColors = Object.keys(item.colors || {});
      const itemSizes = Array.isArray(item.sizes)
        ? item.sizes.filter((size) => size.available).map((size) => size.value)
        : [];

      const matchesBrand =
        filters.brand === "all" || item.brand === filters.brand;
      const matchesCategory =
        filters.category === "all" || item.category === filters.category;
      const matchesSubcategory =
        filters.subcategory === "all" ||
        item.subcategory === filters.subcategory;
      const matchesColor =
        filters.color === "all" || itemColors.includes(filters.color);
      const matchesSize =
        filters.size === "all" || itemSizes.includes(filters.size);
      const matchesHeaderSearch =
        !normalizedHeaderQuery ||
        title.includes(normalizedHeaderQuery) ||
        shortDescription.includes(normalizedHeaderQuery) ||
        description.includes(normalizedHeaderQuery) ||
        brand.includes(normalizedHeaderQuery) ||
        sku.includes(normalizedHeaderQuery);

      return (
        matchesBrand &&
        matchesCategory &&
        matchesSubcategory &&
        matchesColor &&
        matchesSize &&
        matchesHeaderSearch
      );
    });
  };

  applyFilters = (
    nextFilters,
    nextHeaderSearchQuery = this.state.headerSearchQuery,
  ) => {
    const filteredItems = this.getFilteredItems({
      filters: nextFilters,
      headerSearchQuery: nextHeaderSearchQuery,
    });

    this.setState({
      filters: nextFilters,
      headerSearchQuery: nextHeaderSearchQuery,
      currentItems: filteredItems,
    });
  };

  handleSearchSubmit = (query) => {
    const safeQuery = query || "";

    this.setState(
      (prevState) => ({
        headerSearchQuery: safeQuery,
        currentItems: this.getFilteredItems({
          filters: prevState.filters,
          headerSearchQuery: safeQuery,
        }),
      }),
      this.scrollToItems,
    );
  };

  handleCategoryChoose = (category, subcategory = "all") => {
    const nextFilters = {
      ...this.state.filters,
      category,
      subcategory,
    };

    this.applyFilters(nextFilters);

    requestAnimationFrame(() => {
      this.scrollToItems();
    });
  };

  handleFilterChange = (field, value) => {
    this.setState((prevState) => {
      const nextFilters = {
        ...prevState.filters,
        [field]: value,
      };

      if (field === "category") {
        nextFilters.subcategory = "all";
      }

      const filteredItems = this.getFilteredItems({
        filters: nextFilters,
        headerSearchQuery: prevState.headerSearchQuery,
      });

      return {
        filters: nextFilters,
        currentItems: filteredItems,
      };
    });
  };

  resetCatalogFilters = () => {
    this.applyFilters(defaultFilters, "");

    requestAnimationFrame(() => {
      this.scrollToItems();
    });
  };

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

  getTotalQuantity = () => {
    const { orders } = this.state;

    return orders.reduce((sum, order) => sum + (order.quantity || 1), 0);
  };
}

export default App;
