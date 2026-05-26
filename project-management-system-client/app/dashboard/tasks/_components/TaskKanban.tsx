import { TaskCard } from "./TaskCard";

interface Props {
  tasks: any[];
}

export const TaskKanban = ({
  tasks,
}: Props) => {
  const columns = [
    {
      title: "Todo",

      status: "todo",
    },

    {
      title: "In Progress",

      status: "in-progress",
    },

    {
      title: "Review",

      status: "review",
    },

    {
      title: "Done",

      status: "done",
    },

    {
      title: "Blocked",

      status: "blocked",
    },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-5">
      {columns.map((column) => {
        const columnTasks =
          tasks.filter(
            (task: any) =>
              task.status ===
              column.status
          );

        return (
          <div
            key={column.status}
            className="
              rounded-[28px]
              border
              border-white/[0.06]
              bg-[#111113]
              p-4
            "
          >
            {/* HEADER */}
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-semibold text-white">
                {column.title}
              </h3>

              <div
                className="
                  flex
                  h-8
                  min-w-[32px]
                  items-center
                  justify-center
                  rounded-full
                  bg-white/[0.06]
                  px-2
                  text-xs
                  font-medium
                  text-zinc-300
                "
              >
                {columnTasks.length}
              </div>
            </div>

            {/* TASKS */}
            <div className="space-y-4">
              {columnTasks.map(
                (task: any) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                  />
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};