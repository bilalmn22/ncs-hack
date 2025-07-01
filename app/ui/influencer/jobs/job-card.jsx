"use client";
import { apiUrl } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function JobCard({ job }) {
  return (
    <div className="p-4 bg-white rounded-2xl  md:p-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1 order-2 md:order-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
            <h2 className="text-xl md:text-2xl font-semibold text-[#2563eb]">
              {job.title || "Vitamin C Serum Promotion"}
            </h2>
            <span className="text-xl md:text-2xl font-bold text-[#141414]">
              {job.price || "500"} $
            </span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Avatar
              src={apiUrl + job.companyInfo.photo || "/placeholder.svg"}
              alt="Emily Tran"
              width={40}
              height={40}
              className="rounded-full flex-shrink-0"
            >
              {job.companyInfo.title.charAt(0).toUpperCase() || "E"}
            </Avatar>
            <div className="min-w-0">
              <div className="font-medium text-[#141414] text-sm md:text-base">
                {job.companyInfo.title || "Emily Tran"}
              </div>
              <div className="text-xs md:text-sm text-[#64748b]">
                Brand Partnerships Manager
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-[#141414] mb-2 text-sm md:text-base">
              {job.description ||
                "We are looking for a TikTok influencer to promote our new Vitamin C serum. The campaign will involve creating engaging content that showcases the product benefits and your personal skincare routine."}
            </p>

            <p className="text-[#64748b] text-xs md:text-sm mb-3">
              {job?.contentRequirements ||
                "Must have a strong presence on TikTok and a passion for skincare. Experience with beauty products is a plus."}
            </p>
            <div className="text-xs md:text-sm text-[#64748b] space-y-1">
              {job?.minFollowers && (
                <div>
                  <strong>Minimum Followers:</strong> {job.minFollowers}
                </div>
              )}
            </div>
          </div>

          <Button className="bg-[#2563eb] hover:bg-[#1c5ae2] text-white w-full sm:w-auto">
            <Link
              href={`/influencer/jobs/${job._id}`}
              className="block w-full h-full"
            >
              View Details
            </Link>
          </Button>
        </div>

        <div className="order-1 md:order-2 md:ml-6 flex justify-center md:block">
          <Image
            src={
              job?.attachments.length > 0
                ? apiUrl + job?.attachments[0]?.link
                : "/placeholder.svg"
            }
            alt="Product"
            width={150}
            height={150}
            className="md:w-[200px] md:h-[200px] rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
