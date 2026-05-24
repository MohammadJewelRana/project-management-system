"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlinePlus,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi";

import { ProjectForm, ProjectFormValues } from "./_components/ProjectForm";
import { ProjectCard } from "./_components/ProjectCard";
import {
  useCreateProject,
  useGetAllProjects,
} from "@/store/hooks/project.hook";
import { useGetAllUsers } from "@/store/hooks/user.hook";

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
  const { create, isLoading } = useCreateProject();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ProjectFormValues>();

  const { users } = useGetAllUsers({
    limit: 100,
  });
  // console.log(users);
  const { projects, allData:allProjectData, isLoading: projectsLoading } = useGetAllProjects({
    page: 1,
    limit: 20,
  });
  // console.log(projects);
  console.log(allProjectData);
 



  const managerUsers =
    users?.filter((user: any) => user.role === "manager") || [];
  console.log(managerUsers);

  const memberUsers =
    users?.filter((user: any) => user.role === "member") || [];

  const onSubmit = async (data: ProjectFormValues) => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    if (end <= start) {
      alert("End date must be greater than start date");
      return;
    }

    // console.log("Form Data:", data);

    const payload = {
      ...data,
      budget: data.budget ?? 0,
      estimatedHours: data.estimatedHours ?? 0,
      progress: data.progress ?? 0,
      completedTaskCount: data.completedTaskCount ?? 0,
      totalTaskCount: data.totalTaskCount ?? 0,
      isPublic: data.isPublic ?? false,
      currency: data.currency || "USD",
      tags: data.tags
        ? data.tags
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],
      technologies: data.technologies || [],
      members: data.members || [],
    };
    console.log("Payload:", payload);

    await create(payload);

    reset();
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Projects
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Manage and track enterprise projects
          </p>
        </div>

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

      <AnimatePresence mode="wait">
        {showForm && (
          <motion.div
            key="project-form"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden rounded-3xl border border-white/[0.06] bg-[#111113]"
          >
            <ProjectForm
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              reset={reset}
              onSubmit={onSubmit}
              control={control}
              managerUsers={managerUsers}
              memberUsers={memberUsers}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {allProjectData.map((project: any) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}
