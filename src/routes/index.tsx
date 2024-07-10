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
import History from "@/pages/borrow/history";

export default function Routes() {
  const router = createBrowserRouter([
    {
      element: <ProtectedRouter />,
      children: [
        {
          path: "/",
          loader: () => "Homepage | Library App",
          element: <HomePage />,
        },
        {
          path: "/login",
          loader: () => "Login | Library App",
          element: <LoginPage />,
        },
        {
          path: "/register",
          loader: () => "Register | Library App",
          element: <RegisterPage />,
        },
        {
          path: "/profile",
          loader: () => "Profile | Library App",
          element: <ProfilePage />,
        },
        {
          path: "/edit-profile",
          loader: () => "Edit Profile | Library App",
          element: <EditProfilePage />,
        },
        {
          path: "/books",
          loader: () => "List of Books | Library App",
          element: <BooksPage />,
        },
        {
          path: "/books/:id_book",
          loader: () => "Detail Book | Library App",
          element: <DetailBookPage />,
        },
        {
          path: "/history-borrow",
          loader: () => "History Borrow | Library App",
          element: <History />,
        },
        // {
        //   path: "/dashboard",
        //   loader: () => "Dashboard | Library App",
        //   element: <BookDetail />, // TODO: Change to admin dashboard
        // },
        {
          path: "*",
          loader: () => "Not Found | Library App",
          element: <NotFound />,
        },
      ],
    },
  ]);
  
  return <RouterProvider router={router} />;
}
