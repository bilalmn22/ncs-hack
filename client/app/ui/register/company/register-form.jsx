"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, AlertCircle, CheckCircle, Camera } from "lucide-react";
import Image from "next/image";
import { apiUrl } from "@/app/lib/utils";
import { createCompany } from "@/app/lib/mutations";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    profilePicture: null,
    phoneNumber: "",
  });

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Full name is required";
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

  const handleFinish = async () => {
    if (!validateStep1()) return;

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
      console.log({ response });

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

      const registrationData = {
        title: formData.companyName,
        email: formData.email,
        password: formData.password,
        photo: profilePictureUrl || "",
        phoneNumber: formData.phoneNumber,
        description: "",
      };
      const response = await fetch(apiUrl + "/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: createCompany,
          variables: {
            input: registrationData,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Company registered successfully!");
 
        setFormData({
          companyName: "",
          email: "",
          password: "",
          profilePicture: null,
          phoneNumber: "",
        });
        setErrors({});
        router.push("/login"); // Redirect to login page after successful registration
        // Optionally redirect or perform other actions after successful registration
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
      <p className="mt-2 text-sm text-gray-500">jpg, png, jpeg</p>
      {formData[field] && (
        <p className="mt-2 text-sm text-green-600 flex items-center justify-center">
          <CheckCircle className="h-4 w-4 mr-1" />
          {formData[field]?.name}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Registration form */}
      <div className="flex-1 flex flex-col justify-center px-4">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Logo */}
          <div className="mb-8">
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
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Register
                </h2>
                <p className="text-gray-600">
                  {"Let's start your getting your sponsorship deals!"}
                </p>
              </div>

              <div>
                <Label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) =>
                    handleInputChange("companyName", e.target.value)
                  }
                  className={`w-full px-3 py-5 border  ${
                    errors.companyName
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="John Doe"
                  disabled={isLoading}
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.companyName}
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
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
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
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  className={`w-full px-3 py-5 border  ${
                    errors.phoneNumber
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
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

              <FileUploadArea
                label="Profile Picture"
                field="profilePicture"
                icon={<Camera className="h-12 w-12 text-gray-400 mx-auto" />}
              />

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
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={`w-full px-3 py-5 border  ${
                      errors.password
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
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
            </div>
          </div>

          {/* Action button */}
          <div className="space-y-6">
            <Button
              onClick={handleFinish}
              disabled={isLoading}
              className="w-full bg-[#515DEF] hover:bg-[#515eefdd] disabled:bg-blue-400 text-white font-medium py-5 px-4 rounded-[10px] transition duration-200"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                "Create"
              )}
            </Button>

            {/* Login link */}
            <div className="text-center">
              <span className="text-gray-600">Already have an account? </span>
              <Link
                href={"/login"}
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                Log in
              </Link>
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
