import slider1 from "./slider1.jpg";
import slider2 from "./slider2.jpg";
import slider3 from "./slider3.jpg";
import slider4 from "./slider4.jpg";

type Slider = {
  title: string;
  description: string;
  image: string;
};

const sliders: Slider[] = [
  {
    title: "Natural",
    description:
      "Additives and preservatives are never on our menu - memories last better without them.",
    image: slider2,
  },
  {
    title: "Handmade",
    description:
      "One small atelier creates all our delectable products entirely by hand and with the heart.",
    image: slider1,
  },
  {
    title: "Swiss",
    description: "The heart and soul of Sweden - in bite-sized pieces.",
    image: slider3,
  },
  {
    title: "Swiss",
    description: "The heart and soul of Sweden - in bite-sized pieces.",
    image: slider4,
  },
];

export default sliders;
