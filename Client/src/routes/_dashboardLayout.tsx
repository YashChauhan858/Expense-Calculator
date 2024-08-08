import Sidebar from "@/components/dashboard/Sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboardLayout")({
  component: Layout,
});

function Layout() {
  return (
    <main className="flex w-full h-full ">
      <div className="w-80 p-3 border-r-2 border-[#232326]">
        <Sidebar />
      </div>
      <div className="w-full pl-10">
        <Outlet />
      </div>
    </main>
  );
}
