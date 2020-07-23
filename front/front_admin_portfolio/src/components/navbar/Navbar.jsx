import React from "react";
import { Nav, NavItem } from "reactstrap";
import Mawjo_logo from "../img/Mawjo_logo.svg";
import { Link } from "react-router-dom";

import iconDashboard from "../img/dashboard_icon.svg";
import iconProjets from "../img/projets_icon1.svg";
import iconContact from "../img/contact_icon.svg";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={`text-center ${styles.bkgNavbar}`}>
      <Nav vertical>
        <img
          src={Mawjo_logo}
          className={`${styles.AppLogo} pt-5 `}
          alt="logo"
        />
        <NavItem className="mt-5">
          <Link to="/">
            <img width="30" src={iconDashboard} alt="dashboard" />
          </Link>
        </NavItem>
        <NavItem className="mt-5">
          <Link to="/projets">
            <img width="30" src={iconProjets} alt="projets" />
          </Link>
        </NavItem>
        <NavItem className="mt-5">
          <Link to="/contact">
            <img width="30" src={iconContact} alt="contact" />
          </Link>
        </NavItem>
      </Nav>
    </div>
  );
};

export default Navbar;
