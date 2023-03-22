import React, { useEffect } from "react";
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, Navigate } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import NotFoundView from "../views/NotFound/NotFoundView";

import WorkspaceView from "../views/Workspace/WorkspaceView";
import LoginView from "../views/Login/LoginView";
import SignupView from "../views/Signup/SignupView";
import CguView from "../views/CGU/CguView";
import VerifyEmail from "../views/VerifyEmail/VerifyEmail";
import PageView from "../views/Page/PageView";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../types/ReduxTypes";
import { isLoggedIn } from "../utils/auth/utils";

const AppLayout = () => {
  const jwt = useSelector((state: RootState) => state.authReduc.jwt);
  if (isLoggedIn()) {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
};

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFoundView />}>
      <Route path="login" element={<LoginView />} />
      <Route path="signup" element={<SignupView />} />
      <Route path="cgu" element={<CguView />} />
      <Route path="verifyEmail/:email" element={<VerifyEmail />} />

      {/* <Route path="/" element={<PrivateRoutes />}> */}
      <Route path="/" element={<AppLayout />}>
        <Route path="/workspace" element={<WorkspaceView />} />
        <Route path="/page/:id?" element={<PageView />} />
        <Route path="/page" element={<PageView />} />
      </Route>
    </Route>
  )
);
export default Router;
