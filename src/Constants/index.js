const NavBar1 = ["HOME", "PURCHASE", "OWNERS", "EXPLORE"];
const NavBar2 = ["RETAILERS", "BUILDS"];

const scrollSectionsdata = [
  {
    title: "BOOK A TEST DRIVE",
    icon: "../../steering.svg",
    description: "Arrange a test drive through your nearest Retailer",
  },
  {
    title: "BUILD YOUR OWN",
    icon: "../../Images/build 2.png",
    description: `Use the configurator to build your perfect Range Rover.`,
  },
  {
    title: "VIEW PRICES",
    icon: "../../Images/book1.png",
    description: "View vehicle prices online.",
  },
  {
    title: "RESERVE ONLINE",
    icon: "../../Images/reserve 2.png",
    description: "Reserve your Land Rover online.",
  },
];

const Editors = [
  {
    name: "Exterior",
    image: "../../skin/Fuji-white.jpg",
  },
  {
    name: "Interior",
    image: "../../skin/Int.png",
  },
  {
    name: "Wheels",
    image: "../../skin/wheel.png",
  },
  {
    name: "Lights",
    image: "../../skin/light.png",
  },
];

const carOptions = {
  Exterior: [
    {
      name: "Fuji White",
      code: "#FFFFFF",
      image: "../../skin/Fuji-white.jpg",
    },
    {
      name: "Santorini Black",
      code: "#2E2E2C",
      image: "../../skin/sentorini-black.jpg",
    },
    {
      name: "Eiger Grey",
      code: "#A6A9AE",
      image: "../../skin/Eiger-grey.jpg",
    },
    {
      name: "Batumi Gold",
      code: "#9B8B6A",
      image: "../../skin/batumi-gold.jpg",
    },
  ],
  Interior: [
    {
      name: "Ivory",
      code: "#F4F2ED",
      // image: "https://example.com/images/ivory_seat.jpg",
    },
    {
      name: "Ebony",
      code: "#0C0C0C",
      // image: "https://example.com/images/ebony_seat.jpg",
    },
    {
      name: "Espresso",
      code: "#4B3A2B",
      // image: "https://example.com/images/espresso_seat.jpg",
    },

    {
      name: "Navy",
      code: "#16273D",
      // image: "https://example.com/images/navy_seat.jpg",
    },
  ],
  Wheels: [
    {
      name: "Premium Glass",
      code: "#A6A6A6",
      // image: "https://example.com/images/21_7_split_spoke.jpg",
    },
    {
      name: "Premium Gold",
      code: "Gold",
      // image: "https://example.com/images/22_9_split_spoke.jpg",
    },
    {
      name: "Premium Navy",
      code: "blue",
      // image: "https://example.com/images/22_5_split_spoke.jpg",
    },
    {
      name: "Premium Rose",
      code: "red",
      // image: "https://example.com/images/21_5_split_spoke.jpg",
    },
  ],
  Lights: [
    {
      name: "Premium LED ",
      code: "#FFFFFF", // Pure White
      // image: "https://example.com/images/premium_led_headlights.jpg",
    },
    {
      name: "Matrix LED ",
      code: "#FFFFE0", // Light Pastel Yellow
      // image: "https://example.com/images/matrix_led_headlights.jpg",
    },
    {
      name: "Pixel LED ",
      code: "#FFD700", // Golden Yellow
      // image: "https://example.com/images/pixel_led_headlights.jpg",
    },
    {
      name: "Pixel-Laser LED ",
      code: "#7ab3fd", // Orange Red
      // image: "https://example.com/images/pixel_laser_led_headlights.jpg",
    },
  ],
};

export { NavBar1, NavBar2, scrollSectionsdata, Editors, carOptions };
