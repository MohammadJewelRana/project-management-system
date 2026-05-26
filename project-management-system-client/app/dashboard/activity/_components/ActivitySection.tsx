"use client";

import {
  HiOutlineLightningBolt,
  HiOutlineCheckCircle,
  HiOutlineChatAlt2,
  HiOutlineClock,
} from "react-icons/hi";

export const ActivitySection = () => {
  const activities = [
    {
      id: 1,
      title: "Task Status Updated",
      description:
        "Changed task status from Todo to In Progress",
      time: "5 min ago",
      icon: HiOutlineLightningBolt,
    },

    {
      id: 2,
      title: "Task Completed",
      description:
        "Completed Dashboard UI Design task",
      time: "1 hour ago",
      icon: HiOutlineCheckCircle,
    },

    {
      id: 3,
      title: "New Comment Added",
      description:
        "Added collaboration feedback on sprint task",
      time: "Yesterday",
      icon: HiOutlineChatAlt2,
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
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center

            rounded-2xl

            bg-violet-500/10

            text-violet-400
          "
        >
          <HiOutlineLightningBolt className="text-2xl" />
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
            Recent Activities
          </h2>

          <p
            className="
              mt-1

              text-[11px]
              text-zinc-500
            "
          >
            Workflow & sprint updates
          </p>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="mt-8 space-y-6">
        {activities.map(
          (activity, index) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.id}
                className="
                  relative

                  flex
                  gap-4
                "
              >
                {/* LINE */}
                {index !==
                  activities.length -
                    1 && (
                  <div
                    className="
                      absolute
                      left-5
                      top-12

                      h-full
                      w-[1px]

                      bg-white/[0.08]
                    "
                  />
                )}

                {/* ICON */}
                <div
                  className="
                    relative
                    z-10

                    flex
                    h-10
                    w-10
                    items-center
                    justify-center

                    rounded-full

                    bg-violet-500/10

                    text-violet-400
                  "
                >
                  <Icon className="text-lg" />
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  <div
                    className="
                      rounded-[18px]

                      border
                      border-white/[0.06]

                      bg-white/[0.03]

                      p-4
                    "
                  >
                    <div
                      className="
                        flex
                        flex-col
                        gap-2

                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                      "
                    >
                      <h3
                        className="
                          text-sm
                          font-bold
                          text-white
                        "
                      >
                        {
                          activity.title
                        }
                      </h3>

                      <div
                        className="
                          inline-flex
                          items-center
                          gap-1.5

                          text-[10px]
                          text-zinc-500
                        "
                      >
                        <HiOutlineClock />

                        {
                          activity.time
                        }
                      </div>
                    </div>

                    <p
                      className="
                        mt-3

                        text-[11px]
                        leading-6
                        text-zinc-400

                        sm:text-sm
                      "
                    >
                      {
                        activity.description
                      }
                    </p>
                  </div>
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};