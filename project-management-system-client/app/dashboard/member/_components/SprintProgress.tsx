"use client";

import {
  HiOutlineLightningBolt,
} from "react-icons/hi";

export const SprintProgress = ({
  sprints,
}: any) => {
  return (
    <div
      className="
        rounded-[24px]

        border
        border-white/[0.06]

        bg-[#101114]

        p-5

        sm:p-6
      "
    >
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center

            rounded-2xl

            bg-blue-500/10

            text-blue-400
          "
        >
          <HiOutlineLightningBolt className="text-2xl" />
        </div>

        <div>
          <h2
            className="
              text-xl
              font-black
              text-white
            "
          >
            Sprint Progress
          </h2>

          <p
            className="
              mt-1

              text-xs
              text-zinc-500
            "
          >
            Team sprint productivity
          </p>
        </div>
      </div>

      {/* EMPTY */}
      {sprints?.length === 0 && (
        <div
          className="
            mt-6

            rounded-[20px]

            border
            border-dashed
            border-white/[0.08]

            bg-white/[0.02]

            p-10

            text-center
          "
        >
          <h3
            className="
              text-lg
              font-bold
              text-white
            "
          >
            No Sprint Found
          </h3>

          <p
            className="
              mt-2

              text-sm
              text-zinc-500
            "
          >
            Sprint progress will
            appear here.
          </p>
        </div>
      )}

      {/* SPRINTS */}
      <div className="mt-6 space-y-5">
        {sprints
          ?.slice(0, 5)
          ?.map((sprint: any) => (
            <div
              key={sprint?._id}
            >
              <div
                className="
                  mb-3

                  flex
                  items-center
                  justify-between
                "
              >
                <div>
                  <h3
                    className="
                      text-sm
                      font-bold
                      text-white

                      sm:text-base
                    "
                  >
                    {sprint?.name}
                  </h3>

                  <p
                    className="
                      mt-1

                      text-[10px]
                      uppercase
                      tracking-wider
                      text-zinc-500
                    "
                  >
                    {sprint?.status}
                  </p>
                </div>

                <span
                  className="
                    text-sm
                    font-black
                    text-white
                  "
                >
                  {sprint?.progress || 0}%
                </span>
              </div>

              {/* BAR */}
              <div
                className="
                  h-3
                  overflow-hidden

                  rounded-full

                  bg-white/[0.05]
                "
              >
                <div
                  style={{
                    width: `${
                      sprint?.progress || 0
                    }%`,
                  }}
                  className="
                    h-full

                    rounded-full

                    bg-gradient-to-r
                    from-blue-500
                    via-cyan-500
                    to-indigo-500
                  "
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};