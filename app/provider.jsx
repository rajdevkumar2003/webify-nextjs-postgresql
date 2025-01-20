"use client";
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { OverallContext } from "@/context/OverallContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";

const Provider = ({ children }) => {
  const convex=useConvex();
  useEffect(()=>{
       IsAuthenticated();
  },[]);
  
  const [messages, setMessages] = useState({ role: "", content: "" });
  const [userDetail, setUserDetail] = useState();
  const [openDialog, setOpenDialog] = useState(false);

  const IsAuthenticated =async()=>{
    if(typeof window!==undefined){
      const user=JSON.parse(localStorage.getItem("user"));
      if(user){
        const result= await convex.query(api.users.GetUser,{
          email:user?.email
        });
        setUserDetail(result);
        console.log(result);
      }
      else console.log('cache is empty')
      
    }
  }
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}
    >
      <OverallContext.Provider value={{openDialog,setOpenDialog}}>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <MessagesContext.Provider value={{ messages, setMessages }}>
            <div>
              <Header />
              <div className="min-h-screen w-full p-2 bg-[#86aef8]">{children}</div>
            </div>
          </MessagesContext.Provider>
        </UserDetailContext.Provider>
      </OverallContext.Provider>
    </GoogleOAuthProvider>
  );
};

export default Provider;
