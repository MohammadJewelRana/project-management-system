"use client";

import { HiOutlinePaperClip } from "react-icons/hi";

export const TaskAttachments =
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
            <HiOutlinePaperClip className="text-xl" />
          </div>

          <div>
            <h2
              className="
                text-lg
                font-black
                text-white
              "
            >
              Attachments
            </h2>

            <p
              className="
                mt-1

                text-[11px]
                text-zinc-500
              "
            >
              File collaboration
            </p>
          </div>
        </div>

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
          <h3
            className="
              text-base
              font-bold
              text-white
            "
          >
            Attachment Upload Coming Soon
          </h3>

          <p
            className="
              mt-2

              text-[11px]
              leading-6
              text-zinc-500

              sm:text-sm
            "
          >
            Upload files,
            screenshots,
            and documents
            after backend integration.
          </p>
        </div>
      </div>
    );
  };