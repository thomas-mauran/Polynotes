import React from "react";
import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import NotFoundView from "../views/NotFound/NotFoundView";

import WorkspaceView from "../views/Workspace/WorkspaceView";
import LoginView from "../views/Login/LoginView";

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet/>
  </>
);

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />} errorElement={<NotFoundView />}>
      <Route path="/" element={<WorkspaceView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/workspace" element={<WorkspaceView />} />
    </Route>
  )
);
export default Router;
