# Figure Inventory — Candidacy Talk & Proposal

Master index. Every figure has a stable **ID** (`F<section>.<n>`) referenced by
both `talk/slides.md` and `talk/proposal-outline.md`. Detailed specs live in each
section directory's `NEEDS.md`. Finished assets go in the same directory.

```
talk/figures/
├── FIGURES.md              ← this file (index + triage)
├── 01-framing/NEEDS.md
├── 02-study1-foraging/NEEDS.md
├── 03-llm-emotion/NEEDS.md
├── 04-vr-embodied/NEEDS.md
└── 05-synthesis/NEEDS.md
```

## Status vocabulary

| Status | Meaning |
|---|---|
| `HAVE` | Exists in a manuscript/draft; usable with light cropping or relabeling |
| `REMAKE` | Exists but must be rebuilt for slide legibility (too dense, too small, print-only) |
| `NEW` | Must be created; **the data/analysis already exists** |
| `NEW-ANALYSIS` | Must be created **and** depends on an analysis not yet run (see `open-questions.md`) |
| `ASSET` | Non-plot asset — video, photo, illustration |

## Priority

- **P0** — the talk does not work without it
- **P1** — strongly wanted; first thing to add once P0 is done
- **P2** — nice to have, or backup-slide only

---

## Index

### Section 1 — Framing (`01-framing/`)

| ID | Figure | Status | Pri | Source |
|---|---|---|---|---|
| F1.1 | Ecological tradeoff: energy vs exposure | NEW | P1 | illustration |
| F1.2 | Two literatures: effort discounting \| threat discounting | NEW | P1 | illustration |
| F1.3 | The gap: graded effort × graded threat is the empty cell | NEW | P0 | illustration |
| F1.4 | **Roadmap / spine diagram** (recurs as progress indicator) | NEW | P0 | illustration |

### Section 2 — Study 1, effort foraging (`02-study1-foraging/`)

| ID    | Figure                                                   | Status       | Pri | Source           |
| ----- | -------------------------------------------------------- | ------------ | --- | ---------------- |
| F2.1  | Task structure and trial timeline                        | REMAKE       | P0  | ms Fig 1a,b      |
| F2.2  | Risk-sensitive foraging logic, V(u)                      | HAVE         | P1  | ms Fig 1c        |
| F2.3  | Effort is self-relative: calibration → requirement       | NEW          | P0  | calibration data |
| F2.4  | Choice avoidance by threat × distance                    | HAVE         | P0  | ms Fig 2a        |
| F2.5  | Vigor by threat × cookie                                 | HAVE         | P0  | ms Fig 2b        |
| F2.6  | *(backup)* Choice–vigor channel separability             | NEW          | P1  | supplementary    |
| F2.7  | ~~Choice model schematic~~ **RETIRED** — slide shows equations | RETIRED  | —   | —                |
| F2.8  | Choice model-comparison ladder (PSIS-LOO)                | HAVE         | P0  | ms Fig 3d        |
| F2.9  | Choice posterior predictive check                        | HAVE         | P1  | ms Fig 3b        |
| F2.10 | *(backup)* **Discretionary-vigor transform schematic**   | NEW          | P0  | —                |
| F2.11 | Vigor model-comparison ladder                            | HAVE         | P0  | ms Fig 3e        |
| F2.12 | Vigor posterior predictive check                         | HAVE         | P1  | ms Fig 3c        |
| F2.13 | Confidence & anxiety by threat × distance                | HAVE         | P0  | ms Fig 4a,b      |
| F2.14 | ~~π vs mean confidence/anxiety across 9 cells~~ **DROPPED** — slide moved to backup, shows fig4A | DROPPED | —   | —                |
| F2.15 | Felt ↔ fitted convergence                                | REMAKE       | P0  | ms Fig 4c,d      |
| F2.16 | Bifactor loadings                                        | REMAKE       | P0  | ms Fig 5         |
| F2.17 | **Factor retention: relative ω × determinacy**           | NEW          | P0  | bifactor output  |
| F2.18 | Trait loadings on choice & vigor parameters              | REMAKE       | P0  | ms Fig 6         |
| F2.19 | Take-home: contingent vs tonic, 2×2                      | NEW          | P0  | illustration     |
| F2.20 | **Trial structure: 81 trials, probes, questionnaires**    | HAVE         | P0  | `TrialTimeline.vue` |
| F2.B1 | *(backup)* Alternative factor scoring                    | NEW-ANALYSIS | P1  | OQ-1             |
| F2.B2 | *(backup)* Parameter recovery                            | HAVE?        | P1  | supplementary    |
| F2.B3 | *(backup)* ω_danger × β₀ posterior ridge                 | NEW          | P2  | supplementary    |
| F2.B4 | *(backup)* Reactive surge time course                    | NEW-ANALYSIS | P2  | OQ-8             |
| F2.B5 | *(backup)* Exploratory vs confirmatory replication table | NEW-ANALYSIS | P1  | OQ-6             |
| F2.B6 | *(backup)* Sensitivity to fixed δ(D) and C_cap           | NEW-ANALYSIS | P1  | OQ-7             |
| F2.B7 | *(backup)* Joint choice–vigor model non-identifiability  | NEW          | P1  | supplementary    |

