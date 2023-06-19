import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import Editor from "./screens/CodeTranslator";
import Ide from "./screens/Ide";
import CodeShare from "./screens/CodeShare";
import Modal from "./components/Modal";
import { ToastContainer } from "react-toastify";
import CodeExplain from "./screens/CodeExplain";

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
        path: "/code-share/:id",
        element: <CodeShare />,
      },
      {
        path: "/code-explain",
        element: <CodeExplain />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Modal />
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>
);
