"use client";

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

interface Props {
  completedTasks: number;

  totalTasks: number;
}

export const WeeklyPerformance =
  ({
    completedTasks,
    totalTasks,
  }: Props) => {
    const percentage =
      totalTasks > 0
        ? Math.round(
            (completedTasks /
              totalTasks) *
              100,
          )
        : 0;

    const data = [
      {
        name: "Performance",
        value: percentage,
      },
    ];

    return (
      <div
        className="
          rounded-[20px]
          sm:rounded-[24px]

          border
          border-white/[0.06]

          bg-[#101114]

          p-4
          sm:p-5
        "
      >
        {/* HEADER */}
        <div>
          <h2
            className="
              text-base
              font-black
              text-white

              sm:text-lg
            "
          >
            Weekly Performance
          </h2>

          <p
            className="
              mt-1

              text-[10px]
              text-zinc-500
            "
          >
            Overall completion rate
          </p>
        </div>

        {/* CHART */}
        <div className="mt-4 h-[220px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              data={data}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={20}
                fill="#8B5CF6"
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        {/* PERCENT */}
        <div className="-mt-12 text-center">
          <h2
            className="
              text-4xl
              font-black
              text-white
            "
          >
            {percentage}%
          </h2>

          <p
            className="
              mt-1

              text-xs
              text-zinc-500
            "
          >
            Tasks Completed
          </p>
        </div>
      </div>
    );
  };