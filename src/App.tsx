import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Editor from "./screens/Editor";
import Home from "./screens/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/editor",
    element: <Editor />,
  },
]);

const App = () => {
  return (
    <div className="flex">
      {/* <div className="bg-slate-800 w-12"></div> */}
      <RouterProvider router={router} />;
    </div>
  );
};

export default App;
