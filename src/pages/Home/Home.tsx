import React from "react";
import MapComponent from "../../components/Map/Map";
import Map2 from "../../components/Map/Map2";
import LineChartComponent from "../../components/LineChart/LineChart";
import Navbar from "../../components/Navigation/Navbar";
type Props = {};

const Home = (props: Props) => {
  return (
    <section className=" overflow-hidden">
      <Navbar />
      <Map2 />
    </section>
  );
};

export default Home;
