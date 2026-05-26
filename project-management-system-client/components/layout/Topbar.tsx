"use client";

import { useCurrentUser } from "@/store/hooks/useCurrentUser.hook";

import { HiOutlineBell, HiOutlineMenuAlt2, HiX } from "react-icons/hi";

interface TopbarProps {
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}

export const Topbar = ({ mobileOpen, setMobileOpen }: TopbarProps) => {
  const user = useCurrentUser();

  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-16
        items-center
        justify-between
        border-b
        border-white/[0.06]
        bg-[#0B0B0C]/80
        px-4
        backdrop-blur-xl
        sm:h-[72px]
        sm:px-6
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            border
            border-white/[0.06]
            bg-white/[0.03]
            text-zinc-300
            transition-all
            duration-300
            hover:bg-white/[0.06]
            hover:text-white
            lg:hidden
          "
        >
          {mobileOpen ? (
            <HiX className="text-2xl" />
          ) : (
            <HiOutlineMenuAlt2 className="text-2xl" />
          )}
        </button>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* NOTIFICATION */}
        <button
          className="
            relative
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            border
            border-white/[0.06]
            bg-white/[0.03]
            text-zinc-400
            transition-all
            duration-300
            hover:bg-white/[0.06]
            hover:text-white
          "
        >
          <HiOutlineBell className="text-xl" />

          {/* DOT */}
          <span
            className="
              absolute
              right-3
              top-3
              h-2
              w-2
              rounded-full
              bg-blue-500
            "
          />
        </button>

        {/* USER */}
        {/* USER */}
        <div
          className="
    flex
    items-center
    gap-2
    rounded-2xl
    border
    border-white/[0.06]
    bg-white/[0.03]
    px-2
    py-1.5
    sm:gap-3
    sm:px-3
    sm:py-2
  "
        >
          {/* AVATAR */}
          <div
            className="
              relative
              h-8
              w-8
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.08]
            "
          >
            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
                bg-gradient-to-br
                from-blue-500
                via-indigo-500
                to-violet-500
                text-sm
                font-medium
                uppercase
                text-white
                shadow-[0_0_25px_rgba(59,130,246,0.35)]
              "
            >
              {user?.name
                ?.split(" ")
                ?.map((word: string) => word[0])
                ?.join("")
                ?.slice(0, 2) || "U"}
            </div>
          </div>

          {/* INFO */}
          <div className="hidden sm:block">
            <h4 className="text-sm font-semibold text-white">
              {user?.name || "User"}
            </h4>

            <p className="text-xs capitalize text-zinc-500">
              {user?.role || "Member"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
