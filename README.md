Migrated Portfolio to React

- Migrated the project from static files (HTML, PHP, CSS) to a React-based structure.
  - Set new default branch to REACT-MIGRATION
- Set up Vite as the build tool for fast development.
- Excluded all php components, and refactored their function
  - Updated `SunRays.jsx`: Changed layout
  - Updated `useSunRaysAnimation.jsx`: Modified to work with new ID's and imports
- Organized components into a modular structure with colocated CSS Modules:
  - `ButtonClassic` and `ButtonCreative` components.
  - `CelestialObjects` component with SVG assets and animations.
  - `NavigationButtons` component with orbit animations using a custom hook (`useOrbitAnimation`).
  - `CodeRemarks` component for floating code snippets.
- Moved assets (e.g., SVGs) to the `src/assets` directory and updated imports to use relative paths.
- Refactored CSS to use CSS Modules for scoped styles:
  - Converted global styles to component-specific styles.
  - Scoped animations and layout styles to their respective components.
- Added routing using `react-router-dom`:
  - Created a landing page with `ButtonClassic` and `ButtonCreative` for navigation.
  - Added routes for `/classic` and `/creative` modes.