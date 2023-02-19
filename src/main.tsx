import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import App from "./App";
import "./index.css";

import Router from "./router/router";
import Navbar from "./components/navbar/Navbar";

import themes from './themes/index.js';

import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <RouterProvider router={Router} />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
