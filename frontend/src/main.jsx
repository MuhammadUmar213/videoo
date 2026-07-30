import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// The previous build always pushed to dataLayer using a literal
// "GA_MEASUREMENT_ID" placeholder while never loading gtag.js, so nothing was
// ever recorded. Analytics now loads only when a real ID is configured.
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

if (measurementId) {
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", measurementId);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
