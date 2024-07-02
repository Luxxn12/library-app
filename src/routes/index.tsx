import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRouter from "./protected-router";
import HomePage from "@/pages";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import ProfilePage from "@/pages/users/profile";
import EditProfilePage from "@/pages/users/edit-profile";
import BooksPage from "@/pages/books";
import DetailBookPage from "@/pages/books/detail";
import NotFound from "@/pages/not-found";

export default function Routes() {
  const router = createBrowserRouter([
    {
      element: <ProtectedRouter />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/edit-profile",
          element: <EditProfilePage />,
        },
        {
          path: "/books",
          element: <BooksPage />,
        },
        {
          path: "/books/:id_book",
          element: <DetailBookPage />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  
  return <RouterProvider router={router} />;
}
