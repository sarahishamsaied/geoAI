import React from "react";
import style from "./heading.module.css";

type Props = {};

const Heading = (props: Props) => {
  return (
    <section className={`${style.section}`}>
      <h1>
        <span className="font-bold">GeoAI Challenge:</span> Unleashing the Power
        of Geospatial Data
      </h1>

      <button className=" bg-blue-600 font-bold text-white p-4 px-6 rounded-md border-none outline-none hover:bg-blue-500">
        Explore
      </button>
    </section>
  );
};

export default Heading;
