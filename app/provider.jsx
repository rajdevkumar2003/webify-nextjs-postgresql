"use client";
import React, { useState } from "react";
import Header from "./_components/Header";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { OverallContext } from "@/context/OverallContext";

const Provider = ({ children }) => {
  const [messages, setMessages] = useState({ role: "", content: "" });
  const [userDetail, setUserDetail] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}
    >
      <OverallContext.Provider value={{openDialog,setOpenDialog}}>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <MessagesContext.Provider value={{ messages, setMessages }}>
            <div>
              <Header />
              <div className="min-h-screen w-full">{children}</div>
            </div>
          </MessagesContext.Provider>
        </UserDetailContext.Provider>
      </OverallContext.Provider>
    </GoogleOAuthProvider>
  );
};

export default Provider;
