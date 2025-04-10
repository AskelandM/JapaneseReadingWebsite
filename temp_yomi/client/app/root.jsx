import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import "./app.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
