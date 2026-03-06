"use client";

import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import ExpandableSearch from "@/components/common/ExpandableSearch";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const isSidebarOpen = useSelector((state: RootState) => state.state.isSidebarOpen);

  return (
    <>
      <Suspense fallback={null}>
        <Sidebar />
      </Suspense>
      <div className={`flex-1 ${isSidebarOpen ? "md:ml-[80px]" : ""} flex flex-col min-h-screen w-full overflow-x-hidden transition-all duration-300`}>
        <Suspense fallback={null}>
          <ExpandableSearch />
        </Suspense>
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
