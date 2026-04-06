const items = [
  {
    id: 1,
    slug: "acousma-brazilian-briefs",
    sku: "AC-PANT-001",
    title: "Трусики Бразилійки Acousma",
    brand: "Acousma",

    shortDescription: "Бразилійки з мереживом та комфортною посадкою.",
    description:
      "Трусики бразилійки Acousma з високою посадкою та мереживом. Виготовлені з м'якого матеріалу, що забезпечує комфорт протягом усього дня.",

    category: "pants",
    subcategory: "pants5",

    price: 220,
    oldPrice: null,

    badges: {
      isNew: false,
      isSale: false,
      isTop: false,
    },

    composition: "90% поліамід, 10% еластан",
    care: "Ручне прання до 30°C",

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

    inStock: true,
    image: "item1.jpg",
  },

  {
    id: 2,
    slug: "acousma-balconette-bra",
    sku: "AC-BRA-002",
    title: "Балконет Acousma",
    brand: "Acousma",

    shortDescription: "Мереживний балконет з підтримкою.",
    description:
      "Балконет Acousma з мереживом і комфортною посадкою. Добре підтримує груди та ідеально підходить під відкритий одяг.",

    category: "bras",
    subcategory: "bras1",

    price: 750,
    oldPrice: 890,

    badges: {
      isNew: false,
      isSale: true,
      isTop: true,
    },

    composition: "85% поліамід, 15% еластан",
    care: "Делікатне прання до 30°C",

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

    inStock: true,
    image: "item2.jpg",
  },

  {
    id: 3,
    slug: "balaloum-lace-set",
    sku: "BL-SET-001",
    title: "Комплект Balaloum",
    brand: "Balaloum",

    shortDescription: "Мереживний комплект білизни.",
    description:
      "Стильний комплект Balaloum з ніжного мережива. Ідеально підходить для особливих випадків.",

    category: "sets",
    subcategory: "sets2",

    price: 990,
    oldPrice: 1200,

    badges: {
      isNew: true,
      isSale: true,
      isTop: false,
    },

    composition: "90% поліамід, 10% еластан",
    care: "Ручне прання",

    colors: {
      black: {
        label: "Чорний",
        hex: "#111111",
        images: ["item3.jpg", "item3-2.jpg"],
      },
      red: {
        label: "Червоний",
        hex: "#c1121f",
        images: ["item3-red.jpg"],
      },
    },

    sizes: [
      { value: "S", available: true },
      { value: "M", available: true },
      { value: "L", available: false },
    ],

    inStock: true,
    image: "item3.jpg",
  },

  {
    id: 4,
    slug: "lora-iris-soft-bra",
    sku: "LI-BRA-001",
    title: "Бюстгальтер Lora Iris",
    brand: "Lora Iris",

    shortDescription: "М'який бюстгальтер без кісточок.",
    description:
      "Зручний бюстгальтер Lora Iris без кісточок для максимального комфорту протягом дня.",

    category: "bras",
    subcategory: "bras6",

    price: 680,
    oldPrice: null,

    badges: {
      isNew: true,
      isSale: false,
      isTop: false,
    },

    composition: "80% поліамід, 20% еластан",
    care: "Делікатне прання",

    colors: {
      beige: {
        label: "Бежевий",
        hex: "#e6ccb2",
        images: ["item4.jpg"],
      },
    },

    sizes: [
      { value: "S", available: true },
      { value: "M", available: true },
      { value: "L", available: true },
    ],

    inStock: true,
    image: "item4.jpg",
  },

  {
    id: 5,
    slug: "acousma-high-waist-pants",
    sku: "AC-PANT-002",
    title: "Трусики з високою посадкою",
    brand: "Acousma",

    shortDescription: "Комфортні трусики з високою посадкою.",
    description:
      "Ідеальні для щоденного носіння трусики з високою посадкою та м'яким матеріалом.",

    category: "pants",
    subcategory: "pants3",

    price: 260,
    oldPrice: null,

    badges: {
      isNew: false,
      isSale: false,
      isTop: true,
    },

    composition: "95% бавовна, 5% еластан",
    care: "Прання до 40°C",

    colors: {
      black: {
        label: "Чорний",
        hex: "#111111",
        images: ["item5.jpg"],
      },
      beige: {
        label: "Бежевий",
        hex: "#e6ccb2",
        images: ["item5-beige.jpg"],
      },
    },

    sizes: [
      { value: "M", available: true },
      { value: "L", available: true },
      { value: "XL", available: true },
    ],

    inStock: true,
    image: "item5.jpg",
  },

  {
    id: 6,
    slug: "easy-light-basic-set",
    sku: "EL-SET-001",
    title: "Комплект Easy Light",
    brand: "Easy Light",

    shortDescription: "Базовий комплект на кожен день.",
    description:
      "Зручний комплект Easy Light для щоденного використання. Легкий, дихаючий матеріал.",

    category: "sets",
    subcategory: "sets1",

    price: 850,
    oldPrice: 990,

    badges: {
      isNew: false,
      isSale: true,
      isTop: false,
    },

    composition: "90% поліамід, 10% еластан",
    care: "Делікатне прання",

    colors: {
      white: {
        label: "Білий",
        hex: "#f5f5f5",
        images: ["item6.jpg"],
      },
    },

    sizes: [
      { value: "S", available: true },
      { value: "M", available: true },
      { value: "L", available: true },
    ],

    inStock: true,
    image: "item6.jpg",
  },
];

export default items;
