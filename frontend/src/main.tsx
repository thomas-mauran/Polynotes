import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";

import Router from "./router/router";

import store from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={Router} />
  </Provider>
);
