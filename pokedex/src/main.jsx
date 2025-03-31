import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./subpages/home/Home.jsx";
import { Arena } from "./subpages/arena/Arena.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      { element: <Home />, path: "/" },
      { element: <Arena />, path: "/arena" },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
