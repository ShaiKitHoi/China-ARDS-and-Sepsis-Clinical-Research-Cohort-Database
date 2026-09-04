## Agent skills

### Issue tracker

Issues and specs for this repo live as GitHub issues. See `docs/agents/issue-tracker.md`.

### Triage labels

This repo uses the default triage labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, and `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

This is a single-context repo using root `CONTEXT.md` and `docs/adr/`. See `docs/agents/domain.md`.

### Website rollout

Develop and review the redesign inside `concepts/search-research-showcase/` first. Keep the repository-root production site unchanged until the prototype has passed browser review and the user explicitly approves promotion.

For the current redesign, commit and push only to the `test/update-html` feature branch. Treat `main` as production: merging into it, pushing to it, or otherwise triggering a production release requires the user's separate explicit approval after final review.
