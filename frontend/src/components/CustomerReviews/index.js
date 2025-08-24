import "./styles.css";

import { v4 as uuidv4 } from "uuid"; //Unique id
import Slider from "react-slick"; //react-slick a carsoul
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// React Icons
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

// Customer reviews
const customerReviewsList = [
  {
    id: uuidv4(),
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/will-smith-attends-the-opening-ceremony-at-the-red-sea-news-photo-1742225315.pjpeg?crop=1.00xw:0.668xh;0,0.0295xh&resize=640:*",
    name: "Will Smith",
    title: "Actor and Rapper",
    description:
      "The food was absolutely mouthwatering, with every dish bursting with fresh flavors and perfect seasoning. The warm hospitality made me feel right at home, and the inviting ambience made this dining experience one to truly remember forever.",
    social: {
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/",
    },
  },
  {
    id: uuidv4(),
    imageUrl:
      "https://imageio.forbes.com/specials-images/imageserve/68228ccf37333cc86fafb140/0x0.jpg?format=jpg&crop=866,865,x680,y632,safe&height=416&width=416&fit=bounds",
    name: "Lewis Hamilton",
    title: "British racing driver",
    description:
      "A perfect blend of bold flavors, cozy ambience, and genuinely friendly service. Every detail, from the plating to the music, was well thought out. Without a doubt, the best dining experience I’ve enjoyed in many years.",
    social: {
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/",
    },
  },
  {
    id: uuidv4(),
    imageUrl:
      "https://daman.co.id/_next/image?url=https%3A%2F%2Fbackend.daman.co.id%2Fwp-content%2Fuploads%2F2019%2F10%2FRobert-Downey-Jr-Glasses-5.jpg&w=3840&q=75",
    name: "Robert Downey Jr",
    title: "American actor",
    description:
      "Every bite was a delightful burst of flavor, perfectly balanced and beautifully presented. The attention to detail was remarkable, and the staff’s enthusiasm added charm. This restaurant captures both the heart and taste buds effortlessly, leaving lasting memories.",
    social: {
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/",
    },
  },
  {
    id: uuidv4(),
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHH7AKoLtFhhUwMYEPNY2BJOgHMoBdpt0GMA&s",
    name: "Amber Heard",
    title: "Travel Blogger",
    description:
      "From the appetizers to the decadent desserts, every course was flawless. The flavors told a story, the plating was art, and the atmosphere was warm. Truly a hidden gem for food lovers seeking unforgettable experiences.",
    social: {
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/",
    },
  },
  {
    id: uuidv4(),
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYGtU8SSjXCksgesiN_9IHkI2nnZWR-qps7Q&s",
    name: "Andrew Garfield",
    title: "Actor",
    description:
      "You can taste the passion in every dish — fresh, vibrant ingredients combined with bold flavors and perfect seasoning. The atmosphere felt welcoming and refined, creating a dining experience I’ll cherish and recommend to anyone who loves food.",
    social: {
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/",
    },
  },
  {
    id: uuidv4(),
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3YnN-v6SjCJuL0jopYC4BHBLkxo1hOGiKCybhvj-R5CjgKKoEtwWl-hUM5xFbpU43Img&usqp=CAU",
    name: "Elizabeth Olsen",
    title: "American Actress",
    description:
      "The ambience was cozy yet elegant, with soft lighting and thoughtful décor. The food was simply unforgettable, from the first bite to the last. Each flavor was perfectly balanced, leaving me eager to return again soon.",
    social: {
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/",
    },
  },
];

const CustomerReviews = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1, // show 1 card
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500, // 3.5s
    arrows: false,
    adaptiveHeight: true, // avoids layout jumps
    pauseOnHover: true,
  };

  return (
    <div className="customer-reviews-container">
      <h1 className="section-header-title">Customer Reviews</h1>
      <p className="reviews-subtitle">
        “Real experiences from our valued customers”
      </p>
      <div className="review-carousel">
        <Slider {...settings}>
          {customerReviewsList.map((item) => (
            <div key={item.id}>
              <div className="review-card">
                <div className="review-image">
                  <img src={item.imageUrl} alt={item.name} />
                </div>
                <h3>{item.name}</h3>
                <p className="review-role">{item.title}</p>
                <p className="review-text">“{item.description}”</p>
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

export default CustomerReviews;
