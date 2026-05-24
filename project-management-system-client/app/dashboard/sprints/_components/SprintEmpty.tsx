"use client";

import {
  HiOutlinePlusCircle,
  HiOutlineLightningBolt,
} from "react-icons/hi";

interface Props {
  onCreate?: () => void;
}

export const SprintEmpty = ({
  onCreate,
}: Props) => {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-[32px]
        border
        border-dashed
        border-white/[0.08]
        bg-[#111113]
        px-6
        py-20
        text-center
      "
    >
      <div
        className="
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-[28px]
          bg-blue-500/10
          text-blue-400
        "
      >
        <HiOutlineLightningBolt className="text-5xl" />
      </div>

      <h2 className="mt-8 text-3xl font-bold text-white">
        No Sprints Found
      </h2>

      <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400">
        No sprint has been created for this
        workspace yet. Create your first
        sprint to start agile workflow
        management.
      </p>

      <button
        onClick={onCreate}
        className="
          mt-8
          flex
          h-12
          items-center
          gap-2
          rounded-2xl
          bg-gradient-to-r
          from-blue-500
          to-indigo-500
          px-5
          text-sm
          font-medium
          text-white
        "
      >
        <HiOutlinePlusCircle className="text-lg" />

        Create Sprint
      </button>
    </div>
  );
};