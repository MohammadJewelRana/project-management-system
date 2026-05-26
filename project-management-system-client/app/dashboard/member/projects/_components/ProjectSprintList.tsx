"use client";

interface Props {
  sprints: any[];
}

export const ProjectSprintList = ({
  sprints,
}: Props) => {
  return (
    <div className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Project Sprints
        </h2>
      </div>

      <div className="space-y-4">
        {sprints?.map((sprint, index) => (
          <div
            key={sprint?._id}
            className="rounded-2xl border border-white/[0.06] bg-black/20 p-5"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm text-zinc-500">
                  Sprint {index + 1}
                </p>

                <h3 className="mt-1 text-xl font-bold text-white">
                  {sprint?.name}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                  {sprint?.status}
                </div>

                <div className="rounded-full bg-white/[0.05] px-3 py-1 text-xs text-zinc-300">
                  {sprint?.progress || 0}%
                </div>
              </div>
            </div>

            {/* BAR */}
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.05]">
              <div
                style={{
                  width: `${sprint?.progress || 0}%`,
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