
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import FluidCursor from "./components/FluidCursor";
import { StarsBackground } from "./components/animate-ui/components/backgrounds/stars";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="relative min-h-screen">
      <StarsBackground
        pointerEvents={false}
        speed={60}
        className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom,_#13203b_0%,_#05070e_75%)]"
      />
      <div className="relative z-10">
        <FluidCursor />
        <App />
      </div>
    </div>
  </React.StrictMode>
);
