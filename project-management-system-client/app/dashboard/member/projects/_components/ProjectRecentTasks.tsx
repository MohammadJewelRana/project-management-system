"use client";

interface Props {
  tasks: any[];
}

export const ProjectRecentTasks = ({
  tasks,
}: Props) => {
  return (
    <div className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Recent Tasks
        </h2>
      </div>

      <div className="space-y-4">
        {tasks?.slice(0, 5)?.map((task) => (
          <div
            key={task?._id}
            className="rounded-2xl border border-white/[0.06] bg-black/20 p-5"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {task?.title}
                </h3>

                <p className="mt-1 text-sm text-zinc-500">
                  {task?.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                  {task?.status}
                </div>

                <div className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-400">
                  {task?.priority}
                </div>
              </div>
            </div>

            {/* BAR */}
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.05]">
              <div
                style={{
                  width: `${task?.progress || 0}%`,
                }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};