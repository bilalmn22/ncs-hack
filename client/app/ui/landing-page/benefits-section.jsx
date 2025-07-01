import { Check } from "lucide-react";
import Image from "next/image";
export default function Benefits() {
  return (
    <section className="px-6 py-16 ">
      <div className="grid lg:grid-cols-2  gap-12 ">
        <div className="space-y-6">
          <h2 className="text-5xl font-bold text-gray-900">
            What Benefit Will You Get
          </h2>
          <div className="space-y-4">
            {[
              "Streamlined Sponsorship Management",
              "Time-Saving Workflow",
              "Campaign Insights & Analytics",
              "Global Reach, Local Impact",
              "Online Transaction",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#191A15] text-lg font-medium">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative grid place-items-center">
          <Image
            src="/benefits-section.svg"
            alt="Benefits Illustration"
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  );
}
