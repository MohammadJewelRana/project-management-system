"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const data = [
  {
    day: "Mon",
    productivity: 40,
  },
  {
    day: "Tue",
    productivity: 65,
  },
  {
    day: "Wed",
    productivity: 55,
  },
  {
    day: "Thu",
    productivity: 80,
  },
  {
    day: "Fri",
    productivity: 72,
  },
  {
    day: "Sat",
    productivity: 90,
  },
  {
    day: "Sun",
    productivity: 68,
  },
];

export const DashboardAnalytics =
  () => {
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
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h2
              className="
                text-base
                font-black
                text-white

                sm:text-lg
              "
            >
              Analytics
            </h2>

            <p
              className="
                mt-1

                text-[10px]
                text-zinc-500
              "
            >
              Weekly productivity
            </p>
          </div>

          <div
            className="
              rounded-2xl

              bg-emerald-500/10

              px-3
              py-2

              text-xs
              font-bold
              text-emerald-400
            "
          >
            +18%
          </div>
        </div>

        {/* CHART */}
        <div className="mt-5 h-[180px] sm:h-[220px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id="color"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#8B5CF6"
                    stopOpacity={
                      0.7
                    }
                  />

                  <stop
                    offset="100%"
                    stopColor="#3B82F6"
                    stopOpacity={
                      0
                    }
                  />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#71717A",
                  fontSize: 10,
                }}
              />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="productivity"
                stroke="#8B5CF6"
                strokeWidth={3}
                fill="url(#color)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };