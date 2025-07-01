import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="px-6 py-16 ">
      <div className="">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-[#191A15] leading-tight">
              We{"'"}re here to connect brands with influence.
            </h1>
            <div className="w-24 h-1 bg-blue-600 rounded"></div>
            <p className="text-lg text-[#131920] font-medium leading-relaxed">
              Let{"'"}s make influencer collaborations smoother and smarter with
              Cloutsy your go-to dashboard for managing sponsorships, campaigns,
              and creator deals, all in one place.
            </p>
            <Button
              size="lg"
              className="bg-blue-600 rounded-4xl hover:bg-blue-700 px-8 py-3"
            >
              Start Now
            </Button>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden  w-full h-96 lg:h-[500px]">
              <Image
                src="/influncer.jpg"
                alt="Cloutsy Dashboard Preview"
                fill
                className="object-contain "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
