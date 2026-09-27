# Addis Eats — Next.js App Router mini-project

## Routes

| URL | File that produces it | Notes |
|---|---|---|
| `/` | `app/page.js` | Home |
| `/menu` | `app/menu/page.js` | Lists dishes; artificially delayed 1.2s so `loading.js` is visible |
| `/menu?crash=1` | `app/menu/page.js` (throws) | Deliberate error, caught by `app/menu/error.js` |
| `/menu/[id]` (e.g. `/menu/kitfo`) | `app/menu/[id]/page.js` | Dynamic route; reads `id` from the `params` prop, not a hook |
| `/menu/crash` | `app/menu/[id]/page.js` (throws) | Same `error.js` boundary also catches errors from the nested dynamic route |
| `/menu/anything-unknown` | `app/menu/[id]/page.js` → calls `notFound()` | Renders `app/not-found.js` |
| `/cart` | `app/cart/page.js` | |
| `/checkout` | `app/checkout/page.js` | |
| any unmatched URL (e.g. `/banana`) | `app/not-found.js` | Automatic fallback |

## Not routes (by design)

`app/menu/data.js`, `app/menu/DishList.jsx`, and `app/menu/DishCard.jsx` sit
inside the `menu/` segment folder but are never turned into URLs — the App
Router only maps the reserved special filenames (`page.js`, `layout.js`,
`loading.js`, `error.js`, `not-found.js`, `route.js`, etc.) to routes.
Visiting `/menu/DishList` or `/menu/data` 404s, which is the point of the
exercise: routing disappears into the file system, and everything else is
just a regular JS/JSX module.

## How to verify each requirement

- **`npm run build`** — check the route list it prints. It should list
  exactly `/`, `/menu`, `/menu/[id]`, `/cart`, `/checkout`, and the
  not-found page — no route for `DishList` or `data`.
- **Dynamic route typed directly** — go to `http://localhost:3000/menu/kitfo`
  directly in the address bar (not by clicking a link). It works because
  it's a real server-rendered route, not client-side-only state.
- **`loading.js`** — open DevTools → Network → throttle to "Slow 3G", then
  navigate to `/menu`. You'll see the skeleton from `loading.js` before the
  dish list appears.
- **`error.js`** — visit `/menu?crash=1` (error from `page.js` itself) and
  `/menu/crash` (error from the nested dynamic route). Both should show the
  "The menu couldn't load" screen from `app/menu/error.js`, and navigating
  to `/cart` afterwards should still work normally.
- **`not-found.js`** — visit a nonsense URL like `/nothing-here`, and
  separately visit `/menu/some-fake-dish-id` (triggers `notFound()` from
  inside `[id]/page.js`). Both should render the same not-found screen.

## Next.js version note

This targets Next.js 14's stable App Router, where `params` is a plain,
synchronous prop. Next.js 15 made `params` an async value (a `Promise`). If
you're scaffolding on Next 15+, update `app/menu/[id]/page.js` to:

```js
export default async function DishPage({ params }) {
  const { id } = await params;
  // ...
}
```
