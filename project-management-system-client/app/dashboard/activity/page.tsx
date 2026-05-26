"use client";

import { ActivitySection } from "./_components/ActivitySection";

export default function ActivityPage() {
  return (
    <div
      className="
        space-y-4

        sm:space-y-5
        lg:space-y-6
      "
    >
      {/* HEADER */}
      <div>
        <h1
          className="
            text-2xl
            font-black
            text-white

            sm:text-3xl
            lg:text-4xl
          "
        >
          Activity Timeline
        </h1>

        <p
          className="
            mt-2

            text-[11px]
            leading-6
            text-zinc-500

            sm:text-sm
          "
        >
          Monitor recent task workflow,
          sprint updates,
          and collaboration history.
        </p>
      </div>

      {/* SECTION */}
      <ActivitySection />
    </div>
  );
}