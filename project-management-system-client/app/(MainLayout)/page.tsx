"use client";

import DashboardPreview from "./_components/DashboardPreview";
import FeatureSection from "./_components/FeatureSection";
import HeroSection from "./_components/HeroSecttion";
import WorkspaceSection from "./_components/Workspace";

const HomePage = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />

      <DashboardPreview />

      <FeatureSection />

      <WorkspaceSection />
    </div>
  );
};

export default HomePage;
