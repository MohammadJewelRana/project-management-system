// components/skeletons/team-card-skeleton.tsx

"use client";

interface Props {
  count?: number;
}

export const TeamCardSkeleton = ({ count = 6 }: Props) => {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({
        length: count,
      }).map((_, index) => (
        <div
          key={index}
          className="
            animate-pulse
            overflow-hidden
            rounded-[34px]
            border
            border-white/[0.06]
            bg-[#111113]
            p-5
          "
        >
          {/* TOP */}
          <div className="flex items-start justify-between gap-3">
            {/* USER */}
            <div className="flex items-center gap-4">
              {/* AVATAR */}
              <div
                className="
                  h-16
                  w-16
                  rounded-3xl
                  bg-white/[0.06]
                "
              />

              {/* INFO */}
              <div>
                {/* NAME */}
                <div className="h-5 w-32 rounded-lg bg-white/[0.06]" />

                {/* DESIGNATION */}
                <div className="mt-3 h-4 w-24 rounded-lg bg-white/[0.04]" />

                {/* ROLE */}
                <div className="mt-4 h-7 w-20 rounded-full bg-white/[0.06]" />
              </div>
            </div>

            {/* ACTION */}
            <div
              className="
                h-10
                w-10
                rounded-2xl
                bg-white/[0.06]
              "
            />
          </div>

          {/* DIVIDER */}
          <div className="my-5 border-t border-white/[0.06]" />

          {/* EMAIL */}
          <div
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/[0.04]
              bg-[#18181B]
              px-4
              py-3
            "
          >
            {/* ICON */}
            <div
              className="
                h-11
                w-11
                rounded-2xl
                bg-white/[0.06]
              "
            />

            {/* TEXT */}
            <div className="flex-1">
              <div className="h-3 w-16 rounded bg-white/[0.04]" />

              <div className="mt-3 h-4 w-full rounded bg-white/[0.06]" />
            </div>
          </div>

          {/* DEPARTMENT */}
          <div
            className="
              mt-3
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/[0.04]
              bg-[#18181B]
              px-4
              py-3
            "
          >
            {/* ICON */}
            <div
              className="
                h-11
                w-11
                rounded-2xl
                bg-white/[0.06]
              "
            />

            {/* TEXT */}
            <div className="flex-1">
              <div className="h-3 w-20 rounded bg-white/[0.04]" />

              <div className="mt-3 h-4 w-28 rounded bg-white/[0.06]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
