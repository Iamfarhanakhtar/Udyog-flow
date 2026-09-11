"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Layers,
  Compass,
  GitBranch,
  FolderOpen,
  FileEdit,
  Sparkles,
  UserCheck,
  ChevronsUpDown,
} from "lucide-react";
import { useTrack1Store } from "@/state/track1Store";

export function AppSidebar() {
  const pathname = usePathname();
  const { businessName, selectedMicroNiche, auditResult } = useTrack1Store();

  const navItems = [
    {
      label: "Discovery",
      href: "/discovery",
      icon: Compass,
      tag: "Step 1",
    },
    {
      label: "Business Blueprint",
      href: "/blueprint",
      icon: GitBranch,
      tag: "Core",
    },
    {
      label: "Document Vault",
      href: "/vault",
      icon: FolderOpen,
    },
    {
      label: "Form Co-Pilot",
      href: "/forms",
      icon: FileEdit,
      badge: "FSSAI",
    },
    {
      label: "AI Audit",
      href: "/audit",
      icon: Sparkles,
      highlight: auditResult.status === "issues_detected",
    },
    {
      label: "Business Context",
      href: "/profile",
      icon: UserCheck,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-surface-container-high/60">
      <div className="flex flex-col h-full">
        {/* Brand Logo & Tagline */}
        <div className="p-space-lg pb-space-md">
          <Link href="/blueprint" className="flex items-center gap-space-sm group">
            <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight leading-none font-bold">
                UDYOG<span className="text-primary-container">FLOW</span>
              </span>
              <span className="font-label-sm text-[10px] text-on-surface-variant tracking-wider uppercase font-semibold mt-1">
                Compliance Control Layer
              </span>
            </div>
          </Link>

          {/* Active Business Switcher Card */}
          <Link
            href="/profile"
            className="mt-space-md p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between border border-surface-container-high/50 hover:bg-surface-container transition-colors"
          >
            <div className="flex flex-col min-w-0 pr-2">
              <span className="font-label-md text-label-md text-on-surface truncate font-semibold">
                {businessName || "Aarav's Cloud Kitchen"}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span>
                <span className="font-label-sm text-[11px] text-secondary font-medium">
                  {selectedMicroNiche?.title || "Cloud Kitchen"}
                </span>
              </div>
            </div>
            <ChevronsUpDown className="w-4 h-4 text-outline shrink-0" />
          </Link>
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
                {item.highlight && !isActive && (
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                )}
                {item.badge && !isActive && (
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-surface-container-high text-on-surface-variant">
                    {item.badge}
                  </span>
                )}
                {item.tag && !isActive && (
                  <span className="text-[10px] font-medium text-outline">
                    {item.tag}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Status & Demo Helper */}
        <div className="p-space-md border-t border-surface-container-high/60 bg-surface-container-low/40">
          <div className="flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant">
            <span className="font-medium">Demo Profile</span>
            <span className="font-semibold text-primary">Aarav Sharma</span>
          </div>
          <span className="text-[11px] text-outline block mt-0.5">
            Ghaziabad, Uttar Pradesh
          </span>
        </div>
      </div>
    </aside>
  );
}
