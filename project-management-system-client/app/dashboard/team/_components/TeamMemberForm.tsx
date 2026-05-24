// app/dashboard/team/_components/team-member-form.tsx

"use client";

import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineOfficeBuilding,
  HiOutlineBriefcase,
} from "react-icons/hi";

import { useForm } from "react-hook-form";
import { CustomFormField } from "@/components/form/CustomFormField";
 

export const TeamMemberForm =
  () => {
    const {
      register,
      handleSubmit,
    } = useForm();

    const onSubmit = (
      data: any
    ) => {
      console.log(data);
    };

    return (
      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="p-5 sm:p-6"
      >
        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            Add Team Member
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Create a new user
            and assign role
          </p>
        </div>

        {/* FORM GRID */}
        <div className="grid gap-5 md:grid-cols-2">
          <CustomFormField
            label="Full Name"
            placeholder="John Doe"
            register={register(
              "name"
            )}
            icon={
              <HiOutlineUser />
            }
          />

          <CustomFormField
            label="Email"
            type="email"
            placeholder="john@example.com"
            register={register(
              "email"
            )}
            icon={
              <HiOutlineMail />
            }
          />

          <CustomFormField
            label="Department"
            placeholder="Engineering"
            register={register(
              "department"
            )}
            icon={
              <HiOutlineOfficeBuilding />
            }
          />

          <CustomFormField
            label="Designation"
            placeholder="Frontend Developer"
            register={register(
              "designation"
            )}
            icon={
              <HiOutlineBriefcase />
            }
          />

          {/* ROLE */}
          <CustomFormField
            label="Role"
            select
            register={register(
              "role"
            )}
            options={[
              {
                label:
                  "Admin",
                value:
                  "admin",
              },

              {
                label:
                  "Manager",
                value:
                  "manager",
              },

              {
                label:
                  "Member",
                value:
                  "member",
              },
            ]}
          />
        </div>

        {/* BUTTON */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="
              flex
              h-11
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-r
              from-blue-500
              to-indigo-500
              px-6
              text-sm
              font-medium
              text-white
              transition-all
              duration-300
              hover:scale-[1.02]
            "
          >
            Create Member
          </button>
        </div>
      </form>
    );
  };