// src/ui/Skeleton.jsx
export default function Skeleton({ label = "Loading..." }) {
  return (
    <div role="status" aria-live="polite" className="space-y-3 p-6">
      <span className="sr-only">{label}</span>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-4 w-full animate-pulse rounded bg-gray-200" style={{ width: `${90 - i * 12}%` }} />
      ))}
    </div>
  );
}
