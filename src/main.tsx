
import ReactDOM from "react-dom/client";
import App from "./App";
import { StarsBackground } from "./components/animate-ui/components/backgrounds/stars";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="portfolio-shell">
    <StarsBackground
      pointerEvents={false}
      density={2.6}
      mobileDensity={3}
      speed={180}
      starColor="rgba(197, 214, 235, 0.3)"
      aria-hidden="true"
      className="portfolio-stars"
    />
    <div className="portfolio-content">
      <App />
    </div>
  </div>
);
