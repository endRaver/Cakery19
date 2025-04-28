import TopNavigationBar from "@/components/TopNavigationBar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-primary-50 font-geometria">
      <TopNavigationBar />
      <main className="">
        <Outlet />
      </main>
      <Footer />
      {/* <SignedIn><Chatbox /></SignedIn> */}
    </div>
  );
};

export default MainLayout;
