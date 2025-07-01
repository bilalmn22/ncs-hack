import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function Table({influencers}) {
  return (
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
                  <span className="text-[#181818]">{influencer.tiktok}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71839b]">YouTube:</span>
                  <span className="text-[#181818]">{influencer.youtube}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71839b]">Instagram:</span>
                  <span className="text-[#181818]">{influencer.instagram}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71839b]">Facebook:</span>
                  <span className="text-[#181818]">{influencer.facebook}</span>
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
  );
}
