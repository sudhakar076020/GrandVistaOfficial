import { useState } from "react";
import "./styles.css";

// Alert Notification
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (event) => {
    event.preventDefault();

    // Simple email validation
    if (!email.includes("@") || !email.includes(".")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // Fake API call (replace with your backend later)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Thank you for subscribing!");
      setEmail(""); // clear input after success
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <h2 className="newsletter-title">Subscribe for Special Offers</h2>
        <p className="newsletter-subtitle">
          Get exclusive promotions, upcoming events, and chef’s specials
          delivered to your inbox.
        </p>

        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email"
            className="newsletter-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="newsletter-btn" disabled={loading}>
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          style={{ marginTop: "50px" }}
        />
      </div>
    </section>
  );
};

export default Newsletter;
