import * as React from "react";
import * as ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import Header from "./components/Header";
import GenreSelect from "./components/genre/GenreSelect";

// https://reactrouter.com/en/main/start/tutorial
const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/list",
        element: <BookList />,
      },
      {
        path: "/add",
        element: <AddBook />,
      },
      {
        path: "/genremulti",
        element: <GenreSelect />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
