// components/auth/auth-card.tsx

export function AuthCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-[36px] border border-white/[0.08] bg-[#0B1120]/85 p-6 shadow-[0_25px_120px_rgba(0,0,0,0.45)] backdrop-blur-3xl sm:p-8 lg:p-10">
      {/* TOP GLOW */}
      <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

      {/* BOTTOM GLOW */}
      <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

      {/* BORDER EFFECT */}
      <div className="absolute inset-0 rounded-[36px] border border-white/[0.04]" />

      {/* CONTENT */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}