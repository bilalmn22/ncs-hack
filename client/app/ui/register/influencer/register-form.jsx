"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Upload,
  Camera,
} from "lucide-react";
import Image from "next/image";
import { apiUrl } from "@/app/lib/utils";
import { createInfluencer } from "@/app/lib/mutations";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    tiktok: "",
    instagram: "",
    facebook: "",
    youtube: "",
    birthday: "",
    profilePicture: null,
    nationalId: null,
    phoneNumber: "",
  });

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (
      !/^\d{10,15}$/.test(formData.phoneNumber) // Adjust regex as needed
    ) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};

    if (!formData.birthday) {
      newErrors.birthday = "Birthday is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileUpload = (field, file) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 3 && !validateStep3()) return;

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      setErrors({});
    }
  };

  const handleFinish = async () => {
    if (!validateStep3()) return;

    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    // Upload files to /uploads and get the URL response
    const uploadFile = async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      console.log({ apiUrl });

      const response = await fetch(apiUrl + "/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const data = await response.json();
      return data.filepath; // Assuming the response contains the uploaded file URL
    };

    try {
      const profilePictureUrl = formData.profilePicture
        ? await uploadFile(formData.profilePicture)
        : null;

      const nationalIdUrl = formData.nationalId
        ? await uploadFile(formData.nationalId)
        : null;

      const registrationData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        idCardUrl: nationalIdUrl || "",
        photo: profilePictureUrl || "",
        phoneNumber: formData.phoneNumber,
        socialMedia: [
          formData.tiktok,
          formData.instagram,
          formData.facebook,
          formData.youtube,
        ],
        description: "",
        birthday: formData.birthday + "T00:00:00Z",
      };
      console.log({ registrationData });

      const response = await fetch(apiUrl + "/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: createInfluencer,
          variables: {
            input: registrationData,
          },
        }),
      });
      console.log({ response });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Registration successful! You can now log in.");
        setErrors({});
        router.push("/login");
      } else {
        setErrors({
          general: data.error || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({
        general: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Register</h2>
        <p className="text-gray-600">
          {"Let's start your getting your sponsorship deals!"}
        </p>
      </div>

      <div>
        <Label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Full Name
        </Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => handleInputChange("fullName", e.target.value)}
          className={`w-full px-3 py-5 border  ${
            errors.fullName ? "border-red-300 bg-red-50" : "border-gray-300"
          }`}
          placeholder="John Doe"
          disabled={isLoading}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.fullName}
          </p>
        )}
      </div>

      <div>
        <Label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className={`w-full px-3 py-5 border  ${
            errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
          }`}
          placeholder="john.doe@gmail.com"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.email}
          </p>
        )}
      </div>
      <div>
        <Label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Phone Number
        </Label>
        <Input
          id="phoneNumber"
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          className={`w-full px-3 py-5 border  ${
            errors.phoneNumber ? "border-red-300 bg-red-50" : "border-gray-300"
          }`}
          placeholder="072345678"
          disabled={isLoading}
        />
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.phoneNumber}
          </p>
        )}
      </div>

      <div>
        <Label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className={`w-full px-3 py-5 border  ${
              errors.password ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.password}
          </p>
        )}
      </div>

      <div>
        <Label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Repeat Password
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            className={`w-full px-3 py-5 border  ${
              errors.confirmPassword
                ? "border-red-300 bg-red-50"
                : "border-gray-300"
            }`}
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.confirmPassword}
          </p>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Register</h2>
        <p className="text-gray-600">
          {"Let's see what social media you have"}
        </p>
      </div>

      <div>
        <Label
          htmlFor="tiktok"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Tik Tok
        </Label>
        <Input
          id="tiktok"
          value={formData.tiktok}
          onChange={(e) => handleInputChange("tiktok", e.target.value)}
          className="w-full px-3 py-5 border"
          placeholder="www.tiktok.com/@khaby.lame"
        />
      </div>

      <div>
        <Label
          htmlFor="instagram"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Instagram
        </Label>
        <Input
          id="instagram"
          value={formData.instagram}
          onChange={(e) => handleInputChange("instagram", e.target.value)}
          className="w-full px-3 py-5 border"
          placeholder="www.instagram.com/khaby00"
        />
      </div>

      <div>
        <Label
          htmlFor="facebook"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Facebook
        </Label>
        <Input
          id="facebook"
          value={formData.facebook}
          onChange={(e) => handleInputChange("facebook", e.target.value)}
          className="w-full px-3 py-5 border"
          placeholder="www.facebook.com/khabylameofficial00"
        />
      </div>

      <div>
        <Label
          htmlFor="youtube"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          YouTube
        </Label>
        <Input
          id="youtube"
          value={formData.youtube}
          onChange={(e) => handleInputChange("youtube", e.target.value)}
          className="w-full px-3 py-5 border"
          placeholder="www.youtube.com/@khabylame"
        />
      </div>
    </div>
  );

  const FileUploadArea = ({ label, field, icon }) => (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
      onClick={() => document.getElementById(field)?.click()}
    >
      <input
        id={field}
        type="file"
        accept="image/*,.jpg,.jpeg,.png,.jfif,.xvlf"
        className="hidden"
        onChange={(e) => handleFileUpload(field, e.target.files?.[0] || null)}
      />
      {icon}
      <p className="mt-4 text-gray-600">
        Drag & Drop your{" "}
        <span className="text-blue-600 font-medium">{label}</span> to upload
      </p>
      <p className="mt-2 text-sm text-gray-500">jpg, xvlf, jfif, png, jpeg</p>
      {formData[field] && (
        <p className="mt-2 text-sm text-green-600 flex items-center justify-center">
          <CheckCircle className="h-4 w-4 mr-1" />
          {formData[field]?.name}
        </p>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Register</h2>
        <p className="text-gray-600">{"Smile for the camera! Cheese :)"}</p>
      </div>

      <div>
        <Label
          htmlFor="birthday"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Birthday
        </Label>
        <Input
          id="birthday"
          type="date"
          value={formData.birthday}
          onChange={(e) => handleInputChange("birthday", e.target.value)}
          className={`w-full px-3 py-3 border rounded-md ${
            errors.birthday ? "border-red-300 bg-red-50" : "border-gray-300"
          }`}
          placeholder="dd-mm-yyyy"
        />
        {errors.birthday && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.birthday}
          </p>
        )}
      </div>

      <FileUploadArea
        label="Profile Picture"
        field="profilePicture"
        icon={<Camera className="h-12 w-12 text-gray-400 mx-auto" />}
      />

      <FileUploadArea
        label="Carte National"
        field="nationalId"
        icon={<Upload className="h-12 w-12 text-gray-400 mx-auto" />}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Registration form */}
      <div className="flex-1 flex flex-col justify-center px-4">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Logo */}
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-blue-600">Cloutsy</h1>
          </div>

          {/* Success Message */}
          {successMessage && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                {successMessage}
              </AlertDescription>
            </Alert>
          )}

          {/* General Error Message */}
          {errors.general && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {errors.general}
              </AlertDescription>
            </Alert>
          )}

          {/* Step content */}
          <div className="mb-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </div>

          {/* Action button */}
          <div className="space-y-6">
            <Button
              onClick={currentStep === 3 ? handleFinish : handleNext}
              disabled={isLoading}
              className="w-full bg-[#515DEF] hover:bg-[#515eefdd] disabled:bg-blue-400 text-white font-medium py-5 px-4 rounded-[10px] transition duration-200"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {currentStep === 3 ? "Creating account..." : "Processing..."}
                </div>
              ) : currentStep === 3 ? (
                "Finish"
              ) : (
                "Next"
              )}
            </Button>

            {/* Login link */}
            <div className="text-center">
              <span className="text-gray-600">Already have an account? </span>
              <button
                type="button"
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                Log in
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">
                  Or Register with
                </span>
              </div>
            </div>

            {/* Social registration buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                className="w-full py-3 px-4 border-[1px] border-solid border-[#515DEF] rounded-[4px]  bg-white hover:bg-gray-50 disabled:opacity-50 transition duration-200"
              >
                <svg
                  className="w-5 h-5 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                className="w-full py-3 px-4 border-[1px] border-solid border-[#515DEF] rounded-[4px]  bg-white hover:bg-gray-50 disabled:opacity-50 transition duration-200"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Laptop mockup */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="w-full max-w-2xl">
            <Image
              src="/laptop-dashboard.svg"
              alt="Dashboard preview on laptop"
              width={800}
              height={600}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
