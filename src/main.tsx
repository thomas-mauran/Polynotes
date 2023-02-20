import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import App from "./App";
import "./index.css";

import Router from "./router/router";
import Navbar from "./components/navbar/Navbar";





ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
        <RouterProvider router={Router} />
  </React.StrictMode>
);
