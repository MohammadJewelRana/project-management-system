

// app/(mainLayout)/(home)/page.tsx

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm text-zinc-500">
          Home / Dashboard
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
      </div>

      {/* Example Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-3xl border border-zinc-800 bg-[#161616] p-6 shadow-lg transition hover:border-zinc-700"
          >
            <p className="text-sm text-zinc-500">
              Total Projects
            </p>

            <h2 className="mt-4 text-4xl font-bold text-white">
              24
            </h2>

            <p className="mt-3 text-sm text-emerald-500">
              +3 this month
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}