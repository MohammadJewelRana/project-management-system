"use client";

import Select from "react-select";

import { useState } from "react";
import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
  Controller,
} from "react-hook-form";
import {
  HiOutlineFolder,
  HiOutlineDocumentText,
  HiOutlineOfficeBuilding,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
  HiOutlineFlag,
  HiOutlinePhotograph,
  HiOutlineTag,
  HiOutlineUserGroup,
  HiOutlineUser,
  HiOutlineGlobeAlt,
  HiOutlineChartBar,
  HiOutlineStatusOnline,
  HiOutlineSparkles,
  HiOutlineUsers,
} from "react-icons/hi";
import { CustomFormField } from "@/components/form/CustomFormField";
import { useGetAllUsers } from "@/store/hooks/user.hook";
import { MultiSelectField } from "@/components/form/MultiSelectInputField";
import { technologyOptions } from "@/constants/texhnologyOptions";

export type ProjectFormValues = {
  title: string;
  client: string;
  description: string;
  thumbnail?: string | null;
  coverImage?: string | null;
  startDate: string;
  endDate: string;
  estimatedHours?: number;
  budget?: number;
  currency?: string;
  status?: "planned" | "active" | "on-hold" | "completed" | "archived";
  priority?: "low" | "medium" | "high" | "urgent";
  tags?: string;
  technologies?: string;
  progress?: number;
  completedTaskCount?: number;
  totalTaskCount?: number;
  projectManager?: string;
  members?: string;
  isPublic?: boolean;
};

type Props = {
  register: UseFormRegister<ProjectFormValues>;
  handleSubmit: UseFormHandleSubmit<ProjectFormValues>;
  errors: FieldErrors<ProjectFormValues>;
  reset: () => void;
  onSubmit: (data: ProjectFormValues) => void;
  control: any;
  managerUsers: any[];
  memberUsers: any[];
};