### Section 3 — Study 2, LLM emotion steering (`03-llm-emotion/`)

> ⚠️ **Every figure in the LLM draft is currently a `[TODO: Replace box…]`
> placeholder.** All five draft figures need composing from scratch. This is the
> single largest block of production work in the project.

| ID | Figure | Status | Pri | Source |
|---|---|---|---|---|
| F3.1 | Why an LLM: readable/writable internals | NEW | P1 | illustration |
| F3.2 | Emotion-vector extraction pipeline | NEW | P0 | draft Fig 1 (TODO) |
| F3.3 | Geometry: PC1≈valence, PC2≈arousal (+ UMAP) | NEW | P0 | draft Fig 2c,d,e (TODO) |
| F3.4 | FID task schematic | NEW | P0 | illustration |
| F3.5 | **Steering shifts d\***: P(FLEE) curves + Δd\* | NEW | P0 | draft Fig 5a (TODO) |
| F3.6 | Addition–subtraction asymmetry by family | NEW | P1 | draft Fig 5b (TODO) |
| F3.7 | Danger vs reward axis dissociation | NEW | P0 | draft Fig 5c,d (TODO) |
| F3.8 | *(backup)* Persona as installed self-model: the test | NEW | P0 | illustration |
| F3.B1 | *(backup)* Vignette separation + top-1 accuracy | NEW | P1 | draft Fig 4a (TODO) |
| F3.B2 | *(backup)* Numerical semantics curves | NEW | P2 | draft Fig 4b (TODO) |
| F3.B3 | *(backup)* Spatial imminence & predator identity | NEW | P1 | draft Fig 4c,d (TODO) |
| F3.B4 | *(backup)* Preference tournament + Unsafe shift | NEW | P1 | draft Fig 3 (TODO) |
| F3.B5 | *(backup)* Random-direction control | NEW-ANALYSIS | P0 | OQ-17 ← **blocking** |
| F3.B6 | *(backup)* Cross-model replication | NEW-ANALYSIS | P1 | OQ-16 |
| F3.B7 | *(backup)* Full layer sweep for d\* shift | NEW-ANALYSIS | P1 | OQ-20 |
| F3.B8 | *(backup)* Dose–response in steering coefficient c | NEW | P1 | OQ-23 |
| F3.B9 | *(backup)* Prompted "you are afraid" vs steering | NEW-ANALYSIS | P1 | OQ-19 |

### Section 4 — Study 3, embodied VR (`04-vr-embodied/`)

| ID | Figure | Status | Pri | Source |
|---|---|---|---|---|
| F4.1 | 2D keypress → embodied locomotion | NEW | P1 | illustration |
| F4.2 | Apparatus: the five-component rig | HAVE | P0 | VR proposal Fig 1 |
| F4.3 | **Rig video (≤30 s)** | ASSET | P0 | existing capture |
| F4.4 | VR task structure | HAVE | P1 | VR proposal Fig 2 |
| F4.5 | *(backup)* Two-phase plan: replicate → manipulate the body | NEW | P0 | illustration |
| F4.B1 | *(backup)* IMU pipeline & time-sync protocol | NEW | P1 | — |
| F4.B2 | *(backup)* Pilot IMU traces | NEW-ANALYSIS | P2 | pending pilot |
| F4.B3 | *(backup)* Body-ownership manipulation-check design | NEW | P1 | OQ-30 |

### Section 5 — Synthesis (`05-synthesis/`)

| ID | Figure | Status | Pri | Source |
|---|---|---|---|---|
| F5.1 | *(backup)* Three systems × two channels | NEW | P0 | illustration |
| F5.2 | Closing question (callback to F1.4) | NEW | P0 | variant of F1.4 |
| F5.B1 | *(backup)* Predatory imminence continuum, all 3 paradigms | NEW | P1 | illustration |

---

## Triage

**Totals:** 34 main-deck figures + 24 backups.
Of the main deck: `HAVE` 9 · `REMAKE` 5 · `NEW` 19 · `ASSET` 1.

*2026-08-15: F2.20 added — drawn in Vue (`components/TrialTimeline.vue`), like the
Roadmap (F1.4) and VennJoin. `HAVE` because building the component built the figure.*

