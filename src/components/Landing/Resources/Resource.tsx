import React from "react";

type Props = {
  name: string;
  description: string;
  link: string;
};

const Resource = (props: Props) => {
  return (
    <div className="p-3 shadow-xl border-0 border-b-slate-800">
      <h2 className="text-3xl font-bold">{props.name}</h2>
      <p>{props.description}</p>
    </div>
  );
};

export default Resource;
