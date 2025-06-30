import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
export default function Pagination() {
  return (
    <div className="flex justify-center items-center gap-1 md:gap-2 mt-8">
      <Button
        variant="ghost"
        size="icon"
        className="text-[#64748b] w-8 h-8 md:w-10 md:h-10"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <Button className="bg-[#2563eb] text-white w-8 h-8 md:w-10 md:h-10 text-sm">
        1
      </Button>
      <Button
        variant="ghost"
        className="text-[#64748b] w-8 h-8 md:w-10 md:h-10 text-sm"
      >
        2
      </Button>
      <Button
        variant="ghost"
        className="text-[#64748b] w-8 h-8 md:w-10 md:h-10 text-sm"
      >
        3
      </Button>
      <Button
        variant="ghost"
        className="text-[#64748b] w-8 h-8 md:w-10 md:h-10 text-sm"
      >
        4
      </Button>
      <Button
        variant="ghost"
        className="text-[#64748b] w-8 h-8 md:w-10 md:h-10 text-sm"
      >
        5
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-[#64748b] w-8 h-8 md:w-10 md:h-10"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
