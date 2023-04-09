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
import { isLoggedIn } from "../utils/auth/utils";
import ManifestoView from "../views/Manifesto/ManifestoView";
import Footer from "../components/Footer/Footer";

const AppLayout = () => {

  // we want to check if the view we ask is a page view
  const isPageView = window.location.pathname.startsWith("/page");
  if (isPageView || isLoggedIn() ) {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  } else {
    return <Navigate to={"/manifesto"} />;
  }
};

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFoundView />}>
      <Route path="/manifesto" element={<ManifestoView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/signup" element={<SignupView />} />
      <Route path="/cgu" element={<CguView />} />
      <Route path="/verifyEmail/:email" element={<VerifyEmail />} />

      {/* <Route path="/" element={<PrivateRoutes />}> */}
      <Route path="/" element={<AppLayout />}>
      <Route path="/" element={<WorkspaceView />} />

        <Route path="/page/:id?" element={<PageView />} />
        <Route path="/workspace" element={<WorkspaceView />} />
        <Route path="/page" element={<PageView />} />
      </Route>
    </Route>
  )
);
export default Router;
