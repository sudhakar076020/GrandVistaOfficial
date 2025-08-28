import { NavLink } from "react-router-dom";
import { motion } from "framer-motion"; 
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";

import "./index.css";

const NavLinkList = [
  { id: "HOME", linkName: "Home", routePathName: "/home" },
  { id: "DASHBOARD", linkName: "Dashboard", routePathName: "/dashboard" },
  { id: "MENU", linkName: "Menu", routePathName: "/menu" },
  { id: "ABOUT", linkName: "About", routePathName: "/about" },
  { id: "CONTACT", linkName: "Contact", routePathName: "/contact" },
  { id: "BOOKTABLE", linkName: "Book Table", routePathName: "/tableReservation" },
];

const Navbar = () => {
  return (
    <nav className="navbar-container">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <NavLink to="/home">
          <div className="navbar-logo">GrandVista.</div>
        </NavLink>
      </motion.div>

      {/* Desktop menu */}
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: -80 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <ul className="navbar-list">
          {NavLinkList.map((link) => (
            <NavLink
              key={link.id}
              to={link.routePathName}
              className={({ isActive }) =>
                `navbar-item ${isActive ? "active" : ""}`
              }
            >
              {link.linkName}
            </NavLink>
          ))}
        </ul>
      </motion.div>

      {/* Mobile / Small device menu */}
      <div className="popup-wrapper">
        <Popup
          trigger={(open) => (
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <button className="hamburger_close-button" type="button">
                {open ? (
                  <IoCloseOutline className="close-icon" />
                ) : (
                  <RxHamburgerMenu className="hamburger-icon" />
                )}
              </button>
            </motion.div>
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
                {NavLinkList.map((link, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
                    key={link.id}
                  >
                    <NavLink
                      to={link.routePathName}
                      onClick={close}
                      className={({ isActive }) =>
                        `drawer-item ${isActive ? "active" : ""}`
                      }
                    >
                      {link.linkName}
                    </NavLink>
                  </motion.div>
                ))}
              </ul>
              <div className="drawer-footer">
                <motion.div
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2 }}
                >
                  <div className="drawer-footer-line"></div>
                  <p>
                    © 2025 GrandVista by
                    <span className="developer-name"> Sudhakar</span>
                  </p>
                </motion.div>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </nav>
  );
};

export default Navbar;
