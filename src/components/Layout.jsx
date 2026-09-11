import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Toast from "./Toast";

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="skeleton h-10 w-40 rounded-xl" />
    </div>
  );
}

export default function Layout() {
  return (
    <div className="overflow-x-hidden min-h-screen flex flex-col bg-[#050505] text-white">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Toast />
    </div>
  );
}
