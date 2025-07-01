"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, Video, MoreVertical } from "lucide-react";
import { useState, useEffect, use } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat as StreamChatComponent,
  Channel,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

// Stream Chat configuration
const API_KEY = "rn9tfgk9qupb"; // This is a demo key - replace with your own
const client = StreamChat.getInstance(API_KEY);

// Mock data for the campaign context
const mockCampaignData = {
  title: "Promote Our Vitamin C Serum on TikTok",
  company: "GlowSkin Cosmetics",
  status: "active",
};

export default function Chat({ params }) {
  const { id: chatId } = use(params);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      try {
        // Simplified user data that works with demo keys
        const currentUser = {
          id: "aaaa", // Generate unique ID
          name: "abca",
        };

        const userToken = client.devToken(currentUser.id);

        // Connect user to Stream Chat
        await client.connectUser(currentUser, userToken);
        setUser(currentUser);

        // Create or get existing channel with simpler setup
        const channelId = `deal-chat-${chatId}`;
        const newChannel = client.channel("messaging", channelId, {
          name: `Campaign Discussion`,
          // Remove members array to avoid permission issues
        });

        await newChannel.watch();
        setChannel(newChannel);

        // Send welcome message if this is a new channel
        const { messages } = await newChannel.query({ messages: { limit: 1 } });
        if (messages.length === 0) {
          await newChannel.sendMessage({
            text: `Hi! Thank you for your interest in our campaign "${mockCampaignData.title}". We're excited to discuss this collaboration with you!`,
          });
        }
      } catch (error) {
        console.error("Error initializing chat:", error);

        // Fallback: Create a simple channel without user management
        try {
          const fallbackUser = {
            id: `guest-${Math.random().toString(36).substr(2, 9)}`,
            name: "Chat User",
          };

          const fallbackToken = client.devToken(fallbackUser.id);
          await client.connectUser(fallbackUser, fallbackToken);
          setUser(fallbackUser);

          const fallbackChannel = client.channel(
            "messaging",
            `simple-${chatId}`
          );
          await fallbackChannel.watch();
          setChannel(fallbackChannel);
        } catch (fallbackError) {
          console.error("Fallback chat initialization failed:", fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    initChat();

    // Cleanup on unmount
    return () => {
      if (client.user) {
        client.disconnectUser();
      }
    };
  }, [chatId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 pt-20">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563eb] mx-auto mb-4"></div>
              <p className="text-[#64748b]">Connecting to chat...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 pt-20">
          <div className="text-center">
            <p className="text-red-600 mb-4">Failed to load chat</p>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-6 pb-6">
        {/* Custom Header */}
        <Card className="bg-white shadow-sm mb-4">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto font-normal hover:text-[#2563eb]"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder.svg?height=50&width=50" />
                      <AvatarFallback className="bg-[#d9d9d9] text-[#71839b]">
                        SJ
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <h2 className="font-semibold text-[#141414]">
                      Sarah Johnson
                    </h2>
                    <p className="text-sm text-[#64748b]">Online</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Campaign Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#141414] text-sm">
                    {mockCampaignData.title}
                  </p>
                  <p className="text-xs text-[#64748b]">
                    Campaign by {mockCampaignData.company}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 text-xs"
                >
                  {mockCampaignData.status}
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stream Chat Component */}
        <Card className="bg-white shadow-sm overflow-hidden">
          <div className="h-[600px]">
            <StreamChatComponent client={client} theme="str-chat__theme-light">
              <Channel channel={channel}>
                <Window>
                  <div
                    className="str-chat__main-panel"
                    style={{ height: "600px" }}
                  >
                    <MessageList />
                    <MessageInput focus />
                  </div>
                </Window>
                <Thread />
              </Channel>
            </StreamChatComponent>
          </div>
        </Card>
      </div>

      <style jsx global>{`
        /* Custom Stream Chat Styling */
        .str-chat__main-panel {
          border: none !important;
        }

        .str-chat__channel-header {
          display: none !important;
        }

        .str-chat__message-list {
          background: white !important;
          padding: 1rem !important;
        }

        .str-chat__message-input {
          border-top: 1px solid #e2e8f0 !important;
          background: white !important;
          padding: 1rem !important;
        }

        .str-chat__message-simple__content {
          background: #f8fafc !important;
        }

        .str-chat__message-simple--me .str-chat__message-simple__content {
          background: #2563eb !important;
          color: white !important;
        }

        .str-chat__avatar {
          width: 32px !important;
          height: 32px !important;
        }

        .str-chat__message-input-flat {
          border: 1px solid #d1d5db !important;
          border-radius: 8px !important;
        }

        .str-chat__send-button {
          background: #2563eb !important;
          border-radius: 8px !important;
        }
      `}</style>
    </div>
  );
}
