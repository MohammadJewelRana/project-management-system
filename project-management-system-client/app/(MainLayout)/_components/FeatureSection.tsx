// components/landing/feature-section.tsx

import {
  HiOutlineFolder,
  HiOutlineClipboardCheck,
  HiOutlineViewGrid,
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlineChartBar,
} from "react-icons/hi"; 
 
import FeatureCard from "./FeatureCard";
import SectionTitle from "./SectionTitle";
import SectionContainer from "./SectionContainer";
 
 

const features = [
  {
    title: "Project Management",
    description:
      "Create and manage enterprise projects with workflow tracking.",
    icon: HiOutlineFolder,
  },
  {
    title: "Sprint Management",
    description:
      "Plan and manage agile sprints with backlog organization.",
    icon: HiOutlineViewGrid,
  },
  {
    title: "Task Workflow",
    description:
      "Assign tasks, update statuses, and track progress.",
    icon: HiOutlineClipboardCheck,
  },
  {
    title: "Team Collaboration",
    description:
      "Collaborate with members through real-time updates.",
    icon: HiOutlineUsers,
  },
  {
    title: "Time Tracking",
    description:
      "Log work hours and productivity reports.",
    icon: HiOutlineClock,
  },
  {
    title: "Reports & Analytics",
    description:
      "Visualize progress and performance insights.",
    icon: HiOutlineChartBar,
  },
];

const FeatureSection = () => {
  return (
    <section className="pb-16 sm:pb-20 lg:pb-28">
      <SectionContainer>
        <SectionTitle
          title="Enterprise Workflow Features"
          description="Production-ready project management tools built for modern teams and enterprise workflows."
        />

        {/* GRID */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-16 xl:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

export default FeatureSection;