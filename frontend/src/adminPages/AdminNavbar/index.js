import "./styles.css";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Link } from "react-router-dom";

import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";

const AdminNavbarLinks = [
  { id: 1, label: "Food Panel", path: "/admin/food-panel" },
  { id: 2, label: "Reservations", path: "/admin/reservations" },
  { id: 3, label: "Users", path: "/admin/usersList" },
];

const AdminNavbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-logo">GrandVista.</div>

      {/* Desktop menu */}
      <ul className="admin-navbar-list">
        {AdminNavbarLinks.map((link) => (
          <Link to={link.path} key={link.id}>
            <li className="navbar-item">{link.label}</li>
          </Link>
        ))}
      </ul>

      {/* Small device menu */}
      <div className="popup-wrapper">
        <Popup
          trigger={(open) => (
            <button className="hamburger_close-button" type="button">
              {open ? (
                <IoCloseOutline className="close-icon" />
              ) : (
                <RxHamburgerMenu className="hamburger-icon" />
              )}
            </button>
          )}
          modal
          closeOnDocumentClick
          overlayStyle={{ background: "rgba(0, 0, 0, 0.6)" }}
          contentStyle={{
            padding: 0,
            border: "none",
            background: "transparent",
          }}
        >
          {(close) => (
            <div className="drawer-popup">
              <button className="drawer-close-btn" onClick={close}>
                <IoCloseOutline className="close-icon" />
              </button>
              <ul className="drawer-menu-list">
                {AdminNavbarLinks.map((link, index) => (
                  <Link to={link.path} onClick={close}>
                    <li className="drawer-item">{link.label}</li>
                  </Link>
                ))}
              </ul>
              <div className="drawer-footer">
                <div className="drawer-footer-line"></div>
                <p>
                  © 2025 GrandVista by
                  <span className="developer-name"> Sudhakar</span>
                </p>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </nav>
  );
};

export default AdminNavbar;
