"use client";
import { useJwtContext } from "@/app/jwt-provider";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { io } from "socket.io-client";

const API_BASE_URL = "http://192.168.145.244:8080";

const ChatContext = createContext({});
function ChatProvider({ children, roomId }) {
  const [socket, setSocket] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { decodedToken } = useJwtContext();

  const currentUser = useMemo(() => {
    return {
      id: decodedToken?.id,
      username: decodedToken?.name,
      type: decodedToken?.role == "influencer" ? "freelancer" : "client",
      pfp: decodedToken?.pfp || "/placeholder.svg",
    };
  }, []);
  const loadMessages = async (roomId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/room/${roomId}?page=0&limit=200`,
        {
          headers: {
            Authorization: "dummy-token", // Replace with actual auth token
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load messages");
      }

      const data = await response.json();

      const newSocket = io(API_BASE_URL);
      newSocket.emit("subscribe", {
        room: roomId,
        otherUserId: data.users.find((user) => user._id !== currentUser.id)._id,
      });
      setSocket(newSocket);

      newSocket.emit("init", currentUser.id);

      // Socket event listeners
      newSocket.on("new message", (data) => {
        setMessages((prev) => [...prev, data.message]);
      });

      newSocket.on("typing", (data) => {
        if (data.userId !== currentUser.id) {
          setIsTyping(true);
        }
      });

      newSocket.on("stop typing", (data) => {
        if (data.userId !== currentUser.id) {
          setIsTyping(false);
        }
      });

      newSocket.on("read", () => {
        // Handle read receipts if needed
      });

      const otherUserInfo = data.users.find(
        (user) => user._id !== currentUser.id
      );
      if (otherUserInfo) {
        setOtherUser(otherUserInfo);
      }
      setMessages(data.conversation); // Reverse to show oldest first
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      await loadMessages(roomId);
    })();
    setLoading(false);
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [roomId]);

  return (
    <ChatContext.Provider
      value={{
        socket,
        isTyping,
        setIsTyping,
        messages,
        otherUser,
        currentUser,
        loading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatProvider;
export const useChat = () => {
  return useContext(ChatContext);
};
