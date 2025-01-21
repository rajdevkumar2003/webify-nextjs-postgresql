"use client";

import ChatView from "@/app/_components/ChatView";
import CodeView from "@/app/_components/CodeView";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
const Workspace = () => {
  const { userDetail } = useContext(UserDetailContext);
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!userDetail?.name) {
        toast("Oops! You are Logged Out");
        router.push("/");
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, [userDetail]);

  return (
    <div className="p-4">
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-4">
        <ChatView/>
        <CodeView/>
      </div>
    </div>
  );
};

export default Workspace;
