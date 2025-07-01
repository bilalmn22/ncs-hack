import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import Image from "next/image"

export default function NavBar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold text-[#2563eb]">Cloutsy</h1>
          </div>

          {/* Navigation Menu - Hidden on mobile, shown on desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-[#141414] font-medium hover:text-[#2563eb] transition-colors">
              Browse
            </a>
            <a href="/influencer/offers" className="text-[#64748b] hover:text-[#141414] transition-colors">
              Offers
            </a>
            <a href="#" className="text-[#64748b] hover:text-[#141414] transition-colors">
              Proposals
            </a>
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-[#64748b]" />
            </Button>

            <div className="flex-shrink-0">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full border-2 border-gray-200"
              />
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
  )
}
