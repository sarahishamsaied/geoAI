import React from "react";
import Resource from "./Resource";

type Props = {};

const Resources = (props: Props) => {
  return (
    <div className="resources flex flex-col p-12">
      <h1 className="font-bold text-4xl">Resources</h1>
      <a href="https://challenge.xviewdataset.org/data-explore">
        xView Dataset
      </a>
      <a href="https://www.kaggle.com/datasets/rhammell/ships-in-satellite-imagery">
        https://www.kaggle.com/datasets/rhammell/ships-in-satellite-imagery
      </a>
      <a href="https://registry.opendata.aws/spacenet/">SpaceNet Registry</a>
      <a href="https://spacenet.ai/">SpaceNet AI</a>
      <a href="https://solaris.readthedocs.io/en/latest/pretrained_models.html#pretrained-models">
        Pretrained Models
      </a>
      <a href="https://www.kaggle.com/datasets/rhammell/ships-in-satellite-imagery">
        Ships in Satellite Imagery
      </a>
      <a href="https://www.cs.toronto.edu/~vmnih/data/">
        Aerial Images of Massachusetts
      </a>
      <a href="https://www.kaggle.com/datasets/balraj98/massachusetts-roads-dataset">
        Massachusetts Roads Dataset
      </a>
      <a href="https://www.kaggle.com/datasets/balraj98/massachusetts-buildings-dataset">
        Massachusetts Buildings Dataset
      </a>
      <a href="https://www.cs.toronto.edu/~vmnih/docs/Mnih_Volodymyr_PhD_Thesis.pdf">
        Mnih_Volodymyr_PhD_Thesis.pdf
      </a>
      <a href="https://torchgeo.readthedocs.io/en/stable/api/datasets.html">
        TorchGeo Dataset Imagery
      </a>
      <a href="https://www.kaggle.com/datasets/balraj98/deepglobe-land-cover-classification-dataset">
        DeepGlobe Land Cover Classification Dataset
      </a>
      <a href="https://www.kaggle.com/datasets/claytonmiller/rasterized-building-footprints-for-usa">
        Rasterized Building Footprints for the USA
      </a>
      <a href="https://nasa-impact.github.io/etci2021/">
        ETCI 2021 Competition on Flood Detection
      </a>
      <a href="https://nasa-impact.github.io/etci2021/">
        ETCI 2021 Competition on Flood Detection
      </a>
    </div>
  );
};

export default Resources;
