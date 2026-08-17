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

The deck is authored in the main candidacy research repo
(`talk/slidev/`), where `public/figures` is a symlink to `../../figures`. This
repository is a deploy-only copy: to update the published slides, copy
`slides.md`, `components/`, `layouts/`, and `style.css` across, add any new
referenced figures under `public/figures/`, and push.
