"use client";
import { Avatar } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/influencer/jobs",
    label: "Browse",
  },

  {
    href: "/influencer/proposals",
    label: "Proposals",
  },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={"/"} className="flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold text-[#2563eb]">
              Cloutsy
            </h1>
          </Link>

          {/* Navigation Menu - Hidden on mobile, shown on desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`${
                  pathname === link.href
                    ? "text-[#2563eb] font-medium"
                    : "text-[#64748b] hover:text-[#141414]"
                } transition-colors`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Avatar
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full border-2 border-gray-200"
              >P</Avatar>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="md:hidden pb-4">
          <div className="flex space-x-6">
            <a href="#" className="text-[#141414] font-medium text-sm">
              Browse
            </a>
            <a href="#" className="text-[#64748b] text-sm">
              Offers
            </a>
            <a href="#" className="text-[#64748b] text-sm">
              Proposals
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
