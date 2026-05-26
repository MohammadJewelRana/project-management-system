"use client";

import {
  HiOutlineFolder,
  HiOutlineClipboardCheck,
  HiOutlineCheckCircle,
  HiOutlineClock,
} from "react-icons/hi";

export const DashboardStats = ({
  totalProjects,
  activeProjects,
  totalTasks,
  completedTasks,
  loggedHours,
}: any) => {
  const stats = [
    {
      title: "Projects",
      value: totalProjects,
      icon: HiOutlineFolder,
      gradient:
        "from-violet-500 to-indigo-500",
    },

    {
      title: "Active Projects",
      value: activeProjects,
      icon: HiOutlineFolder,
      gradient:
        "from-blue-500 to-cyan-500",
    },

    {
      title: "Tasks Done",
      value: completedTasks,
      icon: HiOutlineCheckCircle,
      gradient:
        "from-emerald-500 to-green-500",
    },

    {
      title: "Logged Hours",
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

        sm:grid-cols-2
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

              rounded-[24px]

              border
              border-white/[0.06]

              bg-[#101114]

              p-5
            "
          >
            <div
              className={`
                absolute
                -right-10
                -top-10

                h-40
                w-40

                rounded-full

                bg-gradient-to-r
                ${item.gradient}

                opacity-10

                blur-3xl
              `}
            />

            <div className="relative z-10">
              <div
                className={`
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center

                  rounded-2xl

                  bg-gradient-to-r
                  ${item.gradient}

                  text-white
                `}
              >
                <Icon className="text-2xl" />
              </div>

              <h2
                className="
                  mt-5

                  text-4xl
                  font-black
                  text-white
                "
              >
                {item.value}
              </h2>

              <p
                className="
                  mt-2

                  text-sm
                  text-zinc-500
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