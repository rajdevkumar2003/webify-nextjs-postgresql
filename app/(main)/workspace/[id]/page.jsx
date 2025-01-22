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
    <div className="p-4 min-h-[100vh]">
      <div className=" flex max-md:flex-col gap-4 justify-start min-h-[100vh]">
        <ChatView/>
        <CodeView/>
      </div>
    </div>
  );
};

export default Workspace;
