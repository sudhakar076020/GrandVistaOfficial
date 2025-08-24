import { Parallax } from "react-parallax";

// Components
import Navbar from "../Navbar";
import OurFoodMenu from "../OurFoodMenu";
import ReservationCTA from "../ReservationCTA";
import Newsletter from "../Newsletter";
import Footer from "../Footer";

// Component parallax banner image
const parallaxBannerImage =
  "https://res.cloudinary.com/dehz5pshe/image/upload/v1755874891/4886_zmh4lw.jpg";

const MenuSection = () => {
  return (
    <>
      <Navbar />
      <Parallax
        bgImage={parallaxBannerImage}
        strength={300}
        className="parallax-banner-card"
      >
        <div className="parallax-banner-box">
          <h2 className="section-header-title">Taste Our Creations</h2>
        </div>
      </Parallax>
      {/* Menu section */}
      <OurFoodMenu />
      {/* ReservationCTA  */}
      <ReservationCTA />
      {/* Newsletter */}
      <Newsletter />
      {/* Footer */}
      <Footer />
    </>
  );
};

export default MenuSection;
