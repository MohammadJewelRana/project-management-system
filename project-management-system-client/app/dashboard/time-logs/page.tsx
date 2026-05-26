"use client";

import { TimeLogsSection } from "./_components/TimeLogSection";

 

export default function TimeLogsPage() {
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
          Time Logs
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
          Track productivity, work duration, and sprint contribution.
        </p>
      </div>

      {/* SECTION */}
      <TimeLogsSection />
    </div>
  );
}
