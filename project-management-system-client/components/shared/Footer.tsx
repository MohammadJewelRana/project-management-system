// components/landing/footer.tsx

import {
  HiOutlineLightningBolt,
} from "react-icons/hi";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#050816]/60 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {/* LOGO */}
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-xl" />

            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500">
              <HiOutlineLightningBolt className="text-lg text-white" />
            </div>
          </div>

          {/* TEXT */}
          <div>
            <h3 className="text-lg font-bold text-white">
              MPMS
            </h3>

            <p className="text-xs text-zinc-500">
              Modern Enterprise SaaS
            </p>
          </div>
        </div>

        {/* CENTER */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500">
          <button className="transition hover:text-white">
            Features
          </button>

          <button className="transition hover:text-white">
            Workspace
          </button>

          <button className="transition hover:text-white">
            Dashboard
          </button>

          <button className="transition hover:text-white">
            Pricing
          </button>
        </div>

        {/* RIGHT */}
        <p className="text-center text-sm text-zinc-500 md:text-right">
          Minimal Project Management System.
          Built with Next.js, TypeScript, and
          Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}