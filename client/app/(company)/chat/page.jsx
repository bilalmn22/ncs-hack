import ConversationsSideBar from "./[id]/cpnversations-sidebar";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="min-h-screen bg-[#f5f5f5]">
            <div className="max-w-4xl mx-auto px-4 md:px-6 pt-20">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563eb] mx-auto mb-4"></div>
                  <p className="text-[#64748b]">Select cpnversation to start</p>
                </div>
              </div>
            </div>
          </div>

          {/* Conversations Sidebar */}
          <ConversationsSideBar roomId={null} />
        </div>
      </div>
    </div>
  );
}
