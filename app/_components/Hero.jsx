"use client"
import { MessagesContext } from "@/context/MessagesContext";
import { Globe } from "lucide-react";
import React, { useContext, useState } from "react";

const Hero = () => {
    const [prompt, setPrompt] = useState('');
    const {messages, setMessages}=useContext(MessagesContext);
    const handlePrompt=(input)=>{
        setMessages({
            role:'user',
            content:input
        })

    }
  return (
    <div className="bg-[#86aef8] min-h-screen flex flex-col items-center justify-center">
      <div className="min-h-full flex flex-col items-center justify-between">
        <h1 className="font-extrabold text-4xl md:text-6xl">
          What do you want to build?
        </h1>
        <p className="p-3 font-semibold">Prompt, run, edit, and deploy full-stack web apps.</p>
        <div className="relative flex w-full max-w-2xl min-h-52 rounded-md bg-[#86aef8] shadow-sm mt-3">
        <textarea
          value={prompt}
          onChange={(e)=>setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          className="resize-none px-4 bg-[#b0c7f3] border-none outline-none rounded-md w-full max-w-2xl min-h-52 p-2"
        />
        <Globe onClick={()=>handlePrompt(prompt)} className="h-10 w-8 cursor-pointer absolute right-1 bottom-2  bg-[#b0c7f3] rounded-full p-1"/>
        </div>
      </div>
      <div className=" text-sm w-full max-w-2xl flex items-center justify-center mt-4 capitalize flex-row flex-wrap gap-4">
        <p className="border p-1 rounded-xl border-black px-2 cursor-pointer"> Create Todo app in react</p>
        <p className="border p-1 rounded-xl border-black px-2 cursor-pointer">create budget track app</p>
        <p className="border p-1 rounded-xl border-black px-2 cursor-pointer"> create gym management portal dashboard</p>
        <p className="border p-1 rounded-xl border-black px-2 cursor-pointer"> create quizz app on history</p>
        <p className="border p-1 rounded-xl border-black px-2 cursor-pointer"> create login signup screen</p>
      </div>
    </div>
  );
};

export default Hero;
