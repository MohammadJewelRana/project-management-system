"use client";

import {
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineCollection,
} from "react-icons/hi";

export const TimeLogsSection = () => {
  const logs = [
    {
      id: 1,
      title: "Homepage UI Development",
      hours: "5h 20m",
      date: "24 May 2026",
      sprint: "Sprint Alpha",
    },

    {
      id: 2,
      title: "Task Workflow Integration",
      hours: "3h 45m",
      date: "23 May 2026",
      sprint: "Sprint Beta",
    },

    {
      id: 3,
      title: "Responsive Dashboard Fix",
      hours: "2h 15m",
      date: "22 May 2026",
      sprint: "Sprint Gamma",
    },
  ];

  return (
    <div
      className="
        rounded-[22px]

        border
        border-white/[0.06]

        bg-[#101114]

        p-4

        sm:p-5
        lg:p-6
      "
    >
      {/* HEADER */}
      <div
        className="
          flex
          flex-col
          gap-4

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-2xl

              bg-blue-500/10

              text-blue-400
            "
          >
            <HiOutlineClock className="text-2xl" />
          </div>

          <div>
            <h2
              className="
                text-lg
                font-black
                text-white

                sm:text-xl
              "
            >
              Work Sessions
            </h2>

            <p
              className="
                mt-1

                text-[11px]
                text-zinc-500
              "
            >
              Sprint productivity logs
            </p>
          </div>
        </div>

        {/* TOTAL */}
        <div
          className="
            inline-flex
            items-center
            gap-2

            rounded-2xl

            border
            border-white/[0.06]

            bg-white/[0.03]

            px-4
            py-3
          "
        >
          <span
            className="
              text-[10px]
              uppercase
              tracking-wider
              text-zinc-500
            "
          >
            Total Logged
          </span>

          <span
            className="
              text-sm
              font-black
              text-white
            "
          >
            11h 20m
          </span>
        </div>
      </div>

      {/* LIST */}
      <div className="mt-6 space-y-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="
              group

              rounded-[20px]

              border
              border-white/[0.06]

              bg-white/[0.03]

              p-4

              transition-all
              duration-300

              hover:border-blue-500/20
              hover:bg-blue-500/[0.04]
            "
          >
            <div
              className="
                flex
                flex-col
                gap-4

                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              {/* LEFT */}
              <div className="flex items-start gap-4">
                {/* ICON */}
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center

                    rounded-2xl

                    bg-blue-500/10

                    text-blue-400
                  "
                >
                  <HiOutlineClock className="text-xl" />
                </div>

                {/* CONTENT */}
                <div>
                  <h3
                    className="
                      text-sm
                      font-bold
                      text-white

                      sm:text-base
                    "
                  >
                    {log.title}
                  </h3>

                  <div
                    className="
                      mt-2

                      flex
                      flex-wrap
                      gap-3
                    "
                  >
                    {/* DATE */}
                    <div
                      className="
                        inline-flex
                        items-center
                        gap-1.5

                        text-[10px]
                        text-zinc-500
                      "
                    >
                      <HiOutlineCalendar />

                      {log.date}
                    </div>

                    {/* SPRINT */}
                    <div
                      className="
                        inline-flex
                        items-center
                        gap-1.5

                        text-[10px]
                        text-zinc-500
                      "
                    >
                      <HiOutlineCollection />

                      {log.sprint}
                    </div>
                  </div>
                </div>
              </div>

              {/* HOURS */}
              <div
                className="
                  inline-flex
                  items-center
                  justify-center

                  rounded-2xl

                  bg-gradient-to-r
                  from-blue-500
                  to-indigo-500

                  px-4
                  py-3

                  text-sm
                  font-black
                  text-white

                  shadow-[0_0_25px_rgba(59,130,246,0.35)]
                "
              >
                {log.hours}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};