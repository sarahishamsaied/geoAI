import React from "react";
import style from "./navbar.module.css";
type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className={`${style.navbar}`}>
      <ul className={`${style.navLinks}`}>
        <li>Home</li>
        <li>Map</li>
        <li>Chart</li>
      </ul>
    </nav>
  );
};

export default Navbar;
