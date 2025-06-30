import { Button } from "@/components/ui/button";
import Image from "next/image";
import NavBar from "@/app/ui/influencer/nav-bar";
import HeaderSection from "../../ui/influencer/jobs/header-sections";
import JobsFilters from "@/app/ui/influencer/jobs/filters";
import Pagination from "@/app/ui/influencer/jobs/paginations";

export default function Component() {
  const Jobs = [...Array.from({ length: 5 })]; // Simulating 10 job cards
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <NavBar />
      <HeaderSection />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <JobsFilters />

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="space-y-4 md:space-y-6">
              {/* Deal Card 1 */}
              {Jobs.map((_, index) => (
                <div key={index} className="p-4 bg-white rounded-2xl  md:p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1 order-2 md:order-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                        <h2 className="text-xl md:text-2xl font-semibold text-[#2563eb]">
                          GlowSkin Cosmetics
                        </h2>
                        <span className="text-xl md:text-2xl font-bold text-[#141414]">
                          $80
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Emily Tran"
                          width={40}
                          height={40}
                          className="rounded-full flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-medium text-[#141414] text-sm md:text-base">
                            Emily Tran
                          </div>
                          <div className="text-xs md:text-sm text-[#64748b]">
                            Brand Partnerships Manager
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-[#141414] mb-2 text-sm md:text-base">
                          Promote Our Vitamin C Serum on{" "}
                          <span className="font-semibold">TikTok</span>
                        </p>
                        <p className="text-[#64748b] text-xs md:text-sm mb-3">
                          Create a 30-second video highlighting the product
                          benefits and your personal skincare routine.
                        </p>
                        <div className="text-xs md:text-sm text-[#64748b] space-y-1">
                          <div>TikTok: 10,000+ followers</div>
                          <div>Instagram (optional): 5,000+ followers</div>
                        </div>
                      </div>

                      <Button className="bg-[#2563eb] hover:bg-[#1c5ae2] text-white w-full sm:w-auto">
                        View Details
                      </Button>
                    </div>

                    <div className="order-1 md:order-2 md:ml-6 flex justify-center md:block">
                      <Image
                        src="/placeholder.svg?height=150&width=150"
                        alt="Product"
                        width={150}
                        height={150}
                        className="md:w-[200px] md:h-[200px] rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
