import Bottombar from "@/components/shared/Bottombar";
import LeftSizebar from "@/components/shared/LeftSizebar";
import Topbar from "@/components/shared/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full md:flex p-4">
      <Topbar />
      <LeftSizebar />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default RootLayout;
