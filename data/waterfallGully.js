/**
 * Central business data for Waterfall Gully Cafe & Nursery.
 * Verified contact and location fields only; menu prices are not published online.
 */

export const waterfallGully = {
  name: "Waterfall Gully Cafe & Nursery",
  shortName: "Waterfall Gully",
  tagline: "Coffee + Food + Plants + Gifts",

  address: {
    street: "87–89 Old Cape Schanck Rd",
    suburb: "Rosebud",
    state: "VIC",
    postcode: "3939",
    country: "Australia",
    formatted: "87–89 Old Cape Schanck Rd, Rosebud VIC 3939, Australia",
  },

  phone: "+61 3 5986 8893",
  phoneTel: "+61359868893",
  phoneDisplay: "03 5986 8893",

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Waterfall+Gully+Cafe+and+Nursery%2C+87-89+Old+Cape+Schanck+Rd%2C+Rosebud+VIC+3939",

  links: {
    linktree: "https://linktr.ee/waterfallgullycafe",
    facebook: "https://www.facebook.com/wfgcafeplants",
    instagram: "https://linktr.ee/waterfallgullycafe",
    youtube: "https://linktr.ee/waterfallgullycafe",
    twitter: "https://linktr.ee/waterfallgullycafe",
    giftCardUrl: "https://linktr.ee/waterfallgullycafe",
    loyaltyUrl: "https://linktr.ee/waterfallgullycafe",
  },

  /** Primary social hub when a platform URL is not listed separately */
  socialHubUrl: "https://linktr.ee/waterfallgullycafe",

  hours: {
    display: [
      { days: "Monday – Friday", hours: "6:00 AM – 4:00 PM" },
      { days: "Saturday", hours: "7:00 AM – 4:00 PM" },
      { days: "Sunday", hours: "Closed" },
      { days: "Public holidays", hours: "Closed" },
    ],
    schema: [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "06:00",
        closes: "16:00",
      },
      {
        dayOfWeek: "Saturday",
        opens: "07:00",
        closes: "16:00",
      },
    ],
    notes: "Hours may change. Please confirm before visiting.",
  },

  nav: [
    { label: "Cafe", href: "#intro" },
    { label: "Menu", href: "#menu" },
    { label: "Nursery", href: "#nursery" },
    { label: "Garden", href: "#outdoor" },
    { label: "Visit", href: "#visit" },
  ],

  images: {
    heroGarden: "/images/waterfall-gully/hero/hero-garden-storefront.png",
    heroTable: "/images/waterfall-gully/hero/hero-cafe-beans.png",
    heroGardenSlides: [
      {
        src: "/images/waterfall-gully/hero/hero-garden-storefront.png",
        alt: "Green cafe storefront with flower planters",
      },
      {
        src: "/images/waterfall-gully/hero/hero-garden-terrace.png",
        alt: "Outdoor cafe terrace at golden hour",
      },
      {
        src: "/images/waterfall-gully/hero/hero-garden-bistro.png",
        alt: "Bistro tables and chairs along the cafe front",
      },
    ],
    heroCafeSlides: [
      {
        src: "/images/waterfall-gully/hero/hero-cafe-beans.png",
        alt: "Coffee cup surrounded by roasted beans",
      },
      {
        src: "/images/waterfall-gully/hero/hero-cafe-window.png",
        alt: "Latte by the window with garden view",
      },
    ],
    heroForegroundLeft: "/images/waterfall-gully/hero/hero-foreground-left.svg",
    heroForegroundRight: "/images/waterfall-gully/hero/hero-foreground-right.svg",
    foliageLeft: "/images/waterfall-gully/details/foliage-left.svg",
    foliageRight: "/images/waterfall-gully/details/foliage-right.svg",
    leafShadow: "/images/waterfall-gully/details/leaf-shadow.svg",
  },

  menu: {
    note: "Prices are not listed online — ask in cafe for today's pricing and specials.",
    categories: [
      {
        id: "breakfast",
        title: "Breakfast",
        items: [
          { name: "Homemade Rosti", price: null, status: "ASK IN CAFE" },
          { name: "Eggs Benedict", price: null, status: "ASK IN CAFE" },
          { name: "Egg & Bacon Roll", price: null, status: "ASK IN CAFE" },
          { name: "Egg Roll", price: null, status: "ASK IN CAFE" },
          { name: "Bacon Roll", price: null, status: "ASK IN CAFE" },
          { name: "Brekky Wrap", price: null, status: "ASK IN CAFE" },
          { name: "Breakfast Sandwiches", price: null, status: "ASK IN CAFE" },
        ],
      },
      {
        id: "light-meals",
        title: "Light meals",
        items: [
          { name: "Quiche", price: null, status: "ASK IN CAFE" },
          { name: "Pizza", price: null, status: "ASK IN CAFE" },
          { name: "Nachos", price: null, status: "ASK IN CAFE" },
          { name: "Salad Roll", price: null, status: "ASK IN CAFE" },
        ],
      },
      {
        id: "cabinet",
        title: "Cabinet",
        items: [
          { name: "Sausage Roll", price: null, status: "ASK IN CAFE" },
          { name: "Croissant", price: null, status: "ASK IN CAFE" },
          { name: "Rolls", price: null, status: "ASK IN CAFE" },
          { name: "Homemade Scones", price: null, status: "ASK IN CAFE" },
        ],
      },
      {
        id: "drinks",
        title: "Drinks",
        items: [
          { name: "Latte", price: null, status: "ASK IN CAFE" },
          { name: "Mocha", price: null, status: "ASK IN CAFE" },
          { name: "Matcha Latte", price: null, status: "ASK IN CAFE" },
          { name: "Coffee", price: null, status: "ASK IN CAFE" },
          { name: "Tea", price: null, status: "ASK IN CAFE" },
          { name: "Juice", price: null, status: "ASK IN CAFE" },
          { name: "Smoothies", price: null, status: "ASK IN CAFE" },
          { name: "Devonshire Tea", price: null, status: "ASK IN CAFE" },
        ],
      },
    ],
  },

  nursery: {
    intro:
      "Wander the aisles for coastal-friendly plants, pots, and little gifts — the nursery sits alongside the cafe on Old Cape Schanck Road.",
    aisles: [
      {
        id: "indoor-plants",
        name: "Indoor & foliage",
        description:
          "Hardy indoor favourites and lush foliage for brightening kitchens, patios, and holiday homes.",
        image: "/images/waterfall-gully/nursery-indoor-plants.jpg",
      },
      {
        id: "outdoor-native",
        name: "Outdoor & native",
        description:
          "Coastal and Peninsula-suited natives, shrubs, and structural plants for gardens that handle sea air.",
        image: "/images/waterfall-gully/nursery-outdoor-native.jpg",
      },
      {
        id: "herbs-edibles",
        name: "Herbs & edibles",
        description:
          "Herbs, seasonal veg seedlings, and edible picks to pair with a morning coffee run.",
        image: "/images/waterfall-gully/nursery-herbs-edibles.jpg",
      },
      {
        id: "pots-planters",
        name: "Pots & planters",
        description:
          "Terracotta, glazed, and lightweight pots — sizes for balconies through to backyard beds.",
        image: "/images/waterfall-gully/nursery-pots-planters.jpg",
      },
      {
        id: "gifts-homewares",
        name: "Gifts & homewares",
        description:
          "Small gifts, cards, and homewares tucked through the nursery — easy add-ons with your plant haul.",
        image: "/images/waterfall-gully/nursery-gifts-homewares.jpg",
      },
      {
        id: "seasonal-color",
        name: "Seasonal colour",
        description:
          "Rotating seasonal colour — annuals and bedding that shift with the Peninsula calendar.",
        image: "/images/waterfall-gully/nursery-seasonal-color.jpg",
      },
    ],
  },

  gallery: [
    {
      src: "/images/waterfall-gully/gallery/01.jpg",
      alt: "Garden cafe atmosphere mood photography",
      category: "cafe",
    },
    {
      src: "/images/waterfall-gully/gallery/02.jpg",
      alt: "Morning coffee mood photography",
      category: "cafe",
    },
    {
      src: "/images/waterfall-gully/gallery/03.jpg",
      alt: "Plant nursery aisle mood photography",
      category: "nursery",
    },
    {
      src: "/images/waterfall-gully/gallery/04.jpg",
      alt: "Brunch plate mood photography",
      category: "food",
    },
    {
      src: "/images/waterfall-gully/gallery/05.jpg",
      alt: "Indoor plants mood photography",
      category: "nursery",
    },
    {
      src: "/images/waterfall-gully/gallery/06.jpg",
      alt: "Scones and tea mood photography",
      category: "food",
    },
    {
      src: "/images/waterfall-gully/gallery/07.jpg",
      alt: "Cafe seating among greenery mood photography",
      category: "visit",
    },
    {
      src: "/images/waterfall-gully/gallery/08.jpg",
      alt: "Outdoor garden table mood photography",
      category: "visit",
    },
  ],

  feedback: {
    disclaimer:
      "Themes below paraphrase publicly visible customer comments; wording is summarised and not verbatim quotes.",
    label: "PUBLIC CUSTOMER FEEDBACK",
    themes: [
      {
        id: "coffee-morning-stop",
        theme: "Reliable morning coffee stop",
        summary:
          "Visitors often mention friendly barista service and a dependable coffee on the way to work or the beach.",
      },
      {
        id: "breakfast-portions",
        theme: "Hearty breakfast and cabinet picks",
        summary:
          "Comments frequently highlight generous breakfast plates, rosti, and cabinet items like scones and rolls.",
      },
      {
        id: "nursery-combo",
        theme: "Cafe and nursery in one trip",
        summary:
          "Many reviewers appreciate combining a meal or coffee with browsing plants, pots, and small gifts in the same visit.",
      },
      {
        id: "local-welcome",
        theme: "Welcoming local feel",
        summary:
          "Feedback commonly describes a relaxed, neighbourhood atmosphere — handy for locals and holiday makers on the Peninsula.",
      },
      {
        id: "garden-advice",
        theme: "Helpful plant browsing",
        summary:
          "Nursery visitors note a practical range for coastal gardens and an easy wander through the aisles after coffee.",
      },
    ],
  },

  seo: {
    title: "Waterfall Gully Cafe & Nursery | Rosebud",
    description:
      "Coffee, food, plants and gifts at Waterfall Gully Cafe & Nursery on Old Cape Schanck Road in Rosebud.",
    locale: "en_AU",
  },

  ctas: {
    primary: { label: "Get directions", hrefKey: "mapsUrl" },
    secondary: { label: "Call the cafe", hrefKey: "phoneTel" },
    linkHub: { label: "Link hub — gifts & loyalty", hrefKey: "linktree" },
  },
};

/** @typedef {typeof waterfallGully} WaterfallGullyData */

export default waterfallGully;
