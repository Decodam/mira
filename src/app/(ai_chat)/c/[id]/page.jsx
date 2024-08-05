'use client'
import ChatLayout from "@/components/chat-layout";
import { MessageContext } from "@/context/message-provider";
import { useContext } from "react";
import {chatToGemini} from "@/lib/gemini.ai"

export default function ChatIDPage({}) {
  const {messages, loading} = useContext(MessageContext);


  return (
    <ChatLayout formAction={chatToGemini}> 
      <div className="flex flex-col space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-xl rounded-tr-none ${
                message.role === "user"
                  && "bg-accent max-w-md"
              }`}
            >
              {message.parts.map((part, idx) => (
                <p className="text-foreground" key={idx}>{part.text}</p>
              ))}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <>
            <span className="flex items-center">
              <span className="h-px flex-1 bg-border"></span>
              <span className="shrink-0 text-xs text-muted-foreground px-6">Please Wait</span>
              <span className="h-px flex-1 bg-border"></span>
            </span>
            <div className="max-w-lg w-full mt-4">
              <div className="relative w-full h-4 rounded-md bg-background mb-2 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-accent animate-pulse"></div>
              </div>
              <div className="relative w-full h-4 rounded-md bg-background mb-2 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-accent animate-pulse"></div>
              </div>
              <div className="relative w-2/3 h-4 rounded-md bg-background mb-2 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-accent animate-pulse"></div>
              </div>
            </div>
          </>
        )}

      </div>
    </ChatLayout>
  );
}