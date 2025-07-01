"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import NavBar from "@/app/ui/influencer/nav-bar";
import { useState, useEffect } from "react";
import { use } from "react";
import { getData } from "@/app/lib/data";
import { getJobDetails } from "@/app/lib/queries";
import { apiUrl } from "@/app/lib/utils";
import { Avatar } from "@mui/material";
import { useJwtContext } from "@/app/jwt-provider";
import { applyToJob } from "@/app/lib/mutations";

export default function JobApplication({ params }) {
  const { id: jobId } = use(params);
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    suggestedPrice: "",
    applicationMessage: "",
    attachments: [],
    agreedToTerms: false,
  });

  const { token, decodedToken } = useJwtContext();
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
        const { data } = await getData(getJobDetails, {
          previewJobId: jobId,
          user: "",
        });
        setJobData(data.previewJob);
      } catch (err) {
        console.error("Error fetching job data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [jobId]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (files) => {
    const newAttachments = Array.from(files).map((file) => ({
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      id: Math.random().toString(36).substr(2, 9),
    }));

    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments],
    }));
  };

  const removeAttachment = (attachmentId) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((att) => att.id !== attachmentId),
    }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const uploadedFiles = formData.attachments.map(({ file }) => file);

    try {
      // Upload files to /uploads and get the URL response
      const uploadFiles = async (files) => {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files", file);
        });

        const response = await fetch(apiUrl + "/uploads", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error("File upload failed");
        }

        const data = await response.json();
        console.log({ data });
        return data; // Assuming the response contains the uploaded file URL
      };
      const { files: uploadedFilePromises } = await uploadFiles(
        uploadedFiles.map((file) => file)
      );

      const registrationData = {
        postJobRequestInput: {
          description: formData.applicationMessage,
          price: parseInt(formData.suggestedPrice),
          job: jobId,
          attachments: uploadedFilePromises.map((file) => ({
            link: file || null,
            kind: "image",
          })),
        },
        userid: decodedToken?.id || "",
      };
      console.log({ registrationData });

      const response = await fetch(apiUrl + "/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
        body: JSON.stringify({
          query: applyToJob,
          variables: registrationData,
        }),
      });
      console.log({ response });

      const data = await response.json();
      console.log({ data });
    } catch (error) {
      setErrors({ submit: "Failed to create offer. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <NavBar />
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-20">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563eb] mx-auto mb-4"></div>
              <p className="text-[#64748b]">Loading application form...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <NavBar />
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-20">
          <div className="text-center">
            <p className="text-red-600 mb-4">Campaign not found</p>
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
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Campaign
          </Button>
          <span>/</span>
          <span>Apply to Campaign</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Application Form - Left Side */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl text-[#141414]">
                  Apply for Campaign
                </CardTitle>
                <p className="text-sm md:text-base text-[#64748b]">
                  Fill out the form below to apply for this campaign. Make sure
                  all information is accurate.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Pricing Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#141414]">
                      Pricing & Budget
                    </h3>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <DollarSign className="w-5 h-5 text-[#2563eb] flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-[#141414] mb-1">
                            Brand Budget: ${jobData.price}
                          </h4>
                          <p className="text-sm text-[#64748b]">
                            You can suggest your own price or accept the brand's
                            budget. Your suggested price should reflect your
                            value and engagement rates.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="suggestedPrice"
                        className="text-sm font-medium text-[#141414]"
                      >
                        Your Suggested Price (USD) *
                      </Label>
                      <div className="relative mt-1">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748b]" />
                        <Input
                          id="suggestedPrice"
                          type="number"
                          min="1"
                          step="1"
                          value={formData.suggestedPrice}
                          onChange={(e) =>
                            handleInputChange("suggestedPrice", e.target.value)
                          }
                          className="pl-10"
                          placeholder={jobData.price.toString()}
                          required
                        />
                      </div>
                      <p className="text-xs text-[#64748b] mt-1">
                        Enter your suggested price. You can match the brand's
                        budget (${jobData.price}) or propose your own rate.
                      </p>
                    </div>
                  </div>

                  {/* Attachments Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#141414]">
                      Attachments
                    </h3>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#2563eb] transition-colors">
                      <input
                        type="file"
                        id="attachments"
                        multiple
                        accept="image/*,video/*,.pdf,.doc,.docx"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                      />
                      <label htmlFor="attachments" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-[#2563eb] rounded-lg flex items-center justify-center mb-3">
                            <svg
                              className="w-6 h-6 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-[#141414] mb-1">
                            Upload Portfolio Files
                          </p>
                          <p className="text-xs text-[#64748b]">
                            Images, videos, PDFs, or documents (Max 10MB each)
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Display uploaded attachments */}
                    {formData.attachments.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-[#141414]">
                          Uploaded Files ({formData.attachments.length})
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {formData.attachments.map((attachment) => (
                            <div
                              key={attachment.id}
                              className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50"
                            >
                              <div className="w-10 h-10 bg-[#2563eb] rounded-lg flex items-center justify-center flex-shrink-0">
                                {attachment.type.startsWith("image/") ? (
                                  <svg
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                ) : attachment.type.startsWith("video/") ? (
                                  <svg
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                  </svg>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-[#141414] text-sm truncate">
                                  {attachment.name}
                                </p>
                                <p className="text-xs text-[#64748b]">
                                  {formatFileSize(attachment.size)}
                                </p>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeAttachment(attachment.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Application Message */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#141414]">
                      Application Message
                    </h3>
                    <div>
                      <Label
                        htmlFor="applicationMessage"
                        className="text-sm font-medium text-[#141414]"
                      >
                        Why are you perfect for this campaign? *
                      </Label>
                      <Textarea
                        id="applicationMessage"
                        value={formData.applicationMessage}
                        onChange={(e) =>
                          handleInputChange(
                            "applicationMessage",
                            e.target.value
                          )
                        }
                        className="mt-1 min-h-[120px]"
                        placeholder="Tell us about your experience, why you're interested in this campaign, and how you plan to create engaging content..."
                        required
                      />
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreedToTerms}
                        onCheckedChange={(checked) =>
                          handleInputChange("agreedToTerms", checked)
                        }
                        className="mt-1"
                      />
                      <Label
                        htmlFor="terms"
                        className="text-sm text-[#64748b] leading-relaxed"
                      >
                        I agree to the terms and conditions, and I understand
                        that by applying to this campaign, I commit to
                        delivering the content as specified within the given
                        deadline. *
                      </Label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t">
                    <Button
                      type="submit"
                      disabled={
                        !formData.agreedToTerms ||
                        !formData.suggestedPrice ||
                        submitting
                      }
                      className="w-full bg-[#2563eb] hover:bg-[#1c5ae2] text-white py-3"
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting Application...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Campaign Summary - Right Side */}
          <div className="space-y-6">
            {/* Campaign Overview */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-[#141414]">
                  Campaign Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  {jobData.company.photo ? (
                    <Avatar
                      src={apiUrl + jobData.company.photo}
                      alt={jobData.company.title}
                      className="w-12 h-12"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-[#2563eb] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {jobData.company.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-[#141414]">
                      {jobData.title}
                    </h3>
                    <p className="text-sm text-[#64748b]">
                      {jobData.company.title}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#64748b]">Payment</span>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-[#64748b]" />
                      <span className="font-semibold text-[#141414]">
                        ${jobData.price}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#64748b]">Platforms</span>
                    <div className="flex gap-1">
                      {jobData.platforms.slice(0, 2).map((platform, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {platform}
                        </Badge>
                      ))}
                      {jobData.platforms.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{jobData.platforms.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#64748b]">Deadline</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-[#64748b]" />
                      <span className="text-sm font-medium text-[#141414]">
                        {formatDate(jobData.deadline)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#64748b]">
                      Min Followers
                    </span>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-[#64748b]" />
                      <span className="text-sm font-medium text-[#141414]">
                        {formatFollowers(jobData.minFollowers)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Tips */}
            <Card className="bg-blue-50 border-blue-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-[#141414] flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#2563eb]" />
                  Application Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm text-[#64748b]">
                  <p>• Be authentic and showcase your personality</p>
                  <p>• Include your best recent content examples</p>
                  <p>• Explain how you'll approach this specific campaign</p>
                  <p>• Mention your audience demographics if relevant</p>
                  <p>• Be professional but let your creativity shine</p>
                </div>
              </CardContent>
            </Card>

            {/* Warning Card */}
            <Card className="bg-amber-50 border-amber-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800 mb-1">
                      Important Note
                    </h4>
                    <p className="text-sm text-amber-700">
                      Make sure you meet the minimum follower requirements and
                      can deliver content by the specified deadline before
                      applying.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
