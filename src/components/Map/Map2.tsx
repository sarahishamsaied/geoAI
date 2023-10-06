import React, { useEffect } from "react";
import { loadModules } from "esri-loader";
import axios from "axios";
import * as IoIcons from "react-icons/io";

const sensors = {
  "Landsat 8": {
    url: "https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer",
    bandIds: [
      { name: "Coastal", value: 1 },
      { name: "Blue", value: 2 },
      { name: "Green", value: 3 },
      { name: "Red", value: 4 },
      { name: "NIR", value: 5 },
      { name: "SWIR1", value: 6 },
      { name: "SWIR2", value: 7 },
      { name: "Cirrus", value: 8 },
    ],
  },
  "Sentinel 2": {
    url: "https://sentinel.arcgis.com/arcgis/rest/services/Sentinel2/ImageServer",
    bandIds: [
      { name: "Coastal", value: 1 },
      { name: "Blue", value: 2 },
      { name: "Green", value: 3 },
      { name: "Red", value: 4 },
      { name: "NIR", value: 8 },
      { name: "SWIR1", value: 11 },
      { name: "SWIR2", value: 12 },
      { name: "Cirrus", value: 10 },
    ],
  },
};

const MapComponent = () => {
  const [chosenSensor, setChosenSensor] = React.useState<
    "Landsat 8" | "Sentinel 2"
  >("Landsat 8");
  const [chosenBandIds, setChosenBandIds] = React.useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8,
  ]);
  const [map, setMap] = React.useState<any>(null);
  const [optionsMenuOpened, setOptionsMenuOpened] =
    React.useState<boolean>(false);
  useEffect(() => {
    loadModules([
      "esri/config",
      "esri/views/MapView",
      "esri/layers/ImageryLayer",
      "esri/Map",
      "esri/widgets/Expand",
      "esri/widgets/Print",
      "esri/layers/support/RasterFunction",
      "esri/widgets/BasemapGallery",
      "esri/widgets/Search",
      "esri/widgets/Sketch",
      "esri/widgets/ScaleBar",
      "esri/widgets/Weather",
    ]).then(
      ([
        esriConfig,
        MapView,
        ImageryLayer,
        Map,
        Expand,
        Print,
        RasterFunction,
        BasemapGallery,
        Search,
        Sketch,
        ScaleBar,
        Weather,
      ]) => {
        // Create a map
        // set the api key

        const map = new Map({
          basemap: "satellite",
        });
        setMap(map);

        // Create a view
        const view = new MapView({
          container: "viewDiv",
          map: map,
          center: [0, 0],
          zoom: 3,
        });
        try {
          const searchWidget = new Search({ view });
          view.ui.add(searchWidget, "top-left");
          const sketch = new Sketch({
            layer: view.graphics,
            view,
          });
          let scaleBar = new ScaleBar({
            view: view,
          });
          // Add widget to the bottom left corner of the view
          view.ui.add(scaleBar, {
            position: "bottom-left",
          });
          view.ui.add(sketch, "top-left");
          const print = new Print({
            view: view,
            printServiceUrl:
              "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
          });
          view.ui.add(print, "top-right");

          // Define rendering rule with specific bandIds
          const bandIds = [2, 3, 4, 8, 11, 12]; // B8 (NIR), B4 (Red), B3 (Green)

          // Create a rendering rule
          const renderingRule = new RasterFunction({
            functionName: "Stretch",
            functionArguments: {
              Raster: {
                rasterFunctionArguments: {
                  Bands: chosenBandIds,
                },
              },
              StretchType: 3, // Standard Deviation
              Number_of_StandardDeviations: 2,
              Min: 0,
              Max: 255,
            },
          });
          console.log(sensors[chosenSensor].url);
          // Create an imagery layer with the rendering rule
          const imageryLayer = new ImageryLayer({
            url: sensors[chosenSensor].url,
            rasterFunction: renderingRule,
          });

          // Add the imagery layer to the map
          map.add(imageryLayer);
        } catch (e) {
          console.log(e);
        }
      }
    );
  }, []);

  useEffect(() => {
    loadModules([
      "esri/config",
      "esri/layers/ImageryLayer",
      "esri/layers/support/RasterFunction",
    ]).then(([esriConfig, ImageryLayer, RasterFunction]) => {
      console.log(chosenSensor);
      if (chosenSensor === "Sentinel 2")
        esriConfig.apiKey =
          "AAPKd0f9aed91395408796a35835478b4ed9R0cQnqymU90F_e8Cn9b5zWBcBnqy5C7dnJTwPiVRagbjBhgXUQ4eC8kubFK2eWTP";
      if (!map) return;
      const renderingRule = new RasterFunction({
        functionName: "Stretch",
        functionArguments: {
          Raster: {
            rasterFunctionArguments: {
              Bands: chosenBandIds,
            },
          },
          StretchType: 3, // Standard Deviation
          Number_of_StandardDeviations: 2,
          Min: 0,
          Max: 255,
        },
      });

      const imageryLayer = new ImageryLayer({
        url: sensors[chosenSensor].url,
        rasterFunction: renderingRule,
      });
      map.removeAll();
      map.add(imageryLayer);
    });
  }, [chosenBandIds, map, chosenSensor]);

  return (
    <section>
      <div
        id="viewDiv"
        style={{ height: "100vh", position: "absolute", width: "100vw" }}
      ></div>
      <div id="basemapGalleryDiv" className="hidden"></div>
      <div className="absolute top-[29%] left-[0.2%] m-3">
        <button
          className="bg-white text-black p-1.5 "
          onClick={() => setOptionsMenuOpened((prev) => !prev)}
        >
          <IoIcons.IoIosOptions className="text-xl" />
        </button>
      </div>
      <div
        className={`p-3 absolute w-[500px] h-[170px] bottom-[5%] right-[0] bg-white  z-30 ${
          optionsMenuOpened ? "hidden" : "block"
        }`}
      >
        <div className="bg-black w-100 p-3 ">
          <h1 className="text-white ">Explore Imagery</h1>
        </div>
        <div className="row mt-5">
          <label htmlFor="" className="text-black">
            Choose sensor:{" "}
          </label>
          <select
            name=""
            id=""
            className="text-black"
            onChange={(e) =>
              setChosenSensor(e.target.value as "Sentinel 2" | "Landsat 8")
            }
          >
            <option value="Landsat 8">Landsat 8</option>
            <option value="Sentinel 2">Sentinel 2</option>
          </select>
        </div>
        <div className="row text-black">
          <label htmlFor="">RGB Composite:</label>
          <select
            name=""
            id=""
            onChange={(e) =>
              setChosenBandIds((prev) => [...prev, parseInt(e.target.value)])
            }
          >
            {
              // @ts-ignore
              sensors[chosenSensor].bandIds.map((band, i) => (
                <option key={i} value={band.value}>
                  {band.name}({band.value})
                </option>
              ))
            }
          </select>
          <select
            name=""
            id=""
            onChange={(e) =>
              setChosenBandIds((prev) => [...prev, parseInt(e.target.value)])
            }
          >
            {
              // @ts-ignore
              sensors[chosenSensor].bandIds.map((band, i) => (
                <option key={i} value={band.value}>
                  {band.name}({band.value})
                </option>
              ))
            }
          </select>
          <select
            name=""
            id=""
            onChange={(e) =>
              setChosenBandIds((prev) => [...prev, parseInt(e.target.value)])
            }
          >
            {
              // @ts-ignore
              sensors[chosenSensor].bandIds.map((band, i) => (
                <option key={i} value={band.name}>
                  {band.name}({band.value})
                </option>
              ))
            }
          </select>
        </div>
      </div>
    </section>
  );
};

export default MapComponent;
