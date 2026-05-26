"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#8B5CF6",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

export const TaskStatusChart = ({
  tasks,
}: any) => {
  const data = [
    {
      name: "Todo",
      value:
        tasks?.filter(
          (t: any) =>
            t.status === "todo",
        )?.length || 0,
    },

    {
      name: "Progress",
      value:
        tasks?.filter(
          (t: any) =>
            t.status ===
            "in-progress",
        )?.length || 0,
    },

    {
      name: "Review",
      value:
        tasks?.filter(
          (t: any) =>
            t.status ===
            "review",
        )?.length || 0,
    },

    {
      name: "Done",
      value:
        tasks?.filter(
          (t: any) =>
            t.status === "done",
        )?.length || 0,
    },

    {
      name: "Blocked",
      value:
        tasks?.filter(
          (t: any) =>
            t.status ===
            "blocked",
        )?.length || 0,
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
          Task Status
        </h2>

        <p
          className="
            mt-1

            text-[10px]
            text-zinc-500
          "
        >
          Current workflow state
        </p>
      </div>

      {/* CHART */}
      <div className="mt-4 h-[220px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={85}
              dataKey="value"
            >
              {data.map(
                (
                  entry: any,
                  index: number,
                ) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                ),
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* LABELS */}
      <div
        className="
          mt-3

          grid
          grid-cols-2
          gap-3
        "
      >
        {data.map(
          (
            item: any,
            index: number,
          ) => (
            <div
              key={item.name}
              className="
                flex
                items-center
                gap-2
              "
            >
              <div
                style={{
                  background:
                    COLORS[index],
                }}
                className="
                  h-2.5
                  w-2.5

                  rounded-full
                "
              />

              <span
                className="
                  text-xs
                  text-zinc-400
                "
              >
                {item.name}
              </span>
            </div>
          ),
        )}
      </div>
    </div>
  );
};