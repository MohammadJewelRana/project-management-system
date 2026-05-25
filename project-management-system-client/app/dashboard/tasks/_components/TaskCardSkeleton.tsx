export const TaskCardSkeleton =
  () => {
    return (
      <div
        className="
          animate-pulse
          rounded-[28px]
          border
          border-white/[0.06]
          bg-[#111113]
          p-5
        "
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="h-6 w-40 rounded bg-white/[0.06]" />

            <div className="mt-4 h-4 w-full rounded bg-white/[0.04]" />

            <div className="mt-2 h-4 w-3/4 rounded bg-white/[0.04]" />
          </div>

          <div className="h-8 w-20 rounded-full bg-white/[0.06]" />
        </div>

        <div className="my-5 border-t border-white/[0.06]" />

        <div className="space-y-4">
          <div className="h-12 rounded-2xl bg-white/[0.04]" />

          <div className="h-12 rounded-2xl bg-white/[0.04]" />

          <div className="h-12 rounded-2xl bg-white/[0.04]" />
        </div>

        <div className="mt-6 h-2 rounded-full bg-white/[0.06]" />

        <div className="mt-6 h-14 rounded-2xl bg-white/[0.04]" />
      </div>
    );
  };