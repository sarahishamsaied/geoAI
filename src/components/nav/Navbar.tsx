import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="flex justify-between items-center bg-white bg-opacity-5  w-screen fixed top-0 left-0 px-8 py-5 shadow-2xl">
      <div className="logo-container w-[20%]">
        <h1 className="font-bold text-4xl">team metis</h1>
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
