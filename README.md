# Mandoos Console

A single-file, offline personal executive organiser — built for daily use on a Samsung Galaxy Fold, in both folded and unfolded configurations.

## What it is

Mandoos Console is a vanilla HTML/JS/CSS app with **no server, no external dependencies, and no sync**. All data is stored in your browser's `localStorage`.

Six functional areas:
- **Vault** — unshaped capture
- **Today** — ICE-scored (Impact × Urgency) pulled priorities
- **Actions** — delegated execution with assignee tracking
- **Decisions** — reasoning-locked decision journal
- **Log** — filtered history and search
- **Setup** — configuration, analysis reports, help & guide

## Running it

Just open `index.html` in any modern browser — no build step, no install.

If this repo has GitHub Pages enabled, it's also live at:
`https://<your-username>.github.io/mandoos-console/`

## ⚠️ Important: data does not sync across devices

Because data lives in `localStorage`, each browser/device has its own separate copy. Opening the live URL on your phone and your laptop gives you the *same app* but *different data* on each. This is a known limitation — see project notes for planned sync work.

## Status

v1.5 — ground-up rebuild after the original architecture was found structurally flawed. Core phases (0–7) complete. Arabic/RTL support (Phase 8) not yet started.
