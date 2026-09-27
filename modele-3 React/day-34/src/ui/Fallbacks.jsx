// src/ui/Fallbacks.jsx
export function MenuUnavailable({ reset }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
      <p className="font-medium">The menu couldn't load.</p>
      <p className="mt-1 text-red-600">Your cart is safe — try reloading just the menu.</p>
      <button
        onClick={reset}
        className="mt-3 rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
      >
        Reload menu
      </button>
    </div>
  );
}

export function CartUnavailable({ reset }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center text-sm text-amber-800">
      <p className="font-medium">Your cart couldn't load.</p>
      <p className="mt-1 text-amber-700">You can keep browsing the menu while we fix this.</p>
      <button
        onClick={reset}
        className="mt-3 rounded-md bg-amber-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-700"
      >
        Reload cart
      </button>
    </div>
  );
}
