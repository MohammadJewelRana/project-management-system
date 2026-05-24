// app/(auth)/layout.tsx

import {
  HiOutlineLightningBolt,
} from "react-icons/hi";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816]">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        {/* GRID */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* GLOW */}
        <div className="absolute left-[-10%] top-[-10%] h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="absolute bottom-[-20%] right-[-10%] h-[450px] w-[450px] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      {/* CONTAINER */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        {/* LEFT */}
        <div className="flex w-full flex-col justify-center px-5 py-12 sm:px-8 lg:w-[52%] lg:px-12">
          {/* LOGO */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-blue-500/30 blur-xl" />

              <div className="relative flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 shadow-[0_0_40px_rgba(59,130,246,0.45)]">
                <HiOutlineLightningBolt className="text-3xl text-white" />
              </div>
            </div>

            <div>
              <h1 className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-3xl font-black tracking-tight text-transparent">
                MPMS
              </h1>

              <p className="text-sm text-zinc-500">
                Enterprise Workflow Platform
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="mt-14 max-w-2xl">
            <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Manage Projects
              <br />

              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Smarter & Faster
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-8 text-zinc-400 sm:text-base lg:text-lg">
              Organize projects, manage tasks,
              track sprint progress, and
              collaborate efficiently through
              powerful role-based workspaces.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex w-full items-center justify-center px-4 py-10 sm:px-6 lg:w-[48%] lg:px-10">
          {/* WIDER CARD */}
          <div className="w-full max-w-[520px]">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}