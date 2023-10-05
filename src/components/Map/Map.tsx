import { loadModules } from "esri-loader";
import React, { useEffect, useRef } from "react";
import symbols from "./symbols.data.json";

const indexedSymbols: { [key: string]: { type: string; color: number[] } } =
  symbols;

type Props = {};

const MapComponent = (props: Props) => {
  const [map, setMap] = React.useState<any>(null);
  const [view, setView] = React.useState<any>(null);
  const [screenshot, setScreenshot] = React.useState<any>(null);
  const [viewImg, setViewImg] = React.useState<boolean>(false);

  useEffect(() => {
    loadModules(
      [
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/widgets/Legend",
        "esri/PopupTemplate",
        "esri/layers/GeoJSONLayer",
        "esri/widgets/Print",
      ],
      { css: true }
    )
      .then(
        ([
          esriConfig,
          Map,
          MapView,
          FeatureLayer,
          Legend,
          PopupTemplate,
          GeoJSONLayer,
          Print,
        ]) => {
          esriConfig.apiKey =
            "AAPKd0f9aed91395408796a35835478b4ed9R0cQnqymU90F_e8Cn9b5zWBcBnqy5C7dnJTwPiVRagbjBhgXUQ4eC8kubFK2eWTP";
          const map = new Map({
            basemap: "satellite",
          });
          setMap(map);
          const view = new MapView({
            container: mapRef.current,
            map: map,
            center: [-118.805, 34.027],
            zoom: 13,
          });
          setView(view);

          const featureUrl =
            "https://services8.arcgis.com/teLVcJC2DEDFnO6V/arcgis/rest/services/disasters/FeatureServer/0/64145d5910514a15844baeeab38e75ee";
          const popupTemplate = new PopupTemplate({
            title: "{disasterCategory}",
            content: [
              {
                type: "text",
                text: "Category: {disasterCategory}",
              },
            ],
          });
          const geoJson = new GeoJSONLayer({
            url: "disasters.geojson",
            popupTemplate: popupTemplate,
            renderer: {
              type: "unique-value",
              field: "disasterCategory",
              uniqueValueInfos: Object.keys(indexedSymbols).map((category) => ({
                value: category,
                symbol: indexedSymbols[category],
              })),
            },
            labelingInfo: [
              {
                labelExpressionInfo: {
                  expression: "$feature.disasterCategory",
                },
                labelPlacement: "above-center",
              },
            ],
          });

          map.add(geoJson);
          // const featureLayer = new FeatureLayer({
          //   url: "./disasters.geojson",
          //   renderer: {
          //     type: "unique-value",
          //     field: "disasterCategory",
          //     uniqueValueInfos: Object.keys(indexedSymbols).map((category) => ({
          //       value: category,
          //       symbol: indexedSymbols[category],
          //     })),
          //   },
          //   labelingInfo: [
          //     {
          //       labelExpressionInfo: {
          //         expression: "$feature.disasterCategory",
          //       },
          //       labelPlacement: "above-center",
          //     },
          //   ],
          //   popupTemplate: popupTemplate,
          // });
          // map.add(featureLayer);

          const legend = new Legend({
            view: view,
            layerInfos: [
              {
                layer: geoJson,
                title: "Disaster Categories",
              },
            ],
          });

          view.ui.add(legend, "bottom-left");
        }
      )
      .catch((err) => console.log(err));
  }, []);
  const mapRef = useRef(null);
  const handleScreenshot = () => {
    if (!view) return null;
    view
      .takeScreenshot({ format: "tiff", width: 600, height: 600 })
      .then((screenshot: any) => {
        const imageElement = document.createElement("img");
        imageElement.src = screenshot.dataUrl;
        setScreenshot(screenshot.dataUrl);
        setViewImg(true);
      });
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = screenshot;
    link.download = "map.tiff";
    link.click();
  };
  return (
    <section>
      <div
        className="overlay"
        style={{ display: !viewImg ? "none" : "block" }}
      ></div>
      <div
        className="imageContainer"
        style={{ display: viewImg ? "block" : "none" }}
      >
        <img src={screenshot} alt="" />
        <button className="exit" onClick={() => setViewImg(false)}>
          X
        </button>
        <div className="footer">
          <button onClick={handleDownload}>Download image</button>
          <button>Analyze image</button>
        </div>
      </div>
      <div
        className="header"
        style={{
          backgroundColor: "#1a1a1a",
          position: "absolute",
          top: "0",
          left: "50%",
          right: 0,
          zIndex: 2,
          color: "white",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
          padding: "0 1rem",
        }}
      >
        <h1>Map Header (Map Data)</h1>
      </div>
      <div
        ref={mapRef}
        style={{
          position: "absolute",
          top: "9%",
          bottom: 0,
          margin: "auto 50%",
          width: "50vw",
        }}
      ></div>
      <div className="takeScreenShot">
        <button onClick={handleScreenshot}>Take Screenshot</button>
      </div>
    </section>
  );
};

export default MapComponent;
