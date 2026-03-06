"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import ExpandableSearch from "@/components/common/ExpandableSearch";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const isSidebarOpen = useSelector((state: RootState) => state.state.isSidebarOpen);

  return (
    <>
      <Sidebar />
      <div className={`flex-1 ${isSidebarOpen ? "md:ml-[80px]" : ""} flex flex-col min-h-screen w-full overflow-x-hidden transition-all duration-300`}>
        <ExpandableSearch />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
