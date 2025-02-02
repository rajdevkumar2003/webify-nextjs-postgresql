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
import { LoaderPinwheel } from "lucide-react";
import { useConvex, useMutation } from "convex/react";
import { UpdateFiles } from "@/convex/workspace";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
const CodeView = () => {
  const [files, setFiles] = useState(constants?.DEFAULT_FILE);
  const [active, setActive] = useState("code");
  const { messages } = useContext(MessagesContext);
  const [codeGenerate, setCodeGenerate] = useState(false);
  
  const UpdateFile=useMutation(api.workspace?.UpdateFiles);
  const {id}=useParams();
  const convex=useConvex();

  useEffect(()=>{
    id&&GetFiles();
  },[id]);

  const GetFiles=async()=>{
    const result=await convex.query(api.workspace.GetWorkspace,{
      workspaceId:id
    });
    const mergedFiles = { ...constants?.DEFAULT_FILE, ...result?.fileData };
    setFiles(mergedFiles);
  }
  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role === "user") {
        GenerateAiCode();
      }
    }
  }, [messages]);

  const GenerateAiCode = async () => {
    setCodeGenerate(true);
    const PROMPT = JSON.stringify(messages) + " " + prompts.CODE_GEN_PROMPT;
    const result = await axios.post("/api/gen-ai-code", {
      prompt: PROMPT,
    });

    console.log(result.data);
    const aiResp = result.data;

    const mergedFiles = { ...constants?.DEFAULT_FILE, ...aiResp?.files };
    setFiles(mergedFiles);
    await UpdateFile({
      workspaceId:id,
      files:aiResp?.files
    })
    setCodeGenerate(false);
  };

  return (
    <div className="w-full max-h-[90vh] rounded-sm bg-blue-600 flex flex-col overflow-y-scroll overflow-x-scroll scrollbar-hide">
     {codeGenerate===false?<><div className="flex p-1">
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
            dependencies: {
              ...constants.DEPENDANCY,
            },
          }}
          options={{
            externalResources: ["https://unpkg.com/@tailwindcss/browser@4"],
          }}
        >
          <SandpackLayout className="w-full flex" style={{ display: "flex" }}>
            {active === "code" && (
              <div className="flex w-full overflow-x-scroll overflow-y-scroll scrollbar-hide">
                <SandpackFileExplorer className="min-h-[83vh] scrollbar-hide" />
                <SandpackCodeEditor
                  className="min-h-[83vh] md:min-w-[48vw] sm:min-w-[76vw] min-w-[66vw] scrollbar-hide"
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
        </SandpackProvider></>
      :<div className={`min-h-full justify-center items-center bg-black z-10 bg-transparent flex gap-2`}>
        <LoaderPinwheel className="animate-spin" />Generating Code...
      </div>
      }
    </div>
  );
};

export default CodeView;
