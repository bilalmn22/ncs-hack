import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Calendar,
  Mail,
  Phone,
  Instagram,
  Youtube,
  Twitter,
  CheckCircle,
  DollarSign,
  Briefcase,
  Play,
} from "lucide-react";
import NavBar from "@/app/ui/influencer/nav-bar";

export default function InfluencerProfile() {
  // Sample data based on the schema
  const influencer = {
    fullName: "Sarah Johnson",
    photo: "/placeholder.svg?height=200&width=200",
    email: "sarah.johnson@email.com",
    phoneNumber: "+1 (555) 123-4567",
    socialMedia: [
      "https://instagram.com/sarahjohnson",
      "https://youtube.com/sarahjohnson",
      "https://twitter.com/sarahjohnson",
    ],
    description:
      "Lifestyle and beauty content creator passionate about sustainable living, skincare, and wellness. I love connecting with my audience through authentic storytelling and product reviews.",
    introVideo: "https://example.com/intro-video",
    birthday: "1995-03-15",
    isVerified: true,
    moneyMade: 15750,
    rating: 4.8,
    jobsCompleted: 23,
    followers: {
      instagram: 45000,
      youtube: 12000,
      twitter: 8500,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <NavBar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar className="w-32 h-32 mx-auto mb-4">
                    <AvatarImage
                      src={influencer.photo || "/placeholder.svg"}
                      alt={influencer.fullName}
                    />
                    <AvatarFallback className="text-2xl">
                      {influencer.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold">
                      {influencer.fullName}
                    </h1>
                    {influencer.isVerified && (
                      <CheckCircle className="w-6 h-6 text-blue-500" />
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-1 mb-4">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{influencer.rating}</span>
                    <span className="text-gray-500">
                      ({influencer.jobsCompleted} reviews)
                    </span>
                  </div>

                  <Badge variant="secondary" className="mb-4">
                    Lifestyle & Beauty Creator
                  </Badge>
                </div>

                <Separator className="my-4" />

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{influencer.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{influencer.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>Born March 15, 1995</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Total Earned</span>
                  </div>
                  <span className="font-semibold">
                    ${influencer.moneyMade.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Jobs Completed</span>
                  </div>
                  <span className="font-semibold">
                    {influencer.jobsCompleted}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Average Rating</span>
                  </div>
                  <span className="font-semibold">{influencer.rating}/5.0</span>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Social Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-pink-500" />
                    <span className="text-sm">Instagram</span>
                  </div>
                  <span className="font-semibold">
                    {influencer.followers.instagram.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Youtube className="w-4 h-4 text-red-500" />
                    <span className="text-sm">YouTube</span>
                  </div>
                  <span className="font-semibold">
                    {influencer.followers.youtube.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Twitter className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">Twitter</span>
                  </div>
                  <span className="font-semibold">
                    {influencer.followers.twitter.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {influencer.description}
                </p>

                {/* Intro Video */}
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                  <Play className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                  <h3 className="font-semibold mb-2">Introduction Video</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get to know me better through my personal introduction
                  </p>
                  <Button variant="outline">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Video
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Work */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Recent Collaborations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                        <span className="text-pink-600 font-semibold text-sm">
                          GS
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold">GlowSkin Cosmetics</h4>
                        <p className="text-sm text-gray-500">
                          Skincare Campaign
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Created authentic content showcasing vitamin C serum
                      benefits
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">Completed</Badge>
                      <span className="text-sm font-semibold text-green-600">
                        $250
                      </span>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                          EF
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold">EcoFriendly Living</h4>
                        <p className="text-sm text-gray-500">
                          Sustainability Brand
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Promoted sustainable lifestyle products and practices
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">Completed</Badge>
                      <span className="text-sm font-semibold text-green-600">
                        $180
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Current Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-green-800">
                      Available for New Projects
                    </h3>
                    <p className="text-sm text-green-600">
                      Ready to start collaborating within 2-3 days
                    </p>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Send Proposal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
