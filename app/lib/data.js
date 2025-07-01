"use server";

import { cookies } from "next/headers";
const apiUrl =
  process.env.NEXT_PUBLIC_BACKEND_HOST || "http://localhost:8000/graphql";

export const getData = async (query, variables = {}) => {
  const token = (await cookies()).get("auth_token")?.value || null;
  try {
    const response = await fetch(apiUrl + "/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
