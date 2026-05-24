// app/(mainLayout)/layout.tsx

 
import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* GLOBAL BACKGROUND */}
      <div className="fixed inset-0 -z-50">
        {/* Main Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.10),transparent_25%)]" />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* Blur Orbs */}
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      {/* NAVBAR */}
      <Navbar />

      {/* PAGE */}
      <div>{children}</div>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
