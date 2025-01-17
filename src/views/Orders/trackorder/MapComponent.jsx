import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import car from "../../../Assets/Couriericons/car.svg";
import motorcycle from "../../../Assets/Couriericons/motorcycle.svg";
import bicycle from "../../../Assets/Couriericons/bicycle.svg";
import foot from "../../../Assets/Couriericons/foot.svg";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const markersData = [
  {
    id: 1,
    icon: bicycle,
    label: "15 mins",
    coordinates: [3.353189, 6.602528],
  },
  {
    id: 2,
    icon: car,
    label: "5 mins",
    coordinates: [3.35059, 6.596117],
  },
  {
    id: 3,
    icon: foot,
    label: "8 mins",
    coordinates: [3.359702, 6.599877],
  },
  {
    id: 4,
    icon: motorcycle,
    label: "4 mins",
    coordinates: [3.357603, 6.59609],
  },
];

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [3.355168, 6.598775],
      zoom: 15,
    });

    markersData.forEach((marker) => {
      const markerContainer = document.createElement("div");

      Object.assign(markerContainer.style, {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      });

      const icon = document.createElement("img");
      icon.src = marker.icon;
      icon.alt = "icon";

      Object.assign(icon.style, {
        width: "50px",
        height: "50px",
        marginBottom: "5px",
      });

      const label = document.createElement("div");
      label.textContent = marker.label;

      Object.assign(label.style, {
        fontSize: "12px",
        color: "black",
        backgroundColor: "white",
        padding: "2px 5px",
        borderRadius: "4px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        whiteSpace: "nowrap",
      });

      markerContainer.appendChild(icon);
      markerContainer.appendChild(label);

      new mapboxgl.Marker(markerContainer)
        .setLngLat(marker.coordinates)
        .addTo(mapRef.current);
    });

    return () => mapRef.current.remove();
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "97%",
        height: "90%",
        position: "relative",
        background: "transparent",
        border: "none",
      }}
    />
  );
};

export default MapComponent;
