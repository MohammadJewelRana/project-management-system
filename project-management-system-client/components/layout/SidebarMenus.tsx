import { IconType } from "react-icons";

import {
  HiOutlineViewGrid,
  HiOutlineFolder,
  HiOutlineLightningBolt,
  HiOutlineClipboardCheck,
  HiOutlineClock,
  HiOutlineUsers,
  HiOutlineCog,
} from "react-icons/hi";

import { RiPulseLine } from "react-icons/ri";

// ======================================================
// TYPE
// ======================================================

export interface ISidebarMenu {
  title: string;

  href: string;

  icon: IconType;

  badge?: string | number;
}

// ======================================================
// SIDEBAR MENUS
// ======================================================

export const sidebarMenus: {
  superAdmin: ISidebarMenu[];

  admin: ISidebarMenu[];

  manager: ISidebarMenu[];

  member: ISidebarMenu[];
} = {
  superAdmin: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: HiOutlineViewGrid,
      badge: "New",
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
      badge: 12,
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
      badge: "5",
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
