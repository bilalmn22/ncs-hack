import Image from "next/image";
import Link from "next/link";

export default function RegisterForm() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Registration form */}
      <div className="flex-1 flex flex-col justify-center px-4">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Logo */}
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-blue-600">Cloutsy</h1>
          </div>

          {/* Step content */}
          <div className="mb-8">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Register
                </h2>
                <p className="text-gray-600">
                  Let's start your journey with Cloutsy
                </p>
              </div>

              <div className="space-y-4  ">
                <Link
                  href={"/rgister/influencer"}
                  className={`w-full block text-center py-3 px-6 text-lg font-medium rounded-md transition bg-blue-600 text-white hover:bg-blue-700 duration-200 `}
                >
                  Influencer
                </Link>

                <Link
                  href={"/rgister/company"}
                  className={`w-full block text-center py-3 px-6 text-lg font-medium rounded-md bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition duration-200 `}
                >
                  Company
                </Link>
              </div>
              <div className="text-center">
                <span className="text-gray-600">Have an account? </span>
                <button
                  type="button"
                  className="text-orange-500 hover:text-orange-600 font-medium"
                >
                  Login
                </button>
              </div>
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
