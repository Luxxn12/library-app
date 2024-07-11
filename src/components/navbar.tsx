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
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart } from "lucide-react";
import { ModeToggle } from "./ui/mode-toggle";
import { useTheme } from "./ui/theme-provider";
import { DropdownMenuSub } from "@radix-ui/react-dropdown-menu";

export default function Navbar() {
  const { token, user, changeToken } = useToken();
  const navigate = useNavigate();
  const { setTheme } = useTheme()


  function handleLogout() {
    changeToken();
    toast.success("Logout Successfully");
    navigate('/')
  }

  return (
    <header className="w-full sticky top-0 bg-white dark:bg-black z-50" aria-label="navbar">
      <nav className="mx-auto flex container items-center justify-between p-3 lg:px-6 [ ">
        <Link to={"/"}>
          <text className="text-red-700 font-extrabold">MYBOOK</text>
        </Link>
        <div className="flex gap-4 items-center justify-end">
          {!token ? (
            <ModeToggle />
          ) : null
          }
          <Input type="Search" placeholder="Search" />
          {user?.role === "user" ? (
            <Link to="/cart">
              <ShoppingCart className="text-black dark:text-white size-8" />
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
              <DropdownMenuContent align="end" >
                <DropdownMenuLabel >My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="border-red-700" />
                <DropdownMenuItem  asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                {user?.role === "admin" ? (
                  <DropdownMenuItem  asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                <DropdownMenuSubTrigger  >Theme</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
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
