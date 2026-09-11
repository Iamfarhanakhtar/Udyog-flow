"use client";

import React from "react";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

export function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface flex">
      {/* Fixed Persistent Left Navigation Rail */}
      <AppSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col pl-72">
        {/* Fixed Top Header */}
        <AppHeader />

        {/* Scrollable Page Body with Header Offset */}
        <main className="flex-1 mt-16 p-space-xl max-w-[1500px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
