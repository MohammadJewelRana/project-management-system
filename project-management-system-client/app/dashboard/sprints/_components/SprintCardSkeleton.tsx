export const SprintCardSkeleton = () => {
  return (
    <div className="min-w-0">
      <div
        className="
          w-full
          min-w-0
          animate-pulse
          overflow-hidden
          rounded-[24px]
          border
          border-white/[0.06]
          bg-[#111113]
          p-4
          sm:p-5
          md:rounded-[32px]
          md:p-6
        "
      >
        {/* TOP */}
        <div className="flex min-w-0 items-start justify-between gap-3">
          {/* LEFT */}
          <div className="min-w-0 flex-1">
            <div className="h-6 w-32 max-w-full rounded-xl bg-white/[0.06] sm:w-40" />

            <div className="mt-4 h-4 w-full rounded-lg bg-white/[0.04]" />

            <div className="mt-3 h-4 w-3/4 rounded-lg bg-white/[0.04]" />
          </div>

          {/* BADGE */}
          <div className="h-7 w-16 shrink-0 rounded-full bg-white/[0.06]" />
        </div>

        {/* DIVIDER */}
        <div className="my-5 border-t border-white/[0.06]" />

        {/* CONTENT */}
        <div className="space-y-4">
          {Array.from({
            length: 3,
          }).map((_, index) => (
            <div
              key={index}
              className="flex min-w-0 items-start gap-3"
            >
              {/* ICON */}
              <div className="h-9 w-9 shrink-0 rounded-xl bg-white/[0.06]" />

              {/* TEXT */}
              <div className="min-w-0 flex-1">
                <div className="h-3 w-16 rounded bg-white/[0.04]" />

                <div className="mt-3 h-4 w-full rounded bg-white/[0.06]" />
              </div>
            </div>
          ))}
        </div>

        {/* PROGRESS */}
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="h-4 w-20 rounded bg-white/[0.04]" />

            <div className="h-4 w-10 shrink-0 rounded bg-white/[0.06]" />
          </div>

          <div className="h-2 w-full rounded-full bg-white/[0.06]" />
        </div>

        {/* FOOTER */}
        <div
          className="
            mt-5
            flex
            min-w-0
            items-center
            justify-between
            gap-3
            rounded-2xl
            border
            border-white/[0.06]
            bg-[#18181B]
            px-4
            py-3
          "
        >
          {/* LEFT */}
          <div className="min-w-0 flex-1">
            <div className="h-3 w-20 rounded bg-white/[0.04]" />

            <div className="mt-3 h-4 w-16 rounded bg-white/[0.06]" />
          </div>

          {/* RIGHT */}
          <div className="h-8 w-16 shrink-0 rounded-full bg-white/[0.06]" />
        </div>
      </div>
    </div>
  );
};