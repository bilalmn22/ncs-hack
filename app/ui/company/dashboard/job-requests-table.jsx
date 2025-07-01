import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { apiUrl } from "@/app/lib/utils";
import { Calendar, DollarSign } from "lucide-react";
import Link from "next/link";

export default function Table({ jobRequests }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
      {/* Mobile Card View */}
      <div className="block lg:hidden">
        <div className="p-4 border-b border-[#e2e8f0] bg-[#f5f5f5]">
          <h3 className="font-medium text-[#71839b]">
            Deal Requests ({jobRequests.length})
          </h3>
        </div>
        <div className="divide-y divide-[#e2e8f0]">
          {jobRequests?.map((request, index) => (
            <div key={index} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={
                        apiUrl + request.influencer?.photo || "/placeholder.svg"
                      }
                    />
                    <AvatarFallback className="bg-[#d9d9d9] text-[#71839b]">
                      {request.influencer?.fullName?.charAt(0).toUpperCase() ||
                        "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#181818] truncate">
                      {request.influencer?.fullName || "Unknown User"}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${getStatusColor(request.status)}`}
                      >
                        {request.status || "Pending"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-[#2563eb] hover:bg-[#2563eb]/90 text-white px-3 py-1.5 text-xs"
                >
                  View Details
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#71839b]" />
                  <span className="text-[#71839b]">Price:</span>
                  <span className="text-[#181818] font-medium">
                    ${request.suggestedPrice || request.price}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#71839b]" />
                  <span className="text-[#71839b]">Applied:</span>
                  <span className="text-[#181818]">
                    {formatDate(request.createdAt)}
                  </span>
                </div>
              </div>

              {request.applicationMessage && (
                <div className="mt-3 pt-3 border-t border-[#e2e8f0]">
                  <p className="text-sm text-[#71839b] line-clamp-2">
                    "{request.applicationMessage.substring(0, 100)}..."
                  </p>
                </div>
              )}
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
                Influencer
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-[#71839b]">
                Status
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-[#71839b]">
                Suggested Price
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-[#71839b]">
                Applied Date
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-[#71839b]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {jobRequests.map((request, index) => (
              <tr
                key={index}
                className="border-b border-[#e2e8f0] hover:bg-[#f5f5f5]/50 transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={
                          apiUrl + request.influencer?.photo ||
                          "/placeholder.svg"
                        }
                      />
                      <AvatarFallback className="bg-[#d9d9d9] text-[#71839b]">
                        {request.influencer?.fullName
                          ?.charAt(0)
                          .toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="text-sm font-medium text-[#181818]">
                        {request.influencer?.fullName || "Unknown User"}
                      </span>
                      <p className="text-xs text-[#71839b]">
                        {request.influencer?.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <Badge
                    variant="secondary"
                    className={`text-xs ${getStatusColor(request.status)}`}
                  >
                    {request.status || "Pending"}
                  </Badge>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-[#71839b]" />
                    <span className="text-sm font-medium text-[#181818]">
                      {request.suggestedPrice || request.price || "N/A"}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-[#71839b]">
                  {formatDate(request.createdAt)}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      className="bg-[#2563eb] hover:bg-[#2563eb]/90 text-white px-3 py-1.5 text-xs"
                    >
                      <Link
                        className="block w-full h-full"
                        href={`/deal-details/${request._id}`}
                      >
                        View Details
                      </Link>
                    </Button>
                    {request.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-200 text-green-700 hover:bg-green-50 px-3 py-1.5 text-xs bg-transparent"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-200 text-red-700 hover:bg-red-50 px-3 py-1.5 text-xs bg-transparent"
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show More Button */}
      {jobRequests.length > 5 && (
        <div className="p-4 border-t border-[#e2e8f0] bg-[#f5f5f5] text-center">
          <Button
            variant="outline"
            className="text-[#2563eb] border-[#2563eb] hover:bg-[#2563eb] hover:text-white bg-transparent"
          >
            View All {jobRequests.length} Requests
          </Button>
        </div>
      )}
    </div>
  );
}
