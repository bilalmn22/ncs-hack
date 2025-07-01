"use client";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { useState } from "react";
export default function JobsFilters() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="w-full justify-center gap-2"
        >
          <Filter className="w-4 h-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Sidebar Filters */}
      <div
        className={`w-full relative   lg:w-64 lg:flex-shrink-0 ${
          showFilters ? "block" : "hidden lg:block"
        }`}
      >
        <div className="bg-white border-[rgba(20,20,20,0.05)] border-solid border-[1px] rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] p-4 md:p-6 sticky top-16 lg:top-20 z-10">
          <div className="flex items-center justify-between mb-4 lg:block">
            <h3 className="font-semibold text-[#141414]">Filters</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowFilters(false)}
              className="lg:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Platform Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-[#141414] mb-3">Platform</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" name="platform" className="mr-2" />
                <span className="text-[#64748b] text-sm md:text-base">
                  Instagram
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="platform"
                  className="mr-2 accent-[#2563eb]"
                  defaultChecked
                />
                <span className="text-[#141414] text-sm md:text-base">
                  TikTok
                </span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="platform" className="mr-2" />
                <span className="text-[#64748b] text-sm md:text-base">X</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="platform" className="mr-2" />
                <span className="text-[#64748b] text-sm md:text-base">
                  Threads
                </span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="platform" className="mr-2" />
                <span className="text-[#64748b] text-sm md:text-base">
                  Facebook
                </span>
              </label>
            </div>
          </div>

          {/* Min Followers Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-[#141414] mb-3">Min Followers</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="followers"
                  className="mr-2 accent-[#2563eb]"
                  defaultChecked
                />
                <span className="text-[#141414] text-sm md:text-base">Any</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="followers" className="mr-2" />
                <span className="text-[#64748b] text-sm md:text-base">1K+</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="followers" className="mr-2" />
                <span className="text-[#64748b] text-sm md:text-base">5K+</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="followers" className="mr-2" />
                <span className="text-[#64748b] text-sm md:text-base">
                  10K+
                </span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="followers" className="mr-2" />
                <span className="text-[#64748b] text-sm md:text-base">
                  100K+
                </span>
              </label>
            </div>
          </div>

          {/* Content Type Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-[#141414] mb-3">Content Type</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="content"
                  className="mr-2 accent-[#2563eb]"
                  defaultChecked
                />
                <span className="text-[#141414] text-sm md:text-base">
                  Video (Short-form)
                </span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="content" className="mr-2" />
                <span className="text-[#64748b] text-sm md:text-base">
                  Product Unboxing
                </span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="content" className="mr-2" />
                <span className="text-[#64748b] text-sm md:text-base">
                  Review
                </span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="content" className="mr-2" />
                <span className="text-[#64748b] text-sm md:text-base">
                  Story
                </span>
              </label>
            </div>
          </div>

          {/* Budget Range Filter */}
          <div>
            <h4 className="font-medium text-[#141414] mb-3">Budget Range</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="budget"
                  className="mr-2 accent-[#2563eb]"
                  defaultChecked
                />
                <span className="text-[#141414] text-sm md:text-base">
                  Under $100
                </span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="budget" className="mr-2" />
                <span className="text-[#64748b] text-sm md:text-base">
                  $100-$250
                </span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="budget" className="mr-2" />
                <span className="text-[#64748b] text-sm md:text-base">
                  $250-$500
                </span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="budget" className="mr-2" />
                <span className="text-[#64748b] text-sm md:text-base">
                  $500+
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
