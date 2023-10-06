import React from "react";
import style from "./landing.module.css";
import Navbar from "../../components/nav/Navbar";
import Heading from "../../components/Landing/Heading/Heading";
import About from "../../components/Landing/About/About";
import Resources from "../../components/Landing/Resources/Resources";

type Props = {};

const Landing = (props: Props) => {
  return (
    <div>
      <Navbar />
      <Heading />
      <About />
      <Resources />
    </div>
  );
};

export default Landing;
