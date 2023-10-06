import React from "react";

type Props = {};

const Demo = (props: Props) => {
  return (
    <div className="p-12  h-[200vh] mt-32 relative">
      <h1 className="text-7xl font-bold w-full text-center mb-12">
        Our Product
      </h1>
      <div className="flex justify-start items-center relative">
        <img
          src="/mobile.png"
          alt="demo of geoai"
          className="absolute  w-[30%] right-14 top-0"
        />
      </div>
      <img
        src="/mobile (1).png"
        alt="demo of geoai"
        className="absolute  w-[30%] left-12 top-0"
      />
      <h1 className="text-3xl font-thin mt-12 w-full text-center">
        2D/3D Visulaizations <br />
        of Satellite Imagery
      </h1>
      <img
        src="/mobile (2).png"
        alt="demo of geoai"
        className="absolute w-[29%] left-[34%] bottom-[10%]"
      />
    </div>
  );
};

export default Demo;
