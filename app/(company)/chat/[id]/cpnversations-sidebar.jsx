"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useJwtContext } from "@/app/jwt-provider";
const API_BASE_URL = "http://192.168.145.244:8080";

export default function ConversationsSideBar({ roomId }) {
  const { decodedToken } = useJwtContext();
  const [conversations, setConversations] = useState([]);

  const currentUser = useMemo(() => {
    return {
      id: decodedToken?.id,
      username: decodedToken?.name,
      type: decodedToken?.role == "influencer" ? "freelancer" : "client",
      pfp: decodedToken?.pfp || "/placeholder.svg",
    };
  }, []);

  const loadConversations = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/room/user/${currentUser.id}`,
        {
          headers: {
            Authorization: "dummy-token",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setConversations((prev) => data.conversations || []);
      }
    } catch (error) {
      console.error("Error loading conversations:", error);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);
  return (
    <div className="lg:col-span-1">
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#64748b]" />
            <h3 className="font-semibold text-[#141414]">Conversations</h3>
          </div>
        </CardHeader>
        <div className="px-4 pb-4">
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {conversations.map((conversation) => (
              <Link
                key={conversation._id}
                className={`p-3 block rounded-lg cursor-pointer transition-colors ${
                  conversation._id === roomId
                    ? "bg-[#2563eb] text-white"
                    : "bg-[#f8fafc] hover:bg-[#e2e8f0]"
                }`}
                href={`/chat/${conversation._id}`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={
                          conversation.userIds.find(
                            (user) => user._id !== currentUser.id
                          )?.pfp || "/placeholder.svg"
                        }
                      />
                      <AvatarFallback className="bg-[#d9d9d9] text-[#71839b] text-xs">
                        {conversation.userIds
                          .find((user) => user._id !== currentUser.id)
                          ?.username?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.userIds.find(
                      (user) => user._id !== currentUser.id
                    )?.active && (
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 border border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {conversation.userIds.find(
                        (user) => user._id !== currentUser.id
                      )?.username || "Unknown User"}
                    </p>
                    <p className="text-xs opacity-75 truncate">
                      {conversation.lastMessage?.message || "No messages yet"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
