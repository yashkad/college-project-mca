import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import Editor from "./screens/Editor";
import Ide from "./screens/Ide";
import CodeShare from "./screens/CodeShare";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/editor",
        element: <Editor />,
      },
      {
        path: "/ide",
        element: <Ide />,
      },
      {
        path: "/code-share",
        element: <CodeShare />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    <RouterProvider router={router} />
  </React.StrictMode>
);