Nine backups are `NEW-ANALYSIS` — blocked on work in `open-questions.md`.

> **2026-08-15 — F2.7 RETIRED, and the vigor model returns to the main deck.**
> The model slides were rebuilt to show the equations directly (typeset in KaTeX), so
> the F2.7 schematic has nothing left to do — it is retired, not deferred. After a
> second pass the same day they settled as "Discretionary vigor" (the
> requirement-anchored transform, alone) and "One trial, two models" (choice
> and vigor equations merged onto one slide, side by side since 2026-08-16).
> *(Slide numbers corrected 2026-08-16, twice: first because they had been recorded one
> too high, then again after the deck was restructured. As of 2026-08-16 the deck is 68
> slides; "One trial, two models" is **slide 19**, and "Discretionary vigor" has moved to
> backup at **49**.)* **This reverses the reasoning recorded in F2.7's NEEDS
> entry** ("an equation on a slide is dead time"): the equations are staged one per click
> with a plain-English gloss beside each, and each slide ends with the strip that maps its
> free parameters onto the rungs of its comparison ladder. F2.10 stays commissioned — it is
> now the *figure* companion to the transform slide rather than the only explanation of
> it — and as of 2026-08-16 both sit in backup, adjacent (49 written, 50 drawn).

> **2026-08-16 — the two model-comparison ladders are now one slide.**
> F2.8 (choice) and F2.11 (vigor) share **slide 20 "What the data require"** — vigor
> left, choice right. F2.8 had been sitting behind a placeholder that said it was "not
> yet exported"; `fig3B_choice_modelcomp.png` was already in `02-study1-foraging/` and is
> now the slide's figure. Both are placed; neither needs production work.

> **2026-08-15 — five figures moved to backup with their slides.**
> F2.6, F2.10 (were main slides 18, 21) and F3.8, F4.5, F5.1 (were main 40, 45, 46).
> IDs were **kept** rather than renumbered to `F*.B*`, because `slides.md` and the
> section `NEEDS.md` files reference them by ID.
> **All five are still rated P0 below and that rating is unreviewed** — see the
> build-order note.

**P0 set — the minimum viable deck.**
F1.3, F1.4 · F2.1, F2.3, F2.4, F2.5, F2.8, F2.10†, F2.11, F2.13, F2.15,
F2.16, F2.17, F2.18, F2.19, F2.20 · F3.2, F3.3, F3.4, F3.5, F3.7, F3.8† ·
F4.2, F4.3, F4.5† · F5.1†, F5.2 · **F3.B5 (blocking control)**

† *now on a backup slide — P0 rating carried over unchanged, not re-decided.*

**Build order.**
1. **Section 3 first.** It has zero usable figures and the most production work.
   Everything else has a manuscript figure to start from.
2. **F3.B5 (random-direction control) before anything else in §3** — if the
   control fails, the whole causal story changes and the figures change with it.
3. F2.10 and F2.17 next — the two figures that carry the methodological moves
   most likely to be challenged, and neither exists.
   **Open decision (2026-08-15):** F2.10, F3.8, F4.5 and F5.1 all sit on backup
   slides now but are still P0. Being off the main deck cuts two ways — the material
   is no longer explained on screen, which can make the figure *more* important to
   have ready for Q&A, not less. **Updated later the same day:** this no longer applies
   to F2.10 — the transform is explained on the main deck again (slide 19), as an
   equation, so F2.10 is now a companion figure rather than the sole explanation.
   **Reversed again 2026-08-16:** the transform slide moved back to backup (49), so
   F2.10's original "off the main deck, therefore more important in Q&A" logic applies
   to it once more. This is especially true of **F4.5** (the Study 3
   phases, N, and timeline — the proposed work) and **F3.8** (the persona test that
   sets up the closing question). Re-rate these four before building.
4. F1.4 / F5.2 as a matched pair — the spine diagram opens and closes the talk.
5. `HAVE`/`REMAKE` Study 1 figures last; they are cheap.

**Consistency rules for the whole deck.**
- One color per **threat level** (0.1 / 0.5 / 0.9), used identically in F2.4,
  F2.5, F2.13, and the VR figures. Never recolor between sections.
- One color per **symptom dimension** (apathy / anxiety / g), used in F2.17,
  F2.18, F2.19.
- One color per **emotion family** (fear-anger / calm-positive) in all §3
  figures, and make the danger/reward axis colors match the Study 1
  danger/activation channel colors — the visual rhyme *is* the argument in F5.1.
- Every model-comparison figure plots Δelpd with its SE. Never a bare bar chart.
- Sans-serif, ≥18 pt effective on a projected slide, colorblind-safe
  (avoid red/green for threat levels).
