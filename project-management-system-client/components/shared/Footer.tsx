// components/landing/footer.tsx

import Link from "next/link";

import {
  HiOutlineLightningBolt,
  HiOutlineMail,
  HiOutlineGlobeAlt,
} from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#050816]/80 backdrop-blur-2xl">
      {/* GLOW */}
      <div className="absolute left-1/2 top-0 h-[250px] w-[250px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* LEFT */}
          <div>
            {/* LOGO */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-xl" />

                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500">
                  <HiOutlineLightningBolt className="text-[22px] text-white" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">MPMS</h3>

                <p className="text-sm text-zinc-500">
                  Enterprise Workflow Platform
                </p>
              </div>
            </div>

            {/* TEXT */}
            <p className="mt-6 max-w-md leading-7 text-zinc-500">
              Minimal Project Management System designed for administrators,
              managers, and team members to efficiently manage projects,
              sprints, workflows, and productivity.
            </p>
          </div>

          {/* CENTER */}
          <div>
            <h4 className="text-lg font-semibold text-white">
              Workspace Access
            </h4>

            <div className="mt-5 space-y-3">
              <Link
                href="/login"
                className="block text-zinc-500 transition-all duration-300 hover:text-white"
              >
                Admin Dashboard
              </Link>

              <Link
                href="/login"
                className="block text-zinc-500 transition-all duration-300 hover:text-white"
              >
                Member Workspace
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h4 className="text-lg font-semibold text-white">Tech Stack</h4>

            <div className="mt-5 flex flex-wrap gap-3">
              {[
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Node.js",
                "Express.js",
                "MongoDB",
              ].map((tech) => (
                <div
                  key={tech}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-2 text-sm text-zinc-400"
                >
                  {tech}
                </div>
              ))}
            </div>

            {/* CONTACT */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-zinc-500">
                <HiOutlineMail className="text-lg" />
                support@mpms.dev
              </div>

              <div className="flex items-center gap-3 text-zinc-500">
                <HiOutlineGlobeAlt className="text-lg" />
                Enterprise Project Management
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-sm text-zinc-500 md:flex-row">
          <p>© 2026 MPMS. All rights reserved.</p>

          <p>Built with Next.js, TypeScript & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
