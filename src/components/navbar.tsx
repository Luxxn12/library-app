import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToken } from "@/utils/contexts/token";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const { token, user, changeToken } = useToken();
  const navigate = useNavigate();


  function handleLogout() {
    changeToken();
    toast.success("Logout Successfully");
    navigate('/')
  }

  return (
    <header className="w-full sticky top-0 bg-white z-50" aria-label="navbar">
      <nav className="mx-auto flex container items-center justify-between p-3 lg:px-6 [ ">
        <Link to={"/"}>
          <text className="text-red-700 font-extrabold">MYBOOK</text>
        </Link>
        <div className="flex gap-4 items-center justify-end">
          <Input type="Search" placeholder="Search" />
          {user?.role === "user" ? (
            <Link to="/cart">
              <ShoppingCart className="text-black size-8" />
            </Link>
          ) : null}
          {token ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Avatar>
                    <AvatarImage src={user?.profile_picture} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className=" dark:bg-white">
                <DropdownMenuLabel className="text-black">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="border-red-700" />
                <DropdownMenuItem className="text-black" asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                {user?.role === "admin" ? (
                  <DropdownMenuItem className="text-black" asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-700" onClick={() => handleLogout()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
