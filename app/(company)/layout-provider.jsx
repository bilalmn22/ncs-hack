"use client";
import Header from "../ui/company/header";
import SideNav from "../ui/company/side-nav";
import { createContext, useContext, useState } from "react";
const openSideBarContext = createContext({});

export default function LayoutProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <openSideBarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <div className="flex h-screen bg-[#f5f5f5] relative">
        <SideNav />
        <div className="flex-1 flex flex-col lg:ml-0">
          {/* Header */}
          <Header />
          <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </openSideBarContext.Provider>
  );
}

export const useOpenSideBar = () => {
  return useContext(openSideBarContext);
};
