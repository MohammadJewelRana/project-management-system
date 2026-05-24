// components/projects/project-card.tsx

"use client";

import { useState } from "react";

import {
  HiOutlineFolder,
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineDotsVertical,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";

import { motion } from "framer-motion";

import Swal from "sweetalert2";

import toast from "react-hot-toast";

import { useDisclosure } from "@heroui/react";

import { useDeleteProject } from "@/store/hooks/project.hook";
import { ProjectDetailsModal } from "@/components/modal/ProjectDetailsModal";
import { EditProjectModal } from "@/components/modal/EditProjectModal";
import Link from "next/link";

interface ProjectCardProps {
  project: any;
}

const statusColors: Record<string, string> = {
  planned: "bg-zinc-700/20 text-zinc-300",

  active: "bg-blue-500/15 text-blue-400",

  completed: "bg-emerald-500/15 text-emerald-400",

  archived: "bg-zinc-800 text-zinc-500",

  "on-hold": "bg-amber-500/15 text-amber-400",
};

const priorityColors: Record<string, string> = {
  low: "text-zinc-400",

  medium: "text-blue-400",

  high: "text-orange-400",

  urgent: "text-red-400",
};

export function ProjectCard({ project }: ProjectCardProps) {
  const [showActions, setShowActions] = useState(false);

  // DETAILS MODAL
  const {
    isOpen: isDetailsOpen,

    onOpen: onDetailsOpen,

    onOpenChange: onDetailsOpenChange,
  } = useDisclosure();

  // EDIT MODAL
  const {
    isOpen: isEditOpen,

    onOpen: onEditOpen,

    onOpenChange: onEditOpenChange,
  } = useDisclosure();

  const { remove } = useDeleteProject();

  // DELETE
  const handleDelete = async () => {
    setShowActions(false);

    const result = await Swal.fire({
      title: "Delete Project?",

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
        await remove(project?._id);

        toast.success("Project deleted successfully");
      } catch (error) {
        toast.error("Failed to delete project");

        console.log(error);
      }
    }
  };

  return (
    <>
      {/* CARD */}
      <motion.div
        whileHover={{
          y: -4,
        }}
        transition={{
          duration: 0.25,
        }}
        className="group relative rounded-3xl border border-white/[0.06] bg-[#111113] p-5 transition-all duration-300 hover:border-white/[0.1]"
      >
        {/* TOP */}
        <div className="flex items-start justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            {/* ICON */}
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
              <HiOutlineFolder className="text-[22px]" />
            </div>

            {/* TITLE */}
            <div>
              <h3 className="line-clamp-1 text-lg font-semibold text-white">
                {project?.title}
              </h3>

              <p className="mt-1 text-sm text-zinc-500">{project?.client}</p>
            </div>
          </div>

          {/* ACTION BUTTON */}
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl text-zinc-500 transition-all duration-300 hover:bg-white/[0.05] hover:text-white"
            >
              <HiOutlineDotsVertical className="text-lg" />
            </button>

            {/* ACTION DROPDOWN */}
            {showActions && (
              <div className="absolute right-0 top-12 z-50 w-52 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#18181B] shadow-2xl">
                {/* VIEW DETAILS */}
                <button
                  onClick={() => {
                    setShowActions(false);

                    onDetailsOpen();
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-white transition-all hover:bg-white/[0.05]"
                >
                  <HiOutlineEye className="text-lg" />
                  View Details
                </button>

                {/* EDIT */}
                <Link
                  href={`/dashboard/projects/edit?id=${project?._id}`}
                  onClick={() => setShowActions(false)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-white transition-all hover:bg-white/[0.05]"
                >
                  <HiOutlinePencil className="text-lg" />
                  Edit Project
                </Link>

                {/* DELETE */}
                <button
                  onClick={handleDelete}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-400 transition-all hover:bg-red-500/10"
                >
                  <HiOutlineTrash className="text-lg" />
                  Delete Project
                </button>
              </div>
            )}
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-5 line-clamp-2 text-sm leading-relaxed text-zinc-500">
          {project?.description}
        </p>

        {/* TAGS */}
        <div className="mt-5 flex items-center gap-2">
          {/* STATUS */}
          <div
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusColors[project?.status]}`}
          >
            {project?.status}
          </div>

          {/* PRIORITY */}
          <div
            className={`text-xs font-medium capitalize ${priorityColors[project?.priority]}`}
          >
            {project?.priority}
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-zinc-400">Progress</p>

            <p className="text-sm font-medium text-white">
              {project?.progress || 0}%
            </p>
          </div>

          {/* BAR */}
          <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
            <div
              style={{
                width: `${project?.progress || 0}%`,
              }}
              className="h-full rounded-full bg-blue-500"
            />
          </div>
        </div>

        {/* TECHNOLOGIES */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project?.technologies
            ?.slice(0, 3)
            ?.map((tech: string, index: number) => (
              <div
                key={index}
                className="rounded-xl bg-white/[0.04] px-3 py-1 text-xs text-zinc-300"
              >
                {tech}
              </div>
            ))}
        </div>

        {/* FOOTER */}
        <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
          {/* MEMBERS */}
          <div className="flex items-center gap-2 text-zinc-500">
            <HiOutlineUsers className="text-lg" />

            <span className="text-sm">{project?.members?.length} Members</span>
          </div>

          {/* DATE */}
          <div className="flex items-center gap-2 text-zinc-500">
            <HiOutlineCalendar className="text-lg" />

            <span className="text-sm">
              {new Date(project?.endDate).toLocaleDateString("en-GB")}
            </span>
          </div>
        </div>
      </motion.div>

      {/* DETAILS MODAL */}
      <ProjectDetailsModal
        isOpen={isDetailsOpen}
        onOpenChange={onDetailsOpenChange}
        project={project}
      />

      {/* EDIT MODAL */}
      <EditProjectModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        project={project}
      />
    </>
  );
}
