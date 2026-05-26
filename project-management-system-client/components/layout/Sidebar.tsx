// components/layout/Sidebar.tsx

"use client";

import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";

import clsx from "clsx";

import {
  HiOutlineChevronLeft,
  HiOutlineMenuAlt2,
  HiOutlineLogout,
  HiX,
} from "react-icons/hi";

import { RiPulseLine } from "react-icons/ri";

import { sidebarMenus } from "./SidebarMenus";
import { useCurrentUser } from "@/store/hooks/useCurrentUser.hook";
import Swal from "sweetalert2";
import { useLogout } from "@/store/hooks/useAuth";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}

export function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const pathname = usePathname();

  const router = useRouter();

  const user = useCurrentUser();
  

  const { logoutUser } = useLogout();

  // LOGOUT FUNCTION
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout Account?",

      text: "You will need to login again",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Logout",

      confirmButtonColor: "#dc2626",

      cancelButtonColor: "#3f3f46",

      background: "#111113",

      color: "#fff",
    });

    if (result.isConfirmed) {
      logoutUser();

      router.replace("/login");
    }
  };

  // ROLE BASED MENU
  const role = user?.role || "member";
  // const role = user?.role || "member";

  const menuItems = sidebarMenus[role as keyof typeof sidebarMenus] || [];

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
          width: collapsed ? 90 : 270,
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
        }}
        className={clsx(
          "fixed left-0 top-0 z-50 flex h-screen flex-col overflow-hidden border-r border-white/[0.06] bg-[#09090B] shadow-[inset_-1px_0_0_rgba(255,255,255,0.03)] transition-transform duration-300 lg:relative",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* TOP */}
        <div
          className={clsx(
            "shrink-0 border-b border-white/[0.06] px-4 py-4",
            collapsed
              ? "flex flex-col items-center gap-3"
              : "flex h-20 items-center justify-between",
          )}
        >
          {/* LOGO */}
          <div
            className={clsx(
              "flex items-center overflow-hidden",
              collapsed ? "justify-center" : "gap-3",
            )}
          >
            {/* ICON */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 shadow-[0_0_30px_rgba(59,130,246,0.35)]">
              <RiPulseLine className="text-xl text-white" />
            </div>

            {/* TEXT */}
            {!collapsed && (
              <div>
                <h1 className="bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-lg font-black tracking-tight text-transparent">
                  MPMS
                </h1>

                <p className="text-[11px] text-zinc-500">
                  Project Workspace
                </p>
              </div>
            )}
          </div>

          {/* ACTION */}
          <div
            className={clsx(
              "flex items-center gap-2",
              collapsed && "w-full justify-center",
            )}
          >
            {/* DESKTOP COLLAPSE */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] text-zinc-400 transition-all duration-300 hover:bg-white/[0.06] hover:text-white lg:flex"
            >
              <motion.div
                animate={{
                  rotate: collapsed ? 180 : 0,
                }}
              >
                <HiOutlineChevronLeft className="text-lg" />
              </motion.div>
            </button>

            {/* MOBILE CLOSE */}
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] text-zinc-400 transition-all duration-300 hover:bg-white/[0.06] hover:text-white lg:hidden"
            >
              <HiX className="text-lg" />
            </button>
          </div>
        </div>

        {/* MENU */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1.5">
            {menuItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    "group relative flex h-14 items-center overflow-hidden rounded-2xl transition-all duration-300",
                    collapsed ? "justify-center" : "px-4",
                    active
                      ? "bg-gradient-to-r from-blue-500/15 to-violet-500/10 text-white"
                      : "text-zinc-400 hover:bg-white/[0.04] hover:text-white",
                  )}
                >
                  {/* ACTIVE BAR */}
                  {active && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute left-0 top-2 h-10 w-1 rounded-r-full bg-gradient-to-b from-blue-500 to-violet-500"
                    />
                  )}

                  {/* ICON */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                    <item.icon className="text-[22px]" />
                  </div>

                  {/* TEXT */}
                  {!collapsed && (
                    <>
                      <span className="ml-3 flex-1 text-sm font-medium">
                        {item.title}
                      </span>

                      {item.badge && (
                        <div className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-white/[0.06] px-2 text-xs font-semibold text-zinc-300">
                          {item?.badge}
                        </div>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* USER SECTION */}
        <div className="border-t border-white/[0.06] p-3">
          <div className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-3 backdrop-blur-xl">
            {/* USER */}
            <div
              className={clsx(
                "flex items-center",
                collapsed ? "justify-center" : "gap-3",
              )}
            >
              {/* AVATAR */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 text-sm font-bold text-white shadow-[0_0_25px_rgba(59,130,246,0.35)]">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              {/* DETAILS */}
              {!collapsed && (
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-white">
                    {user?.name}
                  </h3>

                  <p className="truncate text-xs capitalize text-zinc-500">
                    {user?.role}
                  </p>
                </div>
              )}
            </div>

            {/* LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              className={clsx(
                "group mt-3 flex h-11 items-center rounded-2xl border border-red-500/10 bg-red-500/5 text-sm font-medium text-red-400 transition-all duration-300 hover:bg-red-500/10 hover:text-red-300",

                collapsed ? "justify-center" : "w-full justify-center gap-2",
              )}
            >
              <HiOutlineLogout className="text-lg transition-transform duration-300 group-hover:-translate-x-0.5" />

              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* MOBILE MENU BUTTON */}
      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed left-4 top-4 z-[70] flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.06] bg-[#09090B]/90 text-white backdrop-blur-xl transition-all duration-300 hover:bg-[#111111] lg:hidden"
        >
          <HiOutlineMenuAlt2 className="text-2xl" />
        </button>
      )}
    </>
  );
}