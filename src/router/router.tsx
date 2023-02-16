import React from "react"
import {createBrowserRouter} from "react-router-dom"

import WorkspaceView from "../views/Workspace/WorkspaceView";

const Router = createBrowserRouter([
    {
      path: "/",
      element: <WorkspaceView/>,
    },
  ]);
  export default Router