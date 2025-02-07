"use client";

import { Mic } from "lucide-react";
import React, { useEffect } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import dynamic from "next/dynamic";

const MicrophoneComponent = ({ prompt, setPrompt }) => {
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

  useEffect(() => {
    results.forEach((text) => {
      setPrompt((prev) => prev + text?.transcript);
    });
  }, [results, setPrompt]);

  const startFunc = () => {
    setPrompt("");
    if (typeof window !== "undefined") {
      startSpeechToText();
    }
  };

  const stopFunc = () => {
    if (typeof window !== "undefined") {
      stopSpeechToText();
    }
  };

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

// Correct way: Use a named component and wrap it with `dynamic()`
const Microphone = dynamic(() => Promise.resolve(MicrophoneComponent), { ssr: false });

export default Microphone;
