import React from "react";
import * as GiIcons from "react-icons/gi";

type Props = {
  left: number;
  top: number;
  height: number;
  heading: string;
  image?: string;
  description: string;
  icon: any;
};

const Card = (props: Props) => {
  return (
    <section
      className={` w-[500px] h-[320px] bg-indigo-950 bg-opacity-30 border border-slate-800 shadow-xl rounded-xl p-5  left-[${props.left}%] top-[${props.top}%] `}
    >
      <div className="card-container rounded-md">
        <div className="card-content">
          <span>{props.icon}</span>
          <h1 className="text-white font-bold text-3xl my-4">
            {props.heading}
          </h1>
          <p className="text-slate-300">{props.description}</p>
        </div>
      </div>
    </section>
  );
};

export default Card;
