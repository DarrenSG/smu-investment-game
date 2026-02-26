# Investment Decision-Making Game

## Project Overview
A web application that simulates a multiplayer investment decision-making game for the SMU Centre for Teaching Excellence. Players (2-4) each have $100 to allocate between two assets (Asset A: riskless, Asset B: pooled investment). Results are calculated and displayed after all players submit.

## Tech Stack
- **Framework**: Vue 3 (Composition API, `<script setup>`)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn-vue
- **Language**: TypeScript
- **Deployment**: Vercel (static site)

## Project Structure
```
src/
├── assets/          # Static assets, global CSS
├── components/      # Vue components
│   └── ui/          # shadcn-vue components
├── lib/             # Utility functions (game logic, calculations)
├── App.vue          # Root component
└── main.ts          # Entry point
```

## Game Rules
- **Asset A (Riskless)**: Returns invested amount as-is
- **Asset B (Pooled)**: All players' B investments are pooled, increased by 50%, then divided equally among ALL players
- Each player starts with $100, must allocate exactly $100 (whole numbers only)
- 2-4 players supported

## Conventions
- Use Composition API with `<script setup>` syntax
- Use TypeScript for all `.ts` and `.vue` files
- Keep game logic in pure functions under `src/lib/`
- Use shadcn-vue components for UI elements (buttons, inputs, cards, tables)
- Use Tailwind for layout and custom styling
- No backend - all logic is client-side
- Use `pnpm` as the package manager

## Commands
- `pnpm dev` - Start dev server
- `pnpm build` - Production build
- `pnpm preview` - Preview production build
