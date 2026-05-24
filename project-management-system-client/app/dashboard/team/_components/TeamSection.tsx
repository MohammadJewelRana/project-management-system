// app/dashboard/team/_components/team-section.tsx

"use client";

import { useState } from "react";

import clsx from "clsx";

import {
  HiOutlineMail,
  HiOutlineOfficeBuilding,
  HiOutlineBadgeCheck,
} from "react-icons/hi";
import { TeamActionDropdown } from "./TeamActionDropDown";
import { TeamDetailsModal } from "./TeamDetailsModal";

interface Props {
  title: string;

  users: any[];

  badgeColor: string;
}

export const TeamSection = ({ title, users, badgeColor }: Props) => {
  // MODAL
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [isOpen, setIsOpen] = useState(false);

  // DYNAMIC GRID
  const gridClass =
    users?.length === 1
      ? "grid-cols-1"
      : users?.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-2 xl:grid-cols-3";

  return (
    <section className="space-y-6">
      {/* PREMIUM HEADER */}
      <div className="flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* ICON */}
          <div
            className={clsx(
              `
                relative
                flex
                h-14
                w-14
                items-center
                justify-center
                overflow-hidden
                rounded-3xl
                border
                border-white/[0.06]
                text-xl
                shadow-lg
              `,
              badgeColor,
            )}
          >
            <div className="absolute inset-0 bg-white/[0.03]" />

            <HiOutlineBadgeCheck className="relative z-10" />
          </div>

          {/* TEXT */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {title}
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              {users?.length} {users?.length > 1 ? "members" : "member"}
            </p>
          </div>
        </div>

        {/* COUNT */}
        <div
          className="
            hidden
            rounded-2xl
            border
            border-white/[0.06]
            bg-white/[0.03]
            px-4
            py-2
            sm:flex
          "
        >
          <span className="text-sm font-medium text-white">Total:</span>

          <span className="ml-2 text-sm font-bold text-zinc-300">
            {users?.length}
          </span>
        </div>
      </div>

      {/* GRID */}
      <div className={clsx("grid gap-5", gridClass)}>
        {users?.map((user: any) => (
          <div
            key={user?._id}
            className="
                group
                relative
                overflow-hidden
                rounded-[34px]
                border
                border-white/[0.06]
                bg-[#111113]
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-white/[0.1]
                hover:shadow-[0_15px_50px_rgba(0,0,0,0.45)]
              "
          >
            {/* TOP GLOW */}
            <div
              className="
                  absolute
                  inset-x-0
                  top-0
                  h-24
                  bg-gradient-to-b
                  from-blue-500/[0.05]
                  to-transparent
                "
            />

            {/* TOP */}
            <div className="relative flex items-start justify-between gap-3">
              {/* USER INFO */}
              <div className="flex min-w-0 items-center gap-4">
                {/* AVATAR */}
                <div
                  className="
                      relative
                      flex
                      h-16
                      w-16
                      shrink-0
                      items-center
                      justify-center
                      rounded-3xl
                      bg-gradient-to-br
                      from-blue-500
                      via-indigo-500
                      to-violet-500
                      text-lg
                      font-bold
                      text-white
                      shadow-[0_0_35px_rgba(59,130,246,0.35)]
                    "
                >
                  {/* STATUS */}
                  <span
                    className="
                        absolute
                        bottom-1
                        right-1
                        h-3
                        w-3
                        rounded-full
                        border-2
                        border-[#111113]
                        bg-emerald-400
                      "
                  />

                  {user?.name
                    ?.split(" ")
                    ?.map((word: string) => word[0])
                    ?.join("")
                    ?.slice(0, 2)}
                </div>

                {/* DETAILS */}
                <div className="min-w-0">
                  <h3
                    className="
                        truncate
                        text-lg
                        font-semibold
                        text-white
                      "
                  >
                    {user?.name}
                  </h3>

                  <p
                    className="
                        mt-1
                        truncate
                        text-sm
                        text-zinc-500
                      "
                  >
                    {user?.designation}
                  </p>

                  {/* ROLE */}
                  <div
                    className={clsx(
                      `
                          mt-3
                          inline-flex
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-medium
                          capitalize
                          backdrop-blur-md
                        `,
                      badgeColor,
                    )}
                  >
                    {user?.role}
                  </div>
                </div>
              </div>

              {/* ACTION */}
              <div
                className="
                    opacity-100
                    transition-all
                    duration-300
                    sm:opacity-0
                    sm:group-hover:opacity-100
                  "
              >
                <TeamActionDropdown
                  user={user}
                  onView={() => {
                    setSelectedUser(user);

                    setIsOpen(true);
                  }}
                />
              </div>
            </div>

            {/* DIVIDER */}
            <div className="my-5 border-t border-white/[0.06]" />

            {/* DETAILS */}
            <div className="space-y-3">
              {/* EMAIL */}
              <div
                className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-white/[0.04]
                    bg-[#18181B]
                    px-4
                    py-3
                  "
              >
                <div
                  className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-blue-500/10
                      text-blue-400
                    "
                >
                  <HiOutlineMail className="text-lg" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-zinc-500">Email</p>

                  <p className="truncate text-sm text-white">{user?.email}</p>
                </div>
              </div>

              {/* DEPARTMENT */}
              <div
                className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-white/[0.04]
                    bg-[#18181B]
                    px-4
                    py-3
                  "
              >
                <div
                  className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-violet-500/10
                      text-violet-400
                    "
                >
                  <HiOutlineOfficeBuilding className="text-lg" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-zinc-500">Department</p>

                  <p className="truncate text-sm text-white">
                    {user?.department}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DETAILS MODAL */}
      <TeamDetailsModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        user={selectedUser}
      />
    </section>
  );
};
