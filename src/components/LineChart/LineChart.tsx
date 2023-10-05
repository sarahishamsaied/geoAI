import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import style from "./linechart.module.css";
import disasters, { Disaster } from "../../data/disasters.data";

type Props = {};

const LineChartComponent = (props: Props) => {
  const [year, setYear] = React.useState(2022);
  const [data, setData] = React.useState(disasters);
  const [xAxis, setxAxis] = React.useState("month");
  const [yAxis, setyAxis] = React.useState("disasters");
  React.useEffect(() => {
    const filtered = disasters.filter((disaster) => {
      return disaster.year === year;
    });
    setData(filtered);
  }, [year]);
  return (
    <section className={`${style.lineChart}`}>
      <div className={`${style.headingCard}`}>
        <p>Disasters Chart</p>
        <div className={`${style.options}`}>
          <div
            className={`${style.filter} ${
              xAxis !== "year" && yAxis !== "year" ? "hidden" : "visible"
            }`}
          >
            <label>Filter by year</label>
            <select
              name=""
              id=""
              onChange={(e) => setYear(parseInt(e.target.value))}
            >
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <div className={`${style.filter}`}>
            <label htmlFor="">X-Axis: </label>
            <select
              name=""
              id=""
              onChange={(e) => setxAxis(e.target.value)}
              value={xAxis}
            >
              {Object.keys(disasters[0]).map((key) => (
                <option value={key}>{key}</option>
              ))}
            </select>
          </div>
        </div>
        <LineChart height={200} width={300} data={data}>
          <Line type={"monotone"} dataKey={"disasters"} stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray={"5 5"} />
          <XAxis dataKey={xAxis} />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    </section>
  );
};

export default LineChartComponent;
