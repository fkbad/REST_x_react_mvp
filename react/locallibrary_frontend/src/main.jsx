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
import GenreMultiSelect from "./components/genre/GenreMultiSelect";

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
        element: <GenreMultiSelect />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
