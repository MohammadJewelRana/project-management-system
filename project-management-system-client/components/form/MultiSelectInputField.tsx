// components/ui/multi-select-field.tsx

"use client";

import Select from "react-select";

import { Controller } from "react-hook-form";

interface OptionType {
  label: string;
  value: string;
}

interface MultiSelectFieldProps {
  label: string;

  name: string;

  control: any;

  options: OptionType[];

  placeholder?: string;

  icon?: React.ReactNode;
}

export const MultiSelectField = ({
  label,
  name,
  control,
  options,
  placeholder = "Select Options",
  icon,
}: MultiSelectFieldProps) => {
  return (
    <div className="space-y-2">
      {/* LABEL */}
      <label className="text-sm font-medium text-zinc-300 ">{label}</label>

      {/* MULTI SELECT */}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            isMulti
            options={options}
            value={options?.filter((option) =>
              field.value?.includes(option.value),
            )}
            onChange={(selected: any) => {
              field.onChange(selected.map((item: any) => item.value));
            }}
            placeholder={placeholder}
            className="text-sm pt-2"
            classNamePrefix="select"
            components={{
              DropdownIndicator: () => (
                <div className="px-3 text-zinc-500">{icon}</div>
              ),
            }}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#18181B",
                borderColor: "rgba(255,255,255,0.08)",
                minHeight: "48px",
                borderRadius: "16px",
                boxShadow: "none",
              }),

              menu: (base) => ({
                ...base,
                backgroundColor: "#18181B",
                borderRadius: "16px",
                overflow: "hidden",
              }),

              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#27272A" : "#18181B",

                color: "white",

                cursor: "pointer",
              }),

              multiValue: (base) => ({
                ...base,
                backgroundColor: "#2563EB",

                borderRadius: "10px",
              }),

              multiValueLabel: (base) => ({
                ...base,
                color: "white",
              }),

              multiValueRemove: (base) => ({
                ...base,
                color: "white",
                cursor: "pointer",
              }),

              input: (base) => ({
                ...base,
                color: "white",
              }),

              placeholder: (base) => ({
                ...base,
                color: "#71717A",
              }),

              singleValue: (base) => ({
                ...base,
                color: "white",
              }),
            }}
          />
        )}
      />
    </div>
  );
};
