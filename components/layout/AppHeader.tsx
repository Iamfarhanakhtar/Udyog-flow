"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, RefreshCw, Plus, Bell, Home, ChevronRight } from "lucide-react";
import { useBusiness } from "@/context/BusinessContext";

export function AppHeader() {
  const { profile } = useBusiness();

  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl z-40 flex items-center justify-between px-space-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-high/60">
      {/* Left: Breadcrumbs & Global Search */}
      <div className="flex items-center gap-space-md">
        <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
          <Link href="/blueprint" className="hover:text-on-surface transition-colors flex items-center gap-1">
            <Home className="w-4 h-4 text-outline" />
            <span>Workspace</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-outline-variant" />
          <span className="text-on-surface font-semibold truncate max-w-[200px]">
            {profile?.businessName || "Rohan's Cloud Kitchen"}
          </span>
        </div>

        {/* Global Search Bar */}
        <div className="relative flex items-center ml-space-md">
          <Search className="absolute left-3 w-4 h-4 text-outline pointer-events-none" />
          <input
            type="text"
            placeholder="Search licenses, documents, schemes, rules... [⌘K]"
            className="w-80 lg:w-96 pl-9 pr-4 py-1.5 bg-surface-container-low text-on-surface font-body-sm text-body-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container placeholder:text-outline border border-transparent focus:border-primary/20 transition-all"
          />
        </div>
      </div>

      {/* Right: DigiLocker Badge & Profile Controls */}
      <div className="flex items-center gap-space-md">
        {/* DigiLocker Status Badge */}
        <div className="flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
          <RefreshCw className="w-3.5 h-3.5 text-secondary animate-[spin_8s_linear_infinite]" />
          <span>DigiLocker Live</span>
        </div>

        {/* Action Button */}
        <Link
          href="/forms"
          className="flex items-center gap-space-xs bg-primary-container text-on-primary font-label-lg text-label-lg px-space-md py-1.5 rounded-lg hover:opacity-95 transition-opacity shadow-sm active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>New Application</span>
        </Link>

        {/* Notifications */}
        <div className="relative p-1.5 text-on-surface-variant hover:text-on-surface cursor-pointer rounded-lg hover:bg-surface-container-low transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-error text-on-error rounded-full flex items-center justify-center font-label-sm text-[10px] font-bold">
            2
          </span>
        </div>

        {/* Profile Avatar */}
        <div className="flex items-center gap-space-xs pl-space-xs cursor-pointer">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant bg-surface-container flex items-center justify-center">
            <Image
              src="/avatar.png"
              alt="Founder Avatar"
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
