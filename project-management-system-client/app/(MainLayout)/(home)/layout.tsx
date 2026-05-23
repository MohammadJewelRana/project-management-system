// app/(mainLayout)/layout.tsx

import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#09090B] text-white">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Section */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        {/* <Topbar /> */}

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-[#09090B] p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
