export default function TripSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Hero */}
      <div className="bg-slate-900 rounded-3xl p-8">
        <div className="h-10 bg-slate-800 rounded w-64 mb-4"></div>

        <div className="h-5 bg-slate-800 rounded w-96 mb-4"></div>

        <div className="flex gap-2">
          <div className="h-8 w-20 bg-slate-800 rounded-full"></div>
          <div className="h-8 w-24 bg-slate-800 rounded-full"></div>
          <div className="h-8 w-28 bg-slate-800 rounded-full"></div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-slate-900 rounded-2xl h-32" />
        ))}
      </div>

      {/* Hotels */}
      <div className="space-y-4">
        <div className="h-8 bg-slate-800 rounded w-48"></div>

        {[1, 2].map((item) => (
          <div key={item} className="bg-slate-900 rounded-2xl h-40" />
        ))}
      </div>
    </div>
  );
}
