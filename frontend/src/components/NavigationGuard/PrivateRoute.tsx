import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuth } from "../../utils/users/usersAPICalls";
import Navbar from "../navbar/Navbar";

export default function PrivateRoute() {
  useEffect(() => {
    isAuth()
      .then((response) => {
        if (response === true) {
          return (
            <>
              <Navbar />
              <Outlet />
            </>
          );
        } else {
          return <Navigate to="/login" />;
        }
      })
      .catch((error) => {});
  }, []);
}
