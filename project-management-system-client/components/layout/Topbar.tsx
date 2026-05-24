"use client";

import { useCurrentUser } from "@/store/hooks/useCurrentUser.hook";
import Image from "next/image";

import { HiOutlineBell, HiOutlineSearch } from "react-icons/hi";

export const Topbar = () => {
  const user = useCurrentUser();

  return (
    <header
      className="
        sticky
        top-0
        z-40
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
        {/* SEARCH */}
        <div
          className="
            hidden
            h-11
            items-center
            gap-3
            rounded-2xl
            border
            border-white/[0.06]
            bg-white/[0.03]
            px-4
            md:flex
            md:w-[320px]
          "
        >
          <HiOutlineSearch className="text-lg text-zinc-500" />

          <input
            type="text"
            placeholder="Search projects, tasks..."
            className="
              w-full
              bg-transparent
              text-sm
              text-white
              outline-none
              placeholder:text-zinc-500
            "
          />
        </div>
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
        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-white/[0.06]
            bg-white/[0.03]
            px-3
            py-2
          "
        >
          {/* AVATAR */}
          <div
            className="
              relative
              h-10
              w-10
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
    font-bold
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
