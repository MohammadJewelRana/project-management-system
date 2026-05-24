// app/dashboard/team/edit/page.tsx

"use client";

import { useEffect } from "react";

import toast from "react-hot-toast";

import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";

import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineOfficeBuilding,
  HiOutlineBriefcase,
  HiOutlinePhone,
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
  HiOutlineStatusOnline,
} from "react-icons/hi";

import { CustomFormField } from "@/components/form/CustomFormField";

import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/store/services/user.api";
import LoadingSpinner from "@/app/loading";
import { departmentOptions } from "@/constants/departmentOptions";
import { designationOptions } from "@/constants/designationOptions";
import { MultiSelectField } from "@/components/form/MultiSelectInputField";
import { skillOptions } from "@/constants/skillOptions";

export default function EditUserPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  // USER
  const { data, isLoading } = useGetSingleUserQuery(id as string);

  const user = data?.data;

  // UPDATE
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

  // FORM
  const {
    register,

    handleSubmit,

    control,

    reset,
  } = useForm();

  // DEFAULT VALUES
  useEffect(() => {
    if (user) {
      reset({
        name: user?.name || "",

        username: user?.username || "",

        email: user?.email || "",

        phone: user?.phone || "",

        department: user?.department || "",

        designation: user?.designation || "",

        role: user?.role || "",

        status: user?.status || "",

        timezone: user?.timezone || "",

        bio: user?.bio || "",

        skills: user?.skills || [],
      });
    }
  }, [user, reset]);

  // SUBMIT
  const onSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,

        skills: data.skills || [],
      };

      await updateUser({
        id,
        data: payload,
      }).unwrap();

      toast.success("User updated successfully");

      router.push("/dashboard/team");
    } catch (error: any) {
      console.log(error);

      toast.error(error?.data?.message || "Failed to update user");
    }
  };

  // LOADING
  // if (isLoading) {
  //   return <LoadingSpinner fullScreen text="Loading User..." />;
  // }

  return (
    <div className="space-y-6 px-4 py-4 sm:px-6 lg:px-8">
      {/* TOP HEADER */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT */}
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Team Member</h1>

          <p className="mt-2 text-sm text-zinc-500">
            Update user profile, permissions and account settings
          </p>
        </div>

        {/* BUTTON */}
        <button
          form="edit-user-form"
          type="submit"
          disabled={updateLoading}
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
          {updateLoading ? "Updating..." : "Save Changes"}
        </button>
      </div>

      {/* CONTENT */}
      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        {/* PROFILE CARD */}
        <div
          className="
            overflow-hidden
            rounded-[32px]
            border
            border-white/[0.06]
            bg-[#111113]
            p-6
          "
        >
          {/* AVATAR */}
          <div className="flex flex-col items-center">
            <div
              className="
                flex
                h-28
                w-28
                items-center
                justify-center
                rounded-[32px]
                bg-gradient-to-br
                from-blue-500
                via-indigo-500
                to-violet-500
                text-3xl
                font-bold
                text-white
                shadow-[0_0_40px_rgba(59,130,246,0.35)]
              "
            >
              {user?.name
                ?.split(" ")
                ?.map((word: string) => word[0])
                ?.join("")
                ?.slice(0, 2)}
            </div>

            {/* NAME */}
            <h2 className="mt-5 text-center text-xl font-semibold text-white">
              {user?.name}
            </h2>

            {/* DESIGNATION */}
            <p className="mt-1 text-center text-sm text-zinc-500">
              {user?.designation}
            </p>

            {/* BADGES */}
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <span
                className="
                  rounded-full
                  bg-blue-500/10
                  px-3
                  py-1
                  text-xs
                  font-medium
                  capitalize
                  text-blue-400
                "
              >
                {user?.role}
              </span>

              <span
                className="
                  rounded-full
                  bg-emerald-500/10
                  px-3
                  py-1
                  text-xs
                  font-medium
                  capitalize
                  text-emerald-400
                "
              >
                {user?.status}
              </span>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-8 space-y-4 border-t border-white/[0.06] pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">Department</span>

              <span className="text-sm text-white">{user?.department}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">Timezone</span>

              <span className="text-sm text-white">{user?.timezone}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">Verified</span>

              <span className="text-sm text-emerald-400">
                {user?.isVerified ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form
          id="edit-user-form"
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
          {/* TITLE */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white">
              User Information
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Manage and update team member details
            </p>
          </div>

          {/* GRID */}
          <div className="grid gap-5 md:grid-cols-2">
            <CustomFormField
              label="Full Name"
              register={register("name")}
              icon={<HiOutlineUser />}
            />

            <CustomFormField
              label="Username"
              register={register("username")}
              icon={<HiOutlineUser />}
            />

            <CustomFormField
              label="Email"
              type="email"
              register={register("email")}
              icon={<HiOutlineMail />}
            />

            <CustomFormField
              label="Phone"
              register={register("phone")}
              icon={<HiOutlinePhone />}
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
              icon={<HiOutlineShieldCheck />}
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
              icon={<HiOutlineStatusOnline />}
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

            <CustomFormField
              label="Timezone"
              register={register("timezone")}
              icon={<HiOutlineGlobeAlt />}
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
        </form>
      </div>
    </div>
  );
}
