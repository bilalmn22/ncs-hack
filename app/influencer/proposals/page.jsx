"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Calendar, DollarSign, Users, Clock, Filter, Bell, User } from "lucide-react"
import NavBar from "@/app/ui/influencer/nav-bar"

export default function ProposalsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("any")
  const [selectedBudget, setSelectedBudget] = useState("any")
  const [selectedContentType, setSelectedContentType] = useState([])

  // Sample proposals data
  const proposals = [
    {
      id: 1,
      company: "GlowSkin Cosmetics",
      companyLogo: "/placeholder.svg?height=60&width=60",
      contactPerson: "Emily Tran",
      contactTitle: "Brand Partnerships Manager",
      title: "Promote Our Vitamin C Serum on TikTok",
      description: "Create a 30-second video highlighting the product benefits and your personal skincare routine.",
      budget: 250,
      platform: "TikTok",
      requirements: "TikTok: 10,000+ followers\nInstagram (optional): 5,000+ followers",
      deadline: "2024-01-15",
      contentType: "Video (Short-form)",
      status: "new",
      urgency: "high",
      estimatedReach: "45K",
    },
    {
      id: 2,
      company: "FitLife Nutrition",
      companyLogo: "/placeholder.svg?height=60&width=60",
      contactPerson: "Marcus Chen",
      contactTitle: "Marketing Director",
      title: "Protein Powder Review & Workout Content",
      description:
        "Create authentic content showcasing our new protein powder in your workout routine. Include before/after shots and honest review.",
      budget: 180,
      platform: "Instagram",
      requirements: "Instagram: 15,000+ followers\nFitness/Health niche",
      deadline: "2024-01-20",
      contentType: "Post + Stories",
      status: "pending",
      urgency: "medium",
      estimatedReach: "32K",
    },
    {
      id: 3,
      company: "EcoFriendly Living",
      companyLogo: "/placeholder.svg?height=60&width=60",
      contactPerson: "Sarah Williams",
      contactTitle: "Content Manager",
      title: "Sustainable Lifestyle Challenge",
      description:
        "Document your 7-day sustainable living challenge using our eco-friendly products. Share daily updates and tips.",
      budget: 320,
      platform: "YouTube",
      requirements: "YouTube: 5,000+ subscribers\nLifestyle/Sustainability content",
      deadline: "2024-01-25",
      contentType: "Video (Long-form)",
      status: "new",
      urgency: "low",
      estimatedReach: "28K",
    },
    {
      id: 4,
      company: "TechGadget Pro",
      companyLogo: "/placeholder.svg?height=60&width=60",
      contactPerson: "David Kim",
      contactTitle: "Influencer Relations",
      title: "Smartphone Accessory Unboxing",
      description:
        "Create an engaging unboxing and first impressions video of our latest smartphone accessories collection.",
      budget: 150,
      platform: "TikTok",
      requirements: "TikTok: 8,000+ followers\nTech/Gadget interest",
      deadline: "2024-01-18",
      contentType: "Video (Short-form)",
      status: "expiring",
      urgency: "high",
      estimatedReach: "22K",
    },
    {
      id: 5,
      company: "Artisan Coffee Co.",
      companyLogo: "/placeholder.svg?height=60&width=60",
      contactPerson: "Lisa Rodriguez",
      contactTitle: "Brand Manager",
      title: "Morning Coffee Routine Feature",
      description:
        "Showcase our premium coffee beans in your morning routine. Create aesthetic content highlighting the brewing process and taste.",
      budget: 200,
      platform: "Instagram",
      requirements: "Instagram: 12,000+ followers\nLifestyle/Food content",
      deadline: "2024-01-22",
      contentType: "Reels + Posts",
      status: "new",
      urgency: "medium",
      estimatedReach: "35K",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "expiring":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUrgencyIcon = (urgency) => {
    if (urgency === "high") return <Clock className="w-4 h-4 text-red-500" />
    if (urgency === "medium") return <Clock className="w-4 h-4 text-yellow-500" />
    return <Clock className="w-4 h-4 text-green-500" />
  }

  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch =
      proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPlatform = selectedPlatform === "any" || proposal.platform.toLowerCase() === selectedPlatform
    const matchesBudget =
      selectedBudget === "any" ||
      (selectedBudget === "under100" && proposal.budget < 100) ||
      (selectedBudget === "100to200" && proposal.budget >= 100 && proposal.budget <= 200) ||
      (selectedBudget === "over200" && proposal.budget > 200)

    return matchesSearch && matchesPlatform && matchesBudget
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     <NavBar/>

      {/* Hero Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your <span className="text-blue-600">Brand Proposals</span> Await
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Review collaboration opportunities from brands that want to work with you
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search proposals by brand or campaign..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Platform Filter */}
                <div>
                  <Label className="text-sm font-semibold mb-3 block">Platform</Label>
                  <RadioGroup value={selectedPlatform} onValueChange={setSelectedPlatform}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="any" />
                      <Label htmlFor="any">Any</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="instagram" id="instagram" />
                      <Label htmlFor="instagram">Instagram</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tiktok" id="tiktok" />
                      <Label htmlFor="tiktok">TikTok</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="youtube" id="youtube" />
                      <Label htmlFor="youtube">YouTube</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="twitter" id="twitter" />
                      <Label htmlFor="twitter">X (Twitter)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Budget Filter */}
                <div>
                  <Label className="text-sm font-semibold mb-3 block">Budget Range</Label>
                  <RadioGroup value={selectedBudget} onValueChange={setSelectedBudget}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="budget-any" />
                      <Label htmlFor="budget-any">Any</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="under100" id="under100" />
                      <Label htmlFor="under100">Under $100</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="100to200" id="100to200" />
                      <Label htmlFor="100to200">$100 - $200</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="over200" id="over200" />
                      <Label htmlFor="over200">$200+</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Status Filter */}
                <div>
                  <Label className="text-sm font-semibold mb-3 block">Status</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="new" />
                      <Label htmlFor="new" className="text-sm">
                        New Proposals
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pending" />
                      <Label htmlFor="pending" className="text-sm">
                        Under Review
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="expiring" />
                      <Label htmlFor="expiring" className="text-sm">
                        Expiring Soon
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Proposals Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {filteredProposals.length} Proposal{filteredProposals.length !== 1 ? "s" : ""} Found
              </h2>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {proposals.filter((p) => p.status === "new").length} New
                </Badge>
                <Badge variant="outline" className="bg-red-50 text-red-700">
                  {proposals.filter((p) => p.status === "expiring").length} Expiring
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredProposals.map((proposal) => (
                <Card key={proposal.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={proposal.companyLogo || "/placeholder.svg"} alt={proposal.company} />
                          <AvatarFallback>
                            {proposal.company
                              .split(" ")
                              .map((word) => word[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{proposal.company}</h3>
                          <p className="text-sm text-gray-600">{proposal.contactPerson}</p>
                          <p className="text-xs text-gray-500">{proposal.contactTitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getUrgencyIcon(proposal.urgency)}
                        <Badge className={getStatusColor(proposal.status)}>{proposal.status}</Badge>
                      </div>
                    </div>

                    {/* Title and Description */}
                    <h4 className="font-semibold text-lg mb-2">{proposal.title}</h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{proposal.description}</p>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        <span className="font-semibold text-lg">${proposal.budget}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{proposal.estimatedReach} reach</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">Due {new Date(proposal.deadline).toLocaleDateString()}</span>
                      </div>
                      <Badge variant="secondary" className="w-fit">
                        {proposal.platform}
                      </Badge>
                    </div>

                    {/* Requirements */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-1">Requirements:</p>
                      <p className="text-xs text-gray-600 whitespace-pre-line">{proposal.requirements}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Accept Proposal</Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProposals.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No proposals found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}