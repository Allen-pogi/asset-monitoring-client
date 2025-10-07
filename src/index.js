import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { initDarkMode } from "./utils/darkMode";

initDarkMode();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ✅ Register service worker here
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) => console.log("✅ Service Worker registered:", reg))
      .catch((err) =>
        console.log("❌ Service Worker registration failed:", err)
      );
  });
}
