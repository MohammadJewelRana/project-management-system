// // ======================================================
// // app/dashboard/member/projects/_components/MemberProjectCard.tsx
// // ======================================================

// "use client";

// import Link from "next/link";

// import { motion } from "framer-motion";

// import {
//   HiOutlineArrowRight,
//   HiOutlineCalendar,
//   HiOutlineClipboardList,
//   HiOutlineCollection,
// } from "react-icons/hi";

// interface Props {
//   project: any;
// }

// export const MemberProjectCard = ({
//   project,
// }: Props) => {
//   return (
//     <motion.div
//       whileHover={{
//         y: -4,
//       }}
//       className="
//         overflow-hidden
//         rounded-[28px]
//         border
//         border-white/[0.06]
//         bg-[#111113]
//       "
//     >
//       {/* TOP */}
//       <div className="p-5 md:p-6">
//         <div className="flex items-start justify-between gap-4">
//           <div className="min-w-0 flex-1">
//             <h2
//               className="
//                 truncate
//                 text-2xl
//                 font-black
//                 text-white
//               "
//             >
//               {project?.title}
//             </h2>

//             <p
//               className="
//                 mt-3
//                 line-clamp-3
//                 text-sm
//                 leading-7
//                 text-zinc-500
//               "
//             >
//               {project?.description}
//             </p>
//           </div>

//           <div
//             className="
//               rounded-full
//               bg-blue-500/10
//               px-3
//               py-1
//               text-xs
//               font-medium
//               capitalize
//               text-blue-400
//             "
//           >
//             {project?.status}
//           </div>
//         </div>

//         {/* PROGRESS */}
//         <div className="mt-6">
//           <div className="mb-3 flex items-center justify-between">
//             <span className="text-sm text-zinc-500">
//               Progress
//             </span>

//             <span className="text-sm font-semibold text-white">
//               {project?.progress || 0}%
//             </span>
//           </div>

//           <div className="h-3 overflow-hidden rounded-full bg-white/[0.06]">
//             <div
//               style={{
//                 width: `${project?.progress || 0}%`,
//               }}
//               className="
//                 h-full
//                 rounded-full
//                 bg-gradient-to-r
//                 from-blue-500
//                 to-indigo-500
//               "
//             />
//           </div>
//         </div>

//         {/* STATS */}
//         <div className="mt-6 grid grid-cols-2 gap-4">
//           <div
//             className="
//               rounded-2xl
//               border
//               border-white/[0.06]
//               bg-white/[0.03]
//               p-4
//             "
//           >
//             <div className="flex items-center gap-3">
//               <div
//                 className="
//                   flex
//                   h-10
//                   w-10
//                   items-center
//                   justify-center
//                   rounded-2xl
//                   bg-blue-500/10
//                 "
//               >
//                 <HiOutlineClipboardList className="text-xl text-blue-400" />
//               </div>

//               <div>
//                 <p className="text-xs text-zinc-500">
//                   Tasks
//                 </p>

//                 <h4 className="text-lg font-bold text-white">
//                   {
//                     project?.totalTaskCount
//                   }
//                 </h4>
//               </div>
//             </div>
//           </div>

//           <div
//             className="
//               rounded-2xl
//               border
//               border-white/[0.06]
//               bg-white/[0.03]
//               p-4
//             "
//           >
//             <div className="flex items-center gap-3">
//               <div
//                 className="
//                   flex
//                   h-10
//                   w-10
//                   items-center
//                   justify-center
//                   rounded-2xl
//                   bg-orange-500/10
//                 "
//               >
//                 <HiOutlineCollection className="text-xl text-orange-400" />
//               </div>

//               <div>
//                 <p className="text-xs text-zinc-500">
//                   Sprints
//                 </p>

//                 <h4 className="text-lg font-bold text-white">
//                   2
//                 </h4>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* DEADLINE */}
//         <div
//           className="
//             mt-5
//             flex
//             items-center
//             gap-3
//             rounded-2xl
//             border
//             border-white/[0.06]
//             bg-white/[0.03]
//             p-4
//           "
//         >
//           <div
//             className="
//               flex
//               h-11
//               w-11
//               items-center
//               justify-center
//               rounded-2xl
//               bg-pink-500/10
//             "
//           >
//             <HiOutlineCalendar className="text-xl text-pink-400" />
//           </div>

//           <div>
//             <p className="text-xs text-zinc-500">
//               Deadline
//             </p>

//             <h4 className="text-sm font-medium text-white">
//               {new Date(
//                 project?.endDate
//               ).toLocaleDateString(
//                 "en-GB"
//               )}
//             </h4>
//           </div>
//         </div>
//       </div>

//       {/* FOOTER */}
//       <Link
//         href={`/dashboard/member/projects/${project?._id}`}
//         className="
//           flex
//           items-center
//           justify-between
//           border-t
//           border-white/[0.06]
//           px-5
//           py-4
//           text-sm
//           font-medium
//           text-white
//           transition-all
//           hover:bg-white/[0.03]
//           md:px-6
//         "
//       >
//         View Project Details

//         <HiOutlineArrowRight className="text-lg" />
//       </Link>
//     </motion.div>
//   );
// };