export function ProjectForm({
  register,
  handleSubmit,
  control,
  errors,
  reset,
  onSubmit,
  managerUsers,
  memberUsers,
}: Props) {
  const [tagInput, setTagInput] = useState("");
  const [techInput, setTechInput] = useState("");
  const [memberInput, setMemberInput] = useState("");
  // console.log(memberUsers);

  return (
    <>
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
              Fill in the project details based on your backend schema
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <CustomFormField
            label="Title"
            placeholder="Project title..."
            icon={<HiOutlineFolder className="text-lg" />}
            register={register("title", {
              required: "Title is required",
              minLength: { value: 3, message: "Minimum 3 characters" },
              maxLength: { value: 200, message: "Maximum 200 characters" },
            })}
            error={errors.title}
          />

          <CustomFormField
            label="Client"
            placeholder="Client name..."
            icon={<HiOutlineOfficeBuilding className="text-lg" />}
            register={register("client", {
              required: "Client is required",
              maxLength: { value: 100, message: "Maximum 100 characters" },
            })}
            error={errors.client}
          />

          <div className="lg:col-span-2">
            <CustomFormField
              label="Description"
              placeholder="Project description..."
              textarea
              icon={<HiOutlineDocumentText className="mt-1 text-lg" />}
              register={register("description", {
                required: "Description is required",
                minLength: { value: 10, message: "Minimum 10 characters" },
              })}
              error={errors.description}
            />
          </div>

          <CustomFormField
            label="Thumbnail URL"
            placeholder="https://..."
            icon={<HiOutlinePhotograph className="text-lg" />}
            register={register("thumbnail")}
          />

          <CustomFormField
            label="Cover Image URL"
            placeholder="https://..."
            icon={<HiOutlinePhotograph className="text-lg" />}
            register={register("coverImage")}
          />

          <CustomFormField
            label="Start Date"
            type="date"
            icon={<HiOutlineCalendar className="text-lg" />}
            register={register("startDate", {
              required: "Start date is required",
            })}
            error={errors.startDate}
          />

          <CustomFormField
            label="End Date"
            type="date"
            icon={<HiOutlineCalendar className="text-lg" />}
            register={register("endDate", {
              required: "End date is required",
            })}
            error={errors.endDate}
          />

          <CustomFormField
            label="Estimated Hours"
            type="number"
            placeholder="120"
            icon={<HiOutlineFlag className="text-lg" />}
            register={register("estimatedHours", {
              valueAsNumber: true,
              min: { value: 0, message: "Must be 0 or greater" },
            })}
            error={errors.estimatedHours}
          />

          <CustomFormField
            label="Budget"
            type="number"
            placeholder="5000"
            icon={<HiOutlineCurrencyDollar className="text-lg" />}
            register={register("budget", {
              valueAsNumber: true,
              min: { value: 0, message: "Must be 0 or greater" },
            })}
            error={errors.budget}
          />

          <CustomFormField
            label="Currency"
            placeholder="USD"
            icon={<HiOutlineCurrencyDollar className="text-lg" />}
            register={register("currency")}
          />

          <CustomFormField
            label="Status"
            select
            options={[
              { label: "Planned", value: "planned" },
              { label: "Active", value: "active" },
              { label: "On Hold", value: "on-hold" },
              { label: "Completed", value: "completed" },
              { label: "Archived", value: "archived" },
            ]}
            icon={<HiOutlineStatusOnline className="text-lg" />}
            register={register("status")}
          />

          <CustomFormField
            label="Priority"
            select
            options={[
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
              { label: "Urgent", value: "urgent" },
            ]}
            icon={<HiOutlineFlag className="text-lg" />}
            register={register("priority")}
          />

          <CustomFormField
            label="Progress"
            type="number"
            placeholder="0 - 100"
            icon={<HiOutlineChartBar className="text-lg" />}
            register={register("progress", {
              valueAsNumber: true,
              min: { value: 0, message: "Minimum 0" },
              max: { value: 100, message: "Maximum 100" },
            })}
            error={errors.progress}
          />

          <CustomFormField
            label="Completed Task Count"
            type="number"
            placeholder="0"
            icon={<HiOutlineFlag className="text-lg" />}
            register={register("completedTaskCount", {
              valueAsNumber: true,
              min: { value: 0, message: "Must be 0 or greater" },
            })}
            error={errors.completedTaskCount}
          />

          <CustomFormField
            label="Total Task Count"
            type="number"
            placeholder="0"
            icon={<HiOutlineFlag className="text-lg" />}
            register={register("totalTaskCount", {
              valueAsNumber: true,
              min: { value: 0, message: "Must be 0 or greater" },
            })}
            error={errors.totalTaskCount}
          />

          {/* <CustomFormField
            label="Project Manager ID"
            placeholder="ObjectId..."
            icon={<HiOutlineUser className="text-lg" />}
            register={register("projectManager")}
          /> */}

          <CustomFormField
            label="Project Manager"
            select
            placeholder="Select Manager"
            register={register("projectManager")}
            options={managerUsers?.map((user: any) => ({
              label: user.name,
              value: user._id,
            }))}
            icon={<HiOutlineUser />}
          />

          {/* <CustomFormField
            label="Members"
            placeholder="Comma separated ObjectIds..."
            icon={<HiOutlineUserGroup className="text-lg" />}
            register={register("members")}
          /> */}

          <MultiSelectField
            label="Members"
            name="members"
            control={control}
            options={memberUsers?.map((user: any) => ({
              label: user.name,
              value: user._id,
            }))}
            placeholder="Select Members"
            icon={<HiOutlineUsers className="text-lg" />}
          />

          <div className="lg:col-span-2">
            <CustomFormField
              label="Tags"
              placeholder="comma,separated,tags"
              icon={<HiOutlineTag className="text-lg" />}
              register={register("tags")}
            />
          </div>

          <MultiSelectField
            label="Technologies"
            name="technologies"
            control={control}
            options={technologyOptions}
            placeholder="Select Technologies"
            icon={<HiOutlineSparkles className="text-lg" />}
          />

          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
              <HiOutlineGlobeAlt className="text-lg text-zinc-400" />
              <label className="flex items-center gap-3 text-sm text-zinc-300">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-zinc-600 bg-transparent"
                  {...register("isPublic")}
                />
                Public Project
              </label>
            </div>
          </div>
        </div>

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
    </>
  );
}
