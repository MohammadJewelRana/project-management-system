// app/dashboard/team/_components/team-member-form.tsx

"use client";

import toast from "react-hot-toast";

import { useForm } from "react-hook-form";

import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineOfficeBuilding,
  HiOutlineBriefcase,
  HiOutlinePhone,
  HiOutlineLockClosed,
  HiOutlineGlobeAlt,
} from "react-icons/hi";

import { CustomFormField } from "@/components/form/CustomFormField";

import { useCreateUserMutation } from "@/store/services/user.api";
import { designationOptions } from "@/constants/designationOptions";
import { MultiSelectField } from "@/components/form/MultiSelectInputField";
import { skillOptions } from "@/constants/skillOptions";
import { departmentOptions } from "@/constants/departmentOptions";

export const TeamMemberForm = () => {
  const [createUser, { isLoading }] = useCreateUserMutation();

  const {
    register,

    handleSubmit,

    control,

    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,

        skills: data.skills || [],
      };

      await createUser(payload).unwrap();

      toast.success("Team member created successfully");

      reset();
    } catch (error: any) {
      // console.log(error);

      toast.error(error?.data?.message || "Failed to create member");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
          rounded-[32px]
          border
          border-white/[0.06]
          bg-[#111113]
          p-5
          sm:p-6
        "
    >
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white">Add Team Member</h2>

        <p className="mt-2 text-sm text-zinc-500">
          Create and manage team member access
        </p>
      </div>

      {/* FORM GRID */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* NAME */}
        <CustomFormField
          label="Full Name"
          placeholder="John Doe"
          register={register("name")}
          icon={<HiOutlineUser />}
        />

        {/* USERNAME */}
        <CustomFormField
          label="Username"
          placeholder="john_doe"
          register={register("username")}
          icon={<HiOutlineUser />}
        />

        {/* EMAIL */}
        <CustomFormField
          label="Email"
          type="email"
          placeholder="john@example.com"
          register={register("email")}
          icon={<HiOutlineMail />}
        />

        {/* PASSWORD */}
        <CustomFormField
          label="Password"
          type="password"
          placeholder="******"
          register={register("password")}
          icon={<HiOutlineLockClosed />}
        />

        {/* PHONE */}
        <CustomFormField
          label="Phone"
          placeholder="+8801XXXXXXXXX"
          register={register("phone")}
          icon={<HiOutlinePhone />}
        />

        {/* TIMEZONE */}
        <CustomFormField
          label="Timezone"
          placeholder="Asia/Dhaka"
          register={register("timezone")}
          icon={<HiOutlineGlobeAlt />}
        />

        {/* DEPARTMENT */}
        <CustomFormField
          label="Department"
          select
          register={register("department")}
          icon={<HiOutlineOfficeBuilding />}
          options={departmentOptions}
        />

        {/* DESIGNATION */}
        <CustomFormField
          label="Designation"
          select
          register={register("designation")}
          icon={<HiOutlineBriefcase />}
          options={designationOptions}
        />

        {/* ROLE */}
        <CustomFormField
          label="Role"
          select
          register={register("role")}
          options={[
            {
              label: "Admin",
              value: "admin",
            },

            {
              label: "Manager",
              value: "manager",
            },

            {
              label: "Member",
              value: "member",
            },
          ]}
        />

        {/* STATUS */}
        <CustomFormField
          label="Status"
          select
          register={register("status")}
          options={[
            {
              label: "Active",
              value: "active",
            },

            {
              label: "Inactive",
              value: "inactive",
            },

            {
              label: "Blocked",
              value: "blocked",
            },
          ]}
        />
      </div>

      {/* SKILLS */}
      <div className="mt-5">
        <MultiSelectField
          label="Skills"
          name="skills"
          control={control}
          options={skillOptions}
          placeholder="Select Skills"
        />
      </div>

      {/* BIO */}
      <div className="mt-5">
        <CustomFormField
          label="Bio"
          textarea
          rows={5}
          placeholder="Write short bio..."
          register={register("bio")}
        />
      </div>

      {/* BUTTON */}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="
              flex
              h-12
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-r
              from-blue-500
              via-indigo-500
              to-violet-500
              px-8
              text-sm
              font-medium
              text-white
              transition-all
              duration-300
              hover:scale-[1.02]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
        >
          {isLoading ? "Creating..." : "Create Member"}
        </button>
      </div>
    </form>
  );
};
