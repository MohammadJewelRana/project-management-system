"use client";

export const MiniPerformanceCard =
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
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <div>
            <p
              className="
                text-[10px]
                uppercase
                tracking-wider
                text-zinc-500
              "
            >
              Sprint Velocity
            </p>

            <h2
              className="
                mt-2

                text-2xl
                font-black
                text-white

                sm:text-3xl
              "
            >
              86%
            </h2>
          </div>

          {/* CIRCLE */}
          <div
            className="
              relative

              flex
              h-20
              w-20
              items-center
              justify-center
            "
          >
            <svg
              className="
                absolute
                inset-0

                h-full
                w-full

                -rotate-90
              "
            >
              <circle
                cx="40"
                cy="40"
                r="30"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="6"
                fill="none"
              />

              <circle
                cx="40"
                cy="40"
                r="30"
                stroke="#8B5CF6"
                strokeWidth="6"
                fill="none"
                strokeDasharray="188"
                strokeDashoffset="30"
                strokeLinecap="round"
              />
            </svg>

            <span
              className="
                text-sm
                font-black
                text-white
              "
            >
              86%
            </span>
          </div>
        </div>

        <p
          className="
            mt-4

            text-[11px]
            leading-6
            text-zinc-500
          "
        >
          Team sprint completion
          performance improved this
          week.
        </p>
      </div>
    );
  };