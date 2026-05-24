// app/dashboard/team/page.tsx

"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  HiOutlinePlus,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi";
 

import { useGetAllUsers } from "@/store/hooks/user.hook";
import LoadingSpinner from "@/app/loading";
import { TeamMemberForm } from "./_components/TeamMemberForm";
import { TeamSection } from "./_components/TeamSection";

const TeamPage = () => {
  const [showForm, setShowForm] =
    useState(false);

  // FETCH USERS
  const {
    users,
    isLoading,
  } = useGetAllUsers({
    page: 1,
    limit: 100,
  });

  // FILTER USERS
  const superAdmins =
    users?.filter(
      (user: any) =>
        user?.role ===
        "superAdmin"
    ) || [];

  const admins =
    users?.filter(
      (user: any) =>
        user?.role === "admin"
    ) || [];

  const managers =
    users?.filter(
      (user: any) =>
        user?.role ===
        "manager"
    ) || [];

  const members =
    users?.filter(
      (user: any) =>
        user?.role ===
        "member"
    ) || [];

  // LOADING
  if (isLoading) {
    return (
      <LoadingSpinner
        fullScreen
        text="Loading Team..."
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* TOPBAR */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        {/* LEFT */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Team Management
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Manage all team
            members and roles
          </p>
        </div>

        {/* BUTTON */}
        <button
          onClick={() =>
            setShowForm(
              !showForm
            )
          }
          className="
            group
            flex
            h-12
            items-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-blue-500
            to-indigo-500
            px-5
            text-sm
            font-medium
            text-white
            shadow-[0_0_30px_rgba(59,130,246,0.35)]
            transition-all
            duration-300
            hover:scale-[1.02]
          "
        >
          <HiOutlinePlus className="text-lg" />

          {showForm
            ? "Close Form"
            : "Add Team Member"}

          {showForm ? (
            <HiOutlineChevronUp className="text-lg" />
          ) : (
            <HiOutlineChevronDown className="text-lg" />
          )}
        </button>
      </div>

      {/* FORM */}
      <AnimatePresence mode="wait">
        {showForm && (
          <motion.div
            key="team-form"
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              overflow-hidden
              rounded-3xl
              border
              border-white/[0.06]
              bg-[#111113]
            "
          >
            <TeamMemberForm />
          </motion.div>
        )}
      </AnimatePresence>

      {/* TEAM SECTIONS */}
      <div className="space-y-10">
        <TeamSection
          title="Super Admin"
          users={superAdmins}
          badgeColor="bg-red-500/10 text-red-400"
        />

        <TeamSection
          title="Admins"
          users={admins}
          badgeColor="bg-orange-500/10 text-orange-400"
        />

        <TeamSection
          title="Project Managers"
          users={managers}
          badgeColor="bg-blue-500/10 text-blue-400"
        />

        <TeamSection
          title="Team Members"
          users={members}
          badgeColor="bg-emerald-500/10 text-emerald-400"
        />
      </div>
    </div>
  );
};

export default TeamPage;