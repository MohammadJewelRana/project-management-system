"use client";

import { useEffect } from "react";

import { useSearchParams, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import {
  HiOutlineFolder,
  HiOutlineUser,
  HiOutlineSparkles,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
  HiOutlineUsers,
  HiOutlineArrowLeft,
} from "react-icons/hi";

import Link from "next/link";

import { Button } from "@heroui/react";

import {
  useGetSingleProject,
  useUpdateProject,
} from "@/store/hooks/project.hook";

import { useGetAllUsers } from "@/store/hooks/user.hook";
import { CustomFormField } from "@/components/form/CustomFormField";
import { MultiSelectField } from "@/components/form/MultiSelectInputField";
import LoadingSpinner from "@/app/loading";

export default function EditProjectPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  // GET PROJECT
  const { project, isLoading } = useGetSingleProject(id as string);

  // UPDATE
  const { update, isLoading: updateLoading } = useUpdateProject();

  // USERS
  const { users } = useGetAllUsers({
    page: 1,
    limit: 100,
  });

  // MANAGERS
  const managerUsers =
    users?.filter((user: any) => user?.role === "manager") || [];

  // MEMBERS
  const memberUsers =
    users?.filter((user: any) => user?.role === "member") || [];

  // FORM
  const { register, control, handleSubmit, reset } = useForm<any>();

  // DEFAULT VALUES
  useEffect(() => {
    if (project) {
      reset({
        title: project?.title || "",

        client: project?.client || "",

        slug: project?.slug || "",

        description: project?.description || "",

        budget: project?.budget || 0,

        progress: project?.progress || 0,

        estimatedHours: project?.estimatedHours || 0,

        startDate: project?.startDate?.split("T")[0] || "",

        endDate: project?.endDate?.split("T")[0] || "",

        status: project?.status || "",

        priority: project?.priority || "",

        tags: project?.tags?.join(", ") || "",

        technologies: project?.technologies || [],

        members: project?.members?.map((member: any) => member?._id) || [],

        projectManager: project?.projectManager?._id || "",
      });
    }
  }, [project, reset]);

  // UPDATE PROJECT
  const onSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,

        budget: Number(data?.budget) || 0,

        estimatedHours: Number(data?.estimatedHours) || 0,

        progress: Number(data?.progress) || 0,

        tags: data?.tags
          ? data.tags
              .split(",")
              .map((item: string) => item.trim())
              .filter(Boolean)
          : [],

        technologies: data?.technologies || [],

        members: data?.members || [],
      };

      await update(project?._id, payload);
    } catch (error) {
      toast.error("Failed to update project");

      console.log(error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-4 ">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        {/* LEFT */}
        <div>
          <Link
            href="/dashboard/projects"
            className="mb-3 inline-flex items-center gap-2 text-sm text-zinc-500 transition-all hover:text-white"
          >
            <HiOutlineArrowLeft className="text-lg" />
            Back to Projects
          </Link>

          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Edit Project
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Update project details and manage team information
          </p>
        </div>

        {/* ACTION */}
        <Button
          color="primary"
          type="submit"
          form="edit-project-form"
          isLoading={updateLoading}
          className="
            h-11
            rounded-2xl
            bg-blue-600
            px-6
            font-medium
          "
        >
          Save Changes
        </Button>
      </div>

      {/* FORM */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <form
            id="edit-project-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* BASIC INFO */}
            <div className="rounded-3xl border border-white/[0.06] bg-[#111113] p-4 sm:p-6">
              <h2 className="mb-5 text-base font-semibold text-white sm:text-lg">
                Basic Information
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* TITLE */}
                <CustomFormField
                  label="Project Title"
                  placeholder="Enter project title"
                  register={register("title")}
                  icon={<HiOutlineFolder />}
                />

                {/* CLIENT */}
                <CustomFormField
                  label="Client"
                  placeholder="Enter client"
                  register={register("client")}
                  icon={<HiOutlineUser />}
                />

                {/* SLUG */}
                <CustomFormField
                  label="Slug"
                  placeholder="project-slug"
                  register={register("slug")}
                  icon={<HiOutlineSparkles />}
                />

                {/* BUDGET */}
                <CustomFormField
                  label="Budget"
                  type="number"
                  placeholder="5000"
                  register={register("budget")}
                  icon={<HiOutlineCurrencyDollar />}
                />

                {/* START DATE */}
                <CustomFormField
                  label="Start Date"
                  type="date"
                  register={register("startDate")}
                  icon={<HiOutlineCalendar />}
                />

                {/* END DATE */}
                <CustomFormField
                  label="End Date"
                  type="date"
                  register={register("endDate")}
                  icon={<HiOutlineCalendar />}
                />

                {/* STATUS */}
                <CustomFormField
                  label="Status"
                  select
                  register={register("status")}
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
                      label: "Completed",
                      value: "completed",
                    },

                    {
                      label: "On Hold",
                      value: "on-hold",
                    },
                  ]}
                />

                {/* PRIORITY */}
                <CustomFormField
                  label="Priority"
                  select
                  register={register("priority")}
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
                />
              </div>

              {/* DESCRIPTION */}
              <div className="mt-4">
                <CustomFormField
                  label="Description"
                  textarea
                  rows={6}
                  placeholder="Project description..."
                  register={register("description")}
                />
              </div>

              {/* TAGS */}
              <div className="mt-4">
                <CustomFormField
                  label="Tags"
                  placeholder="design, saas, dashboard"
                  register={register("tags")}
                  icon={<HiOutlineSparkles />}
                />
              </div>
            </div>

            {/* TEAM */}
            <div className="rounded-3xl border border-white/[0.06] bg-[#111113] p-4 sm:p-6">
              <h2 className="mb-5 text-base font-semibold text-white sm:text-lg">
                Team Management
              </h2>

              <div className="grid gap-5">
                {/* MANAGER */}
                <CustomFormField
                  label="Project Manager"
                  select
                  register={register("projectManager")}
                  options={managerUsers?.map((user: any) => ({
                    label: user?.name,

                    value: user?._id,
                  }))}
                  icon={<HiOutlineUser />}
                />

                {/* MEMBERS */}
                <MultiSelectField
                  label="Members"
                  name="members"
                  control={control}
                  placeholder="Select Members"
                  icon={<HiOutlineUsers />}
                  options={memberUsers?.map((user: any) => ({
                    label: user?.name,

                    value: user?._id,
                  }))}
                />

                {/* TECHNOLOGIES */}
                <MultiSelectField
                  label="Technologies"
                  name="technologies"
                  control={control}
                  placeholder="Select Technologies"
                  icon={<HiOutlineSparkles />}
                  options={[
                    {
                      label: "React.js",
                      value: "React.js",
                    },

                    {
                      label: "Next.js",
                      value: "Next.js",
                    },

                    {
                      label: "TypeScript",
                      value: "TypeScript",
                    },

                    {
                      label: "Node.js",
                      value: "Node.js",
                    },

                    {
                      label: "Express.js",
                      value: "Express.js",
                    },

                    {
                      label: "NestJS",
                      value: "NestJS",
                    },

                    {
                      label: "MongoDB",
                      value: "MongoDB",
                    },

                    {
                      label: "PostgreSQL",
                      value: "PostgreSQL",
                    },

                    {
                      label: "Tailwind CSS",
                      value: "Tailwind CSS",
                    },

                    {
                      label: "Redux",
                      value: "Redux",
                    },
                  ]}
                />
              </div>
            </div>

            {/* MOBILE BUTTON */}
            <div className="block sm:hidden">
              <Button
                color="primary"
                type="submit"
                form="edit-project-form"
                isLoading={updateLoading}
                className="
              h-11
              w-full
              rounded-2xl
              bg-blue-600
              font-medium
            "
              >
                Save Changes
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
