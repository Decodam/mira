'use client'
import React, { createContext, useState } from 'react';

// Create the context
export const MessageContext = createContext();

// Create a provider component
export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);


  return (
    <MessageContext.Provider value={{ messages, setMessages, loading, setLoading }}>
      {children}
    </MessageContext.Provider>
  );
};