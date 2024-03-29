import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "react-toastify/dist/ReactToastify.min.css";
import "@fontsource/varela-round";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
