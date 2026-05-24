// app/dashboard/team/_components/team-details-modal.tsx

"use client";

import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";

import {
  HiOutlineMail,
  HiOutlineOfficeBuilding,
  HiOutlineBriefcase,
  HiOutlinePhone,
  HiOutlineGlobeAlt,
} from "react-icons/hi";

interface Props {
  isOpen: boolean;

  onOpenChange: (open: boolean) => void;

  user: any;
}

export const TeamDetailsModal = ({ isOpen, onOpenChange, user }: Props) => {
  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      size="3xl"
      backdrop="blur"
      scrollBehavior="inside"
      classNames={{
        base: `
            bg-[#111113]
            border
            border-white/[0.06]
            rounded-[32px]
          `,

        body: "py-6",

        backdrop: "bg-black/70 backdrop-blur-md",
      }}
    >
      <ModalContent>
        {() => (
          <>
            {/* HEADER */}
            <ModalHeader>
              <div className="flex items-center gap-4">
                {/* AVATAR */}
                <div
                  className="
                      flex
                      h-16
                      w-16
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
                    "
                >
                  {user?.name
                    ?.split(" ")
                    ?.map((word: string) => word[0])
                    ?.join("")
                    ?.slice(0, 2)}
                </div>

                {/* INFO */}
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    {user?.name}
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    {user?.designation}
                  </p>
                </div>
              </div>
            </ModalHeader>

            {/* BODY */}
            <ModalBody>
              <div className="grid gap-4 md:grid-cols-2">
                {/* EMAIL */}
                <div className="rounded-2xl bg-[#18181B] p-4">
                  <div className="flex items-center gap-3">
                    <HiOutlineMail className="text-xl text-blue-400" />

                    <div>
                      <p className="text-xs text-zinc-500">Email</p>

                      <p className="text-sm text-white">{user?.email}</p>
                    </div>
                  </div>
                </div>

                {/* PHONE */}
                <div className="rounded-2xl bg-[#18181B] p-4">
                  <div className="flex items-center gap-3">
                    <HiOutlinePhone className="text-xl text-emerald-400" />

                    <div>
                      <p className="text-xs text-zinc-500">Phone</p>

                      <p className="text-sm text-white">
                        {user?.phone || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* DEPARTMENT */}
                <div className="rounded-2xl bg-[#18181B] p-4">
                  <div className="flex items-center gap-3">
                    <HiOutlineOfficeBuilding className="text-xl text-violet-400" />

                    <div>
                      <p className="text-xs text-zinc-500">Department</p>

                      <p className="text-sm text-white">{user?.department}</p>
                    </div>
                  </div>
                </div>

                {/* ROLE */}
                <div className="rounded-2xl bg-[#18181B] p-4">
                  <div className="flex items-center gap-3">
                    <HiOutlineBriefcase className="text-xl text-orange-400" />

                    <div>
                      <p className="text-xs text-zinc-500">Role</p>

                      <p className="text-sm capitalize text-white">
                        {user?.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* TIMEZONE */}
                <div className="rounded-2xl bg-[#18181B] p-4 md:col-span-2">
                  <div className="flex items-center gap-3">
                    <HiOutlineGlobeAlt className="text-xl text-cyan-400" />

                    <div>
                      <p className="text-xs text-zinc-500">Timezone</p>

                      <p className="text-sm text-white">
                        {user?.timezone || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* BIO */}
              <div className="mt-5 rounded-2xl bg-[#18181B] p-5">
                <h3 className="text-sm font-medium text-white">Bio</h3>

                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {user?.bio || "No bio added yet."}
                </p>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
