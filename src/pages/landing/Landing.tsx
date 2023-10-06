import React from "react";
import style from "./landing.module.css";
import Navbar from "../../components/nav/Navbar";
import Heading from "../../components/Landing/Heading/Heading";
import About from "../../components/Landing/About/About";
import Resources from "../../components/Landing/Resources/Resources";
import Demo from "../../components/Landing/Demo/Demo";

type Props = {};

const Landing = (props: Props) => {
  return (
    <div>
      <Navbar />
      <Heading />
      <Demo />
      <About />
      <Resources />
    </div>
  );
};

export default Landing;
