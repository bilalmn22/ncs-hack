"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import Image from "next/image";
import { loginUser } from "@/app/lib/mutations";
import { apiUrl } from "@/app/lib/utils";
import { setCookieValue } from "@/app/lib/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function Component() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setErrors({});
    setSuccessMessage("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: loginUser,
          variables: {
            email: email.trim(),
            password: password,
          },
        }),
      });

      const { data } = await response.json();
      console.log(data);
      await setCookieValue(data?.login?.token);

      if (response.ok) {
        setSuccessMessage(data.message || "Login successful!");
        // Here you would typically redirect or update app state
        console.log("Login successful:", data.user);
      } else {
        setErrors({ general: data.error || "Login failed. Please try again." });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        general: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === "email") {
      setEmail(value);
      if (errors.email) {
        setErrors((prev) => ({ ...prev, email: undefined }));
      }
    } else {
      setPassword(value);
      if (errors.password) {
        setErrors((prev) => ({ ...prev, password: undefined }));
      }
    }

    // Clear general error when user starts typing
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Login form */}
      <div className="flex-1 flex flex-col justify-center px-4 ">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Logo */}
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-blue-600">Cloutsy</h1>
          </div>

          {/* Login form */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Login</h2>
              <p className="text-gray-600">
                Login to access your cloutsy account
              </p>
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

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email field */}
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-3 py-5 border  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
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

              {/* Password field */}
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
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={`w-full px-3 py-5 pr-10 border  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.password
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
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

              {/* Remember me and Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor="remember-me"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  className="text-sm text-orange-500 hover:text-orange-600 disabled:opacity-50"
                  disabled={isLoading}
                >
                  Forgot Password
                </button>
              </div>

              {/* Login button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#515DEF] hover:bg-[#515eefdd] disabled:bg-blue-400 text-white font-medium py-5  px-4 rounded-[10px] transition duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>

              {/* Sign up link */}
              <div className="text-center">
                <span className="text-gray-600">
                  {"Don't have an account? "}
                </span>
                <button
                  type="button"
                  className="text-orange-500 hover:text-orange-600 font-medium disabled:opacity-50"
                  disabled={isLoading}
                >
                  Sign up
                </button>
              </div>

              {/* Divider */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-50 text-gray-500">
                      Or login with
                    </span>
                  </div>
                </div>
              </div>

              {/* Social login buttons */}
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
            </form>

            {/* Demo credentials info */}
            {/* <div className="mt-8 p-4 bg-blue-50 rounded-md border border-blue-200">
              <p className="text-sm text-blue-800 font-medium mb-1">
                Demo Credentials:
              </p>
              <p className="text-sm text-blue-700">Email: john.doe@gmail.com</p>
              <p className="text-sm text-blue-700">Password: password123</p>
            </div> */}
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
