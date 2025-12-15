# Portfolio - React Migration

## Migration Overview

- Migrated the project from static files (HTML, PHP, CSS) to a React-based structure.
  - Set new default branch to REACT-MIGRATION 
- Set up Vite as the build tool for fast development.
- Organized components into a modular structure with component-scoped CSS Modules:
  - Example: `ButtonClassic` and `ButtonCreative` components.
  - Refactored CSS to use CSS Modules for scoped styles:
    - Converted global styles to component-specific styles.
    - Animations and styles are related to their respective components.
- Moved assets (e.g., SVGs) to the `src/assets` directory and updated imports.
- Added routing using `react-router-dom`:
  - Created a landing page with `ButtonClassic` and `ButtonCreative` for navigation.
  - Added routes for `/classic` and `/creative` modes.