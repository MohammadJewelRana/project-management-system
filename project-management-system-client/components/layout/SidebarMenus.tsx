import {
  HiOutlineViewGrid,
  HiOutlineFolder,
  HiOutlineLightningBolt,
  HiOutlineClipboardCheck,
  HiOutlineClock,
  HiOutlineChartBar,
  HiOutlineUsers,
  HiOutlineCog,
} from "react-icons/hi";

import { RiPulseLine } from "react-icons/ri";

export const sidebarMenus = {
  superAdmin: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: HiOutlineViewGrid,
    },
    {
      title: "Projects",
      href: "/dashboard/projects",
      icon: HiOutlineFolder,
    },
    {
      title: "Sprints",
      href: "/dashboard/sprints",
      icon: HiOutlineLightningBolt,
    },
    {
      title: "Tasks",
      href: "/dashboard/tasks",
      icon: HiOutlineClipboardCheck,
    },
    {
      title: "Time Logs",
      href: "/dashboard/time-logs",
      icon: HiOutlineClock,
    },
    {
      title: "Team",
      href: "/dashboard/team",
      icon: HiOutlineUsers,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: HiOutlineChartBar,
    },
    {
      title: "Activity",
      href: "/dashboard/activity",
      icon: RiPulseLine,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: HiOutlineCog,
    },
  ],

  admin: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: HiOutlineViewGrid,
    },
    {
      title: "Projects",
      href: "/dashboard/projects",
      icon: HiOutlineFolder,
    },
    {
      title: "Sprints",
      href: "/dashboard/sprints",
      icon: HiOutlineLightningBolt,
    },
    {
      title: "Tasks",
      href: "/dashboard/tasks",
      icon: HiOutlineClipboardCheck,
    },
    {
      title: "Team",
      href: "/dashboard/team",
      icon: HiOutlineUsers,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: HiOutlineChartBar,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: HiOutlineCog,
    },
  ],

  manager: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: HiOutlineViewGrid,
    },
    {
      title: "Projects",
      href: "/dashboard/projects",
      icon: HiOutlineFolder,
    },
    {
      title: "Tasks",
      href: "/dashboard/tasks",
      icon: HiOutlineClipboardCheck,
    },
    {
      title: "Sprints",
      href: "/dashboard/sprints",
      icon: HiOutlineLightningBolt,
    },

    {
      title: "Activity",
      href: "/dashboard/activity",
      icon: RiPulseLine,
    },
  ],

  member: [
    {
      title: "Dashboard",
      href: "/dashboard/member",
      icon: HiOutlineViewGrid,
    },
    {
      title: "My Projects",
      href: "/dashboard/member/projects",
      icon: HiOutlineFolder,
    },
    {
      title: "Sprints",
      href: "/dashboard/member/sprints",
      icon: HiOutlineLightningBolt,
    },
    {
      title: "My Tasks",
      href: "/dashboard/member/tasks",
      icon: HiOutlineClipboardCheck,
    },
    {
      title: "Time Logs",
      href: "/dashboard/time-logs",
      icon: HiOutlineClock,
    },
    {
      title: "Activity",
      href: "/dashboard/activity",
      icon: RiPulseLine,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: HiOutlineCog,
    },
  ],
};
