import * as React from "react";
import * as ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import Header from "./components/Header";
import BookList from "./components/Book/BookList";
import AddBook from "./components/Book/AddBook";

// https://reactrouter.com/en/main/start/tutorial
const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/list/books/",
        element: <BookList />,
      },
      {
        path: "/list/books/:pageNumber",
        element: <BookList />,
      },
      {
        path: "/add/books/",
        element: <AddBook />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
