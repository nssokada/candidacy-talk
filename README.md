# Candidacy talk

[Slidev](https://sli.dev) deck for Noah Okada's candidacy exam, published to
GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Local

```bash
pnpm install
pnpm dev      # http://localhost:3030
pnpm build    # static site into dist/
```

## Deployment notes

- The site is a **project page**, served from `/<repo-name>/`, so CI builds with
  `slidev build --base "/<repo-name>/"`. The base is read from the repo name, so
  renaming the repo does not break asset paths.
- Vite rewrites root-absolute asset paths (`/figures/...`) in markdown and plain
  HTML, but **not in Vue component props**. `components/CropVideo.vue` therefore
  prefixes `import.meta.env.BASE_URL` itself. Any new component that takes an
  asset path as a prop must do the same, or it will 404 under the sub-path.
- `public/figures/` holds only the assets the deck actually references. The
  source project also contains large `.mov` originals (279 MB and 157 MB); those
  exceed GitHub's 100 MB per-file limit and are deliberately excluded. The deck
  uses the re-encoded `.mp4` versions.

## Source of truth

The deck is authored in the main candidacy research repo (`talk/slidev/`),
where `public/figures` is a symlink to `../../figures`. This repository is a
deploy-only copy.

To update the published slides:

1. Copy `slides.md`, `layouts/`, and `style.css` across.
2. Copy `components/` across **except `CropVideo.vue`** — see the warning below.
3. Add any newly referenced figures under `public/figures/` (real files, not a
   symlink — CI has no access to the research repo).
4. Commit and push; the workflow rebuilds and redeploys.

> **Do not overwrite `components/CropVideo.vue` from the source repo.** This
> copy carries the `import.meta.env.BASE_URL` fix described above, and the
> source repo's version does not. Overwriting it makes the gameplay video 404
> on the deployed site while still working locally — a silent regression.
>
> The cleaner long-term fix is to port that change back into the source repo's
> `CropVideo.vue`; it is a no-op in local development, where `BASE_URL` is `/`.

After any deploy, confirm the at-risk asset actually resolves:

```bash
curl -sI https://nssokada.github.io/candidacy-talk/figures/02-study1-foraging/gameplay_winloss.mp4 | head -1
```
