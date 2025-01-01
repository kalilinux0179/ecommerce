import * as React from "react";
import { Frame, Layers, Map, PieChart, ShoppingBasket, ShoppingCart } from "lucide-react";
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
      title: "Category",
      url: "#",
      icon: Layers,
      isActive: true,
      items: [
        {
          title: "Category List",
          url: "/admin/categorylist",
        },
        {
          title: "Add Category",
          url: "/admin/addcategroy",
        },
      ],
    },
    // {
    //   title: "Products",
    //   url: "#",
    //   icon: ShoppingCart,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "All Products",
    //       url: "/admin/allproducts",
    //     },
    //     {
    //       title: "Add Products",
    //       url: "/admin/addproducts",
    //     },
    //     {
    //       title: "Product Categories",
    //       url: "/admin/categories",
    //     },

    //     {
    //       title: "Product Reviews",
    //       url: "/admin/reviews",
    //     },
    //   ],
    // },
    // {
    //   title: "Orders",
    //   url: "#",
    //   icon: ShoppingBasket,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "All Orders",
    //       url: "/admin/#",
    //     },
    //     {
    //       title: "Pending Orders",
    //       url: "/admin/#",
    //     },
    //     {
    //       title: "Order History",
    //       url: "/admin/#",
    //     },
    //   ],
    // },
  ],

};

export function AppSidebar(props) {
  const { user } = useSelector((state) => state.auth);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
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
