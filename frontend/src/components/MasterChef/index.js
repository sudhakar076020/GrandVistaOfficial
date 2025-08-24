import "./styles.css";
import Slider from "react-slick"; //react-slick a carsoul
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from "uuid";

// React Icons
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const masterChefsList = [
  {
    id: uuidv4(),
    chefName: "K Damodharan",
    chefImageUrl:
      "https://fcicsouth.industrylive.in/wp-content/uploads/2017/02/3.png.webp",
    chefRole: "Head Chef",
    chefQuote: "Cooking is all about passion and patience.",
    chefSocial: {
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/",
    },
  },
  {
    id: uuidv4(),
    chefName: "Garima Arora",
    chefImageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBoSTyY7_cRz_j1jd9B3UlRzC1ylshdFH6Igp9whIwadyXgdtHSWPkdKOhV2WdIf8xcbU&usqp=CAU",
    chefRole: "Sous Chef",
    chefQuote: "Every dish tells a story of culture and love.",
    chefSocial: {
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/",
    },
  },
  {
    id: uuidv4(),
    chefName: "Saransh Goila",
    chefImageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnB-zR2CDRCGtnF_aXqK3mbnY7tuHsFnwG8w&s",
    chefRole: "Pastry Chef",
    chefQuote: "Desserts are the art of happiness on a plate.",
    chefSocial: {
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/",
    },
  },
  {
    id: uuidv4(),
    chefName: "Sanjeev Kapoor",
    chefImageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQijb5C0GO6pszid3I6GOptbv5JeXy9adU5g&s",
    chefRole: "Grill Master",
    chefQuote: "Spice and love make the perfect recipe.",
    chefSocial: {
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/",
    },
  },
  {
    id: uuidv4(),
    chefName: "Ranveer Brar",
    chefImageUrl:
      "https://www.entrepreneurindia.com/influencer/images/ranbeer.jpg",
    chefRole: "Seafood Specialist",
    chefQuote: "Innovation in cooking comes from the heart.",
    chefSocial: {
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/",
    },
  },
  {
    id: uuidv4(),
    chefName: "Shreeya Adka",
    chefImageUrl:
      "https://media.licdn.com/dms/image/v2/C5603AQH-CF7QmWmHgA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1517061654141?e=2147483647&v=beta&t=QLhRE1k9HROGjcLh5bk7QxIzMomOVHqKFPQyHfrIFVc",
    chefRole: "Spice & Curry Expert",
    chefQuote: "Food is the bridge between cultures.",
    chefSocial: {
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/",
    },
  },
];

const MasterChefs = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 2, // default (desktop)
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    adaptiveHeight: true,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1024, // tablets & small laptops
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // tablets
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="masterChef-container">
      <h1 className="section-header-title">Our Master Chef's</h1>
      <p className="masterChef-subtitle">
        “Meet the Artists Behind the Flavors”
      </p>
      <div className="masterChef-carousel">
        <Slider {...settings}>
          {masterChefsList.map((chef) => (
            <div key={chef.id}>
              <div className="masterChef-card">
                <div className="masterChef-image">
                  <img src={chef.chefImageUrl} alt={chef.chefName} />
                </div>
                <h3>{chef.chefName}</h3>
                <p className="masterChef-role">{chef.chefRole}</p>
                <p className="masterChef-text">“{chef.chefQuote}”</p>
                {/* Social media icons card */}
                <div className="social">
                  <div className="social-icons-card">
                    <a href="#">
                      <FaFacebookF className="social-icons" />
                    </a>
                    <a href="#">
                      <FaInstagram className="social-icons" />
                    </a>
                    <a href="#">
                      <FaTwitter className="social-icons" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MasterChefs;
