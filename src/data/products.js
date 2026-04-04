const items = [
  {
    id: 1,
    title: "Трусики Бразилійки Acousma",
    desc: "Трусики бразилійки Acousma з високою посадкою та мереживом. Виготовлені з м'якого матеріалу, що забезпечує комфорт протягом усього дня. Ідеально підходять для повсякденного носіння та особливих випадків.",
    category: "pants",
    colors: {
      black: {
        label: "Чорний",
        hex: "#111111",
        images: ["item1.jpg", "item1-2.jpg"],
      },
      white: {
        label: "Білий",
        hex: "#f5f5f5",
        images: ["item1-white.jpg"],
      },
    },
    sizes: [
      { value: "M", available: true },
      { value: "L", available: true },
      { value: "XL", available: false },
      { value: "XXL", available: false },
    ],
    price: 220,
    image: "item1.jpg",
  },
  {
    id: 2,
    title: "Балконет Acousma",
    desc: "Балконет Acousma з високою посадкою та мереживом. Виготовлені з м'якого матеріалу, що забезпечує комфорт протягом усього дня. Ідеально підходять для повсякденного носіння та особливих випадків.",
    category: "bras",
    colors: {
      black: {
        label: "Чорний",
        hex: "#111111",
        images: ["item2.jpg", "item2-2.jpg"],
      },
      white: {
        label: "Білий",
        hex: "#f5f5f5",
        images: ["item2-white.jpg"],
      },
    },
    sizes: [
      { value: "S", available: true },
      { value: "M", available: true },
      { value: "L", available: true },
    ],
    price: 750,
    image: "item2.jpg",
  },
  {
    id: 3,
    title: "Гіпюрові трусики від Acousma",
    desc: "Гіпюрові трусики від Acousma з високою посадкою та мереживом. Виготовлені з м'якого матеріалу, що забезпечує комфорт протягом усього дня. Ідеально підходять для повсякденного носіння та особливих випадків.",
    category: "pants",
    colors: {
      black: {
        label: "Чорний",
        hex: "#111111",
        images: ["item3.jpg", "item3-2.jpg"],
      },
      white: {
        label: "Білий",
        hex: "#f5f5f5",
        images: ["item3-white.jpg"],
      },
    },
    sizes: [
      { value: "S", available: true },
      { value: "M", available: true },
      { value: "L", available: true },
    ],
    price: 250,
    image: "item3.jpg",
  },
  {
    id: 4,
    title: "Комплект без паралону з портупеєю",
    desc: "Комплект без паралону з портупеєю. Ідеально підходять для повсякденного носіння та особливих випадків.",
    category: "sets",
    colors: {
      black: {
        label: "Чорний",
        hex: "#111111",
        images: ["item4.jpg", "item4-2.jpg"],
      },
      white: {
        label: "Білий",
        hex: "#f5f5f5",
        images: ["item4-white.jpg"],
      },
    },
    sizes: [
      { value: "S", available: true },
      { value: "M", available: true },
      { value: "L", available: true },
    ],
    price: 950,
    image: "item4.jpg",
  },
  {
    id: 5,
    title: "Останні штуки❤️",
    desc: "Останні штуки❤️. Ідеально підходять для повсякденного носіння та особливих випадків.",
    category: "sets",
    colors: {
      black: {
        label: "Чорний",
        hex: "#111111",
        images: ["item5.jpg", "item5-2.jpg"],
      },
      white: {
        label: "Білий",
        hex: "#f5f5f5",
        images: ["item5-white.jpg"],
      },
    },
    sizes: [
      { value: "S", available: true },
      { value: "M", available: true },
      { value: "L", available: true },
    ],
    price: 950,
    image: "item5.jpg",
  },
  {
    id: 6,
    title: "Бюстгальтер на формованій чашці мереживний від Acousma❤️",
    desc: "Бюстгальтер на формованій чашці мереживний від Acousma❤️. Ідеально підходять для повсякденного носіння та особливих випадків.",
    category: "bras",
    colors: {
      black: {
        label: "Чорний",
        hex: "#111111",
        images: ["item6.jpg", "item6-2.jpg"],
      },
      white: {
        label: "Білий",
        hex: "#f5f5f5",
        images: ["item6-white.jpg"],
      },
    },
    sizes: [
      { value: "S", available: true },
      { value: "M", available: true },
      { value: "L", available: true },
    ],
    price: 750,
    image: "item6.jpg",
  },
];

export default items;
