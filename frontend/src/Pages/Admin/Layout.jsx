import { AppSidebar } from "@/components/AdminComponents/appSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ThemeModes from "@/components/Common/ThemeModes";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate("/admin/login");
    }
  }, [user, navigate]);
  return (
    <>
      {user && (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between px-4">
              <div className="flex items-center gap-2 ">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div>
                <ThemeModes />
              </div>
            </header>
            <div className="p-4 pt-0">
              <Outlet />
            </div>
          </SidebarInset>
        </SidebarProvider>
      ) }
    </>
  );
};

export default Layout;
