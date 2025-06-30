import { Button } from "@/components/ui/button";
import { BarChart3, Users, TrendingUp } from "lucide-react";
const features = [
  {
    href: "/collaboration.svg",
    title: "Collaborate Influencers",
    description: "Here you can get in touch with the rising influencers",
  },
  {
    href: "/big-companies.svg",
    title: "Big Companies",
    description:
      "Where the best way resides to find the talent they need for the market",
  },
  {
    href: "/daily-analytics.svg",
    title: "Daily Analytics",
    description:
      "We always provide useful information to make it easier for you every day",
  },
];

export default function OwnFeatures() {
  return (
    <section className="px-6 py-16">
      <div className="flex  justify-between gap-18">
        <h2 className="text-4xl max-w-[300px] font-bold text-gray-900">
          Our Features you can get
        </h2>
        <p className="text-[#64748B] md:text-lg font-medium  max-w-[500px] leading-relaxed">
          We offer a variety of interesting features that you can help increase
          your productivity at work and manage your project easily
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700 rounded-4xl py-6 ">
          Get Started
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-8 mt-16">
        {features.map((feature, index) => (
          <div key={index} className=" space-y-4">
            <div className=" rounded-lg">
              <img src={feature.href} alt={feature.title} className="" />
            </div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-[#64748B] md:text-lg font-medium">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
