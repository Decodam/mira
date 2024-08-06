'use client'
import ChatLayout from "@/components/chat-layout";
import { MessageContext } from "@/context/message-provider";
import { useContext, useEffect, useRef, useState } from "react";
import { chatToGemini } from "@/lib/gemini.ai";
import { IconChevronDown } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function ChatIDPage({}) {
  const { messages, loading } = useContext(MessageContext);
  const messagesEndRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // Scroll to bottom when a new message is added
  useEffect(() => {
    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAtBottom]);

  // Observe the messagesEndRef to determine if it is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAtBottom(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (messagesEndRef.current) {
      observer.observe(messagesEndRef.current);
    }

    return () => {
      if (messagesEndRef.current) {
        observer.unobserve(messagesEndRef.current);
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ChatLayout formAction={chatToGemini}>
      <div className="flex flex-col space-y-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`p-3 rounded-xl rounded-tr-none ${message.role === "user" && "bg-accent max-w-md"}`}>
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

        {/* Reference element to track the bottom of the chat */}
        <div ref={messagesEndRef} />

        {/* Scroll to bottom button */}
        {!isAtBottom && (
          <Button
            size="icon"
            variant="secondary"
            onClick={scrollToBottom}
            className="fixed bottom-28 md:bottom-24 right-8"
          >
            <IconChevronDown />
          </Button>
        )}
      </div>
    </ChatLayout>
  );
}
