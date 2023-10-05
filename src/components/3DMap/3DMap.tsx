import React, { useEffect } from "react";
import { loadModules } from "esri-loader";
import "@arcgis/core/assets/esri/themes/light/main.css";
import "@arcgis/core/widgets/Zoom";
import "@arcgis/core/widgets/Compass";
const ArcGIS3DComponent = () => {
  useEffect(() => {
    loadModules([
      "esri/Map",
      "esri/views/SceneView",
      "esri/layers/SceneLayer",
      "esri/widgets/Zoom",
      "esri/widgets/Compass",
    ]).then(([Map, SceneView, SceneLayer, Zoom, Compass]) => {
      // Create a 3D map
      const map = new Map({
        basemap: "hybrid",
      });

      // Create a SceneView for the 3D scene
      const view = new SceneView({
        container: "mapDiv", // Provide the ID of your HTML element
        map: map,
      });

      // Add a 3D building layer
      const buildingLayer = new SceneLayer({
        url: "https://basemaps3d.arcgis.com/arcgis/rest/services/OpenStreetMap3D_Buildings_v1/SceneServer",
      });
      map.add(buildingLayer);

      // Set an initial camera position (optional)
      view.goTo({
        position: {
          x: -118.2437,
          y: 34.0522,
          z: 1000, // Set the height
        },
      });

      // Widgets should be added after the view is ready
      view.when(() => {
        const zoomWidget = new Zoom({
          view: view,
        });

        const compassWidget = new Compass({
          view: view,
        });

        // Add the widget to the top-left corner of the view
        view.ui.add(zoomWidget, "top-left");
        view.ui.add(compassWidget, "top-left");
      });
    });
  }, []);

  return (
    <div id="mapDiv" style={{ height: "100vh", overflow: "hidden" }}></div>
  );
};

export default ArcGIS3DComponent;
