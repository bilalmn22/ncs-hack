"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_HOST;

export const sendQuery = async (query = "", variables = {}) => {
  const CookieStore = await cookies();

  const res = await fetch(`${apiUrl}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${CookieStore.get("auth_token")?.value || ""}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res;
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${apiUrl}/uploads`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload file");
  }

  const data = await res.json();
  return data;
};

export const setCookieValue = async ({ token, user }) => {
  const CookieStore = await cookies();
  console.log({ token, user });
  CookieStore.set({
    name: "auth_token",
    value: token,
    secure: false,
    httpOnly: true,
    sameSite: "Lax",
  });
  if (user.role === "influencer") {
    redirect("/influencer/jobs");
  } else {
    redirect("/dashboard");
  }
};
