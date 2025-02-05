"use client";
import { Mic } from "lucide-react";
import React, { useEffect } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { useContext } from "react";
import { MessagesContext } from "@/context/MessagesContext";
const Microphone = ({ prompt, setPrompt }) => {
  const { messages, setMessages } = useContext(MessagesContext);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  if (error) {
    alert(error.message);
  }

  useEffect(() => {

    results.map((text) => {
    setPrompt((prev) => prev + text?.transcript);
    });

  }, [isRecording]);

  const startFunc = () =>{
    setPrompt('');
    startSpeechToText();
  }
  const stopFunc = () =>{
    stopSpeechToText();
  }

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <Mic
        onClick={() => (isRecording ? stopFunc() : startFunc())}
        className="mt-10 rounded-full h-14 w-14 bg-blue-700 text-gray-200 p-2 shadow-md cursor-pointer"
      />
      {isRecording ? (
        <p>Recording..</p>
      ) : (
        <p className="font-bold">Tell me your Ideas!</p>
      )}
    </div>
  );
};

export default Microphone;
