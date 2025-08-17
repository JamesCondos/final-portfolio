
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import FitToScreen from "./components/util/FitToScreen";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Adjust min for how small you're willing to go */}
    <FitToScreen min={1} max={1} onlyFirstLoad={false}>
      <App />
    </FitToScreen>
  </React.StrictMode>
);