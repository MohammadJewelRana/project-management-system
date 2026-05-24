// components/landing/hero-section.tsx

"use client";

import { motion } from "framer-motion";

import {
  HiOutlineArrowRight,
  HiOutlineLightningBolt,
} from "react-icons/hi";
import SectionContainer from "./SectionContainer";
 

 

const  HeroSection=() => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-32">
      {/* GLOW */}
      <div className="absolute left-1/2 top-0 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px] sm:h-[500px] sm:w-[500px]" />

      <SectionContainer>
        <div className="flex flex-col items-center text-center">
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
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs text-blue-400 sm:text-sm"
          >
            <HiOutlineLightningBolt className="text-sm sm:text-base" />

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
            className="max-w-5xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
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
            className="mt-6 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base lg:text-xl lg:leading-9"
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
            className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
          >
            {/* ADMIN */}
            <button className="group flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 px-6 text-sm font-semibold text-white shadow-[0_0_40px_rgba(59,130,246,0.35)] transition-all duration-300 hover:scale-[1.03] sm:h-12 sm:w-auto lg:h-14 lg:px-8">
              Open Admin Workspace

              <HiOutlineArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* MEMBER */}
            <button className="group flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/[0.05] sm:h-12 sm:w-auto lg:h-14 lg:px-8">
              Open Team Workspace

              <HiOutlineArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </SectionContainer>
    </section>
  );
}

export default HeroSection;