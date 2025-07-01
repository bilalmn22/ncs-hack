"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Star,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { getData } from "@/app/lib/data";
import { getJobDetails } from "@/app/lib/queries";
import NavBar from "@/app/ui/influencer/nav-bar";
import { apiUrl } from "@/app/lib/utils";
import Link from "next/link";
import { Avatar } from "@mui/material";

export default function DealDetails({ params }) {
  const { id: jobId } = use(params);

  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
        const { data } = await getData(getJobDetails, {
          previewJobId: jobId,
          user: "",
        });
        console.log(data);
        setJobData(data.previewJob);
      } catch (err) {
        setError("Failed to load job details");
        console.error("Error fetching job data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <NavBar />
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-20">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563eb] mx-auto mb-4"></div>
              <p className="text-[#64748b]">Loading campaign details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !jobData) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <NavBar />
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-20">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || "Campaign not found"}</p>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatFollowers = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M+`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K+`;
    }
    return `${count}+`;
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <NavBar />

      {/* Breadcrumb Navigation */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-6">
        <div className="flex items-center gap-2 text-sm text-[#64748b] mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto font-normal hover:text-[#2563eb]"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Browse
          </Button>
          <span>/</span>
          <span>{jobData.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <Card className="bg-white shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2">
                    {jobData.attachments.length > 0 &&
                    jobData.attachments[0].kind === "image" ? (
                      <Image
                        src={
                          apiUrl + jobData.attachments[0].link ||
                          "/placeholder.svg"
                        }
                        alt={jobData.title}
                        width={400}
                        height={400}
                        className="w-full h-64 md:h-80 object-cover"
                      />
                    ) : (
                      <div className="w-full h-64 md:h-80 bg-gradient-to-br from-[#2563eb] to-[#1c5ae2] flex items-center justify-center">
                        <div className="text-center text-white">
                          <h3 className="text-2xl font-bold mb-2">
                            {jobData.company.title}
                          </h3>
                          <p className="text-blue-100">Campaign Visual</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="md:w-1/2 p-6 md:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#141414] mb-2">
                          {jobData.title}
                        </h1>
                        <p className="text-[#2563eb] font-semibold text-lg">
                          {jobData.company.title}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex  gap-4">
                        <span className="text-2xl font-bold text-[#141414]">
                          ${jobData.price}
                        </span>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#64748b]" />
                          <span className="text-sm text-[#64748b]">
                            {jobData.contentType}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#64748b]" />
                        <span className="text-sm text-[#64748b]">
                          {jobData.platforms.join(", ")} Campaign
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#64748b]" />
                        <span className="text-sm text-[#64748b]">
                          Deadline: {formatDate(jobData.deadline)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Campaign Description */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-[#141414]">
                  Campaign Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[#64748b] leading-relaxed whitespace-pre-line">
                  {jobData.description}
                </p>

                {jobData.targetAudience && (
                  <div className="bg-[#f8fafc] rounded-lg p-4">
                    <h4 className="font-semibold text-[#141414] mb-2">
                      Target Audience
                    </h4>
                    <p className="text-sm text-[#64748b]">
                      {jobData.targetAudience}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Content Requirements */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-[#141414]">
                  Content Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-[#f8fafc] rounded-lg p-4">
                  <h4 className="font-semibold text-[#141414] mb-3">
                    Requirements
                  </h4>
                  <p className="text-sm text-[#64748b] whitespace-pre-line">
                    {jobData.contentRequirements}
                  </p>
                </div>

                {jobData.deliverables && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-[#141414]">
                      Deliverables
                    </h4>
                    <p className="text-sm text-[#64748b] whitespace-pre-line">
                      {jobData.deliverables}
                    </p>
                  </div>
                )}

                {jobData.eligibilityRequirements && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-[#141414]">
                      Eligibility Requirements
                    </h4>
                    <p className="text-sm text-[#64748b] whitespace-pre-line">
                      {jobData.eligibilityRequirements}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Attachments */}
            {jobData.attachments.length > 0 && (
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-[#141414]">
                    Campaign Assets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {jobData.attachments.map((attachment, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#2563eb] rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {attachment.kind.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-[#141414] capitalize">
                              {attachment.kind}
                            </p>
                            <Button
                              variant="link"
                              className="p-0 h-auto text-[#2563eb] text-sm"
                            >
                              <Link
                                target="_blank"
                                download
                                href={apiUrl + attachment.link}
                                className="block w-full h-full"
                              >
                                View Asset
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Company Profile */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-[#141414]">
                  Company
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  {jobData.company.photo ? (
                    <Avatar
                      src={apiUrl + jobData.company.photo || "/placeholder.svg"}
                      alt={jobData.company.title}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-15 h-15 bg-[#2563eb] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {jobData.company.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-[#141414]">
                      {jobData.company.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-[#64748b]">
                        Verified Brand
                      </span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  Contact Brand
                </Button>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-[#141414]">
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 items-center justify-between">
                    <span className="text-sm text-[#64748b]">Platforms</span>
                    <div className="flex gap-1">
                      {jobData.platforms.map((platform, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2  justify-between">
                    <span className="text-sm text-[#64748b]">
                      Min Followers
                    </span>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-[#64748b]" />
                      <span className="text-sm  font-medium text-[#141414]">
                        {formatFollowers(jobData.minFollowers)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2  justify-between">
                    <span className="text-sm text-[#64748b]">Content Type</span>
                    <Badge
                      className={"whitespace-normal break-words max-w-full"}
                      variant="secondary "
                    >
                      {jobData.contentType}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2  items-center justify-between">
                    <span className="text-sm text-[#64748b]">Deadline</span>
                    <span className="text-sm font-medium text-[#141414]">
                      {formatDate(jobData.deadline)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 items-center justify-between">
                    <span className="text-sm text-[#64748b]">Posted</span>
                    <span className="text-sm font-medium text-[#141414]">
                      {formatDate(jobData.createdAt)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Apply Button */}
            <Card className="bg-gradient-to-r from-[#2563eb] to-[#1c5ae2] text-white shadow-sm">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-lg mb-2">Ready to Apply?</h3>
                <p className="text-sm text-blue-100 mb-4">
                  Join this campaign and start creating amazing content with{" "}
                  {jobData.company.title}!
                </p>
                <Button className="w-full bg-white text-[#2563eb] hover:bg-gray-50 font-semibold">
                  <Link
                    href={`/influencer/jobs/${jobId}/apply`}
                    className="block w-full h-full"
                  >
                    Apply Now
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
