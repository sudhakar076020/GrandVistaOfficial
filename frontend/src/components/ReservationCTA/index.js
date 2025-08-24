import "./styles.css";
import { useNavigate } from "react-router-dom"; //Navigate = hook to send the user to another route when called.

const ReservationCTA = () => {
  const navigate = useNavigate();

  const handleReserveTable = () => {
    navigate("/tableReservation");
  };
  return (
    <section className="reservation-cta">
      <div className="cta-content">
        <h2 className="cta-title">Book Your Table at GrandVista</h2>
        <p className="cta-text">
          Experience fine dining, curated flavors, and a luxurious atmosphere.
          Reserve your spot today and make your evening unforgettable.
        </p>
        <button className="cta-button" onClick={handleReserveTable}>
          Reserve Now
        </button>
      </div>
    </section>
  );
};

export default ReservationCTA;
