import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import NotFoundView from "../views/NotFound/NotFoundView"

import WorkspaceView from "../views/Workspace/WorkspaceView";

const AppLayout = () => <Navbar />;

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />} errorElement={<NotFoundView/>}>
      <Route path="/" element={<WorkspaceView />} />
      <Route path="/workspace" element={<WorkspaceView />} />
    </Route>
  )
);
export default Router;
