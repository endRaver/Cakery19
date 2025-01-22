import video1 from "./vid1/video1.mp4";
import video2 from "./vid2/video2.mp4";
import video3 from "./vid3/video3.mp4";
import video4 from "./vid4/video4.mp4";
import video5 from "./vid5/video5.mp4";
import video6 from "./vid6/video6.mp4";
import video7 from "./vid7/video7.mp4";
import video8 from "./vid8/video8.mp4";

import image1 from "./vid1/video1.jpg";
import image2 from "./vid2/video2.jpg";
import image3 from "./vid3/video3.jpg";
import image4 from "./vid4/video4.jpg";
import image5 from "./vid5/video5.jpg";
import image6 from "./vid6/video6.jpg";
import image7 from "./vid7/video7.jpg";
import image8 from "./vid8/video8.jpg";

type Video = {
  url: string;
  video: string;
  image: string;
};

const videos: Video[] = [
  {
    url: "https://www.instagram.com/p/C4WCb6xqbQd/",
    video: video6,
    image: image6,
  },
  {
    url: "https://www.instagram.com/p/C5TyokvKGjQ/",
    video: video4,
    image: image4,
  },
  {
    url: "https://www.instagram.com/p/CyAcsTBqlOr/",
    video: video8,
    image: image8,
  },
  {
    url: "https://www.instagram.com/p/DC92hXaOCEY/",
    video: video1,
    image: image1,
  },
  {
    url: "https://www.instagram.com/p/C9Et5ufqvEM/",
    video: video2,
    image: image2,
  },
  {
    url: "https://www.instagram.com/p/C6g-eCwK2Qi/",
    video: video3,
    image: image3,
  },

  {
    url: "https://www.instagram.com/p/C04zbZUKRFx/",
    video: video7,
    image: image7,
  },
  {
    url: "https://www.instagram.com/p/C404nkTsP_k/",
    video: video5,
    image: image5,
  },
];

export default videos;
