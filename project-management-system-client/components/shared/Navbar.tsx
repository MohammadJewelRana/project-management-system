// components/landing/navbar.tsx

"use client";

import Link from "next/link";
import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineMenuAlt3,
  HiX,
} from "react-icons/hi";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#050816]/70 backdrop-blur-2xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* LEFT */}
          <Link href="/" className="flex items-center gap-3">
            {/* LOGO */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-blue-500/30 blur-xl" />

              <motion.div
                whileHover={{
                  rotate: 8,
                  scale: 1.05,
                }}
                className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 shadow-[0_0_40px_rgba(59,130,246,0.45)]"
              >
                <HiOutlineLightningBolt className="text-[22px] text-white" />
              </motion.div>
            </div>

            {/* TEXT */}
            <div>
              <h1 className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-xl font-bold tracking-tight text-transparent sm:text-2xl">
                MPMS
              </h1>

              <p className="hidden text-xs tracking-wide text-zinc-500 sm:block">
                Enterprise Workflow Platform
              </p>
            </div>
          </Link>

          {/* DESKTOP BUTTONS */}
          <div className="hidden items-center gap-4 md:flex">
            {/* ADMIN */}
            <motion.div
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              <Link
                href="/login"
                className="flex h-11 items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05]"
              >
                <HiOutlineShieldCheck className="text-lg" />
                Admin Login
              </Link>
            </motion.div>

            {/* MEMBER */}
            <motion.div
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              <Link
                href="/login"
                className="flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 px-5 text-sm font-semibold text-white shadow-[0_0_35px_rgba(59,130,246,0.35)]"
              >
                <HiOutlineUserGroup className="text-lg" />
                Member Login
              </Link>
            </motion.div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-white transition-all duration-300 hover:bg-white/[0.05] md:hidden"
          >
            {mobileOpen ? (
              <HiX className="text-2xl" />
            ) : (
              <HiOutlineMenuAlt3 className="text-2xl" />
            )}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* MENU */}
            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              className="fixed left-4 right-4 top-[88px] z-50 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0B1120]/95 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:hidden"
            >
              {/* TOP */}
              <div className="mb-5 border-b border-white/[0.06] pb-4">
                <h3 className="text-lg font-bold text-white">
                  Workspace Access
                </h3>

                <p className="mt-1 text-sm text-zinc-500">
                  Choose your workspace panel
                </p>
              </div>

              {/* BUTTONS */}
              <div className="space-y-3">
                {/* ADMIN */}
                <Link
                  href="/auth/login"
                  className="flex h-14 items-center justify-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] text-sm font-semibold text-white transition-all duration-300 hover:bg-white/[0.05]"
                >
                  <HiOutlineShieldCheck className="text-xl" />
                  Admin Login
                </Link>

                {/* MEMBER */}
                <Link
                  href="/member/login"
                  className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 text-sm font-semibold text-white shadow-[0_0_35px_rgba(59,130,246,0.35)]"
                >
                  <HiOutlineUserGroup className="text-xl" />
                  Member Login
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
