"use client";

import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { Globe, LoaderCircleIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
const ChatView = () => {
  const { id } = useParams();
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail } = useContext(UserDetailContext);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const UpdateMessages = useMutation(api.workspace.UpdateMessages);

  useEffect(() => {
    id && GetWorkspaceData();
  }, [id]);

  //get workspace data from workspace ID
  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    console.log(result);
    setMessages(result?.messages);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role === "user") {
        GetAiResponse();
      }
    }
  }, [messages]);

  const GetAiResponse = async () => {
    setLoading(true);
    const PROMPT =
      JSON.stringify(messages) +
      "You are a AI Assistant and experience in React Development. GUIDELINES:Tell user what your are building response less than 15 lines. Skip code examples and commentary";
    const result = await axios.post("/api/ai-prompt", {
      prompt: PROMPT,
    });
    console.log(result.data.result);
    const aiResp = {
      role: "ai",
      content: result.data.result,
    };
    setMessages((prev) => [...prev, aiResp]);
    setLoading(false);
    await UpdateMessages({
      messages: [...messages, aiResp],
      workspaceId: id,
    });
  };

  const handlePrompt = async (input) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);
    setPrompt("");
  };

  return (
    <div>
      <div className="bg-[#6495ED] max-h-[90vh] rounded-md p-1 flex flex-col md:w-[30vw]">
        <h1 className="font-bold text-[3vh] font-sans text-blue-900 shadow-sm p-1">
          Webify Assistant
        </h1>
        <div className="flex-1 overflow-y-scroll scrollbar-hide">
          {messages?.length > 0 &&
            messages.map((msg, index) => (
              <div
                key={index}
                className="flex gap-2 w-full items-center justify-start  bg-[#688ccf]  rounded-sm shadow-sm mb-1"
              >
                {msg?.role == "user" ? (
                  <div
                    key={index}
                    className="flex gap-2 items-center w-full justify-start bg-[#7593ca] p-2 rounded-sm "
                  >
                    <Image
                      className="rounded-full sm:h-[40px] sm:w-[40px]"
                      src={userDetail?.picture || "/profile.png"}
                      height={20}
                      width={20}
                      alt="hero"
                    />
                    <h2 className="text-blue-950 font-semibold font-sans">
                      {" "}
                      {msg.content}
                    </h2>
                  </div>
                ) : (
                  <>
                    <p className="p-2 font-sans"> {msg.content}</p>
                  </>
                )}
              </div>
            ))}
          {loading && (
            <div className="flex gap-1 p-1 items-center justify-start text-sm">
              <LoaderCircleIcon className="animate-spin" />
              Working on your prompt...
            </div>
          )}
        </div>
        <div className="relative flex w-full min-h-52 rounded-md bg-[#86aef8] shadow-sm ">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt"
            className="resize-none shadow-sm px-4 bg-[#b0c7f3] border-none outline-none rounded-md min-w-full min-h-50 p-2"
          />
          <Globe
            onClick={() => handlePrompt(prompt)}
            className="h-10 w-8 cursor-pointer absolute right-1 bottom-2  bg-[#b0c7f3] rounded-full p-1"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatView;
