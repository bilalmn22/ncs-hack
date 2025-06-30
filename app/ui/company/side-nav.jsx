"use client";
import {
  Settings,
  Bell,
  FileText,
  TrendingUp,
  Clock,
  Archive,
  Wallet,
  MessageSquare,
  LogOut,
  Home,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useOpenSideBar } from "@/app/(company)/layout-provider";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
const sidebarItems = [
  { icon: Home, label: "Home", active: true },
  { icon: FileText, label: "Proposals" },
  { icon: TrendingUp, label: "Active" },
  { icon: Clock, label: "History" },
  { icon: Archive, label: "Archive" },
  { icon: Wallet, label: "Wallet" },
];

const bottomItems = [
  { icon: MessageSquare, label: "Messages", badge: "2" },
  { icon: Bell, label: "Notifications", badge: "2" },
  { icon: Settings, label: "Settings" },
  { icon: LogOut, label: "Logout" },
];

function SideNav() {
  const { sidebarOpen, setSidebarOpen } = useOpenSideBar();
  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
           fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#e2e8f0] flex flex-col transform transition-transform duration-300 ease-in-out
           ${
             sidebarOpen
               ? "translate-x-0"
               : "-translate-x-full lg:translate-x-0"
           }
         `}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#2563eb]">Cloutsy</h1>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col justify-between px-4">
          <div className="space-y-1">
            {sidebarItems.map((item, index) => {
              if (item.label === "Proposals") {
                return (
                  <Link
                    key={index}
                    href="/proposals"
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      item.active
                        ? "bg-[#eff6ff] text-[#2563eb]"
                        : "text-[#71839b] hover:bg-[#f5f5f5]"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              }
              return (
                <button
                  key={index}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                    item.active
                      ? "bg-[#eff6ff] text-[#2563eb]"
                      : "text-[#71839b] hover:bg-[#f5f5f5]"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 space-y-1">
            {bottomItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-[#71839b] hover:bg-[#f5f5f5] transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <Badge className="ml-auto bg-[#ff472e] text-white text-xs px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-[#e2e8f0]">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-[#2563eb] text-white">
                MS
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#181818] truncate">
                Michael Smith
              </p>
              <p className="text-xs text-[#71839b] truncate">
                michaelsmith12@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideNav;
