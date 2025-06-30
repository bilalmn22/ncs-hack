"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Upload, X, Menu, ChevronDown, ChevronUp, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CreateOffer() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPlatforms, setSelectedPlatforms] = useState(["TikTok"])
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: "document.pdf", type: "pdf" },
    { name: "brief.docx", type: "word" },
  ])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form data state
  const [formData, setFormData] = useState({
    postTitle: "",
    description: "",
    budget: "",
    deadline: "",
    targetAudience: "",
    scenario: "",
  })

  // Error state
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const steps = [
    { number: 1, title: "General Info", subtitle: "Describe the job you need" },
    { number: 2, title: "Time", subtitle: "When do you need it" },
    { number: 3, title: "Rate", subtitle: "How much are you paying" },
    {
      number: 4,
      title: "Upload Files",
      subtitle: "Files needed to perform it",
    },
    {
      number: 5,
      title: "Review & Post",
      subtitle: "Make sure we got it right",
    },
  ]

  const platforms = ["TikTok", "Instagram", "YouTube", "Facebook", "Twitter"]

  // Validation functions
  const validateStep1 = () => {
    const stepErrors = {}

    if (!formData.postTitle.trim()) {
      stepErrors.postTitle = "Post title is required"
    } else if (formData.postTitle.length < 3) {
      stepErrors.postTitle = "Post title must be at least 3 characters"
    }

    if (selectedPlatforms.length === 0) {
      stepErrors.platforms = "At least one platform must be selected"
    }

    if (!formData.description.trim()) {
      stepErrors.description = "Description is required"
    } else if (formData.description.length < 10) {
      stepErrors.description = "Description must be at least 10 characters"
    }

    if (!formData.budget.trim()) {
      stepErrors.budget = "Budget is required"
    } else if (!/^\d+\$?$/.test(formData.budget.replace(/[,$]/g, ""))) {
      stepErrors.budget = "Please enter a valid budget amount"
    }

    return stepErrors
  }

  const validateStep2 = () => {
    const stepErrors = {}

    if (!formData.targetAudience.trim()) {
      stepErrors.targetAudience = "Target audience is required"
    }

    if (!formData.scenario.trim()) {
      stepErrors.scenario = "Scenario is required"
    } else if (formData.scenario.length < 20) {
      stepErrors.scenario = "Scenario must be at least 20 characters"
    }

    if (formData.deadline && new Date(formData.deadline) < new Date()) {
      stepErrors.deadline = "Deadline cannot be in the past"
    }

    return stepErrors
  }

  const validateStep4 = () => {
    const stepErrors = {}

    if (uploadedFiles.length === 0) {
      stepErrors.files = "At least one file must be uploaded"
    }

    return stepErrors
  }

  const validateCurrentStep = () => {
    let stepErrors = {}

    switch (currentStep) {
      case 1:
        stepErrors = validateStep1()
        break
      case 2:
        stepErrors = validateStep2()
        break
      case 4:
        stepErrors = validateStep4()
        break
      default:
        stepErrors = {}
    }

    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleInputBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const togglePlatform = (platform) => {
    setSelectedPlatforms((prev) => {
      const newPlatforms = prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]

      // Clear platform error if platforms are selected
      if (newPlatforms.length > 0 && errors.platforms) {
        setErrors((prev) => ({ ...prev, platforms: "" }))
      }

      return newPlatforms
    })
  }

  const removeFile = (index) => {
    setUploadedFiles((prev) => {
      const newFiles = prev.filter((_, i) => i !== index)

      // Clear file error if files remain
      if (newFiles.length > 0 && errors.files) {
        setErrors((prev) => ({ ...prev, files: "" }))
      }

      return newFiles
    })
  }

  const nextStep = async () => {
    if (currentStep < 5) {
      const isValid = validateCurrentStep()

      if (isValid) {
        setCurrentStep(currentStep + 1)
      } else {
        // Mark all fields as touched to show errors
        const fieldsToTouch = {}
        Object.keys(errors).forEach((field) => {
          fieldsToTouch[field] = true
        })
        setTouched((prev) => ({ ...prev, ...fieldsToTouch }))
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Validate all steps
      const step1Errors = validateStep1()
      const step2Errors = validateStep2()
      const step4Errors = validateStep4()

      const allErrors = { ...step1Errors, ...step2Errors, ...step4Errors }

      if (Object.keys(allErrors).length > 0) {
        setErrors(allErrors)
        setIsSubmitting(false)
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Success - redirect or show success message
      alert("Offer created successfully!")
    } catch (error) {
      setErrors({ submit: "Failed to create offer. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const ErrorMessage = ({ error }) => {
    if (!error) return null

    return (
      <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
        <AlertCircle className="w-4 h-4" />
        <span>{error}</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <header className="bg-white border-b border-[#e2e8f0] px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="w-5 h-5" />
            </Button>
            <Link href="/" className="text-xl lg:text-2xl font-bold text-[#2563eb]">
              Cloutsy
            </Link>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-[#71839b]">
            <span>Pages</span>
            <span>/</span>
            <span>Create</span>
            <span>/</span>
            <span className="text-[#181818] font-medium">Create offer</span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-[#2563eb] h-2"></div>

      {/* Mobile Steps Dropdown */}
      <div className="lg:hidden bg-white border-b border-[#e2e8f0]">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full flex items-center justify-between p-4 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-sm font-medium">
              {currentStep}
            </div>
            <div>
              <div className="font-semibold text-[#181818]">{steps[currentStep - 1].title}</div>
              <div className="text-sm text-[#71839b]">{steps[currentStep - 1].subtitle}</div>
            </div>
          </div>
          {sidebarOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {sidebarOpen && (
          <div className="border-t border-[#e2e8f0] p-4 space-y-4">
            {steps.map((step) => (
              <button
                key={step.number}
                onClick={() => {
                  setCurrentStep(step.number)
                  setSidebarOpen(false)
                }}
                className="w-full flex items-start gap-4 p-2 rounded-lg hover:bg-[#f5f5f5]"
              >
                <div
                  className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${
                    currentStep === step.number
                      ? "bg-[#2563eb] text-white"
                      : currentStep > step.number
                        ? "bg-green-500 text-white"
                        : "bg-[#e2e8f0] text-[#71839b]"
                  }
                `}
                >
                  {step.number}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-xs text-[#71839b] mb-1">Step {step.number}</div>
                  <div className="font-medium text-[#181818] mb-1">{step.title}</div>
                  <div className="text-xs text-[#71839b]">{step.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex min-h-[calc(100vh-73px)] lg:min-h-[calc(100vh-80px)]">
        {/* Desktop Steps Sidebar */}
        <div className="hidden lg:block w-80 bg-white border-r border-[#e2e8f0] p-8">
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-row-reverse items-start gap-4">
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${
                    currentStep === step.number
                      ? "bg-[#2563eb] text-white"
                      : currentStep > step.number
                        ? "bg-green-500 text-white"
                        : "bg-[#e2e8f0] text-[#71839b]"
                  }
                `}
                >
                  {step.number}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[#71839b] mb-1">Step {step.number}</div>
                  <div className="font-semibold text-[#181818] mb-1">{step.title}</div>
                  <div className="text-sm text-[#71839b]">{step.subtitle}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Navigation Buttons */}
          <div className="flex gap-4 mt-12">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button
              onClick={currentStep === 5 ? handleSubmit : nextStep}
              disabled={isSubmitting}
              className="flex-1 bg-[#2563eb] hover:bg-[#2563eb]/90 text-white flex cursor-pointer  items-center justify-center gap-2"
            >
              {isSubmitting ? "Submitting..." : currentStep === 5 ? "Submit Offer" : "Next Step"}
              {!isSubmitting && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8">
          <div className="max-w-4xll">
            <h2 className="text-lg lg:text-xl font-semibold text-[#71839b] mb-6 lg:mb-8">
              Complete the following fields
            </h2>

            {/* Global Error Alert */}
            {errors.submit && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{errors.submit}</AlertDescription>
              </Alert>
            )}

            {/* Step 1: General Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl lg:text-2xl font-bold text-[#181818] mb-6 lg:mb-8">General Info</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#181818] mb-2">
                      Post title <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Title"
                      value={formData.postTitle}
                      onChange={(e) => handleInputChange("postTitle", e.target.value)}
                      onBlur={() => handleInputBlur("postTitle")}
                      className={`w-full bg-white border-[1px] border-solid py-3 ${
                        errors.postTitle && touched.postTitle
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "border-[#B3B3B3]"
                      }`}
                    />
                    <ErrorMessage error={errors.postTitle && touched.postTitle ? errors.postTitle : ""} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#181818] mb-2">
                      Platforms <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {platforms.map((platform) => (
                        <Badge
                          key={platform}
                          variant={selectedPlatforms.includes(platform) ? "default" : "outline"}
                          className={`cursor-pointer select-none px-3 py-1.5 text-sm ${
                            selectedPlatforms.includes(platform)
                              ? "bg-[#2563eb] text-white hover:bg-[#2563eb]/90"
                              : "border-[#e2e8f0] text-[#71839b] hover:bg-[#f5f5f5]"
                          }`}
                          onClick={() => togglePlatform(platform)}
                        >
                          {platform}
                        </Badge>
                      ))}
                    </div>
                    <ErrorMessage error={errors.platforms} />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#181818] mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      placeholder="Description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      onBlur={() => handleInputBlur("description")}
                      className={`min-h-32 bg-white border-[1px] border-solid py-3 ${
                        errors.description && touched.description
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "border-[#B3B3B3]"
                      }`}
                    />
                    <ErrorMessage error={errors.description && touched.description ? errors.description : ""} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#181818] mb-2">
                      Budget <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="300$"
                      value={formData.budget}
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                      onBlur={() => handleInputBlur("budget")}
                      className={`w-full bg-white border-[1px] border-solid py-3 ${
                        errors.budget && touched.budget
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "border-[#B3B3B3]"
                      }`}
                    />
                    <ErrorMessage error={errors.budget && touched.budget ? errors.budget : ""} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Time & Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl lg:text-2xl font-bold text-[#181818] mb-6 lg:mb-8">General Info</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#181818] mb-2">Deadline</label>
                    <Input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => handleInputChange("deadline", e.target.value)}
                      onBlur={() => handleInputBlur("deadline")}
                      className={`w-full ${
                        errors.deadline && touched.deadline ? "border-red-500 focus-visible:ring-red-500" : ""
                      }`}
                    />
                    <ErrorMessage error={errors.deadline && touched.deadline ? errors.deadline : ""} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#181818] mb-2">
                      Target Audience <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Fitness men gym"
                      value={formData.targetAudience}
                      onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                      onBlur={() => handleInputBlur("targetAudience")}
                      className={`w-full ${
                        errors.targetAudience && touched.targetAudience
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      error={errors.targetAudience && touched.targetAudience ? errors.targetAudience : ""}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#181818] mb-2">
                      Scenario <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      placeholder="Scenario"
                      value={formData.scenario}
                      onChange={(e) => handleInputChange("scenario", e.target.value)}
                      onBlur={() => handleInputBlur("scenario")}
                      className={`min-h-32 ${
                        errors.scenario && touched.scenario ? "border-red-500 focus-visible:ring-red-500" : ""
                      }`}
                    />
                    <ErrorMessage error={errors.scenario && touched.scenario ? errors.scenario : ""} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#181818] mb-2">
                      Budget <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="300$"
                      value={formData.budget}
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                      className="w-full"
                      disabled
                    />
                    <p className="text-xs text-[#71839b] mt-1">Budget from Step 1</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Rate */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl lg:text-2xl font-bold text-[#181818] mb-6 lg:mb-8">Rate</h3>
                <div className="text-center py-16">
                  <p className="text-[#71839b]">Rate configuration coming soon...</p>
                </div>
              </div>
            )}

            {/* Step 4: Upload Files */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-xl lg:text-2xl font-bold text-[#181818] mb-6 lg:mb-8">Upload files</h3>

                {uploadedFiles.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[#181818] mb-3">Files Uploaded</label>
                    <div className="flex flex-wrap gap-3">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="relative">
                          <div
                            className={`
                            w-12 h-12 rounded flex items-center justify-center text-white font-bold text-xs
                            ${file.type === "pdf" ? "bg-red-500" : "bg-blue-500"}
                          `}
                          >
                            {file.type === "pdf" ? "PDF" : "W"}
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className={`border-2 border-dashed rounded-lg p-6 lg:p-8 text-center ${
                    errors.files ? "border-red-500 bg-red-50" : "border-[#2563eb]"
                  }`}
                >
                  <div className="space-y-4">
                    <Upload
                      className={`w-10 h-10 lg:w-12 lg:h-12 mx-auto ${
                        errors.files ? "text-red-500" : "text-[#2563eb]"
                      }`}
                    />
                    <div>
                      <p className="text-[#181818] font-medium text-sm lg:text-base">Drag and drop files here</p>
                      <p className="text-[#71839b] text-sm">or</p>
                    </div>
                    <Button
                      variant="outline"
                      className={`${
                        errors.files
                          ? "border-red-500 text-red-500 bg-transparent"
                          : "border-[#2563eb] text-[#2563eb] bg-transparent"
                      }`}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Files
                    </Button>
                  </div>
                </div>
                <ErrorMessage error={errors.files} />
              </div>
            )}

            {/* Step 5: Review & Post */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h3 className="text-xl lg:text-2xl font-bold text-[#181818] mb-6 lg:mb-8">Review & Post</h3>

                <div className="bg-white rounded-lg border border-[#e2e8f0] p-6">
                  <h4 className="font-semibold text-[#181818] mb-4">Review Your Offer</h4>

                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-[#71839b]">Post Title:</span>
                      <p className="font-medium">{formData.postTitle || "Not specified"}</p>
                    </div>

                    <div>
                      <span className="text-sm text-[#71839b]">Platforms:</span>
                      <p className="font-medium">{selectedPlatforms.join(", ")}</p>
                    </div>

                    <div>
                      <span className="text-sm text-[#71839b]">Budget:</span>
                      <p className="font-medium">{formData.budget || "Not specified"}</p>
                    </div>

                    <div>
                      <span className="text-sm text-[#71839b]">Target Audience:</span>
                      <p className="font-medium">{formData.targetAudience || "Not specified"}</p>
                    </div>

                    <div>
                      <span className="text-sm text-[#71839b]">Files:</span>
                      <p className="font-medium">{uploadedFiles.length} file(s) uploaded</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Navigation Buttons */}
            <div className="lg:hidden flex gap-4 mt-8 pt-6 border-t border-[#e2e8f0]">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 bg-transparent px-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                onClick={currentStep === 5 ? handleSubmit : nextStep}
                disabled={isSubmitting}
                className="flex-1 bg-[#2563eb] hover:bg-[#2563eb]/90 text-white flex cursor-pointer  items-center justify-center gap-2"
              >
                {isSubmitting ? "Submitting..." : currentStep === 5 ? "Submit Offer" : "Next Step"}
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
