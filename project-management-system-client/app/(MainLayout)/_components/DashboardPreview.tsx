// components/landing/dashboard-preview.tsx

import SectionContainer from "./SectionContainer";

 

 

const DashboardPreview = () => {
  return (
    <section className="pb-16 sm:pb-20 lg:pb-32">
      <SectionContainer>
        <div className="relative">
          {/* GLOW */}
          <div className="absolute inset-0 rounded-[30px] bg-blue-500/10 blur-[100px]" />

          {/* WINDOW */}
          <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0B1120]/80 shadow-[0_20px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:rounded-[36px]">
            {/* TOP */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-4 sm:px-6">
              <div className="h-3 w-3 rounded-full bg-red-500" />

              <div className="h-3 w-3 rounded-full bg-yellow-500" />

              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>

            {/* CONTENT */}
            <div className="grid gap-4 p-4 sm:gap-6 sm:p-6 lg:grid-cols-3">
              {/* CARD */}
              <div className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6">
                <p className="text-sm text-zinc-500">
                  Active Projects
                </p>

                <h3 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
                  24
                </h3>

                <div className="mt-6 h-2 rounded-full bg-zinc-800">
                  <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                </div>
              </div>

              {/* CARD */}
              <div className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6">
                <p className="text-sm text-zinc-500">
                  Sprint Velocity
                </p>

                <h3 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
                  92%
                </h3>

                <div className="mt-6 flex items-end gap-2">
                  <div className="h-12 flex-1 rounded-t-xl bg-blue-500/20" />

                  <div className="h-20 flex-1 rounded-t-xl bg-blue-500/50" />

                  <div className="h-28 flex-1 rounded-t-xl bg-blue-500" />
                </div>
              </div>

              {/* CARD */}
              <div className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6">
                <p className="text-sm text-zinc-500">
                  Productivity
                </p>

                <h3 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
                  87%
                </h3>

                <div className="mt-6 flex gap-3">
                  <div className="h-20 flex-1 rounded-2xl bg-blue-500/10" />

                  <div className="h-20 flex-1 rounded-2xl bg-violet-500/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export default DashboardPreview;