import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeModes from "../Common/ThemeModes";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, UserRoundPen } from "lucide-react";
import axios from "axios";
import { adminAuth, api } from "@/utils/constants";
import { setUser } from "@/store/slice/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutHandler = async () => {
    try {
      const response = await axios.get(`${api}/admin/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(null));
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <header className="border-b shadow">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-extrabold">
              <Link to={"/admin"}>Naalayak</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Input
              type="search"
              placeholder="Search..."
              className="hidden w-48 md:block"
            />
            {!user ? (
              <Button asChild>
                <Link to="/admin/login">Login</Link>
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="/path-to-avatar.jpg" alt="User Avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <p className="capitalize">{user.username}</p>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Button asChild variant="ghost" className="px-0">
                      <Link href="/profile">
                        <UserRoundPen />
                        My Profile
                      </Link>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      variant="ghost"
                      className="flex items-center justify-start w-full gap-2 px-0"
                      onClick={logOutHandler}
                    >
                      <LogOut />
                      LogOut
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <ThemeModes />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
