export default function Loading({ label }) {
  return (
    <div className="state-message" role="status">
      {label || "Loading..."}
    </div>
  );
}
