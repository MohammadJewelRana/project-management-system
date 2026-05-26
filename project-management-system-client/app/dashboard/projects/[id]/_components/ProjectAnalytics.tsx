"use client";

interface Props {
  project: any;
  progress: number;
}

export const ProjectHero = ({
  project,
  progress,
}: Props) => {
  return (
    <div
      className="
        rounded-[32px]
        border
        border-white/[0.06]
        bg-[#111113]
        p-6
        md:p-8
      "
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-white md:text-5xl">
            {project?.title}
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400 md:text-base">
            {project?.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <div className="rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
              {project?.status}
            </div>

            <div className="rounded-full bg-orange-500/10 px-4 py-2 text-sm text-orange-400">
              {project?.priority}
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-zinc-400">
              Progress
            </span>

            <span className="text-sm font-semibold text-white">
              {progress}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              style={{
                width: `${progress}%`,
              }}
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-blue-500
                to-indigo-500
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
};