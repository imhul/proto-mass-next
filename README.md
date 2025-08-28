## Browser Game

### Technologies Used

- [React 19](https://reactjs.org)
- [Zustand](https://zustand.docs.pmnd.rs/)
- [PixiJS](https://pixijs.com)
- [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [ESLint](https://eslint.org)

The decision to abandon [Svelte](https://svelte.dev) and [Next](https://nextjs.org) was made for obvious reasons, because this project is not about **SSR**.

### TODO:

- [x] Implement ['@pixi/react'](https://www.npmjs.com/package/@pixi/react)
- [x] Implement **Zustand** sliced store to control React & Pixi state
- [x] Added player and camera 8-direction movement
- [x] Added object collisions and zIndex reordering
- [x] Added map generation
- [x] Implement **JSON tilemap** with ['@pixi/tilemap'](https://www.npmjs.com/package/@pixi/tilemap)
- [ ] Implement map chunk generation by [rand-seed](https://www.npmjs.com/package/rand-seed)
- [x] Add enemies spawn and enemies base
- [ ] Add fight/die mechanics
- [ ] Implement [Tauri](https://tauri.app)
- [ ] Implement save/load functionality

## Motivation:

To make a browser game that combines technologies Pixi.js, React 19, and Zustand for maximum convenience in design, layout, and state control
