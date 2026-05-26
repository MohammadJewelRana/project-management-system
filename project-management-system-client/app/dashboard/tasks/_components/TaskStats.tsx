import {
  HiOutlineCheckCircle,
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineRefresh,
} from "react-icons/hi";

interface Props {
  stats: {
    total: number;

    completed: number;

    inProgress: number;

    review: number;
  };
}

export const TaskStats = ({
  stats,
}: Props) => {
  const items = [
    {
      title: "Total Tasks",

      value: stats.total,

      icon: (
        <HiOutlineClipboardList className="text-2xl text-blue-400" />
      ),

      bg: "bg-blue-500/10",
    },

    {
      title: "Completed",

      value: stats.completed,

      icon: (
        <HiOutlineCheckCircle className="text-2xl text-emerald-400" />
      ),

      bg: "bg-emerald-500/10",
    },

    {
      title: "In Progress",

      value: stats.inProgress,

      icon: (
        <HiOutlineRefresh className="text-2xl text-orange-400" />
      ),

      bg: "bg-orange-500/10",
    },

    {
      title: "Review",

      value: stats.review,

      icon: (
        <HiOutlineClock className="text-2xl text-pink-400" />
      ),

      bg: "bg-pink-500/10",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
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
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">
                {item.title}
              </p>

              <h3 className="mt-3 text-3xl font-bold text-white">
                {item.value}
              </h3>
            </div>

            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
            >
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};