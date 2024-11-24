import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StarRating } from "./components/StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StarRating
      maxRating={5}
      message={["Terrible", "Bad", "Okey", "Good", "Amazing"]}
    />
    <StarRating maxRating={10} color="blue" defaultValue={3} />
    <App />
  </React.StrictMode>
);
