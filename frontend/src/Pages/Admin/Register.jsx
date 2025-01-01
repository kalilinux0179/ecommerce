import { GalleryVerticalEnd, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { adminAuth } from "@/utils/constants";
import { toast } from "sonner";

const AdminRegister = () => {
  const [input, setInput] = useState({
    email:"",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const registeHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${adminAuth}/admin/register`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 self-center font-medium"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <p className="text-2xl font-extrabold">Naalayak</p>
          </Link>
          <Card>
            <CardContent className="p-6">
              <form onSubmit={registeHandler}>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="alice"
                        required
                        value={input.username}
                        onChange={(e) =>
                          setInput({ ...input, username: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="alice@mail.com"
                        required
                        value={input.email}
                        onChange={(e) =>
                          setInput({ ...input, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        placeholder="password"
                        value={input.password}
                        onChange={(e) =>
                          setInput({ ...input, password: e.target.value })
                        }
                      />
                    </div>
                    {loading ? (
                      <Button type="submit" className="w-full" disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please Wait...
                      </Button>
                    ) : (
                      <Button type="submit" className="w-full">
                        Register
                      </Button>
                    )}
                  </div>
                  <div className="text-center text-sm">
                    Already Register{" "}
                    <Link
                      to="/admin/login"
                      className="underline underline-offset-4"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminRegister;
