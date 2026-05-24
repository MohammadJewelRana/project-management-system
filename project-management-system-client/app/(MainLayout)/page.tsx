// app/(mainLayout)/page.tsx

"use client";

import { motion } from "framer-motion";

import {
  HiOutlineFolder,
  HiOutlineClipboardCheck,
  HiOutlineViewGrid,
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlineChartBar,
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
  HiOutlineTrendingUp,
  HiOutlineCheck,
  HiOutlineLightningBolt,
} from "react-icons/hi";

const features = [
  {
    title: "Project Management",
    description:
      "Create and manage enterprise projects with workflow tracking and milestone control.",
    icon: HiOutlineFolder,
  },
  {
    title: "Sprint Management",
    description:
      "Plan and manage agile sprints with sprint boards and backlog organization.",
    icon: HiOutlineViewGrid,
  },
  {
    title: "Task Workflow",
    description:
      "Assign tasks, update statuses, track progress, and collaborate efficiently.",
    icon: HiOutlineClipboardCheck,
  },
  {
    title: "Team Collaboration",
    description:
      "Manage members, departments, skills, and real-time project collaboration.",
    icon: HiOutlineUsers,
  },
  {
    title: "Time Tracking",
    description:
      "Log work hours, monitor productivity, and generate detailed work summaries.",
    icon: HiOutlineClock,
  },
  {
    title: "Reports & Analytics",
    description:
      "Visualize project performance, progress tracking, and team productivity insights.",
    icon: HiOutlineChartBar,
  },
];

