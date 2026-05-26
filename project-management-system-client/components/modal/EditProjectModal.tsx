// components/projects/edit-project-modal.tsx

"use client";

import { useEffect } from "react";

import toast from "react-hot-toast";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

import { useForm } from "react-hook-form";

import {
  HiOutlineFolder,
  HiOutlineUser,
  HiOutlineSparkles,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
  HiOutlineUsers,
} from "react-icons/hi";

 

import { useUpdateProject } from "@/store/hooks/project.hook";

import { useGetAllUsers } from "@/store/hooks/user.hook";
import { CustomFormField } from "../form/CustomFormField";
import { MultiSelectField } from "../form/MultiSelectInputField";

interface Props {
  isOpen: boolean;

  onOpenChange: (open: boolean) => void;

  project: any;
}

export const EditProjectModal = ({
  isOpen,

  onOpenChange,

  project,
}: Props) => {
  const { update, isLoading } = useUpdateProject();

  const { users } = useGetAllUsers({
    page: 1,
    limit: 100,
  });

  // MANAGER USERS
  const managerUsers =
    users?.filter((user: any) => user?.role === "manager") || [];

  // MEMBER USERS
  const memberUsers =
    users?.filter((user: any) => user?.role === "member") || [];

  const {
    register,

    control,

    handleSubmit,

    reset,
  } = useForm<any>();

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

  // UPDATE
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

      toast.success("Project updated successfully");

      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to update project");

      // console.log(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
      backdrop="blur"
      size="5xl"
      hideCloseButton
      classNames={{
        wrapper: "px-2 sm:px-4",

        base: `
          bg-[#0F0F10]
          border
          border-white/[0.06]
          rounded-[22px]
          sm:rounded-[30px]
          max-h-[95vh]
        `,

        body: `
          py-3
          sm:py-5
        `,

        header: `
          border-b
          border-white/[0.06]
          px-4
          py-4
          sm:px-6
        `,

        footer: `
          border-t
          border-white/[0.06]
          px-4
          py-4
          sm:px-6
        `,

        backdrop: "bg-black/70 backdrop-blur-md",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {/* HEADER */}
            <ModalHeader className="flex items-start gap-4">
              {/* ICON */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 sm:h-12 sm:w-12">
                <HiOutlineFolder className="text-xl sm:text-2xl" />
              </div>

              {/* TEXT */}
              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold text-white sm:text-2xl">
                  Edit Project
                </h2>

                <p className="mt-1 text-xs leading-5 text-zinc-500 sm:text-sm">
                  Update project details and save changes
                </p>
              </div>
            </ModalHeader>

            {/* BODY */}
            <ModalBody>
              <form
                id="edit-project-form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* BASIC INFO */}
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 sm:rounded-3xl sm:p-5">
                  <h3 className="mb-5 text-sm font-medium text-white sm:text-base">
                    Basic Information
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* TITLE */}
                    <CustomFormField
                      label="Project Title"
                      placeholder="Enter title"
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
                      rows={5}
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
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 sm:rounded-3xl sm:p-5">
                  <h3 className="mb-5 text-sm font-medium text-white sm:text-base">
                    Team Management
                  </h3>

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
                  <div className="mt-5">
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
                  </div>

                  {/* TECHNOLOGIES */}
                  <div className="mt-5">
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
              </form>
            </ModalBody>

            {/* FOOTER */}
            <ModalFooter className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              {/* CANCEL */}
              <Button
                variant="light"
                onPress={onClose}
                className="
                  h-11
                  w-full
                  rounded-2xl
                  text-zinc-400
                  sm:w-auto
                "
              >
                Cancel
              </Button>

              {/* UPDATE */}
              <Button
                color="primary"
                isLoading={isLoading}
                type="submit"
                form="edit-project-form"
                className="
                  h-11
                  w-full
                  rounded-2xl
                  bg-blue-600
                  font-medium
                  sm:w-auto
                "
              >
                Update Project
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
