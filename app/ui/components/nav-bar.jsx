"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const links = [
  { href: "/", label: "Home" },
  { href: "/service", label: "Service" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/about-us", label: "About Us" },
];

function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center justify-between px-6 py-4 ">
      <div>
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Cloutsy
        </Link>
      </div>
      <div className="hidden md:flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-gray-600 hover:text-gray-900 ${
              pathname === link.href ? "font-semibold" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/login" className="text-gray-600 hover:text-gray-900">
          Login
        </Link>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Link href="/register" className=" block w-full h-full ">
            Sign Up
          </Link>
        </Button>
      </div>
    </nav>
  );
}

export default NavBar;
