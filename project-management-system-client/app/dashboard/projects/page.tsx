// app/(mainLayout)/projects/page.tsx

"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { motion, AnimatePresence } from "framer-motion";

import {
  HiOutlinePlus,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineFolder,
  HiOutlineDocumentText,
  HiOutlineOfficeBuilding,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
  HiOutlineFlag,
} from "react-icons/hi";
import { CustomFormField } from "@/components/form/CustomFormField";

import { ProjectCard } from "./_components/ProjectCard";

const mockProjects = [
  {
    _id: "1",
    title: "Cloud Migration Initiative",
    client: "TechCorp",
    description:
      "Migrate legacy infrastructure to modern cloud architecture with scalable microservices.",
    status: "active",
    priority: "high",
    progress: 72,
    estimatedHours: 320,
    completedTaskCount: 24,
    totalTaskCount: 36,
    members: [1, 2, 3],
    endDate: "2026-06-20",
  },
  {
    _id: "2",
    title: "Enterprise Dashboard",
    client: "StartupXYZ",
    description:
      "Build enterprise analytics dashboard with real-time insights and KPI visualizations.",
    status: "planned",
    priority: "medium",
    progress: 28,
    estimatedHours: 240,
    completedTaskCount: 8,
    totalTaskCount: 30,
    members: [1, 2],
    endDate: "2026-08-12",
  },
  {
    _id: "3",
    title: "Mobile Banking App",
    client: "FinancePro",
    description:
      "Develop secure mobile banking experience with biometric authentication.",
    status: "completed",
    priority: "urgent",
    progress: 100,
    estimatedHours: 500,
    completedTaskCount: 52,
    totalTaskCount: 52,
    members: [1, 2, 3, 4],
    endDate: "2026-04-10",
  },
];

export default function ProjectsPage() {
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);

    reset();
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        {/* LEFT */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Projects
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Manage and track enterprise projects
          </p>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="group flex h-12 items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 px-5 text-sm font-medium text-white shadow-[0_0_30px_rgba(59,130,246,0.35)] transition-all duration-300 hover:scale-[1.02]"
        >
          <HiOutlinePlus className="text-lg" />

          {showForm ? "Close Form" : "Create Project"}

          {showForm ? (
            <HiOutlineChevronUp className="text-lg" />
          ) : (
            <HiOutlineChevronDown className="text-lg" />
          )}
        </button>
      </div>

      {/* FORM */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            className="overflow-hidden rounded-3xl border border-white/[0.06] bg-[#111113]"
          >
            {/* HEADER */}
            <div className="border-b border-white/[0.06] px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                  <HiOutlineFolder className="text-[22px]" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Create New Project
                  </h2>

                  <p className="text-sm text-zinc-500">
                    Create and manage enterprise projects
                  </p>
                </div>
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <CustomFormField
                  label="Project Title"
                  placeholder="Project title..."
                  icon={<HiOutlineFolder className="text-lg" />}
                  register={register("title", {
                    required: "Project title is required",
                  })}
                  error={errors.title as any}
                />

                <CustomFormField
                  label="Client"
                  placeholder="Client name..."
                  icon={<HiOutlineOfficeBuilding className="text-lg" />}
                  register={register("client")}
                />

                <div className="lg:col-span-2">
                  <CustomFormField
                    label="Description"
                    placeholder="Project description..."
                    textarea
                    icon={<HiOutlineDocumentText className="mt-1 text-lg" />}
                    register={register("description")}
                  />
                </div>

                <CustomFormField
                  label="Start Date"
                  type="date"
                  icon={<HiOutlineCalendar className="text-lg" />}
                  register={register("startDate")}
                />

                <CustomFormField
                  label="End Date"
                  type="date"
                  icon={<HiOutlineCalendar className="text-lg" />}
                  register={register("endDate")}
                />

                <CustomFormField
                  label="Budget"
                  type="number"
                  placeholder="$5000"
                  icon={<HiOutlineCurrencyDollar className="text-lg" />}
                  register={register("budget")}
                />

                <CustomFormField
                  label="Estimated Hours"
                  type="number"
                  placeholder="120"
                  icon={<HiOutlineFlag className="text-lg" />}
                  register={register("estimatedHours")}
                />

                <CustomFormField
                  label="Status"
                  select
                  options={[
                    {
                      label: "Planned",
                      value: "planned",
                    },
                    {
                      label: "Active",
                      value: "active",
                    },
                    {
                      label: "On Hold",
                      value: "on-hold",
                    },
                    {
                      label: "Completed",
                      value: "completed",
                    },
                    {
                      label: "Archived",
                      value: "archived",
                    },
                  ]}
                  register={register("status")}
                />

                <CustomFormField
                  label="Priority"
                  select
                  options={[
                    {
                      label: "Low",
                      value: "low",
                    },
                    {
                      label: "Medium",
                      value: "medium",
                    },
                    {
                      label: "High",
                      value: "high",
                    },
                    {
                      label: "Urgent",
                      value: "urgent",
                    },
                  ]}
                  register={register("priority")}
                />
              </div>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  type="submit"
                  className="h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 px-6 text-sm font-medium text-white shadow-[0_0_30px_rgba(59,130,246,0.35)] transition-all duration-300 hover:scale-[1.02]"
                >
                  Create Project
                </button>

                <button
                  type="button"
                  onClick={() => reset()}
                  className="h-12 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-6 text-sm font-medium text-zinc-300 transition-all duration-300 hover:bg-white/[0.05]"
                >
                  Reset Form
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROJECT GRID */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {mockProjects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}
