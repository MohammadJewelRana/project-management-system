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
        h-full

        rounded-[20px]
        sm:rounded-[24px]

        border
        border-white/[0.06]

        bg-[#101114]

        p-4
        sm:p-5
      "
    >
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-2xl

            bg-blue-500/10

            text-blue-400
          "
        >
          <HiOutlineLightningBolt className="text-xl" />
        </div>

        <div>
          <h2
            className="
              text-base
              font-black
              text-white

              sm:text-lg
            "
          >
            Sprint Progress
          </h2>

          <p
            className="
              text-[10px]
              text-zinc-500
            "
          >
            Team productivity
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mt-6 space-y-5">
        {sprints
          ?.slice(0, 4)
          ?.map((sprint: any) => (
            <div
              key={sprint?._id}
            >
              <div
                className="
                  mb-2

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
                  h-2.5
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
                    to-cyan-500
                  "
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};