// components/layout/sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

import {
  HiOutlineViewGrid,
  HiOutlineFolder,
  HiOutlineLightningBolt,
  HiOutlineClipboardCheck,
  HiOutlineClock,
  HiOutlineChartBar,
  HiOutlineUsers,
  HiOutlineCog,
  HiOutlineChevronLeft,
  HiOutlineMenuAlt2,
  HiX,
} from "react-icons/hi";

import { RiPulseLine } from "react-icons/ri";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}

const menuItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: HiOutlineViewGrid,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: HiOutlineFolder,
    badge: 8,
  },
  {
    title: "Sprints",
    href: "/sprints",
    icon: HiOutlineLightningBolt,
    badge: 4,
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: HiOutlineClipboardCheck,
    badge: 12,
  },
  {
    title: "Time Logs",
    href: "/time-logs",
    icon: HiOutlineClock,
  },
  {
    title: "Activity",
    href: "/activity",
    icon: RiPulseLine,
  },
  {
    title: "Team",
    href: "/team",
    icon: HiOutlineUsers,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: HiOutlineChartBar,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: HiOutlineCog,
  },
];

export function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            onClick={() => setMobileOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <motion.aside
        animate={{
          width: collapsed ? 78 : 270,
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
        }}
        className={clsx(
          "fixed left-0 top-0 z-50 flex h-screen flex-col overflow-hidden border-r border-white/[0.06] bg-[#09090B] shadow-[inset_-1px_0_0_rgba(255,255,255,0.03)] transition-transform duration-300 lg:relative",
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Right Gradient Border */}
        <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

        {/* TOP HEADER */}
        <div
          className={clsx(
            "relative border-b border-white/[0.06]",
            collapsed ? "px-3 py-5" : "px-5 py-5"
          )}
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.04] via-violet-500/[0.03] to-transparent" />

          {/* EXPANDED */}
          {!collapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative flex items-center justify-between"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                {/* LOGO */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-blue-500/30 blur-xl" />

                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 shadow-[0_0_30px_rgba(59,130,246,0.45)]">
                    <HiOutlineLightningBolt className="text-[22px] text-white" />
                  </div>
                </div>

                {/* TEXT */}
                <div className="overflow-hidden">
                  <h1 className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-[20px] font-bold tracking-tight text-transparent">
                    ProjectHub
                  </h1>

                  <p className="mt-0.5 text-xs font-medium tracking-wide text-zinc-500">
                    Enterprise SaaS
                  </p>
                </div>
              </div>

              {/* COLLAPSE BUTTON */}
              <button
                onClick={() => setCollapsed(true)}
                className="group flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] text-zinc-500 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-white"
              >
                <HiOutlineChevronLeft className="text-[20px] transition-transform duration-300 group-hover:-translate-x-0.5" />
              </button>
            </motion.div>
          ) : (
            /* COLLAPSED */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative flex flex-col items-center gap-5"
            >
              {/* MINI LOGO */}
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-blue-500/30 blur-xl" />

                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 shadow-[0_0_25px_rgba(59,130,246,0.45)]">
                  <HiOutlineLightningBolt className="text-[22px] text-white" />
                </div>
              </div>

              {/* EXPAND BUTTON */}
              <button
                onClick={() => setCollapsed(false)}
                className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] text-zinc-500 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-white"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-violet-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <HiOutlineMenuAlt2 className="relative text-[20px] transition-transform duration-300 group-hover:scale-110" />
              </button>
            </motion.div>
          )}

          {/* MOBILE CLOSE */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute right-4 top-5 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] text-zinc-400 lg:hidden"
          >
            <HiX className="text-xl" />
          </button>
        </div>

        {/* MENU */}
        <div className="flex-1 overflow-y-auto px-3 py-5">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={clsx(
                    "group relative flex items-center overflow-hidden rounded-2xl transition-all duration-300",
                    collapsed
                      ? "justify-center py-4"
                      : "px-4 py-3.5",
                    active
                      ? "bg-gradient-to-r from-blue-500/15 to-violet-500/10 text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                      : "text-zinc-400 hover:bg-white/[0.03] hover:text-white"
                  )}
                >
                  {/* Active Border */}
                  {active && (
                    <div className="absolute left-0 top-3 h-8 w-[3px] rounded-r-full bg-blue-500" />
                  )}

                  {/* Icon */}
                  <item.icon className="text-[22px]" />

                  {/* TEXT */}
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        className="ml-4 flex flex-1 items-center justify-between"
                      >
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>

                        {item.badge && (
                          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-xs text-zinc-300">
                            {item.badge}
                          </span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* USER CARD */}
        <div className="border-t border-white/[0.06] p-3">
          <div
            className={clsx(
              "group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.1]",
              collapsed ? "justify-center" : ""
            )}
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-violet-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div
              className={clsx(
                "relative flex items-center",
                collapsed ? "justify-center" : "gap-3"
              )}
            >
              {/* Avatar */}
              <div className="relative">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 shadow-[0_0_20px_rgba(59,130,246,0.35)]" />

                <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#09090B] bg-emerald-500" />
              </div>

              {/* User Info */}
              {!collapsed && (
                <div className="overflow-hidden">
                  <p className="truncate text-sm font-semibold text-white">
                    John Smith
                  </p>

                  <p className="truncate text-xs text-zinc-500">
                    Product Manager
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}