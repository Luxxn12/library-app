import { Link } from "react-router-dom";
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

export default function Navbar() {
  const { token, user, changeToken } = useToken();

  function handleLogout() {
    changeToken();
    toast.success("Logout Successfully");
  }

  return (
    <header className="w-full sticky top-0 bg-white z-50" aria-label="navbar">
      <nav className="mx-auto flex container items-center justify-between p-3 lg:px-6 [ ">
        <Link to={"/"}>
          <text className="text-red-700 font-extrabold">MYBOOK</text>
        </Link>
        <div className="flex gap-4 items-center justify-end">
          <Input type="Search" placeholder="Search" />
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
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/edit-profile">Settings</Link>
                </DropdownMenuItem>
                {user?.role === "admin" ? (
                  <DropdownMenuItem asChild>
                    <Link to="/profile/edit">Dashboard</Link>
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleLogout()}>
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
