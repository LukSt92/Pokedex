import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./subpages/home/Home.jsx";
import { Arena } from "./subpages/arena/Arena.jsx";
import { Edit } from "./subpages/edit/Edit.jsx";
import { Favourites } from "./subpages/favourites/Favourites.jsx";
import { Login } from "./subpages/login/Login.jsx";
import { Register } from "./subpages/register/Register.jsx";
import { Ranking } from "./subpages/ranking/Ranking.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      { element: <Home />, path: "/" },
      { element: <Arena />, path: "/arena" },
      { element: <Edit />, path: "/edit" },
      { element: <Favourites />, path: "/favourites" },
      { element: <Ranking />, path: "/ranking" },
      { element: <Login />, path: "/login" },
      { element: <Register />, path: "/register" },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
