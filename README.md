# Investment Decision-Making Game

A web application that simulates a multiplayer investment game to illustrate how individual decisions affect collective outcomes. Players (2–4) each allocate $100 between a riskless asset and a pooled asset, then see how their choices compare.

**Tech stack:** Vue 3, TypeScript, Tailwind CSS v4, shadcn-vue, Vite

## Demo

https://github.com/user-attachments/assets/3a653833-5122-40e7-8964-9b69b86115a4

**Assumptions:**
- Players share a single device and take turns entering allocations privately.
- All game logic runs client-side — no backend, database, or user accounts are needed for this MVP.
- Allocations are hidden between turns to preserve independent decision-making.

---

## Deployment & Operations

### 1. Learning Design

> Briefly explain (in 1–2 lines) how your design helps learners understand the concept of the content.

Players make their allocations one at a time without seeing others' choices, then the results table reveals everyone's payouts side by side. This lets learners directly experience the tension between playing it safe (Asset A) and contributing to the group (Asset B).

### 2. Deployment Approach

> If this application were to be made available to students via a web browser, what kind of security practices would you implement? Briefly explain your choice and why it is suitable for this type of application.

This app is a static site with no backend, no user accounts, and no stored data, so the attack surface is minimal. The key practices:

- **HTTPS** — enforced by default on platforms like Vercel or Netlify, protecting the page from tampering in transit.
- **Input validation** — already implemented. Allocations are constrained to whole numbers 0–100, and Asset B is derived automatically, so there's no path for bad input to affect calculations.

These are sufficient because the app collects no personal information and runs entirely in the browser. If it were extended to include user accounts or saved data, I would add authentication (e.g. university SSO) and server-side validation.

### 3. Scaling & Multiple Sessions

> How would you implement multiplayer in a way that ensures state persistence and reliability?

The current MVP is single-device — players share one browser. To support remote multiplayer:

- **Room system** — A host creates a game room and gets a short join code. Other players enter the code to join the same session.
- **WebSockets (Socket.io)** — For real-time communication. The server broadcasts events (player joined, allocation submitted, results ready) to everyone in the room.
- **Server-side state** — Move game state to the server (e.g. a Node.js/Express backend) so no single client controls the truth. Store active sessions in memory or a simple database like SQLite.
- **Database for history** — Save completed game results to a database (e.g. PostgreSQL) so instructors can review past sessions.

This keeps the implementation straightforward while supporting multiple concurrent game rooms with reliable state.
