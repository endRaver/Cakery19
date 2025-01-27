import { Outlet } from "react-router-dom";
import SidebarAdmin from "./components/SidebarAdmin";
import TopbarAdmin from "./components/TopbarAdmin";

const AdminLayout = () => {
  return (
    <div className="grid min-h-screen grid-cols-[220px_1fr] bg-[#F3F3F1] font-geometria text-primary-400">
      <SidebarAdmin />
      <main className="container mx-auto my-10 space-y-9">
        <TopbarAdmin />

        <div className="h-[calc(100vh-156px)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
