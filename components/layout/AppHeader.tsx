"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, RefreshCw, Plus, Bell, Home, ChevronRight } from "lucide-react";
import { useTrack1Store } from "@/state/track1Store";

export function AppHeader() {
  const { businessName, businessCity, businessState } = useTrack1Store();

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
          <span className="text-on-surface font-semibold truncate max-w-[220px]">
            {businessName || "Aarav's Cloud Kitchen"}
          </span>
          <span className="text-outline-variant hidden sm:inline">•</span>
          <span className="text-on-surface-variant text-label-sm hidden sm:inline">
            {businessCity}, {businessState}
          </span>
        </div>

        {/* Global Search Bar */}
        <div className="relative flex items-center ml-space-md">
          <Search className="absolute left-3 w-4 h-4 text-outline pointer-events-none" />
          <input
            type="text"
            placeholder="Search licenses, documents, schemes, rules... [⌘K]"
            className="w-72 lg:w-96 pl-9 pr-4 py-1.5 bg-surface-container-low text-on-surface font-body-sm text-body-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container placeholder:text-outline border border-transparent focus:border-primary/20 transition-all"
          />
        </div>
      </div>

      {/* Right: DigiLocker Badge & Profile Controls */}
      <div className="flex items-center gap-space-md">
        {/* Gateway Sync Badge */}
        <div className="flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
          <RefreshCw className="w-3.5 h-3.5 text-secondary animate-[spin_10s_linear_infinite]" />
          <span>DigiLocker Linked</span>
        </div>

        {/* Action Button */}
        <Link
          href="/forms"
          className="flex items-center gap-space-xs bg-primary-container text-white font-label-lg text-label-lg px-space-md py-1.5 rounded-lg hover:opacity-95 transition-opacity shadow-sm active:scale-98 font-semibold"
        >
          <Plus className="w-4 h-4" />
          <span>Form Co-Pilot</span>
        </Link>

        {/* Notifications */}
        <Link
          href="/audit"
          className="relative p-1.5 text-on-surface-variant hover:text-on-surface cursor-pointer rounded-lg hover:bg-surface-container-low transition-colors"
          title="1 Pending Audit Discrepancy"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-tertiary text-white rounded-full flex items-center justify-center font-label-sm text-[10px] font-bold">
            1
          </span>
        </Link>

        {/* Profile Avatar */}
        <Link href="/profile" className="flex items-center gap-space-xs pl-space-xs cursor-pointer">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant bg-surface-container flex items-center justify-center">
            <Image
              src="/avatar.png"
              alt="Founder Avatar"
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
