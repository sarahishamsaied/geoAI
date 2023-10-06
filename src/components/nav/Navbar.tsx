import React, { useEffect } from "react";
import { Link } from "react-router-dom";

type Props = {};

const Navbar = (props: Props) => {
  useEffect(() => {
    const nav = document.querySelector("nav");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        nav?.classList.add("bg-white");
        nav?.classList.add("bg-opacity-100");
        nav?.classList.add("text-black");
        nav?.classList.add("shadow-2xl");
        // transistion
        nav?.classList.add("transition");
      } else {
        nav?.classList.remove("bg-white");
        nav?.classList.remove("bg-opacity-5");
        nav?.classList.remove("text-black");
        nav?.classList.remove("shadow-2xl");
      }
    });
  });
  return (
    <nav className="flex justify-between items-center bg-white bg-opacity-5  w-screen fixed top-0 left-0 px-8 py-5 shadow-2xl">
      <div className="logo-container w-[20%]">
        <h1 className="font-bold text-3xl">team metis</h1>
      </div>
      <div className="nav-links flex justify-end gap-4  items-center w-[60%]">
        <Link to="/">Home</Link>
        <Link to="/2d/dashboard">2D</Link>
        <Link to="/3d/dashboard">3D</Link>
        <Link to="#">About</Link>
        <Link to="#">Resources</Link>
      </div>
    </nav>
  );
};

export default Navbar;
