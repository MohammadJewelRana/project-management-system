// ======================================================
// UPDATED PROJECT MEMBERS
// ======================================================

"use client";

import { motion } from "framer-motion";

import { HiOutlineMail, HiOutlineUserGroup } from "react-icons/hi";

import { EmptyStateCard } from "./EmptyStateCard";

interface Props {
  members: any[];
}

export const ProjectMembers = ({ members }: Props) => {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h2
          className="
            text-xl
            font-black
            text-white
            sm:text-2xl
          "
        >
          Team Members
        </h2>

        <p className="mt-2 text-sm text-zinc-500">Assigned project members</p>
      </div>

      {/* EMPTY */}
      {members?.length === 0 ? (
        <EmptyStateCard
          icon={<HiOutlineUserGroup />}
          title="No Team Members Yet"
          description="This project does not have any assigned members right now."
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {members?.map((member: any, index: number) => (
            <motion.div
              key={member?._id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
              whileHover={{
                y: -4,
              }}
              className="
                  rounded-[28px]
                  border
                  border-white/[0.06]
                  bg-[#111113]
                  p-5
                "
            >
              {/* AVATAR */}
              <div
                className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-3xl
                    bg-blue-500/10
                  "
              >
                {member?.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="
                        h-full
                        w-full
                        rounded-3xl
                        object-cover
                      "
                  />
                ) : (
                  <HiOutlineUserGroup className="text-4xl text-blue-400" />
                )}
              </div>

              <h3 className="mt-5 text-lg font-bold text-white">
                {member?.name}
              </h3>

              <p className="mt-1 text-sm text-zinc-500 break-all">
                {member?.email}
              </p>

              <div
                className="
                    mt-4
                    inline-flex
                    rounded-full
                    bg-emerald-500/10
                    px-3
                    py-1
                    text-xs
                    font-medium
                    capitalize
                    text-emerald-400
                  "
              >
                {member?.role}
              </div>

              <div className="mt-5 flex items-center gap-3 text-sm text-zinc-400">
                <HiOutlineMail className="shrink-0 text-lg text-blue-400" />

                <span className="truncate">{member?.email}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
