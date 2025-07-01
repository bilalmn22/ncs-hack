import ConversationsSideBar from "./cpnversations-sidebar";
import ChatProvider from "./chat-provider";

async function Layout({ children, params }) {
  const { id: roomId } = await params;
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <ChatProvider roomId={roomId}>{children}</ChatProvider>

          {/* Conversations Sidebar */}
          <ConversationsSideBar roomId={roomId} />
        </div>
      </div>
    </div>
  );
}

export default Layout;
