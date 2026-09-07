import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Toast from "./Toast";

export default function Layout() {
  return (
    <div className="overflow-x-hidden min-h-screen flex flex-col bg-[#050505] text-white">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </div>
  );
}
