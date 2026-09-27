// app/not-found.js
//
// This renders in two distinct situations:
//  1. Any URL that doesn't match a route at all (e.g. /banana) — the
//     App Router falls back to the nearest not-found.js automatically.
//  2. Any route that explicitly calls notFound() from next/navigation
//     during render (see app/menu/[id]/page.js for an unknown dish id).
// Both paths land here because there's no more specific not-found.js
// closer to where the miss happened (e.g. no app/menu/not-found.js).

import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <h1>Page not found</h1>
      <p className="lede">
        We couldn't find what you were looking for — it may have moved, or never existed.
      </p>
      <Link href="/" className="btn-primary">Back home</Link>
    </section>
  );
}
