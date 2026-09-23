# Fortnightly skill sync

Run this on a schedule every two weeks, or when `ConquestCapital/site` changes under `frontend/src/data/skill-packages` or `frontend/src/data/skills`.

Checkout `AutoRFP/bid-manager-skills`. Run `npm install`, then `npm run sync`. If `skills/` changed, open a pull request against `main` with the title `Sync marketing skills` and a body that lists added, removed, and updated skill folders. Do not edit skill prose by hand. Do not import skills in `scripts/sync-config.json` `denyPackageIds`. Do not delete the protected AutoRFP MCP skills.

The marketing site is the source of truth. `SOURCE.md` in each synced skill records the repo and sha.
