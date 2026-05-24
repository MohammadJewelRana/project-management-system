// components/projects/project-card-skeleton.tsx

"use client";

export function ProjectCardSkeleton() {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/[0.06]
        bg-[#111113]
        p-5
        animate-pulse
      "
    >
      {/* TOP */}
      <div className="flex items-start justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* ICON */}
          <div className="h-12 w-12 rounded-2xl bg-zinc-800" />

          {/* TITLE */}
          <div className="space-y-2">
            <div className="h-4 w-40 rounded bg-zinc-800" />

            <div className="h-3 w-24 rounded bg-zinc-800" />
          </div>
        </div>

        {/* ACTION */}
        <div className="h-10 w-10 rounded-2xl bg-zinc-800" />
      </div>

      {/* DESCRIPTION */}
      <div className="mt-5 space-y-2">
        <div className="h-3 w-full rounded bg-zinc-800" />

        <div className="h-3 w-[90%] rounded bg-zinc-800" />
      </div>

      {/* TAGS */}
      <div className="mt-5 flex gap-2">
        <div className="h-7 w-20 rounded-full bg-zinc-800" />

        <div className="h-7 w-20 rounded-full bg-zinc-800" />
      </div>

      {/* PROGRESS */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <div className="h-3 w-20 rounded bg-zinc-800" />

          <div className="h-3 w-10 rounded bg-zinc-800" />
        </div>

        {/* BAR */}
        <div className="h-2 overflow-hidden rounded-full bg-zinc-800" />

        <div className="mt-3 flex items-center justify-between">
          <div className="h-3 w-24 rounded bg-zinc-800" />

          <div className="h-3 w-16 rounded bg-zinc-800" />
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
        {/* MEMBERS */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-zinc-800" />

          <div className="h-3 w-20 rounded bg-zinc-800" />
        </div>

        {/* DATE */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-zinc-800" />

          <div className="h-3 w-20 rounded bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}
