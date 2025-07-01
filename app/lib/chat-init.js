const API_BASE_URL = "http://192.168.145.244:8080";

export const createUserIfNotExists = async (user) => {
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
    });

    if (!response.ok && response.status !== 500) {
      throw new Error("Failed to create user");
    }
  } catch (error) {
    // User might already exist, which is fine
    console.log("User creation result:", error);
  }
};

export const initiateChatRoom = async (userIds) => {
    const response = await fetch(`${API_BASE_URL}/room/initiate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "dummy-token", // Replace with actual auth token
      },
      body: JSON.stringify({ userIds }),
    });

    if (!response.ok) {
      throw new Error("Failed to initiate chat room");
    }

    const data = await response.json();
    return data.chatRoom;
  };



  