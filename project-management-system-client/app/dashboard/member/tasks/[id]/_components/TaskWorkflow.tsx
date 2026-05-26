"use client";

import { HiOutlineCheck } from "react-icons/hi";

const workflow = [
  "todo",
  "in-progress",
  "review",
  "done",
];

export const TaskWorkflow = ({
  task,
}: any) => {
  return (
    <div
      className="
        rounded-[22px]

        border
        border-white/[0.06]

        bg-[#101114]

        p-4

        sm:p-5
      "
    >
      <h2
        className="
          text-lg
          font-black
          text-white
        "
      >
        Workflow Progress
      </h2>

      <div className="mt-6 space-y-3">
        {workflow.map((step) => {
          const active =
            task?.status === step;

          return (
            <div
              key={step}
              className={`
                flex
                items-center
                gap-4

                rounded-[18px]

                border

                p-4

                ${
                  active
                    ? "border-violet-500/30 bg-violet-500/10"
                    : "border-white/[0.06] bg-white/[0.02]"
                }
              `}
            >
              <div
                className={`
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center

                  rounded-full

                  ${
                    active
                      ? "bg-violet-500 text-white"
                      : "bg-white/[0.05] text-zinc-500"
                  }
                `}
              >
                <HiOutlineCheck />
              </div>

              <div>
                <h3
                  className="
                    text-sm
                    font-bold
                    uppercase
                    text-white
                  "
                >
                  {step}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};