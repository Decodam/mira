'use client';
import React, { createContext, useState } from 'react';

// Create the context
export const SidebarContext = createContext();

// Create a provider component
export const SidebarProvider = ({ children }) => {
  const [OpenSidebar, setOpenSidebar] = useState(true);

  return (
    <SidebarContext.Provider value={{ OpenSidebar, setOpenSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};