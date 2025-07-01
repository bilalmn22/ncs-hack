import { Star, BarChart3, Users, TrendingUp } from "lucide-react";
export default function Features() {
  return (
    <section className="px-6 py-16 ">
      <div className="">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              How Cloutsy Supports Brands and Creators Worldwide
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Cloutsy is redefining how brands and influencers collaborate —
              providing a powerful platform to manage sponsorships, campaigns,
              and creator partnerships with ease.
            </p>
            <div className="flex space-x-8">
              <div className="text-center">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="font-bold text-lg">4.9 / 5 rating</div>
                <div className="text-sm text-gray-600">databricks</div>
              </div>
              <div className="text-center">
                <div className="flex items-center mb-2">
                  {[...Array(4)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <Star className="w-5 h-5 text-gray-300" />
                </div>
                <div className="font-bold text-lg">4.8 / 5 rating</div>
                <div className="text-sm text-gray-600">Chainalysis</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="px-6 ">
              <div className="flex items-start space-x-4">
                <div className=" shrink-0 bg-white p-2  shadow-[0px_4px_9px_0px_rgba(0,0,0,0.05)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      d="M27.5 15H22.5L18.75 26.25L11.25 3.75L7.5 15H2.5"
                      stroke="#2563EB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg md:text-2xl mb-2">
                    Publishing
                  </h3>
                  <p className="text-[#64748B] text-sm md:text-lg font-medium">
                    Plan, collaborate, and publishing your content that drives
                    meaningful engagement and growth for your brand
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 ">
              <div className="flex items-start space-x-4">
                <div className="shrink-0 bg-white p-2  shadow-[0px_4px_9px_0px_rgba(0,0,0,0.05)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      d="M26.512 19.8626C25.7168 21.7432 24.473 23.4004 22.8894 24.6892C21.3057 25.9781 19.4305 26.8594 17.4276 27.2561C15.4247 27.6528 13.3551 27.5528 11.3997 26.9648C9.44436 26.3769 7.66281 25.3189 6.2108 23.8834C4.75879 22.4479 3.68055 20.6785 3.07032 18.73C2.4601 16.7815 2.33648 14.7132 2.71027 12.7059C3.08407 10.6986 3.9439 8.81338 5.21458 7.21513C6.48527 5.61689 8.12813 4.35424 9.99953 3.5376"
                      stroke="#2563EB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M27.5 15C27.5 13.3585 27.1767 11.733 26.5485 10.2165C25.9203 8.69989 24.9996 7.3219 23.8388 6.16117C22.6781 5.00043 21.3001 4.07969 19.7835 3.45151C18.267 2.82332 16.6415 2.5 15 2.5V15H27.5Z"
                      stroke="#2563EB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{" "}
                </div>
                <div>
                  <h3 className="font-semibold text-lg md:text-2xl mb-2">
                    Analytics
                  </h3>
                  <p className="text-[#64748B] text-sm md:text-lg font-medium">
                    Analyze your performance and create gorgeous reports
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 ">
              <div className="flex items-start space-x-4">
                <div className="shrink-0 bg-white p-2  shadow-[0px_4px_9px_0px_rgba(0,0,0,0.05)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      d="M22.5 3.75C21.5054 3.75 20.5516 4.14509 19.8483 4.84835C19.1451 5.55161 18.75 6.50544 18.75 7.5V22.5C18.75 23.4946 19.1451 24.4484 19.8483 25.1517C20.5516 25.8549 21.5054 26.25 22.5 26.25C23.4946 26.25 24.4484 25.8549 25.1517 25.1517C25.8549 24.4484 26.25 23.4946 26.25 22.5C26.25 21.5054 25.8549 20.5516 25.1517 19.8483C24.4484 19.1451 23.4946 18.75 22.5 18.75H7.5C6.50544 18.75 5.55161 19.1451 4.84835 19.8483C4.14509 20.5516 3.75 21.5054 3.75 22.5C3.75 23.4946 4.14509 24.4484 4.84835 25.1517C5.55161 25.8549 6.50544 26.25 7.5 26.25C8.49456 26.25 9.44839 25.8549 10.1517 25.1517C10.8549 24.4484 11.25 23.4946 11.25 22.5V7.5C11.25 6.50544 10.8549 5.55161 10.1517 4.84835C9.44839 4.14509 8.49456 3.75 7.5 3.75C6.50544 3.75 5.55161 4.14509 4.84835 4.84835C4.14509 5.55161 3.75 6.50544 3.75 7.5C3.75 8.49456 4.14509 9.44839 4.84835 10.1517C5.55161 10.8549 6.50544 11.25 7.5 11.25H22.5C23.4946 11.25 24.4484 10.8549 25.1517 10.1517C25.8549 9.44839 26.25 8.49456 26.25 7.5C26.25 6.50544 25.8549 5.55161 25.1517 4.84835C24.4484 4.14509 23.4946 3.75 22.5 3.75Z"
                      stroke="#2563EB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg md:text-2xl mb-2">
                    Engagement
                  </h3>
                  <p className="text-[#64748B] text-sm md:text-lg font-medium ">
                    Quickly navigate you and engage with your audience to boost
                    sales
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
