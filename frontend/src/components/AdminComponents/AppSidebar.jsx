import * as React from "react";
import {
  Frame,
  Map,
  PieChart,
  ShoppingBasket,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./navMain";
import { NavProjects } from "./NavProject";
import { NavUser } from "./NavUser";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Products",
      url: "#",
      icon: ShoppingBasket,
      isActive: true,
      items: [
        {
          title: "All Products",
          url: "/admin/allproducts",
        },
        {
          title: "Prouct Categories",
          url: "/admin/categories",
        },
        {
          title: "Add New Products",
          url: "/admin/addproducts",
        },
      ],
    },
    
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar(props) {
  const {user} = useSelector((state) => state.auth);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        {user ? (
          <NavUser user={user} />
        ) : (
          <Button asChild>
            <Link to="/admin/login">Login</Link>
          </Button>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
