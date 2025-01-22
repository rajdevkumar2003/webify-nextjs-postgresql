"use client";

import React, { useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
const CodeView = () => {
  const [active, setActive] = useState('code');
  return (
    <div className="w-full max-h-[90vh] rounded-sm bg-blue-600 flex flex-col">
    <div className="flex p-1">
    <div className="flex p-1 gap-2 rounded-md border-blue-900 bg-blue-400">
      <h2 onClick={()=>setActive('code')} className={`rounded-md border shadow-sm cursor-pointer p-1 ${active==='code'&& 'bg-white border-black'}`} >code</h2>
      <h2 onClick={()=>setActive('preview')} className={`rounded-md border shadow-sm cursor-pointer p-1 ${active==='preview'&& 'bg-white border-black'}`}>preview</h2>
      </div>
    </div>
      <SandpackProvider template="react">
        <SandpackLayout className="w-full flex" style={{ display: "flex" }}>
        {active==='code'&&<div className="flex w-full">
            <SandpackFileExplorer className="min-h-[83vh]" />
            <SandpackCodeEditor
              className="min-h-[83vh] md:min-w-[48vw] sm:min-w-[76vw] min-w-[66vw]"
              showTabs
              showLineNumbers={true}
              showInlineErrors
              wrapContent
            />
          </div>}

          {active==='preview'&&<SandpackPreview className="min-h-[83vh] md:min-w-[57vw] sm:min-w-[76vw] min-w-[66vw]" /> }
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default CodeView;
