import React, { useEffect } from "react";
import { loadModules } from "esri-loader";
import axios from "axios";

const sensors = {
  "Landsat 8": {
    url: "https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer",
    bandIds: [
      { Coastal: 1 },
      { Blue: 2 },
      { Green: 3 },
      { Red: 4 },
      { NIR: 5 },
      { SWIR1: 6 },
      { SWIR2: 7 },
      { Cirrus: 8 },
    ],
  },
  "Sentinel 2": {
    url: "https://sentinel.arcgis.com/arcgis/rest/services/Sentinel2/ImageServer",
    bandIds: [
      { Coastal: 1 },
      { Blue: 2 },
      { Green: 3 },
      { Red: 4 },
      { NIR: 8 },
      { SWIR1: 11 },
      { SWIR2: 12 },
      { Cirrus: 10 },
    ],
  },
  basemap: "satellite",
};

const MapComponent = () => {
  const [chosenSensor, setChosenSensor] = React.useState<
    "Landsat 8" | "Sentinel 2" | "basemap"
  >("Landsat 8");
  const [chosenBandIds, setChosenBandIds] = React.useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8,
  ]);
  useEffect(() => {
    loadModules([
      "esri/views/MapView",
      "esri/layers/ImageryLayer",
      "esri/Map",
      "esri/widgets/Legend",
      "esri/widgets/Expand",
      "esri/widgets/Print",
      "esri/layers/support/RasterFunction",
      "esri/config",
      "esri/widgets/BasemapGallery",
    ]).then(
      ([
        MapView,
        ImageryLayer,
        Map,
        Legend,
        Expand,
        Print,
        RasterFunction,
        esriConfig,
        BasemapGallery,
      ]) => {
        // Create a map
        const map = new Map({
          basemap: "satellite",
        });

        esriConfig.apiKey =
          "AAPKd0f9aed91395408796a35835478b4ed9R0cQnqymU90F_e8Cn9b5zWBcBnqy5C7dnJTwPiVRagbjBhgXUQ4eC8kubFK2eWTP";

        // Create a view
        const view = new MapView({
          container: "viewDiv",
          map: map,
          center: [0, 0],
          zoom: 3,
        });

        // Initialize BasemapGallery
        const basemapGallery = new BasemapGallery({
          view: view,
          container: "basemapGalleryDiv",
        });

        // Hide the BasemapGallery initially
        basemapGallery.container.style.display = "none";

        // Define rendering rule with specific bandIds
        const bandIds = [2, 3, 4, 8, 11, 12]; // B8 (NIR), B4 (Red), B3 (Green)

        // Create a rendering rule
        const renderingRule = new RasterFunction({
          functionName: "Stretch",
          functionArguments: {
            Raster: {
              rasterFunctionArguments: {
                Bands: [2, 3, 4, 8, 11, 12],
              },
            },
            StretchType: 3, // Standard Deviation
            Number_of_StandardDeviations: 2,
            Min: 0,
            Max: 255,
          },
        });

        // Create an imagery layer with the rendering rule
        const imageryLayer = new ImageryLayer({
          url: "https://sentinel.arcgis.com/arcgis/rest/services/Sentinel2/ImageServer",
          rasterFunction: renderingRule,
        });

        // Add the imagery layer to the map
        map.add(imageryLayer);

        // Add a BasemapToggle widget to toggle Basemap Gallery
        const basemapToggle = new Expand({
          view: view,
          content: basemapGallery,
          expandIconClass: "esri-icon-basemap",
        });

        // Handle the button click event
        const toggleBasemapGalleryButton = document.createElement("button");
        toggleBasemapGalleryButton.innerHTML = "Basemap Gallery";
        toggleBasemapGalleryButton.className =
          "esri-widget--button esri-widget esri-interactive";
        // view.ui.add(toggleBasemapGalleryButton, "top-right");

        toggleBasemapGalleryButton.addEventListener("click", () => {
          if (basemapGallery.container.style.display === "none") {
            basemapGallery.container.style.display = "block";
          } else {
            basemapGallery.container.style.display = "none";
          }
        });

        view.ui.add(basemapToggle, "top-left");
      }
    );
  }, []);

  return (
    <section>
      <div
        id="viewDiv"
        style={{ height: "100vh", position: "absolute", width: "100vw" }}
      ></div>
      <div id="basemapGalleryDiv" className="hidden"></div>
      <div className="p-3 absolute w-[300px] h-[300px] top-[10%] left-[5%] bg-white rounded-md z-30">
        <div className="bg-black w-100 p-3 rounded-md">
          <h1 className="text-white ">Explore Imagery</h1>
        </div>
        <div className="row mt-5">
          <label htmlFor="" className="text-black">
            Choose sensor:{" "}
          </label>
          <select name="" id="" className="text-black">
            <option value="Landsat 8">Landsat 8</option>
            <option value="Sentinel 2">Sentinel 2</option>
            <option value="basemap">Basemap</option>
          </select>
        </div>
        <div className="row">
          <label htmlFor="">RGB Composite:</label>
          <select name="" id="">
            {}
          </select>
          <select name="" id=""></select>
          <select name="" id=""></select>
        </div>
      </div>
    </section>
  );
};

export default MapComponent;
