"use client";

import {
  HiOutlineChatAlt2,
  HiOutlineClock,
} from "react-icons/hi";

export const TaskCommentSection =
  () => {
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

              bg-violet-500/10

              text-violet-400
            "
          >
            <HiOutlineChatAlt2 className="text-xl" />
          </div>

          <div>
            <h2
              className="
                text-lg
                font-black
                text-white
              "
            >
              Comments & Discussion
            </h2>

            <p
              className="
                mt-1

                text-[11px]
                text-zinc-500
              "
            >
              Collaboration thread
            </p>
          </div>
        </div>

        {/* EMPTY */}
        <div
          className="
            mt-6

            rounded-[20px]

            border
            border-dashed
            border-white/[0.08]

            bg-white/[0.02]

            p-8

            text-center
          "
        >
          <div
            className="
              mx-auto

              flex
              h-16
              w-16
              items-center
              justify-center

              rounded-full

              bg-white/[0.04]

              text-zinc-500
            "
          >
            <HiOutlineClock className="text-3xl" />
          </div>

          <h3
            className="
              mt-5

              text-lg
              font-bold
              text-white
            "
          >
            Comment System Coming Soon
          </h3>

          <p
            className="
              mt-3

              max-w-md
              mx-auto

              text-[11px]
              leading-6
              text-zinc-500

              sm:text-sm
            "
          >
            Backend integration for comments,
            threaded replies,
            and activity timeline
            will be enabled soon.
          </p>
        </div>
      </div>
    );
  };