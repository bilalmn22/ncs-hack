import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import LayoutProvider from "../layout-provider";

export default function Dashboard() {
  const invoices = [
    { date: "March, 01, 2025", id: "#MS-415646", amount: "$180" },
    { date: "February, 10, 2025", id: "#RV-126749", amount: "$250" },
    { date: "April, 05, 2025", id: "#FB-212562", amount: "$560" },
  ];

  const influencers = Array(10)
    .fill(null)
    .map((_, i) => ({
      name: "Khaby Lame",
      tiktok: "500k",
      youtube: "500k",
      instagram: "500k",
      facebook: "500k",
      price: "700$",
    }));

  return (
    <LayoutProvider>
      <div>
        {/* Left Content */}
        <div className=" flex flex-col xl:flex-row gap-6">
          {/* Hero Card */}
          <div className="relative flex-1 overflow-hidden rounded-2xl bg-gradient-to-r from-[#2563eb] via-purple-500 to-pink-400 p-6 lg:p-8 mb-6 lg:mb-8">
            <div className="relative z-10">
              <div className="text-white text-sm font-medium mb-2">Cloutsy</div>
              <h2 className="text-white text-2xl lg:text-4xl font-bold mb-2">
                Start Sponsoring.
              </h2>
              <h2 className="text-white text-2xl lg:text-4xl font-bold mb-4">
                Start Scaling.
              </h2>
              <p className="text-white/90 text-base lg:text-lg mb-6 max-w-md">
                Cloutsy is a creator collaboration platform.
                <br className="hidden sm:block" />
                We make influencer sponsorships effortless.
              </p>
              <Link href="/dashboard/create-offer">
                <Button className="bg-[#131920] hover:bg-[#131920]/90 text-white px-6 py-3 rounded-lg font-medium">
                  Create Offer
                </Button>
              </Link>
            </div>
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 right-4 w-16 lg:w-20 h-16 lg:h-20 bg-white/20 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-12 lg:w-16 h-12 lg:h-16 bg-white/20 rounded-lg rotate-45"></div>
              <div className="absolute top-1/2 right-1/4 w-10 lg:w-12 h-10 lg:h-12 bg-white/20 rounded-full"></div>
            </div>
          </div>
          {/* Right Sidebar - Invoices */}
          <div className="w-full xl:w-80">
            <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 lg:p-6">
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h3 className="text-lg font-semibold text-[#181818]">
                  Invoices
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[#2563eb] border-[#2563eb] hover:bg-[#eff6ff] bg-transparent text-xs lg:text-sm"
                >
                  VIEW ALL
                </Button>
              </div>
              <div className="space-y-4">
                {invoices.map((invoice, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-[#e2e8f0] last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#181818]">
                        {invoice.date}
                      </p>
                      <p className="text-xs text-[#71839b]">{invoice.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#71839b]">
                        {invoice.amount}
                      </span>
                      <FileText className="w-4 h-4 text-[#71839b]" />
                      <span className="text-xs text-[#71839b]">PDF</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Data Table */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
          {/* Mobile Card View */}
          <div className="block lg:hidden">
            <div className="p-4 border-b border-[#e2e8f0] bg-[#f5f5f5]">
              <h3 className="font-medium text-[#71839b]">Influencers</h3>
            </div>
            <div className="divide-y divide-[#e2e8f0]">
              {influencers.slice(0, 5).map((influencer, index) => (
                <div key={index} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback className="bg-[#d9d9d9] text-[#71839b]">
                          KL
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-[#181818]">
                          {influencer.name}
                        </p>
                        <p className="text-sm text-[#71839b]">
                          Price: {influencer.price}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-[#2563eb] hover:bg-[#2563eb]/90 text-white px-4 py-1.5 text-xs"
                    >
                      Details
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#71839b]">TikTok:</span>
                      <span className="text-[#181818]">
                        {influencer.tiktok}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#71839b]">YouTube:</span>
                      <span className="text-[#181818]">
                        {influencer.youtube}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#71839b]">Instagram:</span>
                      <span className="text-[#181818]">
                        {influencer.instagram}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#71839b]">Facebook:</span>
                      <span className="text-[#181818]">
                        {influencer.facebook}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f5f5f5] border-b border-[#e2e8f0]">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-[#71839b]">
                    Full name
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-[#71839b]">
                    Tik Tok
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-[#71839b]">
                    Youtube
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-[#71839b]">
                    Instagram
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-[#71839b]">
                    Facebook
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-[#71839b]">
                    Price
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-[#71839b]">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {influencers.map((influencer, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#e2e8f0] hover:bg-[#f5f5f5]/50"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback className="bg-[#d9d9d9] text-[#71839b]">
                            KL
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-[#181818]">
                          {influencer.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-[#71839b]">
                      {influencer.tiktok}
                    </td>
                    <td className="py-4 px-6 text-sm text-[#71839b]">
                      {influencer.youtube}
                    </td>
                    <td className="py-4 px-6 text-sm text-[#71839b]">
                      {influencer.instagram}
                    </td>
                    <td className="py-4 px-6 text-sm text-[#71839b]">
                      {influencer.facebook}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-[#181818]">
                      {influencer.price}
                    </td>
                    <td className="py-4 px-6">
                      <Button
                        size="sm"
                        className="bg-[#2563eb] hover:bg-[#2563eb]/90 text-white px-4 py-1.5 text-xs"
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutProvider>
  );
}
