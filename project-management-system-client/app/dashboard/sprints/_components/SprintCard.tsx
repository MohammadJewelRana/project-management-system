"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";

import Swal from "sweetalert2";

import toast from "react-hot-toast";

import { motion, AnimatePresence } from "framer-motion";

import {
  HiOutlineCalendar,
  HiOutlineClipboardList,
  HiOutlineUser,
  HiOutlineDotsVertical,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";

import { SprintDetailsModal } from "./SprintDetailsModal";

import { useDeleteSprint } from "@/store/hooks/sprint.hook";

interface Props {
  sprint: any;
}

export const SprintCard = ({ sprint }: Props) => {
  const [showActions, setShowActions] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const { remove } = useDeleteSprint();

  /* ======================================================
     CLOSE MENU ON OUTSIDE CLICK
  ====================================================== */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowActions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ======================================================
     STATUS COLORS
  ====================================================== */

  const statusColors: any = {
    planned: "bg-zinc-500/10 text-zinc-300",

    active: "bg-blue-500/10 text-blue-400",

    completed: "bg-emerald-500/10 text-emerald-400",

    cancelled: "bg-red-500/10 text-red-400",
  };

  /* ======================================================
     DELETE
  ====================================================== */

  const handleDelete = async () => {
    setShowActions(false);

    const result = await Swal.fire({
      title: "Delete Sprint?",

      text: "This action cannot be undone.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#ef4444",

      background: "#18181B",

      color: "#fff",

      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {
      try {
        await remove(sprint?._id);
      } catch (error) {
        toast.error("Failed to delete sprint");

        console.log(error);
      }
    }
  };

  return (
    <>
      {/* ======================================================
          CARD
      ====================================================== */}

      <motion.div
        whileHover={{
          y: -4,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-white/[0.06]
          bg-[#111113]
          p-5
          transition-all
          duration-300
          hover:border-white/[0.1]
        "
      >
        {/* ======================================================
            TOP
        ====================================================== */}

        <div className="flex items-start justify-between gap-3">
          {/* LEFT */}
          <div className="min-w-0 flex-1">
            <h3
              className="
                truncate
                text-lg
                font-semibold
                text-white
              "
            >
              {sprint?.name}
            </h3>

            <p
              className="
                mt-2
                line-clamp-2
                text-sm
                leading-6
                text-zinc-500
              "
            >
              {sprint?.goal || "No sprint goal added."}
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            {/* STATUS */}
            <div
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusColors[sprint?.status]}`}
            >
              {sprint?.status}
            </div>

            {/* ACTION MENU */}
            <div ref={menuRef} className="relative">
              {/* BUTTON */}
              <button
                onClick={() => setShowActions(!showActions)}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-2xl
                  text-zinc-500
                  transition-all
                  duration-300
                  hover:bg-white/[0.05]
                  hover:text-white
                "
              >
                <HiOutlineDotsVertical className="text-lg" />
              </button>

              {/* DROPDOWN */}
              <AnimatePresence>
                {showActions && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      scale: 0.96,
                    }}
                    transition={{
                      duration: 0.15,
                    }}
                    className="
                      absolute
                      right-0
                      top-12
                      z-50
                      w-52
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/[0.06]
                      bg-[#18181B]
                      shadow-2xl
                    "
                  >
                    {/* DETAILS */}
                    <button
                      onClick={() => {
                        setOpenDetails(true);

                        setShowActions(false);
                      }}
                      className="
                        flex
                        w-full
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-sm
                        text-white
                        transition-all
                        hover:bg-white/[0.05]
                      "
                    >
                      <HiOutlineEye className="text-lg" />
                      View Details
                    </button>

                    {/* EDIT */}
                    <Link
                      href={`/dashboard/sprints/edit?id=${sprint?._id}`}
                      onClick={() => setShowActions(false)}
                      className="
    flex
    w-full
    items-center
    gap-3
    px-4
    py-3
    text-sm
    text-white
    transition-all
    hover:bg-white/[0.05]
  "
                    >
                      <HiOutlinePencil className="text-lg" />
                      Edit Sprint
                    </Link>

                    {/* DELETE */}
                    <button
                      onClick={handleDelete}
                      className="
                        flex
                        w-full
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-sm
                        text-red-400
                        transition-all
                        hover:bg-red-500/10
                      "
                    >
                      <HiOutlineTrash className="text-lg" />
                      Delete Sprint
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-5 border-t border-white/[0.06]" />

        {/* ======================================================
            INFO
        ====================================================== */}

        <div className="space-y-4">
          {/* PROJECT */}
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-2xl
                bg-blue-500/10
              "
            >
              <HiOutlineClipboardList className="text-lg text-blue-400" />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-zinc-500">Project</p>

              <h4 className="truncate text-sm font-medium text-zinc-200">
                {sprint?.project?.title || "No Project"}
              </h4>
            </div>
          </div>

          {/* MANAGER */}
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-2xl
                bg-emerald-500/10
              "
            >
              <HiOutlineUser className="text-lg text-emerald-400" />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-zinc-500">Sprint Manager</p>

              <h4 className="truncate text-sm font-medium text-zinc-200">
                {sprint?.sprintManager?.name || "No Manager"}
              </h4>
            </div>
          </div>

          {/* TIMELINE */}
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-2xl
                bg-orange-500/10
              "
            >
              <HiOutlineCalendar className="text-lg text-orange-400" />
            </div>

            <div>
              <p className="text-xs text-zinc-500">Timeline</p>

              <h4 className="text-sm font-medium text-zinc-200">
                {new Date(sprint?.startDate).toLocaleDateString("en-GB")}
                {" - "}
                {new Date(sprint?.endDate).toLocaleDateString("en-GB")}
              </h4>
            </div>
          </div>
        </div>

        {/* ======================================================
            PROGRESS
        ====================================================== */}

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-zinc-400">Progress</p>

            <p className="text-sm font-medium text-white">
              {sprint?.progress || 0}%
            </p>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${sprint?.progress || 0}%`,
              }}
              transition={{
                duration: 0.6,
              }}
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-blue-500
                to-indigo-500
              "
            />
          </div>
        </div>

        {/* ======================================================
            FOOTER
        ====================================================== */}

        <div
          className="
            mt-6
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-white/[0.06]
            bg-[#18181B]
            px-4
            py-3
          "
        >
          <div>
            <p className="text-xs text-zinc-500">Tasks</p>

            <h4 className="mt-1 text-sm font-semibold text-white">
              {sprint?.completedTasks}/{sprint?.totalTasks}
            </h4>
          </div>

          <div
            className="
              rounded-full
              bg-blue-500/10
              px-3
              py-1
              text-xs
              font-medium
              text-blue-400
            "
          >
            Agile
          </div>
        </div>
      </motion.div>

      {/* ======================================================
          DETAILS MODAL
      ====================================================== */}

      <SprintDetailsModal
        isOpen={openDetails}
        onClose={() => setOpenDetails(false)}
        sprint={sprint}
      />
    </>
  );
};
