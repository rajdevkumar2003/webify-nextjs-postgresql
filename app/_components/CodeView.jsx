"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import constants from "@/connects/constants";
import axios from "axios";
import { MessagesContext } from "@/context/MessagesContext";
import prompts from "@/connects/prompts";
const CodeView = () => {
  const [files, setFiles] = useState(constants?.DEFAULT_FILE);
  const [active, setActive] = useState("code");
  const {messages}=useContext(MessagesContext);

  useEffect(() => {
      if (messages?.length > 0) {
        const role = messages[messages?.length - 1].role;
        if (role === "user") {
          GenerateAiCode();
        }
      }
    }, [messages]);
  

  const GenerateAiCode=async()=>{
    const PROMPT=JSON.stringify(messages)+" "+prompts.CODE_GEN_PROMPT;
    const result=await axios.post('/api/gen-ai-code',{
      prompt:PROMPT
    });

    console.log(result.data);
    const aiResp=result.data;

    const mergedFiles={...constants?.DEFAULT_FILE,...aiResp?.files};
    setFiles(mergedFiles);
  }

  return (
    <div className="w-full max-h-[90vh] rounded-sm bg-blue-600 flex flex-col overflow-y-scroll overflow-x-scroll scrollbar-hide ">
      <div className="flex p-1">
        <div className="flex p-1 gap-2 rounded-md border-blue-900 bg-blue-400">
          <h2
            onClick={() => setActive("code")}
            className={`rounded-md border shadow-sm cursor-pointer p-1 ${active === "code" && "bg-white border-black"}`}
          >
            code
          </h2>
          <h2
            onClick={() => setActive("preview")}
            className={`rounded-md border shadow-sm cursor-pointer p-1 ${active === "preview" && "bg-white border-black"}`}
          >
            preview
          </h2>
        </div>
      </div>
      <SandpackProvider 
      className="overflow-y-scroll overflow-x-scroll"
      template="react" 
      files={files} 
      customSetup={{
        dependencies:{
          ...constants.DEPENDANCY
        }
      }}
      options={{
        externalResources:['https://unpkg.com/@tailwindcss/browser@4']
      }} >
        <SandpackLayout className="w-full flex" style={{ display: "flex" }}>
          {active === "code" && (
            <div className="flex w-full">
              <SandpackFileExplorer className="min-h-[83vh]" />
              <SandpackCodeEditor
                className="min-h-[83vh] md:min-w-[48vw] sm:min-w-[76vw] min-w-[66vw]"
                showTabs
                showLineNumbers={true}
                showInlineErrors
                wrapContent
              />
            </div>
          )}

          {active === "preview" && (
            <SandpackPreview
              showNavigator={true}
              className="min-h-[83vh] md:min-w-[57vw] sm:min-w-[76vw] min-w-[66vw]"
            />
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default CodeView;
