# Responsive Menu (Day 15 Requirements)

## Features Included:

- **Viewport Tag**: Configured in `<head>` for accurate device rendering.
- **Mobile-First CSS**: Single column by default.
- **Responsive Media Queries**:
  - `min-width: 768px` -> 2 columns
  - `min-width: 1024px` -> 3 columns
- **Tasteful Motion**: `translateY(-8px) scale(1.02)` lift on hover.
- **Accessibility Guard**: Wrapped in `@media (prefers-reduced-motion: no-preference)` to respect user device preferences.
