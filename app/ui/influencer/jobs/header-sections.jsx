import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
export default function HeaderSection() {
  return (
    <div className="bg-[#f5f5f5] pt-8 md:pt-16 pb-8 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#141414] mb-4 leading-tight">
          Your Next <span className="text-[#2563eb]">Brand</span> Deal Awaits
        </h1>
        <p className="text-[#64748b] text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
          Connect with brands, create content you love, and get paid for being
          you
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#64748b] w-5 h-5" />
              <Input
                placeholder="What are you looking for ?"
                className="pl-12 pr-4 py-5 text-base border-[#e2e8f0] sm:rounded-l-lg sm:rounded-r-none rounded-lg bg-white focus:border-[#2563eb] focus:ring-[#2563eb]"
              />
            </div>
            <Button className="bg-[#2563eb] hover:bg-[#1c5ae2] px-8 py-5 text-base sm:rounded-r-lg sm:rounded-l-none rounded-lg">
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
