// app/(auth)/login/page.tsx

"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  HiOutlineArrowRight,
  HiOutlineLightningBolt,
  HiOutlineMail,
  HiOutlineLockClosed,
} from "react-icons/hi";

import { useLogin } from "@/store/hooks/useAuth";
import { loginSchema, LoginSchemaType } from "@/lib/validation/auth.validation";
import { AuthCard } from "@/components/auth/AuthCard";
import { CustomFormField } from "@/components/form/CustomFormField";

export default function LoginPage() {
  const router = useRouter();

  const { login, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  // SUBMIT
  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const res = await login(data);
      // console.log("Login Response:", res);

      const role = res?.data?.user?.role;
      // console.log("User Role:", role);

      // SMOOTH DELAY
      setTimeout(() => {
        if (role === "admin" || role === "manager" || role === "superAdmin") {
          router.push("/dashboard");
        }

        if (role === "member") {
          router.push("/dashboard");
        }
      }, 500);
    } catch (error) {
      // console.log(error);

      // FORM DATA REMAIN
    }
  };

  return (
    <AuthCard>
      {/* LOGO */}
      <div className="flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 shadow-[0_0_40px_rgba(59,130,246,0.45)]">
          <HiOutlineLightningBolt className="text-3xl text-white" />
        </div>
      </div>

      {/* TITLE */}
      <div className="mt-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Welcome Back
        </h1>

        <p className="mt-3 text-sm leading-7 text-zinc-500 sm:text-base">
          Login to access your projects, tasks, sprints, and workspace
          dashboard.
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        {/* EMAIL */}
        <CustomFormField
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          icon={<HiOutlineMail className="text-lg" />}
          error={errors.email}
          register={register("email")}
        />

        {/* PASSWORD */}
        <CustomFormField
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={<HiOutlineLockClosed className="text-lg" />}
          error={errors.password}
          register={register("password")}
        />

        {/* REMEMBER */}
        <div className="flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm text-zinc-400">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-white/[0.1] bg-transparent accent-blue-500"
            />
            Remember me
          </label>

          <button
            type="button"
            className="text-sm text-blue-400 transition hover:text-blue-300"
          >
            Forgot Password?
          </button>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={isLoading}
          className="group flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 text-sm font-semibold text-white shadow-[0_0_35px_rgba(59,130,246,0.35)] transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 sm:h-12"
        >
          {isLoading ? "Signing In..." : "Sign In"}

          {!isLoading && (
            <HiOutlineArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </button>
      </form>

      {/* DIVIDER */}
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/[0.06]" />

        <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          Workspace Access
        </span>

        <div className="h-px flex-1 bg-white/[0.06]" />
      </div>

      {/* ROLE INFO */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* ADMIN */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
          <h3 className="text-sm font-semibold text-white">Admin / Manager</h3>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Manage projects, sprints, tasks, teams, and analytics.
          </p>
        </div>

        {/* MEMBER */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
          <h3 className="text-sm font-semibold text-white">Team Member</h3>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Track assigned tasks, update progress, and log work hours.
          </p>
        </div>
      </div>
    </AuthCard>
  );
}
