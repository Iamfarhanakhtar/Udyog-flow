"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBusiness } from "@/context/BusinessContext";

export default function HomePage() {
  const router = useRouter();
  const { hasCompletedOnboarding, isLoaded } = useBusiness();

  useEffect(() => {
    if (!isLoaded) return;
    if (hasCompletedOnboarding) {
      router.replace("/blueprint");
    } else {
      router.replace("/onboarding");
    }
  }, [hasCompletedOnboarding, isLoaded, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-surface">
      <div className="flex flex-col items-center gap-space-md">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-surface-container-high border-t-primary"></div>
        <span className="font-label-md text-label-md text-on-surface-variant">
          Initializing UdyogFlow...
        </span>
      </div>
    </div>
  );
}
