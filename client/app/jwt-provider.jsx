"use client";
import { createContext, useContext } from "react";

const JwtContext = createContext({});
export default function JwtProvider({ token, decodedToken, children }) {
  return (
    <JwtContext.Provider value={{ decodedToken, token }}>
      {children}
    </JwtContext.Provider>
  );
}

export const useJwtContext = () => {
  return useContext(JwtContext);
};
