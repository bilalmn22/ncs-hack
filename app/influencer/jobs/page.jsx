import NavBar from "@/app/ui/influencer/nav-bar";
import HeaderSection from "../../ui/influencer/jobs/header-sections";
import JobsFilters from "@/app/ui/influencer/jobs/filters";
import Pagination from "@/app/ui/influencer/jobs/paginations";
import JobCard from "@/app/ui/influencer/jobs/job-card";
import { getData } from "@/app/lib/data";
import { getJobs } from "@/app/lib/queries";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export default async function Page() {
  const CookieStore = await cookies();
  const { id: getInfluencerFeedId } = jwtDecode(
    CookieStore.get("auth_token")?.value || ""
  );
  console.log(jwtDecode(CookieStore.get("auth_token")?.value || ""));
  const { data } = await getData(getJobs, { getInfluencerFeedId }); // Simulating 10 job cards
  const Jobs = data?.getInfluencerFeed || [];
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <NavBar />
      <HeaderSection />

      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <JobsFilters />

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="space-y-4 md:space-y-6">
              {/* Deal Card 1 */}
              {Jobs.map((job, index) => (
                <JobCard job={job} key={index} />
              ))}
            </div>

            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
