"use client";

import {
  HiOutlineFolder,
  HiOutlineClipboardCheck,
  HiOutlineCheckCircle,
  HiOutlineClock,
} from "react-icons/hi";

interface Props {
  totalProjects: number;

  activeProjects: number;

  totalTasks: number;

  completedTasks: number;

  loggedHours: number;
}

export const DashboardStats = ({
  totalProjects,
  activeProjects,
  totalTasks,
  completedTasks,
  loggedHours,
}: Props) => {
  const stats = [
    {
      title: "Projects",
      value: totalProjects,
      icon: HiOutlineFolder,
      gradient:
        "from-violet-500 to-indigo-500",
    },

    {
      title: "Active",
      value: activeProjects,
      icon: HiOutlineFolder,
      gradient:
        "from-blue-500 to-cyan-500",
    },

    {
      title: "Completed",
      value: completedTasks,
      icon: HiOutlineCheckCircle,
      gradient:
        "from-emerald-500 to-green-500",
    },

    {
      title: "Hours",
      value: `${loggedHours}h`,
      icon: HiOutlineClock,
      gradient:
        "from-orange-500 to-amber-500",
    },
  ];

  return (
    <div
      className="
        grid
        gap-4

        grid-cols-2

        xl:grid-cols-4
      "
    >
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              relative
              overflow-hidden

              rounded-[20px]
              sm:rounded-[24px]

              border
              border-white/[0.06]

              bg-[#101114]

              p-4
              sm:p-5
            "
          >
            {/* GLOW */}
            <div
              className={`
                absolute
                -right-10
                -top-10

                h-32
                w-32

                rounded-full

                bg-gradient-to-r
                ${item.gradient}

                opacity-10

                blur-3xl
              `}
            />

            <div className="relative z-10">
              {/* ICON */}
              <div
                className={`
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center

                  rounded-2xl

                  bg-gradient-to-r
                  ${item.gradient}

                  text-white
                `}
              >
                <Icon className="text-xl" />
              </div>

              {/* VALUE */}
              <h2
                className="
                  mt-4

                  text-2xl
                  font-black
                  text-white

                  sm:text-3xl
                "
              >
                {item.value}
              </h2>

              {/* TITLE */}
              <p
                className="
                  mt-1

                  text-xs
                  text-zinc-500

                  sm:text-sm
                "
              >
                {item.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};