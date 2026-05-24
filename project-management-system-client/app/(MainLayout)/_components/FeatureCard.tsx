// components/landing/feature-card.tsx

"use client";

import { motion } from "framer-motion";

const FeatureCard = ({ feature }: any) => {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/[0.12] sm:p-6 lg:p-8"
    >
      {/* GLOW */}
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

        <p className="mt-3 text-sm leading-7 text-zinc-500 sm:text-base">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export default FeatureCard;