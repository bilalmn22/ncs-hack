"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Paperclip, Users } from "lucide-react"
import { useState, useEffect, useRef, use, useMemo } from "react"
import { io } from "socket.io-client"
import { useJwtContext } from "@/app/jwt-provider"
import { getData } from "@/app/lib/data"
import { getCompanyPofile, getInfluencerProfile } from "@/app/lib/queries"

export default function Chat({ params }) {
  const { id: chatId } = use(params)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [roomId, setRoomId] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [socket, setSocket] = useState(null)
  const [otherUser, setOtherUser] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const typingTimeoutRef = useRef()
  const [conversations, setConversations] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  const API_BASE_URL = "http://192.168.101.243:8080"

  // File upload function - returns file URL (empty for now as requested)
  const fileUpload = async (file) => {
    // TODO: Implement file upload logic
    // This should upload the file to your server/cloud storage
    // and return the URL of the uploaded file
    return ""
  }

  const handleFileSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setSelectedFile(file)

    try {
      // Upload file and get URL
      const fileUrl = await fileUpload(file)

      if (fileUrl) {
        // Send file message
        const fileType = file.type.startsWith("image/") ? "image" : "file"
        await sendFileMessage(fileUrl, fileType)
      }
    } catch (error) {
      console.error("Error uploading file:", error)
    } finally {
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const sendFileMessage = async (fileUrl, fileType) => {
    if (!fileUrl || !roomId) return

    try {
      const response = await fetch(`${API_BASE_URL}/room/${roomId}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "dummy-token",
        },
        body: JSON.stringify({
          senderId: currentUser.id,
          message: fileUrl,
          type: fileType,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send file message")
      }
    } catch (error) {
      console.error("Error sending file message:", error)
    }
  }

  const loadConversations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/room/user/${currentUser.id}`, {
        headers: {
          Authorization: "dummy-token",
        },
      })

      if (response.ok) {
        const data = await response.json()
        setConversations(data.conversations || [])
      }
    } catch (error) {
      console.error("Error loading conversations:", error)
    }
  }

  const handleConversationClick = async (conversation) => {
    setRoomId(conversation._id)
    await loadMessages(conversation._id)

    // Update other user info
    const otherUserInfo = conversation.userIds.find((user) => user._id !== currentUser.id)
    if (otherUserInfo) {
      setOtherUser(otherUserInfo)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const { decodedToken } = useJwtContext()

  const currentUser = useMemo(() => {
    return {
      id: decodedToken?.id,
      username: decodedToken?.name,
      type: decodedToken?.role == "influencer" ? "freelancer" : "client",
      pfp: decodedToken?.pfp || "/placeholder.svg",
    }
  }, [])

  useEffect(() => {
    const initChat = async () => {
      try {
        // Create or get current user
        await createUserIfNotExists(currentUser)

        // Create influencer user
        const { data } = await getData(decodedToken?.role === "influencer" ? getCompanyPofile : getInfluencerProfile, {
          id: chatId,
        })
        const info =
          decodedToken?.role === "influencer" ? data.companyProfile.company : data.influencerProfile.influencer
        const influencerUser = {
          id: info._id,
          username: info.fullName || info.title,
          type: decodedToken?.role === "influencer" ? "freelancer" : "client",
          pfp: info.photo || "/placeholder.svg",
        }

        await createUserIfNotExists(influencerUser)
        setOtherUser({
          _id: influencerUser.id,
          username: influencerUser.username,
          pfp: influencerUser.pfp,
          type: influencerUser.type,
          active: true,
        })

        // Initialize chat room
        const room = await initiateChatRoom([currentUser.id, influencerUser.id])
        setRoomId(room.chatRoomId)

        // Load existing messages
        await loadMessages(room.chatRoomId)

        // Initialize socket connection
        const newSocket = io(API_BASE_URL)
        setSocket(newSocket)

        newSocket.emit("init", currentUser.id)
        newSocket.emit("subscribe", {
          room: room.chatRoomId,
          otherUserId: influencerUser.id,
        })

        // Socket event listeners
        newSocket.on("new message", (data) => {
          setMessages((prev) => [...prev, data.message])
        })

        newSocket.on("typing", (data) => {
          if (data.userId !== currentUser.id) {
            setIsTyping(true)
          }
        })

        newSocket.on("stop typing", (data) => {
          if (data.userId !== currentUser.id) {
            setIsTyping(false)
          }
        })

        newSocket.on("read", () => {
          // Handle read receipts if needed
        })
      } catch (error) {
        console.error("Error initializing chat:", error)
      } finally {
        setLoading(false)
        // Load user's conversations
        await loadConversations()
      }
    }

    initChat()

    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [chatId])

  const createUserIfNotExists = async (user) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          username: user.username,
          type: user.type,
          pfp: user.pfp || "",
        }),
      })

      if (!response.ok && response.status !== 500) {
        throw new Error("Failed to create user")
      }
    } catch (error) {
      // User might already exist, which is fine
      console.log("User creation result:", error)
    }
  }

  const initiateChatRoom = async (userIds) => {
    const response = await fetch(`${API_BASE_URL}/room/initiate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "dummy-token", // Replace with actual auth token
      },
      body: JSON.stringify({ userIds }),
    })

    if (!response.ok) {
      throw new Error("Failed to initiate chat room")
    }

    const data = await response.json()
    return data.chatRoom
  }

  const loadMessages = async (roomId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/room/${roomId}?page=0&limit=200`, {
        headers: {
          Authorization: "dummy-token", // Replace with actual auth token
        },
      })

      if (!response.ok) {
        throw new Error("Failed to load messages")
      }

      const data = await response.json()
      setMessages(data.conversation) // Reverse to show oldest first
    } catch (error) {
      console.error("Error loading messages:", error)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !roomId) return

    try {
      const response = await fetch(`${API_BASE_URL}/room/${roomId}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "dummy-token", // Replace with actual auth token
        },
        body: JSON.stringify({
          senderId: currentUser.id,
          message: newMessage,
          type: "text",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setNewMessage("")

      // Stop typing indicator
      if (socket) {
        socket.emit("stop typing", { room: roomId, userId: currentUser.id })
      }
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const handleTyping = () => {
    if (socket && roomId) {
      socket.emit("typing", { room: roomId, userId: currentUser.id })

      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }

      // Set new timeout to stop typing
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("stop typing", { room: roomId, userId: currentUser.id })
      }, 1000)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

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
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            {/* Custom Header */}
            <Card className="bg-white shadow-sm mb-4">
              <CardHeader className="">
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
                        <AvatarImage src={otherUser?.pfp || "/placeholder.svg"} />
                        <AvatarFallback className="bg-[#d9d9d9] text-[#71839b]">
                          {otherUser?.username?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <h2 className="font-semibold text-[#141414]">{otherUser?.username || "User"}</h2>
                      <p className="text-sm text-[#64748b]">{isTyping ? "Typing..." : "Online"}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Chat Messages */}
            <Card className="bg-white shadow-sm overflow-hidden">
              <div className="h-[600px] flex flex-col">
                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => {
                    const isCurrentUser = message.postedByUser._id === currentUser.id
                    return (
                      <div key={index} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                        <div className={`flex gap-2 max-w-[70%] ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}>
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarImage src={message.postedByUser.pfp || "/placeholder.svg"} />
                            <AvatarFallback className="bg-[#d9d9d9] text-[#71839b] text-xs">
                              {message.postedByUser.username?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
                            <div
                              className={`px-3 py-2 rounded-lg ${
                                isCurrentUser ? "bg-[#2563eb] text-white" : "bg-[#f8fafc] text-[#141414]"
                              }`}
                            >
                              {message.type === "image" ? (
                                <img
                                  src={message.message || "/placeholder.svg"}
                                  alt="Shared image"
                                  className="max-w-xs rounded-lg"
                                />
                              ) : message.type === "file" ? (
                                <div className="flex items-center gap-2">
                                  <Paperclip className="w-4 h-4" />
                                  <a
                                    href={message.message}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline"
                                  >
                                    View File
                                  </a>
                                </div>
                              ) : (
                                <p className="text-sm">{message.message}</p>
                              )}
                            </div>
                            <p className="text-xs text-[#64748b] mt-1">{formatTime(message.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="border-t border-[#e2e8f0] p-4">
                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      className="hidden"
                      accept="image/*,application/pdf,.doc,.docx"
                    />
                    <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="px-3">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Input
                      value={newMessage}
                      onChange={(e) => {
                        setNewMessage(e.target.value)
                        handleTyping()
                      }}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="flex-1 border-[#d1d5db] rounded-lg"
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-[#2563eb] hover:bg-[#1d4ed8] rounded-lg px-4"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Conversations Sidebar */}
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
                    <div
                      key={conversation._id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        conversation._id === roomId ? "bg-[#2563eb] text-white" : "bg-[#f8fafc] hover:bg-[#e2e8f0]"
                      }`}
                      onClick={() => handleConversationClick(conversation)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={
                                conversation.userIds.find((user) => user._id !== currentUser.id)?.pfp ||
                                "/placeholder.svg"
                              }
                            />
                            <AvatarFallback className="bg-[#d9d9d9] text-[#71839b] text-xs">
                              {conversation.userIds.find((user) => user._id !== currentUser.id)?.username?.charAt(0) ||
                                "U"}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.userIds.find((user) => user._id !== currentUser.id)?.active && (
                            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 border border-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {conversation.userIds.find((user) => user._id !== currentUser.id)?.username ||
                              "Unknown User"}
                          </p>
                          <p className="text-xs opacity-75 truncate">
                            {conversation.lastMessage?.message || "No messages yet"}
                          </p>
                        </div>
                        {conversation.notifications > 0 && (
                          <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.notifications}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}