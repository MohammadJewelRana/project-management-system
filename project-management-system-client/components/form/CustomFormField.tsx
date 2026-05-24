// components/ui/custom-form-field.tsx

"use client";

import React, {
  forwardRef,
} from "react";

import clsx from "clsx";

import { FieldError } from "react-hook-form";

interface OptionType {
  label: string;
  value: string;
}

interface CustomFormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;

  placeholder?: string;

  type?: string;

  textarea?: boolean;

  select?: boolean;

  options?: OptionType[];

  error?: FieldError;

  register?: any;

  icon?: React.ReactNode;

  disabled?: boolean;

  rows?: number;
}

export const CustomFormField =
  forwardRef<
    HTMLInputElement,
    CustomFormFieldProps
  >(
    (
      {
        label,
        placeholder,
        type = "text",
        textarea = false,
        select = false,
        options,
        error,
        register,
        icon,
        disabled = false,
        rows = 5,
        ...props
      },
      ref
    ) => {
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
              disabled &&
                "cursor-not-allowed opacity-60",

              error
                ? "border-red-500/40"
                : "border-white/[0.06] hover:border-white/[0.1] focus-within:border-blue-500/50"
            )}
          >
            {/* GLOW */}
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
                ref={ref}
                type={type}
                disabled={disabled}
                placeholder={placeholder}
                {...register}
                {...props}
                className={clsx(
                  "relative h-11 w-full bg-[#18181B] text-sm text-white outline-none transition-all duration-300 placeholder:text-zinc-500 sm:h-12",
                  icon
                    ? "pl-12 pr-4"
                    : "px-4"
                )}
              />
            )}

            {/* TEXTAREA */}
            {textarea && (
              <textarea
                rows={rows}
                disabled={disabled}
                placeholder={placeholder}
                {...register}
                className={clsx(
                  "relative w-full resize-none bg-[#18181B] py-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-zinc-500",
                  icon
                    ? "pl-12 pr-4"
                    : "px-4"
                )}
              />
            )}

            {/* SELECT */}
            {select && (
              <select
                disabled={disabled}
                {...register}
                className={clsx(
                  "relative h-11 w-full appearance-none bg-[#18181B] text-sm text-white outline-none transition-all duration-300 sm:h-12",
                  icon
                    ? "pl-12 pr-10"
                    : "px-4"
                )}
              >
                {options?.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="bg-[#18181B]"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            )}

            {/* SELECT ICON */}
            {select && (
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
                ▼
              </div>
            )}
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-xs text-red-400">
              {error.message}
            </p>
          )}
        </div>
      );
    }
  );

CustomFormField.displayName =
  "CustomFormField";