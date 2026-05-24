// app/(mainLayout)/layout.tsx

"use client";

import { useState } from "react";

import { Sidebar } from "@/components/layout/Sidebar";

import { Topbar } from "@/components/layout/Topbar";

import { useCurrentUser } from "@/store/hooks/useCurrentUser.hook";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useCurrentUser();

  const [collapsed, setCollapsed] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  console.log("Current User in MainLayout:", user);

  // LOADING WHILE USER RESTORE
  // if (!user) {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center bg-[#09090B] text-white">
  //       <div className="flex flex-col items-center gap-4">
  //         <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-500" />

  //         <p className="text-sm text-zinc-400">Loading workspace...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex h-screen overflow-hidden bg-[#09090B] text-white">
      {/* SIDEBAR */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* MAIN */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* TOPBAR */}
        <Topbar setMobileOpen={setMobileOpen} />

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto bg-[#09090B] p-4 sm:p-5 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
