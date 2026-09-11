"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Layers,
  GitBranch,
  FolderOpen,
  FileEdit,
  Sparkles,
  FileCheck2,
  CalendarClock,
  Landmark,
  ChevronsUpDown,
  Compass,
} from "lucide-react";
import { useBusiness } from "@/context/BusinessContext";

export function AppSidebar() {
  const pathname = usePathname();
  const { profile } = useBusiness();

  const navItems = [
    {
      label: "Business Blueprint",
      href: "/blueprint",
      icon: GitBranch,
      badge: "Core",
    },
    {
      label: "Document Vault",
      href: "/vault",
      icon: FolderOpen,
    },
    {
      label: "Smart Forms",
      href: "/forms",
      icon: FileEdit,
      highlight: true,
    },
    {
      label: "AI Audit",
      href: "/audit",
      icon: Sparkles,
      tag: "Audit",
    },
    {
      label: "Applications",
      href: "/applications",
      icon: FileCheck2,
    },
    {
      label: "Renewals",
      href: "/renewals",
      icon: CalendarClock,
    },
    {
      label: "Government Schemes",
      href: "/schemes",
      icon: Landmark,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-surface-container-high/60">
      <div className="flex flex-col h-full">
        {/* Brand Logo & Tagline */}
        <div className="p-space-lg pb-space-md">
          <Link href="/blueprint" className="flex items-center gap-space-sm group">
            <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary shadow-sm group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight leading-none font-bold">
                UDYOG<span className="text-primary-container">FLOW</span>
              </span>
              <span className="font-label-sm text-[10px] text-on-surface-variant tracking-wider uppercase font-semibold mt-1">
                Compliance OS
              </span>
            </div>
          </Link>

          {/* Business Entity Switcher Card */}
          <div className="mt-space-md p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between border border-surface-container-high/50">
            <div className="flex flex-col min-w-0 pr-2">
              <span className="font-label-md text-label-md text-on-surface truncate font-semibold">
                {profile?.businessName || "Rohan's Cloud Kitchen"}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span>
                <span className="font-label-sm text-[11px] text-secondary font-medium">
                  Operational Setup
                </span>
              </div>
            </div>
            <ChevronsUpDown className="w-4 h-4 text-outline shrink-0" />
          </div>
        </div>

        {/* Primary Navigation Rail */}
        <nav className="flex-1 px-space-md py-space-xs space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-space-md py-2.5 rounded-lg transition-all text-label-md font-label-md ${
                  isActive
                    ? "bg-primary-container text-white font-semibold shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`}
              >
                <div className="flex items-center gap-space-md">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-outline"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && !isActive && (
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-surface-container-high text-on-surface-variant">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Setup Reset / Setup Mode */}
        <div className="p-space-md border-t border-surface-container-high/60 bg-surface-container-low/40">
          <Link
            href="/onboarding"
            className="flex items-center gap-2 px-space-md py-2 rounded-lg text-on-surface-variant hover:bg-surface-container text-label-sm font-label-sm transition-colors"
          >
            <Compass className="w-4 h-4 text-primary" />
            <span>Reconfigure Setup</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
