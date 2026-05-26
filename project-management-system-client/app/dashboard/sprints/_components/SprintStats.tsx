"use client";

import {
  HiOutlineChartBar,
  HiOutlineLightningBolt,
  HiOutlineCheckCircle,
  HiOutlineTrendingUp,
} from "react-icons/hi";

interface Props {
  stats: {
    total: number;
    active: number;
    completed: number;
    avgProgress: number;
  };
}

export const SprintStats = ({
  stats,
}: Props) => {
  const items = [
    {
      title: "Total Sprints",
      value: stats.total,
      icon: HiOutlineChartBar,
      color:
        "bg-blue-500/10 text-blue-400",
    },
    {
      title: "Active",
      value: stats.active,
      icon: HiOutlineLightningBolt,
      color:
        "bg-orange-500/10 text-orange-400",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: HiOutlineCheckCircle,
      color:
        "bg-emerald-500/10 text-emerald-400",
    },
    {
      title: "Avg Progress",
      value: `${stats.avgProgress}%`,
      icon: HiOutlineTrendingUp,
      color:
        "bg-indigo-500/10 text-indigo-400",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              rounded-[28px]
              border
              border-white/[0.06]
              bg-[#111113]
              p-5
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-zinc-500">
                  {item.title}
                </p>

                <h3 className="mt-3 text-3xl font-bold text-white">
                  {item.value}
                </h3>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
              >
                <Icon className="text-2xl" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};