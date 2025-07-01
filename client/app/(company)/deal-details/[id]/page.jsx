"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  MessageCircle,
  Check,
  X,
  Calendar,
  Instagram,
  Facebook,
  ExternalLink,
  Mail,
  Phone,
  FileText,
} from "lucide-react";
import { useState, useEffect, use, useMemo } from "react";
import NavBar from "@/app/ui/components/nav-bar";
import { getData } from "@/app/lib/data";
import { getJobRequestById } from "@/app/lib/queries";
import { useJwtContext } from "@/app/jwt-provider";
import { apiUrl } from "@/app/lib/utils";
import { updateJobRequest } from "@/app/lib/mutations";
import { createUserIfNotExists, initiateChatRoom } from "@/app/lib/chat-init";
import { useRouter } from "next/navigation";

export default function DealRequestDetails({ params }) {
  const { id: requestId } = use(params);
  const [requestData, setRequestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { decodedToken } = useJwtContext();
  const [loadingChat, setLoadingChat] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchRequestData = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        const { data } = await getData(getJobRequestById, {
          getJobRequestId: requestId,
          companyId: decodedToken?.id,
        });
        setRequestData(data.getJobRequest);
      } catch (error) {
        console.error("Error fetching request data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestData();
  }, [requestId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  const router = useRouter();

  const handleAcceptDeal = async () => {
    setProcessing(true);
    try {
      // Handle accept deal logic
      const data = await getData(updateJobRequest, {
        companyId: decodedToken?.id,
        status: "approved",
        jobId: requestId,
      });
      setRequestData((prev) => ({ ...prev, status: "approved" }));
    } catch (error) {
      console.error("Error accepting deal:", error);
    } finally {
      setProcessing(false);
    }
  };

  const handleRejectDeal = async () => {
    setProcessing(true);
    try {
      // Handle reject deal logic
      const data = await getData(updateJobRequest, {
        companyId: decodedToken?.id,
        status: "rejected",
        jobId: requestId,
      });
      setRequestData((prev) => ({ ...prev, status: "rejected" }));
    } catch (error) {
      console.error("Error rejecting deal:", error);
    } finally {
      setProcessing(false);
    }
  };

  const currentUser = useMemo(() => {
    return {
      id: decodedToken?.id,
      username: decodedToken?.name,
      type: decodedToken?.role == "influencer" ? "freelancer" : "client",
      pfp: decodedToken?.pfp || "/placeholder.svg",
    };
  }, []);
  const handleContactInfluencer = () => {
    const initChat = async () => {
      setLoadingChat(true);
      try {
        // Create or get current user
        await createUserIfNotExists(currentUser);

        const info = requestData.influencer;
        const influencerUser = {
          id: info._id,
          username: info.fullName || info.title,
          type: "freelancer",
          pfp: info.photo || "/placeholder.svg",
        };

        await createUserIfNotExists(influencerUser);

        // Initialize chat room
        const room = await initiateChatRoom([
          currentUser.id,
          influencerUser.id,
        ]);

        router.push(`/chat/${room.chatRoomId}`);
      } catch (error) {
        console.error("Error initializing chat:", error);
      } finally {
        setLoading(false);
      }
    };

    initChat();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <NavBar />
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-20">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563eb] mx-auto mb-4"></div>
              <p className="text-[#64748b]">Loading request details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!requestData) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <NavBar />
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-20">
          <div className="text-center">
            <p className="text-red-600 mb-4">Request not found</p>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
            Back to Requests
          </Button>
          <span>/</span>
          <span className="truncate">
            Request from {requestData.influencer.fullName}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-12">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8">
          {/* Main Content - Left Side */}
          <div className="xl:col-span-2 space-y-6">
            {/* Request Header */}
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={
                        apiUrl + requestData.influencer.photo ||
                        "/placeholder.svg"
                      }
                    />
                    <AvatarFallback className="bg-[#d9d9d9] text-[#71839b] text-xl">
                      {requestData.influencer.fullName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl font-bold text-[#141414]">
                        {requestData.influencer.fullName}
                      </h1>
                      <Badge
                        variant="secondary"
                        className={`${getStatusColor(
                          requestData.status
                        )} border`}
                      >
                        {requestData.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[#64748b] mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Joined {formatDate(requestData.influencer.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Campaign Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-[#141414] mb-2">
                    Applied for Campaign
                  </h3>
                  <p className="text-[#2563eb] font-medium mb-1">
                    {requestData.title}
                  </p>
                  <p className="text-sm text-[#64748b]">
                    by {requestData.job.company.title}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Application Details */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-[#141414] flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Application Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#f8fafc] rounded-lg p-4">
                    <span className="text-sm font-medium text-[#64748b]">
                      Suggested Price
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-[#141414]">
                        ${requestData.price}
                      </span>
                      <span className="text-sm text-[#64748b]">
                        vs ${requestData.job.price} original
                      </span>
                    </div>
                  </div>
                  <div className="bg-[#f8fafc] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-[#64748b]" />
                      <span className="text-sm font-medium text-[#64748b]">
                        Applied Date
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-[#141414]">
                      {formatDate(requestData.createdAt)}
                    </span>
                  </div>
                  {/* <div className="bg-[#f8fafc] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-[#64748b]" />
                      <span className="text-sm font-medium text-[#64748b]">
                        Available From
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-[#141414]">
                      {formatDate(requestData.availableStartDate)}
                    </span>
                  </div> */}
                </div>

                <div>
                  <h4 className="font-semibold text-[#141414] mb-3">
                    Application Message
                  </h4>
                  <div className="bg-[#f8fafc] rounded-lg p-4">
                    <p className="text-[#64748b] leading-relaxed whitespace-pre-line">
                      {requestData.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-[#141414]">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#64748b]" />
                  <div>
                    <p className="text-sm font-medium text-[#141414]">Email</p>
                    <p className="text-sm text-[#64748b]">
                      {requestData.influencer.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#64748b]" />
                  <div>
                    <p className="text-sm font-medium text-[#141414]">Phone</p>
                    <p className="text-sm text-[#64748b]">
                      {requestData.influencer.phoneNumber}
                    </p>
                  </div>
                </div>

                <Button
                  className="w-full bg-[#2563eb] hover:bg-[#1c5ae2] text-white"
                  onClick={handleContactInfluencer}
                >
                  {loadingChat ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Loading Chat...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Influencer
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-[#141414]">
                  Social Media
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {requestData.influencer.socialMedia.map((platform, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    {
                      [
                        <Instagram className="w-4 h-4 mr-2" />,
                        <Facebook className="w-4 h-4 mr-2" />,
                        <Facebook className="w-4 h-4 mr-2" />,

                        <Facebook className="w-4 h-4 mr-2" />,
                      ][index]
                    }
                    {platform}
                    <ExternalLink className="w-3 h-3 ml-auto" />
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="bg-gradient-to-r from-[#2563eb] to-[#1c5ae2] text-white shadow-sm">
              <CardContent className="p-6">
                {requestData.status === "pending" && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg mb-2">
                      Review Application
                    </h3>
                    <p className="text-blue-100 text-sm mb-4">
                      Accept this influencer's application to start the
                      collaboration.
                    </p>
                    <div className="space-y-2">
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={handleAcceptDeal}
                        disabled={processing}
                      >
                        {processing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Accept Application
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-white text-white hover:bg-white hover:text-[#2563eb] bg-transparent"
                        onClick={handleRejectDeal}
                        disabled={processing}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Reject Application
                      </Button>
                    </div>
                  </div>
                )}

                {requestData.status === "approved" && (
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">
                      Application Accepted
                    </h3>
                    <p className="text-blue-100 text-sm">
                      You've accepted this collaboration. The influencer has
                      been notified.
                    </p>
                  </div>
                )}

                {requestData.status === "rejected" && (
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <X className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">
                      Application Rejected
                    </h3>
                    <p className="text-blue-100 text-sm">
                      This application has been rejected. The influencer has
                      been notified.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
