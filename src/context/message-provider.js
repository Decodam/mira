'use client'
import React, { createContext, useState } from 'react';

// Create the context
export const MessageContext = createContext();

const conversation = [
  {
    role: "user",
    parts: [{ text: "Good morning, doctor. I have been feeling very tired lately." }],
  },
  {
    role: "model",
    parts: [{ text: "Good morning! I'm sorry to hear that. How long have you been feeling this way?" }],
  },
  {
    role: "user",
    parts: [{ text: "It's been about two weeks now. I also have some mild headaches." }],
  },
  {
    role: "model",
    parts: [{ text: "Thanks for letting me know. Have you had any changes in your sleep or diet recently?" }],
  },
  {
    role: "user",
    parts: [{ text: "Yes, my sleep schedule has been a bit irregular, and I've been skipping meals due to work." }],
  },
  {
    role: "model",
    parts: [{ text: "It sounds like stress might be contributing to your symptoms. It's important to get enough rest and eat regularly. Let's discuss some strategies to manage your stress and improve your overall health." }],
  },
  {
    role: "user",
    parts: [{ text: "That sounds like a good idea. What do you recommend?" }],
  },
  {
    role: "model",
    parts: [{ text: "I recommend setting a consistent sleep schedule and incorporating relaxation techniques like deep breathing or meditation. Also, try to plan balanced meals, even if you're busy. If the symptoms persist, we may need to explore further." }],
  },
  {
    role: "user",
    parts: [{ text: "I'll give it a try. Thank you, doctor." }],
  },
  {
    role: "model",
    parts: [{ text: "You're welcome! Don't hesitate to reach out if you have any more questions or concerns." }],
  },
];

// Create a provider component
export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState(conversation);
  const [loading, setLoading] = useState(false);


  return (
    <MessageContext.Provider value={{ messages, setMessages, loading, setLoading }}>
      {children}
    </MessageContext.Provider>
  );
};