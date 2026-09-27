# Profile.md — Adding Dishes to the Cart

## How to reproduce this session

1. Install the React DevTools browser extension and open the **Profiler** tab.
2. Click the record button.
3. Type a few characters into the menu search box, then add 2–3 dishes to the cart.
4. Stop recording and inspect the flamegraph / ranked chart for each commit.

## What I found (before the fix)

Originally, `search` (the menu filter text) lived as state in `App`, alongside
the cart items, and was passed down as props:

```jsx
// BEFORE — App.jsx
function App() {
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);

  return (
    <>
      <Menu search={search} onSearchChange={setSearch} onAdd={...} />
      <Cart items={cartItems} />
    </>
  );
}
```

Every keystroke in the search box re-rendered `App`, which re-rendered
**both** `Menu` and `Cart` — even though the cart's data hadn't changed at
all. In the Profiler's ranked chart, `Cart` showed up on nearly every commit
while the search input was being typed into, at roughly **1.8–2.4 ms** per
commit purely from re-rendering a component whose props were identical.

**Slowest component during "adding dishes":** `DishCard`, because the `Menu`
list was re-created (and every `DishCard` re-rendered) on each keystroke —
not because dish rendering itself is expensive, but because nothing was
memoized and every `DishCard` received a brand-new inline `onAdd` function
each render, defeating any shallow-comparison optimization.

## The fix

Two changes, in order of how much they mattered:

1. **Moved `search` state down into `Menu`** (see `src/components/Menu.jsx`).
   It's only ever read by `Menu`, so there's no reason for it to live above
   it. This alone stopped `Cart` from re-rendering on keystrokes, since
   `Cart` now only re-renders when `CartContext`'s value actually changes.
2. **Memoized `DishCard` with `React.memo`**, combined with a stable
   `onAdd` callback from `useCallback` in `Menu`. This was the "memo if you
   must" fallback — it only helps *because* the callback reference is now
   stable; memoizing alone without the stable callback would have done
   nothing.

## Measurement after the fix

Repeating the same steps (typing in search, adding 3 dishes):

| | Before | After |
|---|---|---|
| `Cart` re-renders while typing in search | 7 (once per keystroke) | 0 |
| `Cart` render cost per commit | ~1.8–2.4 ms | — (not re-rendered) |
| `DishCard` re-renders per keystroke (6 dishes) | 6 | 0–1 (only the filtered subset re-renders, and only because the list itself changed) |
| Commit count for "type 'doro', add 1 item" | 5 commits | 5 commits, but 3 fewer components touched per commit |

**Net result:** the cart panel is now fully isolated from menu-filtering
state, and the dish grid only re-renders components whose actual displayed
data changed.

## What I deliberately did *not* optimize

- `Checkout` and `Receipt` are not memoized — they're lazy-loaded route
  components that mount once per navigation; there's no repeated-render cost
  to justify the complexity.
- `Cart`'s total is computed with `useMemo` in `CartContext`, but I didn't
  add memoization inside `Cart` itself — its own render is cheap (a short
  list) and DevTools showed no measurable win from doing so.

> Replace the numbers above with your own DevTools Profiler readings before
> submitting — these are representative example values, not a substitute
> for your own recorded session.
