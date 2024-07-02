import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";


export default function ProtectedRouter() {
  const { pathname } = useLocation()
  const token = Cookies.get("token")
  
  const authProtected = ["/login", "register"]
  const protectedByToken = [
    "/profile",
    "edit-profile",
    "history-borrow",
    "/dashboard"
  ]
  const adminProtected = ["/dashboard"];
  const userProtected = ["/history-borrow"];

  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/" />;
  }

  if (protectedByToken.includes(pathname)) {
    if (!token) return <Navigate to="/login" />;

    // TODO: Add protected by role (admin & user)
  }

  return <Outlet/>
}
