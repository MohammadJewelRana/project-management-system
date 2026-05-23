// components/ui/custom-form-field.tsx

"use client";

import { FieldError } from "react-hook-form";
import clsx from "clsx";

interface CustomFormFieldProps {
  label: string;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
  select?: boolean;
  options?: {
    label: string;
    value: string;
  }[];
  error?: FieldError;
  register?: any;
  icon?: React.ReactNode;
}

export function CustomFormField({
  label,
  placeholder,
  type = "text",
  textarea = false,
  select = false,
  options,
  error,
  register,
  icon,
}: CustomFormFieldProps) {
  return (
    <div className="space-y-2">
      {/* LABEL */}
      <label className="text-sm font-medium text-zinc-300">
        {label}
      </label>

      {/* FIELD WRAPPER */}
      <div
        className={clsx(
          "group relative overflow-hidden rounded-2xl border transition-all duration-300",
          error
            ? "border-red-500/40"
            : "border-white/[0.06] hover:border-white/[0.1] focus-within:border-blue-500/40"
        )}
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.03] to-violet-500/[0.03] opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />

        {/* ICON */}
        {icon && (
          <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-zinc-500">
            {icon}
          </div>
        )}

        {/* INPUT */}
        {!textarea && !select && (
          <input
            type={type}
            placeholder={placeholder}
            {...register}
            className={clsx(
              "relative h-12 w-full bg-[#18181B] text-sm text-white outline-none placeholder:text-zinc-500",
              icon ? "pl-12 pr-4" : "px-4"
            )}
          />
        )}

        {/* TEXTAREA */}
        {textarea && (
          <textarea
            rows={5}
            placeholder={placeholder}
            {...register}
            className={clsx(
              "relative w-full resize-none bg-[#18181B] py-4 text-sm text-white outline-none placeholder:text-zinc-500",
              icon ? "pl-12 pr-4" : "px-4"
            )}
          />
        )}

        {/* SELECT */}
        {select && (
          <select
            {...register}
            className={clsx(
              "relative h-12 w-full appearance-none bg-[#18181B] text-sm text-white outline-none",
              icon ? "pl-12 pr-4" : "px-4"
            )}
          >
            {options?.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-xs text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}