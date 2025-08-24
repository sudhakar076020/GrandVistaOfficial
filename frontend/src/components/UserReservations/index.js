import "./styles.css";

const reservationDetails = [
  {
    id: 1,
    name: "Sudhakar",
    email: "sudhakar@example.com",
    phone: "123-456-7890",
    noOfGuests: 2,
    date: "2023-10-15",
    time: "19:00",
  },
  {
    id: 2,
    name: "Tony Stark",
    email: "tony@example.com",
    phone: "987-654-3210",
    noOfGuests: 4,
    date: "2023-10-20",
    time: "12:30",
  },
];

const UserReservations = () => {
  return (
    <div className="user-reservations-details-card">
      <h2>Reserved Tables Details</h2>
      {/* Add your reservation details here */}
      <ul className="reservation-list">
        {reservationDetails.length === 0 ? (
          <li className="no-reservation">No reservations found.</li>
        ) : (
          <>
            {reservationDetails.map((reservation) => (
              <li key={reservation.id} className="reservation-item">
                <p>
                  <strong>Name:</strong> {reservation.name}
                </p>
                <p>
                  <strong>Email:</strong> {reservation.email}
                </p>
                <p>
                  <strong>Phone:</strong> {reservation.phone}
                </p>
                <p>
                  <strong>No. of Guests:</strong> {reservation.noOfGuests}
                </p>
                <p>
                  <strong>Date:</strong> {reservation.date}
                </p>
                <p>
                  <strong>Time:</strong> {reservation.time}
                </p>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default UserReservations;
