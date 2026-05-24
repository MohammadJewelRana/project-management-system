// components/ui/loading-spinner.tsx

"use client";

import { Spinner } from "@heroui/react";

type Props = {
  fullScreen?: boolean;

  text?: string;
};

const LoadingSpinner = ({
  fullScreen = false,

  text = "Loading...",
}: Props) => {
  const content = (
    <div className="flex flex-col items-center gap-5">
      {/* SPINNER */}
      <div
        className="
          flex
          h-28
          w-28
          items-center
          justify-center
          rounded-full
          border
          border-white/[0.06]
          bg-[#111113]/90
          shadow-[0_0_60px_rgba(59,130,246,0.15)]
          backdrop-blur-xl
        "
      >
        <Spinner
          size="lg"
          color="primary"
        />
      </div>

      {/* TEXT */}
      <div className="text-center">
        <h3 className="text-sm font-medium text-white">
          {text}
        </h3>

        <p className="mt-1 text-xs text-zinc-500">
          Please wait a moment
        </p>
      </div>
    </div>
  );

  // FULL SCREEN
  if (fullScreen) {
    return (
      <div
        className="
          fixed
          inset-0
          z-[99999]
          flex
          items-center
          justify-center
          bg-black/60
          backdrop-blur-md
        "
      >
        {content}
      </div>
    );
  }

  // NORMAL
  return (
    <div
      className="
        flex
        min-h-[300px]
        w-full
        items-center
        justify-center
      "
    >
      {content}
    </div>
  );
};

export default LoadingSpinner;