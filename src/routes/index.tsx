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
import HistoryPage from "@/pages/borrow/history";
import CartPage from "@/pages/cart";
import AdminPage from "@/pages/admin";

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
          element: <HistoryPage />,
        },
        {
          path: "/cart",
          loader: () => "Cart | Library App",
          element: <CartPage />,
        },
        {
          path: "/dashboard",
          loader: () => "Dashboard | Library App",
          element: <AdminPage />, 
        },
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
