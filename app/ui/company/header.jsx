"use client";
import { Search, Settings, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOpenSideBar } from "@/app/(company)/layout-provider";

export default function Header() {
const { setSidebarOpen } = useOpenSideBar();
  return (
    <header className="bg-white border-b border-[#e2e8f0] px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="hidden sm:flex items-center gap-2 text-sm text-[#71839b]">
            <span>Pages</span>
            <span>/</span>
            <span className="text-[#181818] font-medium">Home</span>
          </div>
        </div>
        <div className="flex items-center gap-2 lg:gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#71839b]" />
            <Input
              placeholder="Search"
              className="pl-10 w-32 sm:w-48 lg:w-64 bg-[#f5f5f5] border-0 focus-visible:ring-1 focus-visible:ring-[#2563eb]"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-[#71839b] hidden sm:flex"
          >
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#71839b]">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
