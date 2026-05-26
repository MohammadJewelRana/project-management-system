"use client";

import React from "react";

import { motion } from "framer-motion";

import {
  HiOutlineCog,
  HiOutlineSparkles,
  HiOutlineClock,
} from "react-icons/hi";

const Page = () => {
  return (
    <div
      className="
        relative
        flex
        min-h-[calc(100vh-90px)]
        items-center
        justify-center
        overflow-hidden
        rounded-[24px]
      
      
     
        py-8
      
        md:min-h-[calc(100vh-120px)]
        md:rounded-[32px]
        md:p-6
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[260px]
          w-[260px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-500/10
          blur-3xl
          sm:h-[320px]
          sm:w-[320px]
          md:h-[420px]
          md:w-[420px]
        "
      />

      {/* CARD */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="
          relative
          z-10
          w-full
          max-w-2xl
          overflow-hidden
          rounded-[28px]
       
          p-2
         
          md:rounded-[36px]
          md:p-12
        "
      >
        {/* TOP ICON */}
        <div className="flex justify-center">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-[24px]
              border
              border-blue-500/20
              bg-blue-500/10
              text-blue-400
              shadow-[0_0_40px_rgba(59,130,246,0.25)]
              sm:h-24
              sm:w-24
              sm:rounded-[28px]
            "
          >
            <HiOutlineCog className="text-4xl sm:text-5xl" />
          </motion.div>
        </div>

        {/* CONTENT */}
        <div className="mt-8 text-center sm:mt-10">
          {/* BADGE */}
          <div
            className="
              mx-auto
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-emerald-500/20
              bg-emerald-500/10
              px-3
              py-2
              text-xs
              font-medium
              text-emerald-400
              sm:px-4
              sm:text-sm
            "
          >
            <HiOutlineSparkles className="text-base sm:text-lg" />
            New Features Coming
          </div>

          {/* TITLE */}
          <h1
            className="
              mt-5
              text-3xl
              font-bold
              tracking-tight
              text-white
              sm:text-4xl
              md:mt-6
              md:text-5xl
            "
          >
            Settings Page
            <span
              className="
                mt-1
                block
                bg-gradient-to-r
                from-blue-400
                to-indigo-400
                bg-clip-text
                text-transparent
              "
            >
              Under Development
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              text-sm
              leading-7
              text-zinc-400
              sm:text-base
              md:mt-5
            "
          >
            We’re currently building a powerful settings experience including
            profile customization, workspace preferences, notifications,
            security options, integrations, and much more.
          </p>

          {/* STATUS */}
          <div
            className="
              mt-8
              flex
              flex-col
              gap-4
              md:mt-10
              md:flex-row
              md:items-center
              md:justify-center
            "
          >
            {/* STATUS CARD */}
            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/[0.06]
                bg-[#111113]
                px-4
                py-4
                sm:px-5
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-orange-500/10
                  text-orange-400
                  sm:h-12
                  sm:w-12
                "
              >
                <HiOutlineClock className="text-xl sm:text-2xl" />
              </div>

              <div className="text-left">
                <p className="text-xs text-zinc-500 sm:text-sm">
                  Current Status
                </p>

                <h4 className="text-sm font-semibold text-white sm:text-base">
                  Work in Progress
                </h4>
              </div>
            </div>

            {/* STATUS CARD */}
            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/[0.06]
                bg-[#111113]
                px-4
                py-4
                sm:px-5
              "
            >
              <div
                className="
                  h-3
                  w-3
                  animate-pulse
                  rounded-full
                  bg-emerald-400
                "
              />

              <div className="text-left">
                <p className="text-xs text-zinc-500 sm:text-sm">Development</p>

                <h4 className="text-sm font-semibold text-white sm:text-base">
                  Active & Ongoing
                </h4>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-10 border-t border-white/[0.06] pt-5 md:mt-12">
            <p className="text-xs text-zinc-500 sm:text-sm">
              Upcoming modules will be available soon in the next updates.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
