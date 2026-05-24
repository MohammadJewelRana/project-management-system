// components/layout/topbar.tsx

"use client";

import {
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineMenuAlt2,
} from "react-icons/hi";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Avatar,
  Button,
  Badge,
} from "@heroui/react";

import { motion } from "framer-motion";

interface TopbarProps {
  setMobileOpen: (value: boolean) => void;
}

export function Topbar({ setMobileOpen }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-white/[0.06] bg-[#09090B]/70 px-4 backdrop-blur-2xl lg:px-8">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] text-zinc-400 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.05] hover:text-white lg:hidden"
        >
          <HiOutlineMenuAlt2 className="text-[22px]" />
        </button>

        {/* Search */}
        <motion.div
          whileFocus={{ scale: 1.01 }}
          className="hidden md:flex"
        >
          <div className="group flex h-12 w-[320px] items-center rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 transition-all duration-300 hover:border-white/[0.1] focus-within:border-blue-500/30 lg:w-[420px]">
            <HiOutlineSearch className="text-lg text-zinc-500" />

            <input
              type="text"
              placeholder="Search tasks, projects, teams..."
              className="h-full flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-zinc-500"
            />

            <kbd className="hidden rounded-lg border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[11px] text-zinc-500 lg:flex">
              ⌘ K
            </kbd>
          </div>
        </motion.div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* Theme */}
        <button className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] text-zinc-400 transition-all duration-300 hover:border-white/[0.1] hover:text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-violet-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <HiOutlineMoon className="relative text-[20px]" />
        </button>

        {/* Notifications */}
        <button className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] text-zinc-400 transition-all duration-300 hover:border-white/[0.1] hover:text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <HiOutlineBell className="relative text-[20px]" />

          <Badge
            content={2}
            color="danger"
            className="absolute right-1 top-1 border-none"
          />
        </button>

        {/* User */}
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              variant="light"
              className="h-auto min-w-fit rounded-2xl border border-white/[0.06] bg-white/[0.03] px-2 py-2 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.05]"
            >
              <div className="flex items-center gap-3">
                <Avatar
                  src="https://i.pravatar.cc/150?u=john"
                  className="h-10 w-10 border border-white/[0.06]"
                />

                <div className="hidden text-left lg:block">
                  <p className="text-sm font-semibold text-white">
                    John Smith
                  </p>

                  <p className="text-xs text-zinc-500">
                    Product Manager
                  </p>
                </div>
              </div>
            </Button>
          </DropdownTrigger>

          <DropdownMenu
            aria-label="Profile Actions"
            className="min-w-[240px] border border-white/[0.06] bg-[#111113] p-2"
            itemClasses={{
              base: "rounded-xl px-3 py-3 text-zinc-300 data-[hover=true]:bg-white/[0.04] data-[hover=true]:text-white",
            }}
          >
            <DropdownItem key="profile">
              My Profile
            </DropdownItem>

            <DropdownItem key="workspace">
              Workspace
            </DropdownItem>

            <DropdownItem key="settings">
              Settings
            </DropdownItem>

            <DropdownItem
              key="logout"
              className="text-danger"
              color="danger"
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
}