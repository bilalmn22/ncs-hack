import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Play } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="px-6 py-16  ">
      <div className="">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                People are Saying About Cloutsy
              </h2>
              <p className="text-gray-300 mb-6">
                Everything you need to manage sponsorships, social payments and
                grow your revenue as firm as possible in this world with Cloutsy
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-gray-300 italic">
                Cloutsy makes my collabs so much easier! Managing sponsorships
                and getting paid is super smooth — everything I need. There I
                love how fast and easy it is to use 😍
              </p>
              <div className="text-sm text-gray-400">- Arifa Fauziyah</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 bg-gray-600 rounded-full border-2 border-gray-900"></div>
                <div className="w-10 h-10 bg-gray-600 rounded-full border-2 border-gray-900"></div>
                <div className="w-10 h-10 bg-gray-600 rounded-full border-2 border-gray-900"></div>
                <div className="w-10 h-10 bg-gray-600 rounded-full border-2 border-gray-900"></div>
              </div>
              <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 text-white ml-1" />
              </button>
            </div>
          </div>
          <div className="bg-[#222938] rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Contact us</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white border-gray-600 text-[#64748B] rounded-[10px] h-12 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  placeholder="What are you say ?"
                  className="bg-white  rounded-[10px]  border-gray-600 text-[#64748B] placeholder-gray-400 min-h-[100px]"
                />
              </div>
              <Button className="w-full py-5 bg-blue-600 hover:bg-blue-700">
                Contact Us
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
