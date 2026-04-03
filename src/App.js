import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";
import BannerSliders from "./components/BannerSliders";
import PresentationBar from "./components/PresentationBar";
import { FaBagShopping } from "react-icons/fa6";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      currentItems: [],
      items: [
        {
          id: 1,
          title: "Трусики Бразилійки Acousma",
          desc: "Трусики бразилійки Acousma з високою посадкою та мереживом. Виготовлені з м'якого матеріалу, що забезпечує комфорт протягом усього дня. Ідеально підходять для повсякденного носіння та особливих випадків.",
          category: "pants",
          price: 220,
          image: "item1.jpg",
        },
        {
          id: 2,
          title: "Балконет Acousma",
          desc: "Балконет Acousma з високою посадкою та мереживом. Виготовлені з м'якого матеріалу, що забезпечує комфорт протягом усього дня. Ідеально підходять для повсякденного носіння та особливих випадків.",
          category: "bras",
          price: 750,
          image: "item2.jpg",
        },
        {
          id: 3,
          title: "Гіпюрові трусики від Acousma",
          desc: "Гіпюрові трусики від Acousma з високою посадкою та мереживом. Виготовлені з м'якого матеріалу, що забезпечує комфорт протягом усього дня. Ідеально підходять для повсякденного носіння та особливих випадків.",
          category: "pants",

          price: 250,
          image: "item3.jpg",
        },
        {
          id: 4,
          title: "Комплект без паралону з портупеєю",
          desc: "Комплект без паралону з портупеєю. Ідеально підходять для повсякденного носіння та особливих випадків.",
          category: "sets",
          price: 950,
          image: "item4.jpg",
        },
        {
          id: 5,
          title: "Останні штуки❤️",
          desc: "Останні штуки❤️. Ідеально підходять для повсякденного носіння та особливих випадків.",
          category: "sets",
          price: 950,
          image: "item5.jpg",
        },
        {
          id: 6,
          title: "Бюстгальтер на формованій чашці мереживний від Acousma❤️",
          desc: "Бюстгальтер на формованій чашці мереживний від Acousma❤️. Ідеально підходять для повсякденного носіння та особливих випадків.",
          category: "bras",
          price: 750,
          image: "item6.jpg",
        },
      ],
      showFullItem: false,
      fullItem: {},
      showFloatingCart: true,
      cartOpen: false,
    };
    this.state.currentItems = this.state.items;
    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.chooseSubcategory = this.chooseSubcategory.bind(this);
    this.onShowItem = this.onShowItem.bind(this);
    this.cartRef = React.createRef();
    this.scrollToHeader = this.scrollToHeader.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const scrollY = window.scrollY;

    this.setState({
      showFloatingCart: scrollY > 120,
    });
  };

  render() {
    const totalQuantity = this.state.orders.reduce(
      (sum, order) => sum + (order.quantity || 1),
      0,
    );
    return (
      <div className="container">
        <Header
          orders={this.state.orders}
          onDelete={this.deleteOrder}
          cartOpen={this.state.cartOpen}
          setCartOpen={(value) => this.setState({ cartOpen: value })}
        />
        <main>
          <PresentationBar />
          <BannerSliders />
          <Categories
            onChoose={this.chooseCategory}
            onChooseSubcategory={this.chooseSubcategory}
          />
          <Items
            items={this.state.currentItems}
            onAdd={this.addToOrder}
            onShowItem={this.onShowItem}
          />
        </main>

        {this.state.showFullItem && (
          <ShowFullItem
            onAdd={this.addToOrder}
            item={this.state.fullItem}
            onShowItem={this.onShowItem}
          />
        )}

        {totalQuantity > 0 && this.state.showFloatingCart && (
          <div
            className="floating-cart"
            onClick={() => {
              this.scrollToHeader();
              this.onShowItem(null);
            }}
          >
            <FaBagShopping className="floating-cart-icon" />
            <span className="cart-count">{totalQuantity}</span>
          </div>
        )}

        <Footer />
      </div>
    );
  }

  scrollToHeader() {
    const header = document.getElementById("header");
    if (header) {
      header.scrollIntoView({ behavior: "smooth" });
    }

    this.setState({ cartOpen: true });
  }

  onShowItem(item) {
    this.setState({
      fullItem: item,
      showFullItem: !!item,
    });
  }

  addToOrder(item) {
    const existing = this.state.orders.find((order) => order.id === item.id);
    if (existing) {
      this.setState({
        orders: this.state.orders.map((order) =>
          order.id === item.id
            ? { ...order, quantity: (order.quantity || 1) + 1 }
            : order,
        ),
      });
    } else {
      this.setState({
        orders: [...this.state.orders, { ...item, quantity: 1 }],
      });
    }
  }

  deleteOrder(id) {
    this.setState({
      orders: this.state.orders
        .map((order) =>
          order.id === id ? { ...order, quantity: order.quantity - 1 } : order,
        )
        .filter((order) => order.quantity > 0),
    });
  }

  chooseCategory(category) {
    if (category === "all") {
      this.setState({ currentItems: this.state.items });
      return;
    }

    this.setState({
      currentItems: this.state.items.filter(
        (item) => item.category === category,
      ),
    });
  }

  chooseSubcategory = (category, subcategory) => {
    this.setState({
      currentItems: this.state.items.filter(
        (item) =>
          item.category === category && item.subcategory === subcategory,
      ),
    });
  };
}

export default App;
