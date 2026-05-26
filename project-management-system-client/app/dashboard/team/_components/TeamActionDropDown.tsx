// app/dashboard/team/_components/team-action-dropdown.tsx

"use client";

import { useState } from "react";

import Link from "next/link";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

import {
  HiOutlineDotsVertical,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import { TeamDeleteModal } from "./TeamDeleteModal";

interface Props {
  user: any;

  onView: () => void;
}

export const TeamActionDropdown = ({ user, onView }: Props) => {
  // DELETE MODAL
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <Dropdown placement="bottom-end" backdrop="blur">
        <DropdownTrigger>
          <button
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-2xl
              border
              border-white/[0.06]
              bg-white/[0.03]
              text-zinc-500
              transition-all
              duration-300
              hover:bg-white/[0.06]
              hover:text-white
            "
          >
            <HiOutlineDotsVertical className="text-lg" />
          </button>
        </DropdownTrigger>

        <DropdownMenu
          aria-label="User Actions"
          className="
            min-w-[220px]
            border
            border-white/[0.06]
            bg-[#111113]
            p-2
          "
        >
          {/* VIEW */}
          <DropdownItem
            key="view"
            startContent={<HiOutlineEye className="text-lg" />}
            onPress={onView}
            className="
              rounded-xl
              py-3
              text-white
              data-[hover=true]:bg-white/[0.06]
            "
          >
            View Details
          </DropdownItem>

          {/* EDIT */}
          <DropdownItem
            key="edit"
            startContent={<HiOutlinePencil className="text-lg" />}
            className="
              rounded-xl
              py-3
              text-white
              data-[hover=true]:bg-white/[0.06]
            "
          >
            <Link
              href={`/dashboard/team/edit?id=${user?._id}`}
              className="flex w-full"
            >
              Edit User
            </Link>
          </DropdownItem>

          {/* DELETE */}
          <DropdownItem
            key="delete"
            color="danger"
            startContent={<HiOutlineTrash className="text-lg" />}
            onPress={() => setIsDeleteOpen(true)}
            className="
              rounded-xl
              py-3
            "
          >
            Delete User
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* DELETE MODAL */}
      <TeamDeleteModal
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        user={user}
      />
    </>
  );
};
