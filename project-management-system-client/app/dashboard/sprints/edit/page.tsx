"use client";

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import {
  HiOutlineArrowLeft,
  HiOutlineCalendar,
  HiOutlineClipboardList,
  HiOutlineFlag,
  HiOutlineLightningBolt,
  HiOutlineUser,
} from "react-icons/hi";

import { useGetSingleSprint, useUpdateSprint } from "@/store/hooks/sprint.hook";

import { useGetAllProjects } from "@/store/hooks/project.hook";

import { useGetAllUsers } from "@/store/hooks/user.hook";

const page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const sprintId = searchParams.get("id") || "";

  /* ======================================================
     FETCH DATA
  ====================================================== */

  const { sprint, isLoading } = useGetSingleSprint(sprintId);

  const { update, isLoading: updating } = useUpdateSprint();

  const { allData: projects } = useGetAllProjects({
    page: 1,
    limit: 100,
  });

  const { users } = useGetAllUsers({
    page: 1,
    limit: 100,
  });

  const managers = users?.filter((user: any) => user.role === "manager") || [];

  /* ======================================================
     FORM
  ====================================================== */

  const { register, handleSubmit, reset, watch } = useForm();

  /* ======================================================
     SET DEFAULT VALUES
  ====================================================== */

  useEffect(() => {
    if (sprint) {
      reset({
        name: sprint?.name,

        goal: sprint?.goal,

        project: sprint?.project?._id,

        sprintManager: sprint?.sprintManager?._id,

        startDate: sprint?.startDate?.split("T")[0],

        endDate: sprint?.endDate?.split("T")[0],

        status: sprint?.status,
      });
    }
  }, [sprint, reset]);

  /* ======================================================
     DURATION
  ====================================================== */

  const startDate = watch("startDate");

  const endDate = watch("endDate");

  let duration = 0;

  if (startDate && endDate) {
    duration = Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24),
    );
  }

  /* ======================================================
     SUBMIT
  ====================================================== */

  const onSubmit = async (data: any) => {
    if (new Date(data.endDate) <= new Date(data.startDate)) {
      return toast.error("End date must be greater than start date");
    }

    try {
      await update(sprintId, data);

      router.push("/dashboard/sprints");
    } catch (error) {
      console.log(error);

      toast.error("Failed to update sprint");
    }
  };

  /* ======================================================
     LOADING
  ====================================================== */

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div
          className="
            h-14
            w-14
            animate-spin
            rounded-full
            border-4
            border-blue-500
            border-t-transparent
          "
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT */}
        <div>
          <button
            onClick={() => router.back()}
            className="
              mb-5
              flex
              items-center
              gap-2
              rounded-2xl
              border
              border-white/[0.06]
              bg-[#18181B]
              px-4
              py-2
              text-sm
              text-zinc-400
              transition-all
              hover:text-white
            "
          >
            <HiOutlineArrowLeft className="text-lg" />
            Back
          </button>

          <h1 className="text-3xl font-bold text-white">Edit Sprint</h1>

          <p className="mt-2 text-sm text-zinc-500">
            Update sprint details and agile workflow information.
          </p>
        </div>

        {/* STATUS */}
        <div
          className="
            flex
            items-center
            gap-3
            rounded-[24px]
            border
            border-white/[0.06]
            bg-[#111113]
            px-5
            py-4
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-blue-500/10
            "
          >
            <HiOutlineLightningBolt className="text-2xl text-blue-400" />
          </div>

          <div>
            <p className="text-xs text-zinc-500">Current Progress</p>

            <h3 className="text-lg font-bold text-white">
              {sprint?.progress || 0}%
            </h3>
          </div>
        </div>
      </div>

      {/* ======================================================
          FORM
      ====================================================== */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          overflow-hidden
          rounded-[32px]
          border
          border-white/[0.06]
          bg-[#111113]
        "
      >
        {/* ======================================================
            TOP
        ====================================================== */}

        <div className="border-b border-white/[0.06] p-6">
          <h2 className="text-2xl font-bold text-white">Sprint Information</h2>

          <p className="mt-2 text-sm text-zinc-500">
            Manage sprint details and scheduling.
          </p>
        </div>

        {/* ======================================================
            BODY
        ====================================================== */}

        <div className="grid gap-6 p-6 lg:grid-cols-2">
          {/* NAME */}
          <div className="lg:col-span-2">
            <label className="mb-3 block text-sm font-medium text-zinc-300">
              Sprint Name
            </label>

            <div className="relative">
              <HiOutlineFlag
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-xl
                  text-zinc-500
                "
              />

              <input
                {...register("name")}
                placeholder="Sprint Name"
                className="
                  h-14
                  w-full
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-[#18181B]
                  pl-12
                  pr-4
                  text-white
                  outline-none
                  transition-all
                  focus:border-blue-500/40
                "
              />
            </div>
          </div>

          {/* GOAL */}
          <div className="lg:col-span-2">
            <label className="mb-3 block text-sm font-medium text-zinc-300">
              Sprint Goal
            </label>

            <textarea
              rows={5}
              {...register("goal")}
              placeholder="Describe sprint objective..."
              className="
                w-full
                rounded-2xl
                border
                border-white/[0.06]
                bg-[#18181B]
                p-4
                text-white
                outline-none
                transition-all
                focus:border-blue-500/40
              "
            />
          </div>

          {/* PROJECT */}
          <div>
            <label className="mb-3 block text-sm font-medium text-zinc-300">
              Project
            </label>

            <div className="relative">
              <HiOutlineClipboardList
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-xl
                  text-zinc-500
                "
              />

              <select
                {...register("project")}
                className="
                  h-14
                  w-full
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-[#18181B]
                  pl-12
                  pr-4
                  text-white
                  outline-none
                "
              >
                <option value="">Select Project</option>

                {projects?.map((project: any) => (
                  <option key={project._id} value={project._id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* MANAGER */}
          <div>
            <label className="mb-3 block text-sm font-medium text-zinc-300">
              Sprint Manager
            </label>

            <div className="relative">
              <HiOutlineUser
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-xl
                  text-zinc-500
                "
              />

              <select
                {...register("sprintManager")}
                className="
                  h-14
                  w-full
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-[#18181B]
                  pl-12
                  pr-4
                  text-white
                  outline-none
                "
              >
                <option value="">Select Manager</option>

                {managers?.map((manager: any) => (
                  <option key={manager._id} value={manager._id}>
                    {manager.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* START DATE */}
          <div>
            <label className="mb-3 block text-sm font-medium text-zinc-300">
              Start Date
            </label>

            <div className="relative">
              <HiOutlineCalendar
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-xl
                  text-zinc-500
                "
              />

              <input
                type="date"
                {...register("startDate")}
                className="
                  h-14
                  w-full
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-[#18181B]
                  pl-12
                  pr-4
                  text-white
                  outline-none
                "
              />
            </div>
          </div>

          {/* END DATE */}
          <div>
            <label className="mb-3 block text-sm font-medium text-zinc-300">
              End Date
            </label>

            <div className="relative">
              <HiOutlineCalendar
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-xl
                  text-zinc-500
                "
              />

              <input
                type="date"
                {...register("endDate")}
                className="
                  h-14
                  w-full
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-[#18181B]
                  pl-12
                  pr-4
                  text-white
                  outline-none
                "
              />
            </div>
          </div>

          {/* STATUS */}
          <div>
            <label className="mb-3 block text-sm font-medium text-zinc-300">
              Status
            </label>

            <select
              {...register("status")}
              className="
                h-14
                w-full
                rounded-2xl
                border
                border-white/[0.06]
                bg-[#18181B]
                px-4
                text-white
                outline-none
              "
            >
              <option value="planned">Planned</option>

              <option value="active">Active</option>

              <option value="completed">Completed</option>

              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* DURATION */}
          <div>
            <label className="mb-3 block text-sm font-medium text-zinc-300">
              Sprint Duration
            </label>

            <div
              className="
                flex
                h-14
                items-center
                rounded-2xl
                border
                border-white/[0.06]
                bg-[#18181B]
                px-4
              "
            >
              <HiOutlineLightningBolt className="mr-3 text-xl text-blue-400" />

              <span className="font-medium text-white">
                {duration > 0 ? `${duration} Days` : "Select dates"}
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================
            FOOTER
        ====================================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            border-t
            border-white/[0.06]
            p-6
            sm:flex-row
            sm:justify-end
          "
        >
          {/* CANCEL */}
          <button
            type="button"
            onClick={() => router.back()}
            className="
              h-12
              rounded-2xl
              border
              border-white/[0.06]
              bg-[#18181B]
              px-6
              text-sm
              font-medium
              text-white
              transition-all
              hover:bg-white/[0.04]
            "
          >
            Cancel
          </button>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={updating}
            className="
              h-12
              rounded-2xl
              bg-gradient-to-r
              from-blue-500
              to-indigo-500
              px-8
              text-sm
              font-medium
              text-white
              shadow-[0_0_30px_rgba(59,130,246,0.35)]
              transition-all
              hover:scale-[1.02]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {updating ? "Updating..." : "Update Sprint"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
