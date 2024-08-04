'use client';

import { ToggleTheme } from "./ui/toggle-theme";

export default function Sidebar({}) {
  return (
    <div className="bg-background w-60 flex flex-col border-r border-border">
      <div className="headersidebar p-4 flex">
      <ToggleTheme />
      </div>
      <div className="scrollsidebar hide-scrollbar overflow-y-scroll flex-1">
        content <br />
      </div>
      <div className="footersidebar p-4">foot</div>
    </div>
  );
}