const panels = [
  {
    title: "Admin Dashboard",
    subtitle:
      "Powerful control center for administrators and managers.",
    icon: HiOutlineShieldCheck,
    button: "Open Admin Workspace",
    color:
      "from-blue-500/10 to-indigo-500/10",
    buttonStyle:
      "from-blue-500 to-indigo-500",
    points: [
      "Project and sprint management",
      "Task assignment and monitoring",
      "Team and role management",
      "Reports and analytics overview",
    ],
  },
  {
    title: "Team Workspace",
    subtitle:
      "Focused productivity workspace for team members.",
    icon: HiOutlineTrendingUp,
    button: "Open Team Workspace",
    color:
      "from-emerald-500/10 to-cyan-500/10",
    buttonStyle:
      "from-emerald-500 to-cyan-500",
    points: [
      "Manage assigned tasks and sprints",
      "Track task progress and updates",
      "Add comments and attachments",
      "Log work hours and productivity",
    ],
  },
];

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Glow */}
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center lg:py-32">
          {/* BADGE */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400"
          >
            <HiOutlineLightningBolt className="text-base" />

            Enterprise Workflow Management
          </motion.div>

          {/* TITLE */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
            }}
            className="max-w-5xl text-5xl font-black leading-[1.05] tracking-tight text-white md:text-7xl"
          >
            Minimal Project
            <br />

            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Management System
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className="mt-8 max-w-3xl text-lg leading-8 text-zinc-400 md:text-xl"
          >
            Manage projects, organize sprints,
            assign tasks, monitor team
            productivity, and collaborate
            efficiently through powerful admin
            and member workspaces.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
            }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            {/* ADMIN */}
            <button className="group flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 px-8 text-sm font-semibold text-white shadow-[0_0_40px_rgba(59,130,246,0.35)] transition-all duration-300 hover:scale-[1.03]">
              Open Admin Workspace

              <HiOutlineArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* MEMBER */}
            <button className="group flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-8 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/[0.05]">
              Open Team Workspace

              <HiOutlineArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* DASHBOARD MOCKUP */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
            }}
            className="relative mt-24 w-full max-w-6xl"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-[40px] bg-blue-500/10 blur-[120px]" />

            {/* Window */}
            <div className="relative overflow-hidden rounded-[36px] border border-white/[0.08] bg-[#0B1120]/80 shadow-[0_20px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
              {/* TOP */}
              <div className="flex items-center gap-2 border-b border-white/[0.06] px-6 py-4">
                <div className="h-3 w-3 rounded-full bg-red-500" />

                <div className="h-3 w-3 rounded-full bg-yellow-500" />

                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>

              {/* CONTENT */}
              <div className="grid gap-6 p-6 lg:grid-cols-3">
                {/* CARD */}
                <div className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-6">
                  <p className="text-sm text-zinc-500">
                    Active Projects
                  </p>

                  <h3 className="mt-3 text-5xl font-bold text-white">
                    24
                  </h3>

                  <div className="mt-6 h-2 rounded-full bg-zinc-800">
                    <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                  </div>
                </div>

                {/* CARD */}
                <div className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-6">
                  <p className="text-sm text-zinc-500">
                    Sprint Velocity
                  </p>

                  <h3 className="mt-3 text-5xl font-bold text-white">
                    92%
                  </h3>

                  <div className="mt-6 flex items-end gap-2">
                    <div className="h-12 flex-1 rounded-t-xl bg-blue-500/20" />

                    <div className="h-20 flex-1 rounded-t-xl bg-blue-500/50" />

                    <div className="h-28 flex-1 rounded-t-xl bg-blue-500" />
                  </div>
                </div>

                {/* CARD */}
                <div className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-6">
                  <p className="text-sm text-zinc-500">
                    Productivity
                  </p>

                  <h3 className="mt-3 text-5xl font-bold text-white">
                    87%
                  </h3>

                  <div className="mt-6 flex gap-3">
                    <div className="h-20 flex-1 rounded-2xl bg-blue-500/10" />

                    <div className="h-20 flex-1 rounded-2xl bg-violet-500/10" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-6">
          {/* TITLE */}
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-white">
              Enterprise Workflow Features
            </h2>

            <p className="mt-4 text-lg text-zinc-500">
              Production-ready project management
              tools built for modern teams and
              enterprise workflows.
            </p>
          </div>

          {/* GRID */}
          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                viewport={{
                  once: true,
                }}
                whileHover={{
                  y: -6,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.03] p-8 transition-all duration-300 hover:border-white/[0.12]"
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.04] via-transparent to-violet-500/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* ICON */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                  <feature.icon className="text-[26px]" />
                </div>

                {/* CONTENT */}
                <div className="relative mt-6">
                  <h3 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-zinc-500">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PANEL SECTION */}
      <section className="pb-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* TITLE */}
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-white">
              Role-Based Workspaces
            </h2>

            <p className="mt-4 text-lg text-zinc-500">
              Dedicated workspaces for
              administrators, managers, and team
              members.
            </p>
          </div>

          {/* GRID */}
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {panels.map((panel, index) => (
              <motion.div
                key={panel.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                viewport={{
                  once: true,
                }}
                whileHover={{
                  y: -6,
                }}
                className="group relative overflow-hidden rounded-[32px] border border-white/[0.06] bg-white/[0.03] p-8 transition-all duration-300 hover:border-white/[0.12]"
              >
                {/* Glow */}
                <div
                  className={`absolute right-0 top-0 h-40 w-40 rounded-full bg-gradient-to-br ${panel.color} blur-3xl`}
                />

                {/* ICON */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] text-blue-400">
                  <panel.icon className="text-[28px]" />
                </div>

                {/* CONTENT */}
                <div className="relative mt-6">
                  <h3 className="text-3xl font-bold text-white">
                    {panel.title}
                  </h3>

                  <p className="mt-3 text-lg text-zinc-500">
                    {panel.subtitle}
                  </p>

                  {/* LIST */}
                  <div className="mt-8 space-y-4">
                    {panel.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                          <HiOutlineCheck className="text-xs" />
                        </div>

                        <p className="text-sm text-zinc-400">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* BUTTON */}
                  <button
                    className={`group mt-10 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${panel.buttonStyle} text-sm font-semibold text-white shadow-[0_0_35px_rgba(59,130,246,0.25)] transition-all duration-300 hover:scale-[1.02]`}
                  >
                    {panel.button}

                    <HiOutlineArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}