
import ReactDOM from "react-dom/client";
import App from "./App";
import FluidCursor from "./components/FluidCursor";
import { StarsBackground } from "./components/animate-ui/components/backgrounds/stars";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="relative min-h-screen">
    <StarsBackground
      pointerEvents={false}
      density={1.6}
      mobileDensity={2.4}
      speed={90}
      className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom,_#13203b_0%,_#05070e_75%)]"
    />
    <div className="relative z-10">
      <FluidCursor />
      <App />
    </div>
  </div>
);
