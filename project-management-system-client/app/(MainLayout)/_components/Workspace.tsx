// components/landing/workspace-section.tsx

import {
  HiOutlineShieldCheck,
  HiOutlineTrendingUp,
} from "react-icons/hi";
 
 
import WorkspaceCard from "./WorksapaceCard";
import SectionTitle from "./SectionTitle";
import SectionContainer from "./SectionContainer";
 
 

const panels = [
  {
    title: "Admin Dashboard",
    subtitle:
      "Powerful control center for administrators and managers.",
    icon: HiOutlineShieldCheck,
    button: "Open Admin Workspace",
    color:
      "from-blue-500/10 to-indigo-500/10",
  },
  {
    title: "Team Workspace",
    subtitle:
      "Focused productivity workspace for team members.",
    icon: HiOutlineTrendingUp,
    button: "Open Team Workspace",
    color:
      "from-emerald-500/10 to-cyan-500/10",
  },
];

const WorkspaceSection = () => {
  return (
    <section className="pb-20 sm:pb-24 lg:pb-32">
      <SectionContainer>
        <SectionTitle
          title="Role-Based Workspaces"
          description="Dedicated workspaces for administrators, managers, and team members."
        />

        {/* GRID */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-2">
          {panels.map((panel) => (
            <WorkspaceCard
              key={panel.title}
              panel={panel}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

export default WorkspaceSection;