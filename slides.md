---
theme: seriph
background: '#ffffff'
title: Trading Effort Against Threat — Candidacy Talk
info: |
  ## Trading effort against threat: one survival computation at three resolutions
  Candidacy talk — Noah S. Okada, Mobbs Lab, Caltech.
  Built from talk/slides.md (spec), talk/outline.md (structure),
  and talk/figures/FIGURES.md (visuals).
layout: academic-title
fonts:
  sans: 'Inter'
  serif: 'Crimson Pro'
  mono: 'Fira Code'
drawings:
  persist: false
transition: slide-left
mdc: true
---

# Computational Mechanisms of Defensive Decision-Making

<div class="subtitle">From Value Integration to Embodied Action</div>

<div class="divider"></div>

<div class="author-info">
  <div class="author-name">Noah S. Okada</div>
  <div class="venue">Mobbs Lab · Caltech</div>
  <div class="date">SDN Candidacy</div>
</div>

<!--
S0 — Title. 45 min, 45 main slides (+ divider + 23 backup = 69).
The deck opens and closes on this slide; the closing copy is S5.4, immediately
before the Supplemental divider.
Visual per spec: a sketch or black-and-white image of a fox chasing a squirrel
behind the title block. Drop it into public/figures/01-Background/ and add it as a
::figure:: slot when it exists.
-->

---
layout: academic-content
section: "Background"
---

# The ecological problem

<div class="relative" style="height: 400px;">
  <img src="/figures/01-framing/Forager.png" alt="A squirrel foraging on a branch"
       class="absolute" style="left: 50%; top: 150px; transform: translateX(-50%); max-height: 250px;" />

  <div v-click="1">
    <div class="absolute" style="left: 0; top: 0;">
      <CostBox :width="300" :height="140" color="#769df0" label="Energy">
        <img src="/figures/01-framing/Energy_animal.png"
             alt="Energy — the metabolic cost of retrieving food" />
      </CostBox>
    </div>
    <svg class="absolute inset-0 pointer-events-none" width="100%" height="100%" viewBox="0 0 884 400">
      <line x1="466" y1="188" x2="302" y2="100"
            stroke="#769df0" stroke-width="2" stroke-dasharray="7 5" stroke-linecap="round" />
    </svg>
  </div>

  <div v-click="2">
    <div class="absolute" style="right: 0; top: 0;">
      <CostBox :width="300" :height="140" color="#97332a" label="Threat">
        <img src="/figures/01-framing/Threat_animal.png"
             alt="Threat — the predation cost of leaving cover" />
      </CostBox>
    </div>
    <svg class="absolute inset-0 pointer-events-none" width="100%" height="100%" viewBox="0 0 884 400">
      <line x1="478" y1="188" x2="582" y2="100"
            stroke="#97332a" stroke-width="2" stroke-dasharray="7 5" stroke-linecap="round" />
    </svg>
  </div>
</div>

<template #references>
Lima & Dill (1999); Lima et al. (1985)
</template>


<!--
THREE-CLICK BUILD, additive — the squirrel never moves.
  click 0  the forager alone, sitting low in the frame
  click 1  ENERGY box, upper left  — the energetic constraint
  click 2  THREAT box, upper right — the predation constraint

Each panel is a CLEAN BOUNDED BOX (CostBox component): hairline coloured border,
NO FILL — the slide ground shows through — label in serif. A dashed line in the
matching colour runs from just above the squirrel's head out to the inner edge
of its box — the two costs are what this animal is pricing, without the cartoon
register of a thought bubble.

GEOMETRY (the wrapper is exactly 884 x 400, so the SVG viewBox maps 1:1 and the
dashed-line coordinates are literal slide pixels). The squirrel is dropped to
top: 150px at 250px tall so both boxes clear it; its head sits at about
(470, 223), and the lines start at y = 188, just above the ears. The left line
in particular is tuned to clear the tail — steepen it before you shorten it.

The art inside each box is the cropped animal only (*_animal.png); the original
Energy.png / Threat.png carry a baked-in rounded-rect card border and title,
which would double up with the box. The labels are HTML text in the component.

(v-click is reactive visibility, not a mount-time CSS animation, so this does
not hit the trap that broke the first task-zoom attempt.)

TAKEAWAY. Every mobile animal faces the same problem: leaving cover costs energy
*and* exposure, and one decision has to price both.

SPEAK TO, one beat per click:
- 0 — To eat, it must leave the branch. Nothing is free.
- 1 — ENERGY: retrieving the acorn costs metabolic effort, and the cost scales
  with how far and how hard.
- 2 — THREAT: the same trip exposes it. The costs arrive in DIFFERENT CURRENCIES
  — joules and probability of death — yet one decision has to price both.
  Preserved across species, insects to primates. How humans solve it is unclear.

Hand off: "behavioral ecology already wrote down how to combine them" → next slide.

1 min. First cut if running long.

Q. "Isn't this just optimal foraging theory?"
→ Yes as the normative frame; the open part is the psychological implementation
  and its individual differences, which is what the rest of the talk is about.
-->

---
layout: academic-content
section: "Background"
clicks: 3
---

# Risk-Sensitive Foraging Theory

<div class="eq-bar">
  <span class="eq eq-s">
    <span class="eq-body">S(u) = exp(−k·u<sup>z</sup>)</span>
    <span class="eq-role">survival</span>
  </span>
  <span class="eq eq-v" :class="{ 'is-dim': $clicks < 1 }">
    <span class="eq-body">V(u) = ρ·u</span>
    <span class="eq-role">future value</span>
  </span>
  <span class="eq eq-w" :class="{ 'is-dim': $clicks < 2 }">
    <span class="eq-body">W(u) = S(u)·V(u)</span>
    <span class="eq-role">fitness</span>
  </span>
</div>

<div class="eq-key">
  <b>u</b> effort, as a fraction of the maximum &nbsp;·&nbsp;
  <b>k</b> danger &nbsp;·&nbsp;
  <b>z</b> how sharply survival falls &nbsp;·&nbsp;
  <b>ρ</b> value gained per unit effort
</div>

<div style="height: 298px;">
  <SurvivalWeighted :stage="$clicks" />
</div>

<div class="shift-note" :class="{ 'is-dim': $clicks < 3 }">
  more danger <span class="arrow">&#8594;</span> less effort
</div>

<template #references>
Bednekoff (2007); Lima & Dill (1999)
</template>

<style>
.eq-bar {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2.1rem;
  margin: -0.35rem 0 0.3rem;
}

.eq {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.15;
  transition: opacity 400ms ease;
}

.eq-body {
  font-family: 'Crimson Pro', Georgia, serif;
  font-size: 1.12rem;
}

.eq-role {
  font-family: 'Inter', sans-serif;
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  opacity: 0.72;
  margin-top: 0.1rem;
}

/* each equation is coloured to match the curve it draws */
.eq-s { color: #1f2937; }
.eq-v { color: #6b7280; }
.eq-w { color: #2f855a; }

.eq.is-dim { opacity: 0.22; }

.eq-key {
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 300;
  color: #6b7280;
  margin-bottom: 0.2rem;
}

.eq-key b {
  font-family: 'Crimson Pro', Georgia, serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
}

/*
  The stage-3 takeaway, parked BELOW the plot rather than inside it. The arrow
  between the two optima stays on the plot; the words live here, where they have
  room and cannot collide with the drop lines. Held at opacity 0 (not display:
  none) so the block reserves its height from click 0 and nothing shifts.
*/
.shift-note {
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #4a5568;
  letter-spacing: 0.01em;
  margin-top: 0.3rem;
  transition: opacity 400ms ease;
}

.shift-note .arrow { color: #9aa0ab; margin: 0 0.15em; }
.shift-note.is-dim { opacity: 0; }
</style>

<!--
FOUR-STAGE BUILD (SurvivalWeighted component, driven by $clicks):
  0  FIG 9.3 REPLICA — survival falls with effort; the shape is set by z (1, 2, 4)
  1  z = 2 kept, the others REMOVED; V(u) = ρu added — future value rises with effort
  2  W(u) = S(u)·V(u) drawn, with u* marked
  3  danger constant k raised 5 → 20; the peak SLIDES LEFT, and the caption
     "more danger → less effort" appears BELOW the plot

THE HEADER IS A LEGEND, so you never have to define a symbol out loud. Three
equations sit above the plot, each COLOUR-MATCHED to the curve it draws — S in
black, V in grey, W in green — with its role underneath (survival / future value
/ fitness). V and W stay greyed until their own click, so the header builds with
the figure. The line below it is the parameter key: u, k, z, ρ.

EVERY OBJECT IS SUBSCRIPTED, so nothing is told apart by colour alone —
S_(z=1,2,4) at stage 0, then W_(k=5) "low danger" against W_(k=20) "high danger",
and u*_(k=5) = 0.32 against u*_(k=20) = 0.16. If someone is colour-blind or
sitting at the back, the subscripts still carry it.

WHY THE Y-AXIS RELABELS AT STAGE 1 — ask yourself this before presenting.
At stage 0 the axis is genuinely "Survival S(u)". The moment V and W join it,
three different quantities share one axis, so the label switches to "Scaled
magnitude — S, V" and then "S, V, W". THE SLIDE NO LONGER SAYS THE REST, so you
have to: at stage 2, say out loud that the curves sit on a COMMON SCALED axis and
that it is the peak's POSITION, not its height, that carries the result. It is
the one thing an audience member can legitimately object to, and the only place
it now lives is your mouth (and the Q below).

THE ONLY TEXT UNDER THE PLOT is the stage-3 takeaway, "more danger → less
effort". It is held at opacity 0 from click 0 so the block reserves its height
and nothing on the slide jumps when it lands.

PARAMETERS. u is effort as a fraction of maximum possible effort, so it is
unitless on [0,1]. k = 5 is INFERRED by matching the published curves; the
chapter never states k — say "illustrative parameters" if asked. u* = (kz)^(-1/z)
is eq. 9.1. BOTH W curves are divided by the SAME constant (the low-danger peak),
which is why the high-danger curve sits genuinely lower as well as further left —
if they were each normalised to their own peak, that height difference would be
an artefact.

SAY OUT LOUD at stage 2: "the weighting IS the multiplication — S(u) multiplying
V(u) is what makes this a survival problem rather than a rate problem."

★ THE CORRESPONDENCE TO STUDY 1 — worth knowing, not on the slide.
Bednekoff defines R as REQUIRED feeding rate ÷ MAXIMUM feeding rate, a unitless
proportion. That is exactly our calibrated press-rate requirements: R = 0.4 for
the light cookie, 0.9 for the heavy one. Eq. 9.2 (u* = zR/(z−1)) then gives
u* = 0.8 at R = 0.4 but u* = 1.8 at R = 0.9 with z = 2 — i.e. PINNED ABOVE THE
CEILING. That is the compression we measured on the heavy cookie, predicted from
theory, and it is the reason the discretionary-vigor transform exists. Use this
if anyone asks at "Measuring discretionary vigor" why the transform is not
post hoc.

Also: k is the danger constant — the direct theoretical ancestor of ω_danger in
our model. Naming that here pays off at "One trial, two models."

Q. "Why not show optimal effort against danger directly (fig. 9.4)?"
→ Deliberate. Stage 3 shows the same result as a moving peak, which keeps the
  survival curve on screen. Fig. 9.4 is the same equation plotted differently.

Q. "Survival, value and fitness are in different units — how are they on one
   axis?" (EXPECT THIS ONE.)
→ They are all scaled to a common axis, which is why the axis says "scaled
  magnitude" and not "survival" once the second curve lands. S is a probability
  on [0,1]; V is drawn with ρ set so V(1) = 1; both W curves are divided by the
  same constant. The heights are presentational. The RESULT is the x-position of
  the peak and its leftward shift, and neither depends on the scaling.
-->
---
layout: academic-content
section: "Background"
clicks: 2
---

# At the intersection of effort and threat

<div class="my-2" style="height: 412px;">
  <VennJoin :stage="$clicks" />
</div>

<!--
BUILD, 3 stages (VennJoin component — F1.2 replacement, per review):
  stage 0  EFFORT alone, left
  stage 1  THREAT appears, right — two separate literatures
  stage 2  the circles SLIDE TOGETHER; the lens lights up, "ONE DECISION —
           prices both"

TAKEAWAY. Effort and threat each have a mature human literature and a
psychopathology attached — and they have never been measured in the same
computation. This work sits in the overlap.

1.5 min. Everything below is spoken, not shown.

SPEAK TO. Three lines per column; the TAG names what each line is about.

- stage 0 — APATHY / EFFORT.
  EFFORT-BASED VALUATION — effort costs discount prospective reward
    (Pessiglione et al., 2018; Husain & Roiser, 2018)
  REDUCED EFFORT ALLOCATION — apathy predicts lower willingness to exert effort
    for reward (Le Heron et al., 2018; Bonnelle et al., 2015)
  COMPUTATIONAL MECHANISMS — motivational deficits reflect altered reward–effort
    weighting (Pessiglione et al., 2018; Le Bouc et al., 2016)

- stage 1 — ANXIETY / THREAT.
  UNCERTAIN THREAT — anxiety is linked to distal and uncertain threat
    (Grillon, 2008; Mobbs et al., 2020)
  NEGATIVE EXPECTATIONS — anxiety biases expectations toward adverse outcomes
    (Aylward et al., 2020; Charpentier et al., 2017)
  APPROACH–AVOIDANCE — increasing threat shifts behavior toward avoidance
    (Bach, 2015; Yamamori & Robinson, 2023)

- stage 2 — the circles join and the overlap is a QUESTION MARK. Say it plainly:
  these two literatures have never been measured in the same computation, so
  what happens in the overlap is genuinely unknown. Hand off to the question on
  the next slide.

⚠ PROVENANCE — this slide is NO LONGER uniformly verified against
review/bib/references.bib. Five citations have no bib entry yet: Le Bouc+ 2016,
Grillon 2008, Aylward+ 2020, Charpentier+ 2017, and Bonnelle+ 2015 (the bib
holds bonnelle2016apathy, a DIFFERENT paper). "Yamamori & Robinson 2023" is also
not the bib's yamamori2023approach, which is the three-author Yamamori/Robinson/
Roiser eLife paper. Resolve before the deck's reference list is final.

⚠ DROPPED IN THIS REVISION — the previous four-line version carried a
★ load-bearing line: when studies fit SEPARABLE parameters, apathy lands OFF the
effort-cost term (Le Heron: low-reward rejection, no motor-vigour effect;
Scholl: over-persistence, and explicitly NOT effort avoidance). That line was
what made the Study 1 apathy result read as consistent with the parameter-level
literature rather than anomalous against it. It now lives only in your mouth —
keep it ready for Q&A. Detail is in review/synthesis/pull2-apathy-anxiety.md.

⚠ KNOW THIS IF ASKED. Sporrer et al. 2026 (Transl Psychiatry, N1=315, N2=690)
ran a virtual-predator approach-avoidance task with parametrically varied threat
probability and magnitude and found NO association between behaviour and
transdiagnostic anxiety-depression — the predictive factor was impulsivity/OCD.
A clean anxiety loading is a positive result here, not a foregone conclusion.

Q. "Why should they be in one computation at all?"
→ Because in the ecological setting they are never separable: the effort of
  escape is what determines whether threat is survivable.
-->

---
layout: academic-question
section: "QUESTION"
---

# <span class="q">How do <span class="u">affective states</span> structure the integration of <span class="u">effort and threat</span> in defensive decisions?</span>

<!--
THE CENTRAL QUESTION. Rebuilt 2026-08-16 (decision D12) — was "The question," an
academic-content slide carrying F1.3 plus two bullets on the paradigm gap.
Now a full-stop section slide: the question alone, nothing else on it.

TAKEAWAY. This is the question the whole thesis answers. Land it and pause.

1 min. Everything below is spoken, not shown.

STOP AND LET IT SIT. Do not read the slide and move on — this is the one moment
the room has to hold a single sentence. Say it, pause, then speak the gap.

SPEAK TO — the gap that makes the question askable (was on the slide as bullets):
- Classical paradigms grade ONE COST AT A TIME — effort-discounting tasks give
  graded effort with no threat; threat/avoidance tasks give graded threat with
  ungraded demand.
- Conflict games and stress paradigms have both present, but rarely both graded.
- No study has fit a GENERATIVE MODEL of how the two jointly shape behavior and
  individual differences.
- The positive move: naturalistic, gamified, and embodied paradigms carry real
  survival structure, so both costs can be graded on the same trial and priced by
  one model. That is the methodological commitment running through all three
  chapters.

SPEAK TO — why "affective states" and not traits:
- The probes are trial-level: model-derived capture probability tracks probed
  anxiety at r = +0.94 and confidence at r = −0.96. State, not just disposition.
- If pressed on the state/trait seam: Hewitt (PNAS 2025) — state and trait have
  independent AND multiplicative effects, and state-behavior coupling is strongest
  in high-trait-apathy individuals.

★ NOTE THE STEM DOES NOT ASK *WHERE* AFFECT ACTS. Parameter-localization is a
Chapter 1 capability, not a program-wide one — Chapter 1's heading carries it.
Do not add the clause back on stage.

Q. "What about [Bach 2015 / Korn 2017 / Silston 2021 / Trier 2025]?"
→ KNOW THE EXACT ANSWER FOR EACH — placement must be defensible on the specific
  dimension (is effort graded? is threat graded? is there a joint model?) rather
  than dismissive. Getting this wrong in front of Mobbs is expensive. See F1.3
  notes in figures/01-framing/NEEDS.md.
  ⚠️ The 2×2 is no longer ON the slide, so this answer is now purely verbal —
  rehearse it rather than pointing at a figure.

Q. "Isn't 'affect' doing a lot of work here?"
→ It is operationalized differently in each chapter, and the operationalizations
  are independent: probed state plus traits (Ch1), a steerable internal
  representation (Ch2), an autonomic signature (Ch3). Convergence across three
  non-overlapping measures is the argument — not any one of them.

PRODUCTION: F1.3 (NEW, P0) is no longer placed by this slide. Either re-place it
on the preceding "At the intersection of effort and threat" slide or demote it in
figures/FIGURES.md — do not leave it listed as P0 and unplaced.
-->

---
layout: academic-content
section: "PROPOSAL"
---

# Thesis proposal

<div class="flex items-center" style="height: 414px;">
  <ChapterMap />
</div>

<!--
CHAPTER MAP (ChapterMap component). Three chapters, each with its own banner
color, its CORE QUESTION, and a one-word status, all centred. No other text on
the slide.
  1  Online Sample     purple   Replicating
  2  Language Models   rose     Pilot
  3  Virtual Reality   orange   Development

CHAPTER QUESTIONS REWRITTEN 2026-08-16 (decision D12) to decompose the central
question on the previous slide. Canonical long-form text lives in
REVISION-PLAN.md §D12 and review/question.md; the slide carries a trimmed,
left-justified, de-emphasized version so the chapter TITLE reads first:
  Ch1  Do effort and threat enter one value computation — and does apathy or
       anxiety reshape it?
  Ch2  Can manipulating an affective representation shift defensive choices in
       artificial agents?
  Ch3  Does that computation carry an autonomic signature when effort and
       threat are embodied?

SPEAK TO — the two axes, and say them in this order:
- CONTENT: each chapter asks how AFFECTIVE STATES structure the same
  effort-threat computation. That is the question from the previous slide,
  decomposed.
- METHOD: every chapter is a naturalistic ecological game with real survival
  structure. What varies is the RESOLUTION at which the computation can be seen —
  and affect is operationalized differently at each: probed state plus traits,
  a steerable internal representation, an autonomic signature.

Three chapters, matching the three-study spine the Roadmap component carries
through the rest of the deck (corner strips on the section openers). The full
Roadmap spine no longer appears anywhere: "The question this program answers"
carried it and was dropped 2026-08-17, and the synthesis slide that replaced it
carries the spine as the three ChapterMap cards instead. Nothing to reconcile —
the deck is consistently three.

TAKEAWAY. One computation, studied at several resolutions — because no single
paradigm can resolve all of it.

1.5 min.

SAY OUT LOUD, VERBATIM:
"No single paradigm can resolve this computation. Each of these sees what the
others cannot."

Q. "Isn't 'resolution' just a label for three unrelated experiments?"
→ No. Each paradigm's blind spot is what the next one covers, and I name the
  blind spot at every transition — that is the argument, not a framing device.
  Study 1 cannot see mechanism; Study 2 has no body and no consequences;
  Study 3 cannot scale or read internals.

Q. "Ch2 says 'causally manipulate' — are you claiming the model works like a
   brain?"
→ No. The claim is a shared computational DESCRIPTION whose implementation may
  differ entirely. Ch2 asks whether an affective representation can be
  intervened on to move a defensive decision — not whether it mirrors a human
  mechanism. (OQ-42; do not improvise past this line.)
  ⚠️ FOLLOW-UP RISK: "what controls?" The field's real convention is
  dose-response with sign reversal plus off-target invariance, NOT a random-
  direction control. See review/synthesis/pull3-q32-steering-controls.md §3.

Q. "Ch1 says 'shaped by' — shaped how?"
→ Parameter-located: apathy and anxiety load on separable parts of the fitted
  computation. Do not state the contingent-vs-tonic assignment as a premise here
  — it is the finding, and it lands in Chapter 1.
-->

---
layout: academic-content
section: "STUDY 1 · FORAGING"
---

# Thesis proposal

<div class="flex items-center" style="height: 414px;">
  <ChapterMap :active="1" />
</div>

<!--
SECTION DIVIDER — CHAPTER 1 LIT, the other two dimmed. Same title and same map
as the proposal slide, returning with one chapter highlighted, so it reads as
the same board rather than a new one.

10 s. Say the chapter's core question out loud off the card, then advance
straight into the gameplay video.
-->

---
layout: full-bleed
title: Task — gameplay
---

<CropVideo
  src="/figures/02-study1-foraging/gameplay_winloss.mp4"
  :left="0.0496" :right="0.0497" :top="0.175" :bottom="0.0472"
/>

<!--
SECTION OPENER — FULL-BLEED GAMEPLAY VIDEO. No title, no text, no furniture.
Autoplays muted and loops, so it is already running when you land.

Let it play. Say only what the audience is watching: the forager leaves cover,
hauls the reward back, and is either taken or gets home. Both outcomes are in
the clip.

Then advance — the next slide is the task diagram, and the three after it zoom
into each manipulation.

NOTE: this loads gameplay_winloss.mp4, NOT the .mov. The original is a 292 MB
3024×1964 QuickTime, and Chrome refuses `type="video/quicktime"` outright
(canPlayType returns ""), so the clip never rendered. Re-encoded to H.264 720p
(35 MB) with avconvert; the original is kept alongside it.
-->

---
layout: academic-content
section: "STUDY 1 · FORAGING"
transition: zoom-fig
---

# Task

<div class="flex justify-center items-center">
  <img src="/figures/02-study1-foraging/task_overview.png" alt="Task overview — the arena, the two options, and the threat display" style="max-height: 410px; width: auto;" />
</div>

<!--
THE WHOLE TASK. Study 1 opener — roadmap strip on. This slide RECURS between
each zoom, so the audience is pulled back to the whole board before every new
detail: overview → incentives → overview → threats → overview → action → overview.

TAKEAWAY. A foraging game that grades effort and threat independently on every
trial.

SPEAK TO (nothing below is on the slide):
- Displayed predation probability T = 10 / 50 / 90%.
- HEAVY: 5 pts, 90% of max press rate, D in {1,2,3}.
  LIGHT: 1 pt, 40% of max press rate, D = 1.
- Transport by rapid keypressing; press rate sets speed in four tiers, so vigor
  is continuously expressible.
- Capture costs -5 points AND the reward is lost.

Next: zoom into variable incentives.

Q. "Why keypressing as effort?"
-> Online scalability and precise calibration; and its limitations are exactly
   what motivates Study 3 — flag that you will return to it.

Q. "Is 10/50/90% believable as threat?"
-> Displayed probabilities are honored; participants experience real capture and
   a real penalty.
-->

---
layout: academic-content
section: "STUDY 1 · FORAGING"
transition: zoom-out-fig
---

# Task

<div class="flex justify-center items-center">
  <img src="/figures/02-study1-foraging/task_overview_variableincentive.png" alt="Variable incentive — heavy and light rewards with distinct effort requirements" style="max-height: 410px; width: auto;" />
</div>

<!--
ZOOM 1 of 3 — VARIABLE INCENTIVE.

SAY: two rewards, and they cost different amounts to move. Heavy is worth 5
points but demands 90% of your calibrated maximum press rate; light is worth 1
point at 40%. That is the effort axis, and it is graded per person.

Next click pulls back out to the whole task.
-->

---
layout: academic-content
section: "STUDY 1 · FORAGING"
transition: zoom-fig
---

# Task

<div class="flex justify-center items-center">
  <img src="/figures/02-study1-foraging/task_overview.png" alt="Task overview — the arena, the two options, and the threat display" style="max-height: 410px; width: auto;" />
</div>

<!--
BACK OUT TO THE WHOLE TASK — the pull-back beat. Same figure as the opener.
Say one line tying the detail you just showed back into the whole board, then
advance.

Next: zoom into dynamic threats.
-->

---
layout: academic-content
section: "STUDY 1 · FORAGING"
transition: zoom-out-fig
---

# Task

<div class="flex justify-center items-center">
  <img src="/figures/02-study1-foraging/task_overview_dynamic_threats.png" alt="Dynamic threat — displayed predation probability varies trial to trial" style="max-height: 410px; width: auto;" />
</div>

<!--
ZOOM 2 of 3 — DYNAMIC THREATS.

SAY: the displayed predation probability changes trial to trial — 10, 50, or
90%. That is the threat axis, graded independently of effort, which is what
makes the joint computation identifiable.

Next click pulls back out to the whole task.
-->

---
layout: academic-content
section: "STUDY 1 · FORAGING"
transition: zoom-fig
---

# Task

<div class="flex justify-center items-center">
  <img src="/figures/02-study1-foraging/task_overview.png" alt="Task overview — the arena, the two options, and the threat display" style="max-height: 410px; width: auto;" />
</div>

<!--
BACK OUT TO THE WHOLE TASK — the pull-back beat. Same figure as the opener.
Say one line tying the detail you just showed back into the whole board, then
advance.

Next: zoom into continuous action.
-->

---
layout: academic-content
section: "STUDY 1 · FORAGING"
transition: zoom-out-fig
---

# Task

<div class="flex justify-center items-center">
  <img src="/figures/02-study1-foraging/task_overview_continousaction.png" alt="Continuous action — press rate maps to speed in four tiers" style="max-height: 410px; width: auto;" />
</div>

<!--
ZOOM 3 of 3 — CONTINUOUS ACTION.

SAY: press rate maps onto movement speed in four tiers, so vigor is expressible
on a continuum rather than as a single button-press. This is what the
discretionary-vigor measure later depends on.

Next click pulls back out to the whole task one last time.
-->

---
layout: academic-content
section: "STUDY 1 · FORAGING"
---
# Task

<div class="flex justify-center items-center">
  <img src="/figures/02-study1-foraging/task_overview.png" alt="Task overview — the arena, the two options, and the threat display" style="max-height: 410px; width: auto;" />
</div>

<!--
BACK OUT TO THE WHOLE TASK, final time. All three manipulations have been
named; land the summary line here before moving on to the foraging logic.

No transition key on this slide — it leaves on the normal slide-left.
-->

---
layout: academic-content
section: "STUDY 1 · FORAGING"
clicks: 4
---

# Design

<div class="my-2" style="height: 262px;">
  <TrialTimeline :stage="$clicks" />
</div>

<div class="text-sm leading-snug mt-1">

<div v-click="2">

- **Between blocks** — AMI · DASS-21 · MFIS · OASIS · STAI-S · STAI-T

</div>

<div v-click="4">

- <strong style="color:#d81b60">Anxiety</strong> — *"How anxious are you about being captured on this trial?"* &nbsp;·&nbsp; 0–7
- <strong style="color:#4a6d94">Confidence</strong> — *"How confident are you in your ability to reach safety?"* &nbsp;·&nbsp; 0–7

</div>

</div>


<!--
S2.6b. 1.5 min. Sits inside the task walkthrough: the board has been explained,
this is how it was actually administered. NEW 2026-08-15 at your request.

BUILD — four clicks, figure then text each time:
  1. questionnaire interstitials light up
  2. the instrument list appears
  3. the 36 probe trials colour in, both callouts pop
  4. the two probe questions appear
Land each element on the figure BEFORE the text arrives — the text is the caption
for the thing that just lit up, not a separate beat.

TAKEAWAY. 81 trials in three blocks of 27; a third of each block is a probe
trial that buys a prospective appraisal without contaminating the choice data,
and the symptom instruments run between blocks.

SAY: the probe positions on this figure are illustrative — the real schedule is
6 anxiety + 6 confidence per block, which is what the figure shows, but not the
literal trial indices from the experiment file.

Q. "Don't the probe trials contaminate the choice model?"
→ NO, AND THIS IS THE ANSWER TO REHEARSE. On probe trials the two options are
  MATCHED on reward, effort, distance and threat — the choice carries no
  information by construction. The model additionally carries a probe-trial
  coefficient (b_forced) estimated alongside the rest, so probe trials are
  absorbed rather than pooled in silently.

Q. "Why 0-7?"
→ Matches the appraisal scale in Fig 4; the ratings are the same quantity the
  felt-vs-fitted convergence result later uses.

Q. "Were the questionnaires always in the same order?"
→ CHECK BEFORE THE TALK — the methods say only that they ran between blocks.
-->

---
layout: academic-content
section: "STUDY 1 · FORAGING"
---


# Exploratory Sample & Preregistration

<div class="flex flex-col justify-center" style="height: 414px; padding-bottom: 40px;">

<div style="font-family: Inter, sans-serif;">
<svg viewBox="0 0 884 172" width="100%" role="img"
     aria-label="Waterfall: 600 recruited, minus 82 excluded under pre-specified criteria, leaving 518 in the analyzed dataset.">

  <!-- ghost track = the full 600 frame -->
  <g fill="#edeff2">
    <rect x="188" y="10"  width="500" height="36" rx="3" />
    <rect x="188" y="68"  width="500" height="36" rx="3" />
    <rect x="188" y="126" width="500" height="36" rx="3" />
  </g>

  <!-- step connectors -->
  <g stroke="#a8aeb8" stroke-width="1.5" stroke-dasharray="4 4">
    <line x1="688"   y1="46"  x2="688"   y2="68" />
    <line x1="619.7" y1="104" x2="619.7" y2="126" />
  </g>

  <!-- retained totals -->
  <g fill="#4a5568">
    <rect x="188" y="10"  width="500"   height="36" rx="3" />
    <rect x="188" y="126" width="431.7" height="36" rx="3" />
  </g>

  <!-- exclusion decrement -->
  <g fill="#97332a">
    <rect x="619.7" y="68" width="68.3" height="36" rx="3" />
  </g>

  <!-- row labels -->
  <g text-anchor="end" style="font: 400 15px Inter, sans-serif; fill: #2d3748;">
    <text x="178" y="35">Recruited</text>
    <text x="178" y="93">Excluded</text>
    <text x="178" y="151" style="font: 600 15px Inter, sans-serif; fill: #1a1a1a;">Exploratory Dataset</text>
  </g>

  <!-- values -->
  <g style="font: 600 19px Inter, sans-serif; fill: #1a1a1a;">
    <text x="700" y="35">600</text>
    <text x="700" y="93" style="fill: #97332a;">−82</text>
    <text x="700" y="151">518</text>
  </g>
  <g style="font: 400 12.5px Inter, sans-serif; fill: #6b7280;">
    <text x="750" y="35">Prolific · two pools</text>
    <text x="746" y="93">pre-specified criteria</text>
    <text x="746" y="151">analyzed sample</text>
  </g>
</svg>
</div>

<div class="mt-5" style="font-family: Inter, sans-serif; border: 1px solid #d8dbe0; border-radius: 4px; background: #fff; padding: 0.5rem 0.9rem;">
  <div style="font-size: 0.68rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #6b7280; margin-bottom: 0.3rem;">Pre-specified exclusion criteria</div>
  <div style="font-size: 0.8rem; color: #2d3748; line-height: 1.45;">
    incomplete data
    <span style="color: #b6bbc3;"> · </span> calibration IPI &gt; 2.5 SD
    <span style="color: #b6bbc3;"> · </span> low escape rate
    <span style="color: #b6bbc3;"> · </span> minimal choice variability
    <span style="color: #b6bbc3;"> · </span> incomplete vigor trials
  </div>
</div>

</div>


<!--
TAKEAWAY. Six hundred recruited, 518 analyzable — that is the dataset everything
downstream is built on.

1 min.

The exclusion rules ARE on the slide now (S17 revision). Walk the waterfall top to
bottom: 600 recruited across two non-overlapping Prolific pools, 82 excluded under
the pre-specified criteria, 518 analyzed.

WHERE 82 COMES FROM — the manuscript reports 39 of 300 excluded from the
exploratory sample and 43 of 300 from the confirmatory sample. 39 + 43 = 82, and
600 − 82 = 518. The slide shows the joined figure.

CAVEAT IF PRESSED — the manuscript reports the exclusion CRITERIA but only these
per-SAMPLE totals, not a per-criterion breakdown. Do NOT claim "n dropped for
escape rate" — that number is not reported. If asked, say the breakdown lives in
the analysis code, not in the paper.

NOTE ON THE LABEL — the slide calls the 518 the "Exploratory Dataset." In the
manuscript, 518 is the POOLED sample (261 exploratory + 257 confirmatory). If a
committee member has read the paper, be ready to say the deck collapses the
two-sample split for the talk.

Q. "Are the two samples poolable?"
→ Non-overlapping Prolific pools, identical procedures, matched age/sex, and
  near-identical behavioral effects (next slide). Confirmatory was analyzed
  only after preregistration.
-->

---
layout: academic-content
section: "STUDY 1 · FORAGING"
---

# Behavior tracks both costs

<div class="flex justify-center my-1">
  <img src="/figures/02-study1-foraging/Fig2_Behavior.png" alt="Left: P(choose high) by high-option distance and threat. Right: press rate as a fraction of calibration max, by threat and cookie value." style="max-height: 380px; max-width: 100%; width: auto;" />
</div>


<!--
TAKEAWAY. Both channels move with the manipulation: threat and distance each
push approach DOWN (left), and threat pushes hauling vigor UP (right).

~1.5 min. Two panels, one slide — walk left, then right.

LEFT — CHOICE. Threat and distance each reduce approach, and they compound.
- Threat ↓ approach: β = −0.91 (z = −19.8)
- Distance ↓ approach: β = −0.67 (z = −22.1)
- They INTERACT (β = −0.12): threat's effect is ~12% larger at the farthest distance
- Near-identical in both samples

RIGHT — VIGOR. Under greater threat, people haul the reward away more urgently,
but the measure is compressed against a ceiling.
- Press rate rises with threat: β = +0.017 (z = 17.4)
- Note the y-axis: everything sits at 0.88–1.01 of each person's calibrated max.
  Each cookie already demands near-maximal pressing just to MOVE, so
  invigoration can only be expressed in the sliver of headroom above the
  requirement — that compression is what motivates a requirement-anchored
  measure on the next slide.

PRODUCTION: F2.4 + F2.5 = manuscript Fig 2a/2b, shown together as
Fig2_Behavior.png (S18/S19 merged 2026-08-15). NOTE: this combined figure does
NOT draw each cookie's full-speed requirement line — the compression argument
now rests on the y-axis range, so say it out loud rather than pointing at a line.

SAY THE COMPRESSION OUT LOUD — IT IS NO LONGER ON A SLIDE. "Discretionary
vigor" (the transform, one equation on its own) was the immediately next slide
until 2026-08-16; it is a BACKUP slide now, sitting just before "Measuring
discretionary vigor". The "not post hoc" defense therefore has to be spoken
here: point at the right-hand panel's y-axis range, say each cookie already
demands near-maximal pressing just to MOVE, and that the requirement-anchored
measure follows from the CALIBRATED REQUIREMENTS, SET BEFORE ANY DATA WERE
COLLECTED. Jump to the two backup slides if anyone wants it drawn or written.

SAY OUT LOUD (own the confound here, not later):
Q. "Could the distance effect be effort, exposure, or both?"
→ BOTH, AND THAT IS A REAL CONFOUND (OQ-11). Distance sets transport duration
  *and* the exposure window. The model separates them by assumption; VR
  separates them by design.

Q. "Isn't 'pressing harder under threat' just arousal?"
→ Possibly, and the 2D data can't fully separate value-based mobilization from
  arousal — which is part of the case for VR (real defensive effectors) and for
  the reactive-surge analysis.
-->

---
layout: academic-content
section: "STUDY 1 · FORAGING"
clicks: 2
---

# Computational Model of Choice & Vigor

<div class="eq-stack">

<div class="grp">

<span class="grp-label">choice</span>

<div class="eq">

$$\pi_o \;=\; 1 - \exp\!\left(-\,\textcolor{#c53030}{\boldsymbol{\omega}_{\text{danger}}}\; T\; \delta(D_o)\right)$$

<span class="eq-role">capture risk</span>
</div>

<div class="eq">

$$SV_o \;=\; R_o\,(1-\textcolor{#c53030}{\pi_o})\;-\;C_{\text{cap}}\,\textcolor{#c53030}{\pi_o}\;-\;\textcolor{#2b6cb0}{\boldsymbol{k}_{\text{dur}}}\,D_o$$

<span class="eq-role">subjective value</span>
</div>

<div class="eq">

$$P(\text{high}) \;=\; \sigma\!\left(\boldsymbol{\beta}_0 + SV_{\text{high}} - SV_{\text{low}}\right)$$

<span class="eq-role">choice rule</span>
</div>

</div>

<div class="grp" :class="{ 'is-dim': $clicks < 1 }">

<span class="grp-label">vigor</span>

<div class="eq">

$$\begin{aligned}
\eta_{it} \;=\;\; & \textbf{baseline}_i \;+\; \textbf{value}_i\,\text{cookie}_t \\[2pt]
&+\; \textcolor{#c53030}{\textbf{threat\_vigor}_i}\,T_t \;+\; \textcolor{#2b6cb0}{\textbf{dist\_vigor}_i}\,D_t
\end{aligned}$$

<span class="eq-role">linear predictor</span>
</div>

</div>

</div>

<div class="rungs" :class="{ 'is-dim': $clicks < 2 }">

<div class="rgrp choice">

<div class="rset">

<span class="mtag">M1 effort</span> $SV = R \;-\; \textcolor{#2b6cb0}{\boldsymbol{k}_{\text{dur}}}\,D$

<span class="mtag">M2 threat</span> $SV = R\,(1-\textcolor{#c53030}{\pi})\;-\;C_{\text{cap}}\,\textcolor{#c53030}{\pi}$

<span class="mtag">M3 additive</span> $SV = R \;-\; \textcolor{#c53030}{\boldsymbol{a}}\,T\,D \;-\; \textcolor{#2b6cb0}{\boldsymbol{k}_{\text{dur}}}\,D$

<span class="mtag">M4 SV</span> $SV = R\,(1-\textcolor{#c53030}{\pi})\;-\;C_{\text{cap}}\,\textcolor{#c53030}{\pi}\;-\;\textcolor{#2b6cb0}{\boldsymbol{k}_{\text{dur}}}\,D$ <span class="rep">reported</span>

</div>

</div>

<div class="rgrp vigor">

<div class="rset">

<span class="mtag">V1 value</span> $\textbf{baseline}_i \;+\; \textbf{value}_i$

<span class="mtag">V2 group threat</span> $+\;\text{group }\textcolor{#c53030}{T},\,\textcolor{#2b6cb0}{D}$

<span class="mtag">V3 subj threat</span> $+\;\textcolor{#c53030}{\textbf{threat\_vigor}_i}$

<span class="mtag">V4 full DJ</span> $+\;\textcolor{#2b6cb0}{\textbf{dist\_vigor}_i}$ <span class="rep">reported</span>

</div>

</div>

</div>

<template #references>
Bednekoff (2007), ch. 9
</template>

<style>
/*
  BOTH MODELS ON ONE SLIDE (merged 2026-08-15; split left/right 2026-08-16).
  CHOICE ON THE LEFT, VIGOR ON THE RIGHT, divided by a hairline rule. The point
  of the slide is that the two channels are fit separately on the SAME trial,
  and side by side says "parallel, not sequential" in a way stacking did not.

  ONE GRID, TWO BANDS (2026-08-16). The comparison stacks underneath now use the
  SAME two columns as the equations above them, so each channel reads as a single
  vertical strip: its reported model on top, its competitors beneath. Both bands
  are the same 1fr 1fr grid with the same padding, which is what makes the
  divider read as one continuous rule instead of two stubs.

  THE COLOUR RULE, rewritten 2026-08-16 at request. TWO semantic colours, and
  nothing else on the slide is coloured at all:
      red  #c53030   the THREAT channel   omega_danger, pi, a, threat_vigor
      blue #2b6cb0   the EFFORT channel   k_dur, dist_vigor
  BOLD is a SECOND AND INDEPENDENT signal: bold means free per subject. So
  beta_0, baseline and value are bold BLACK (free, but neither threat nor
  effort), and the group-level T and D on the V2 row are coloured but NOT bold.
  Nothing is told apart by colour alone — every coloured term is also named.
  Amber is now gone from this slide entirely; that is the cleanup, not a loss.

  KNOWN HUE CLASH, LEFT UNFIXED ON PURPOSE. The panels on the next slide use
  blue for the choice winner and pink for the vigor winner, so colour means
  CHANNEL there and CONSTRUCT here. Regenerating the figures was out of scope.
  If you ever do regenerate them, resolve this rather than living with it.

  THREE THINGS WERE DROPPED FROM THIS SLIDE AT REQUEST. All three are still in
  the fitted models, all three are now presenter notes, and none of them comes
  back without asking: the ordered-beta likelihood (2026-08-16), the probe-trial
  term b_forced from the vigor linear predictor (2026-08-16), and the D0
  baseline-only vigor rung, which is dropped because it is not on the next
  slide's panel either.

  WHY THE LINEAR PREDICTOR IS MULTI-LINE. A column is only ~424px wide and the
  four terms do not fit on one line at a readable size, so it is set as an
  aligned environment broken at the plus sign. Do not re-flow it onto one line.

  NEVER write an HTML tag inside a comment in this block (no style tag, no sub
  tag, no angle brackets at all): the block is extracted by a text match, and any
  tag-looking text inside it breaks the whole slide at compile time.
*/
.eq-stack,
.rungs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0;
  /* stretch, not start: the columns must be equal height or the divider rule
     stops short of the taller one */
  align-items: stretch;
}

.eq-stack { margin: 0.35rem 0 0; }

.grp,
.rgrp {
  text-align: center;
  /* without this a wide equation sets the column's min-content width and pushes
     the grid wider than the slide */
  min-width: 0;
}

.grp:first-child,
.rgrp:first-child { padding-right: 1.5rem; }

.grp + .grp,
.rgrp + .rgrp {
  padding-left: 1.5rem;
  border-left: 1px solid #e6e8ec;
}

.grp {
  display: flex;
  flex-direction: column;
  transition: opacity 400ms ease;
  color: #1a1a1a;
}

/* one equation on the right against three on the left: centre it in the column
   rather than letting it hang off the top against a column of empty space */
.grp + .grp .eq { margin-block: auto; }

.grp-label {
  display: block;
  text-align: center;
  font-size: 0.6rem;
  font-weight: 600 !important;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #b0b5bd;
  margin-bottom: 0.35rem;
}

.eq { padding: 0.3rem 0; }

.eq p,
.rungs p {
  margin: 0 !important;
  line-height: 1.3 !important;
  color: inherit !important;
  font-size: inherit !important;
}

.eq .katex-display { margin: 0 !important; }
.eq .katex { font-size: 1.12rem; }

.eq-role {
  font-size: 0.6rem;
  font-weight: 500 !important;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #9aa0ab;
  display: inline-block;
  margin-top: 0.28rem;
}

.grp.is-dim { opacity: 0.14; }

/*
  THE COMPARISON STACKS. This is why the equations are on screen at all: the
  figure slide that follows is a bare set of PSIS-LOO panels, and these rows are
  what its x-axis ticks actually mean. EVERY TAG HERE MATCHES A TICK LABEL ON
  THAT PANEL, in the same order. If the figures are ever regenerated with
  different tick text, these rows have to move with them.

  CORRECTED 2026-08-16 — THE TWO STACKS ARE NOT THE SAME KIND OF OBJECT, and an
  older version of this block got the choice one wrong. It drew a nested ladder,
  M0 to M3, adding one free parameter per arrow. There is no M0, and the additive
  model carries the SAME parameter count as the full SV model, so it is a test of
  FORM, not an ablation. The choice rows therefore have NO ARROWS: four competing
  models. The vigor rows ARE nested, which is why each one leads with a plus
  sign — read them as a cumulative build, top to bottom.

  RENUMBERED 2026-08-16 at request: M1 effort, M2 threat, M3 additive, M4 SV.
  BEWARE — "M3" USED TO MEAN THE FULL SV MODEL AND NOW MEANS THE ADDITIVE ONE.
  The code names did not change and no longer line up with the slide numbers; the
  mapping is in the presenter note under NOTATION. Any bare "M3" you find in an
  older file is pointing at the wrong model, not merely at an old name.

  SPLIT INTO THE TWO COLUMNS 2026-08-16. This block used to run full width under
  both, because the vigor ladder was one long arrow chain that would wrap in a
  half column. Setting the vigor rungs as four stacked rows instead of a chain is
  what made the split possible. Held at opacity 0 from click 0 so the block
  reserves its height and nothing jumps when it lands.

  NEVER write an HTML tag inside a comment in this block (no angle brackets at
  all): the block is extracted by a text match, and any tag-looking text inside
  it breaks the whole slide at compile time.
*/
.rungs {
  margin-top: 0.7rem;
  padding-top: 0.55rem;
  border-top: 1px solid #eef0f3;
  transition: opacity 400ms ease;
  color: #2d3748;
}

.rungs .katex { font-size: 0.74rem; }

.rungs p + p { margin-top: 0.3rem !important; }

/*
  The rows in a column are a COMPARISON, so they have to line up: the block is an
  inline-block (so it still centres as a whole) with its rows left-aligned, and
  each row leads with a fixed-width tag. That puts every SV at the same x, which
  is what lets the eye run down the column and see which term each model drops.
  Centring the rows individually, as this block did at first, leaves them ragged
  and the comparison unreadable. The two columns get DIFFERENT tag widths because
  the vigor labels are the longer ones; each column only has to align with itself.
*/
.rset {
  display: inline-block;
  text-align: left;
}

.rungs .mtag {
  display: inline-block;
  text-align: right;
  margin-right: 0.6em;
  font-size: 0.5rem;
  font-weight: 700 !important;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #9aa0ab;
}

.rgrp.choice .mtag { width: 4.6rem; }
.rgrp.vigor .mtag { width: 5.9rem; }

/* "reported" badge on each channel's winner. Deliberately GREY, not amber: the
   only two colours on this slide mean threat and effort, and a badge in a third
   colour would read as a third construct. */
.rungs .rep {
  font-size: 0.46rem;
  font-weight: 700 !important;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #718096;
  border: 1px solid #d7dbe0;
  border-radius: 2px;
  padding: 0.05em 0.3em;
  margin-left: 0.45em;
  vertical-align: 0.3em;
}

.rungs.is-dim { opacity: 0; }
</style>

<!--
THREE-STAGE BUILD:
  0  CHOICE, LEFT COLUMN — capture risk, subjective value, choice rule.
  1  VIGOR, RIGHT COLUMN — the linear predictor.
  2  THE COMPARISON STACKS, beneath, IN THE SAME TWO COLUMNS: the four choice
     models M1–M4 on the left, the four vigor models V1–V4 on the right.

LEFT AND RIGHT, NOT TOP AND BOTTOM (since 2026-08-16). Point at the left column for
the value computation and the right for the rate — the side-by-side arrangement is
doing the work of the sentence "these are two models of the SAME trial, fit in
parallel." Do not say "first we model choice, then vigor"; that is the reading the
old stacked version invited. Since 2026-08-16 the columns hold at click 2 as well,
so you can keep pointing at the SAME side of the screen for a channel all the way
through the slide — left is choice and right is vigor for the whole 2.5 minutes.

THE COLOUR CODE — SAY IT ONCE, OUT LOUD, THE FIRST TIME YOU POINT AT A COLOURED
TERM, and then never again: RED IS THREAT, BLUE IS EFFORT. Everything black is
either fixed or nuisance. Bold means the term is fit PER PERSON. It costs you one
sentence at click 0 and it buys you the whole rest of the slide, plus the trait
slides later, because the audience can then see at a glance which rows have a
threat term and which have an effort term without you reading any equation aloud.
One caveat you should know but need not say: the PANELS on the next slide use blue
for the choice winner and pink for the vigor winner, so colour means CHANNEL there
and CONSTRUCT here. Nobody has ever asked, but do not point at the panel and say
"blue" as though it carried the same meaning.

TAKEAWAY. Two channels measured on the same trial, fit as two models: choice as
a value computation, vigor as a requirement-anchored rate — and in each channel
the reported model was picked out-of-sample against stated alternatives.

2.5 min. This is the densest slide in Study 1. Do not read the equations; point
at the amber terms and say what each one does.

★ THE SLIDE CARRIES NO PROSE. Everything below has to come out of your mouth.

  stage 0, choice
    · Threat T and escape difficulty δ(D) COMPOUND into one probability of being
      taken; the far option is riskier at every threat level.
    · Reward counts only if you survive to collect it — and DISTANCE IS CHARGED
      TWICE, once as exposure inside π, once as duration. (Say this. It makes the
      effort/exposure confound audible before anyone raises it.)
    · Each option is valued on its own, then differenced.
    · FIXED, and say so once: R = 5 and 1, C_cap = 5, δ(D) = .58 / .71 / .80,
      inverse temperature = 1 — all fixed for identifiability. Free per person:
      the three amber terms, ω_danger, k_dur and β₀.

  stage 1, vigor
    · The linear predictor is ALL that is on screen, and it is now FOUR terms.
      TWO THINGS CAME OFF THE SLIDE at request and you have to supply both:
        – the ORDERED-BETA likelihood (2026-08-16). disc is still modelled as an
          ordered beta. If anyone asks why: ~12% of trials sit exactly on the
          requirement floor and 2.5% on the ceiling, a plain beta cannot put mass
          at a boundary, and the ordered beta can.
        – the PROBE-TRIAL TERM b_forced (2026-08-16). It is still in the fitted
          model — a group-level coefficient that absorbs forced-choice probe
          trials so they do not contaminate the free-choice estimates. It is a
          nuisance regressor and nothing in the talk turns on it, which is why it
          is off the slide. Say it only if someone asks how probe trials were
          handled. DO NOT PUT EITHER OF THESE BACK ON THE SLIDE.
    · The four terms on screen all vary BY PERSON — that is what the bold is
      telling you: tonic mobilization, the cookie premium, and sensitivity to
      threat (red) and to distance (blue). The cutpoints c₀ < c₁, the precision φ
      and b_forced are group-level.
    · Cookie is effect-coded ∓0.5; threat and distance are centered.

  stage 2, the comparison stacks — CORRECTED 2026-08-16, read this before you
           rehearse it. The two stacks are DIFFERENT KINDS OF OBJECT and you
           should introduce them differently. Choice on the left is FOUR RIVAL
           FORMS, not a ladder — there is no M0. Vigor on the right IS a nested
           build, which is why every row after the first starts with a plus.
           Both columns are in the same order as the x-axis of the matching panel
           on the next slide.

    ★ THE LABELS CHANGED 2026-08-16 AND ONE OF THEM IS A TRAP. "M3" now means
      the ADDITIVE model. It used to mean the full SV model, which is now M4. If
      you have rehearsed this slide before today, or you are reading from an
      older printout, you will say the wrong name for the winner. The code names
      did NOT change — see NOTATION below.

    CHOICE, left column:
    · M1 effort — SV = R − k·D. Threat is switched OFF entirely (π = 0 for both
      options), so distance enters only as a linear effort cost. Free per person:
      k_dur, β₀. LOO rank 4 of 4, Δelpd = 2945.0 (dse 57.1) — the worst rung, by
      a wide margin.
    · M2 threat — SV = R(1−π) − C_cap·π. Effort is switched OFF (k = 0), so there
      is no explicit distance cost. DISTANCE STILL MATTERS ANYWAY, through δ: the
      high option's escape difficulty is indexed by its distance, so distance
      raises capture probability even with the effort term gone. Say this if
      someone objects that M2 "ignores distance" — it does not. Free per person:
      ω_danger, β₀. LOO rank 2 of 4, Δelpd = 631.4 (dse 32.4) — threat alone is
      the load-bearing deterrent.
    · M3 additive — SV = R − a·(T·D) − k·D. A raw linear exposure cost: no
      survival transform, and δ never appears, so threat multiplies RAW DISTANCE
      instead of the pinned escape difficulty. Threat MUST multiply distance
      here — a bare threat cost with no option-specific scaling cancels between
      the two options and cannot affect choice at all. Free per person: a, k_dur,
      β₀ — SAME PARAMETER COUNT AS M4. That is the point: this is a test of FORM,
      not an ablation. LOO rank 3 of 4, Δelpd = 905.0 (dse 39.8), and its row
      carries a Pareto-k warning, so that Δ is lower-confidence than M1's or
      M2's. Say so if you quote it.
    · M4 SV — SV = R(1−π) − C_cap·π − k·D. Reward and threat combine
      MULTIPLICATIVELY through survival (expected reward if you escape, minus the
      capture penalty), with effort as a separate additive cost. Free per person:
      ω_danger, k_dur, β₀ — these three are what gets extracted and used in every
      downstream individual-difference analysis. LOO rank 1 of 4, elpd = −10832.1,
      model weight ≈ 1.0.

    · THE ONE-LINE VERSION, if you are short on time: "three of the four are
      real alternatives — drop threat, drop effort, or keep both but combine them
      additively instead of through survival — and the survival form wins
      outright."
    · β₀ is free in all four; it is not what distinguishes them.

    VIGOR, right column — nested, so each row ADDS to the one above it:
    · V1 value — baseline plus the cookie premium. Δelpd ≈ 918.
    · V2 group threat — adds threat and distance coefficients at the GROUP level
      only: everyone is assumed to respond to threat the same way. Δelpd ≈ 486.
    · V3 subj threat — lets THREAT sensitivity vary by person. Δelpd ≈ 456. Note
      how small that step is next to V2's: most of what group-level threat buys,
      it buys for everyone at once.
    · V4 full DJ — also lets DISTANCE sensitivity vary by person. Reported, Δ = 0.
      THIS IS THE ONE THAT MATTERS FOR THE TALK: the model that wins is the one
      where BOTH sensitivities are individual, which is the licence for every
      per-person vigor number later in the deck.
    · The D0 baseline-only model is fitted but is on NEITHER the slide nor the
      panel — it is so far off that plotting it flattens everything else. Mention
      it only if asked what the ladder starts from.
    · V-NUMBERS ARE SLIDE LABELS, matching the panel's tick text. In the code and
      the SI these are D1, D2, D3 and DJ. V1 = D1, V2 = D2, V3 = D3, V4 = DJ.

    · Hand-off to the NEXT SLIDE, which carries both panels side by side, choice
      left and vigor right, matching this slide's columns.

NOTATION. The deck says ω_danger and k_dur throughout, matching the trait forest
plot. The manuscript METHODS write w_danger / k_dur; the RESULTS text calls the
effort cost κ_effort. Same three parameters. Say so if a committee member is
reading along. "bias" in the code is β₀ on the slide. M3's a is log_a_thr in
the code and reuses the ω_danger prior (exp-link, positive-constrained).

MODEL NAMES, SLIDE ↔ CODE. The slide numbers are presentation labels chosen to
match the panel tick text; the code names are historical and DO NOT AGREE with
them. Have this mapping ready, because anyone reading the parquet files or the SI
alongside the talk will hit the collision on M3:

    slide          panel tick        code
    M1 effort      Effort            M1_effort
    M2 threat      Threat            M2_threat
    M3 additive    Additive          Madd_linear
    M4 SV          Full SV           M3_fullSV      ←  code M3 is slide M4
    V1 value       Value             D1
    V2 group T     Group threat      D2
    V3 subj T      Subject threat    D3
    V4 full DJ     Full DJ           DJ

If asked why they differ: the code names are the order the models were WRITTEN,
the slide names are the order they are ARGUED. Do not rename anything in the code
to fix this — the fitted objects and the SI tables carry the code names.

RECENTERING. M3 is fit with recenter=True: each subject's mean ΔSV is subtracted
so β₀ is the intercept at that subject's AVERAGE trial rather than at the
zero-danger corner. Pure reparametrization — likelihood, predictions and LOO are
all unchanged; it only breaks the β₀ / ω_danger ridge.

ANCESTRY. ω_danger is the direct descendant of Bednekoff's danger constant k
(slide 3), and the (1 − π) multiplying R here is his survival weighting.

Q. "Why fix the capture penalty, δ(D) and the inverse temperature?"
→ Not jointly identifiable with β₀ and ω_danger from choice data alone.

FOLLOW-UP YOU SHOULD EXPECT: "does that make the trait results
parameterization-dependent?"
→ OQ-7 / backup F2.B6. If you have not run the sensitivity analysis, SAY IT IS
  IN PROGRESS rather than asserting stability.

Q. "β₀ is a mean-centered intercept?"
→ Yes — evaluated at each participant's average trial. Trial-wise choice
  probabilities, the likelihood and the PSIS-LOO estimates are unchanged, and it
  decorrelates β₀ from ω_danger in the posterior. Uncentered parametrization and
  ridge diagnostics are in the SI.

Q. "Why two models and not one joint choice-vigor model?" (EXPECT THIS ONE —
   it is the obvious question the moment both are on the same slide.)
→ We fit the joint model. Its parameters were not reliably identifiable, so it is
  reported only as an SI robustness analysis and the two channels are reported
  separately. Say it before anyone finds it in the SI.

Q. "Why is choice a softmax but vigor an ordered beta?"
→ Different observation models for different data: a binary choice versus a
  bounded continuous rate with real mass at both boundaries. The COMMON part is
  the value structure, not the likelihood.

Q. "Is the cookie effect reward or effort?"
→ CONFOUNDED BY DESIGN and say so: the heavy cookie is both more rewarding and
  more effortful. The value premium indexes differentiated mobilization, not
  reward sensitivity alone.

Q. "Hierarchical in what sense?"
→ Per-person parameters drawn from a group distribution, fit to every trial,
  non-centered priors, NUTS in NumPyro. R̂ < 1.01 and bulk ESS > 400 on every
  parameter (preregistered).

★ WHAT THIS SLIDE REPLACED: the F2.7 schematic, and the two separate model
slides that preceded it. F2.7 is retired — do not re-commission it.
-->

---
layout: academic-content
section: "STUDY 1 · FORAGING"
---

# Model Comparison

<div class="ladders">

<div class="lad">

<img src="/figures/02-study1-foraging/fig3B_choice_modelcomp.png" alt="Choice model comparison, PSIS-LOO: effort-only, threat-only, additive, full SV" />

</div>

<div class="lad">

<img src="/figures/02-study1-foraging/fig3Bp_vigor_modelcomp.png" alt="Vigor model comparison, PSIS-LOO: value, group threat, subject threat, full DJ" />

</div>

</div>

<style>
/*
  BOTH LADDERS ON ONE SLIDE (merged 2026-08-16; was two slides, "Both costs are
  required" and "What the vigor data require").

  CHOICE ON THE LEFT, VIGOR ON THE RIGHT (2026-08-16) — the same side assignment
  as "One trial, two models", the slide immediately before this one. The channels
  now keep their sides across both slides; if either is ever swapped, swap the
  other too.

  STRIPPED TO THE TWO PANELS (2026-08-16). No bullets, no footer line, and no
  column labels: each figure already carries its own title, which names the
  channel and the criterion. Everything that was written on the slide is in the
  presenter note below and has to be SAID. The panels are as large as the body
  area allows, which is the point of the slide.

  384px IS THE CEILING, NOT A STARTING POINT. Rendered and measured at 1280x720
  on 2026-08-16: the panels come out 348 by 384 (choice) and 343 by 384 (vigor),
  clearing the section delimiter by 26px. That is the tightest figure block in
  the deck. Do not raise the height, and do not add anything below the panels —
  it will collide.

  NEVER write an HTML tag inside a comment in this block (no style tag, no sub
  tag, no angle brackets at all): the block is extracted by a text match, and any
  tag-looking text inside it breaks the whole slide at compile time.
*/
.ladders {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  justify-items: center;
  /* fixed height, so the pair is optically centred in the body area rather than
     hanging off the title */
  height: 384px;
  margin-top: 0.25rem;
}

.lad {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-width: 0;
}

.lad img {
  /* the two PNGs are near-identical in aspect (1061x1170 and 697x780), so one
     max-height gives them matching widths and a level baseline */
  max-height: 384px;
  max-width: 100%;
  width: auto;
}
</style>

<!--
MERGED 2026-08-16: this slide is the old "Both costs are required" (choice) and
"What the vigor data require" (vigor) on one screen, side by side. It is the
payoff of what you just showed on "One trial, two models" — without a sentence
tying it back, this is two bar charts of eight arbitrary models. The tie-back is
NOT the same sentence for the two panels, so do not use one:
  · CHOICE — "those four value forms you just saw: here is which one the
    out-of-sample data actually prefer."
  · VIGOR  — "every free parameter in that linear predictor either earns its
    rung or it doesn't."

★ THE SLIDE IS TWO FIGURES AND A TITLE. Stripped to the panels 2026-08-16 — no
bullets, no footer, no labels. EVERY NUMBER BELOW HAS TO COME OUT OF YOUR MOUTH;
none of it is on screen to read off. Same side assignment as the equations slide:
CHOICE LEFT, VIGOR RIGHT.

SAY FIRST: both panels are out-of-sample (PSIS-LOO), plotted as Δelpd from the
best model. THAT IS ALL THEY SHARE — the two comparisons are different in kind,
and saying "stage-wise, one parameter at a time" over both is WRONG (corrected
2026-08-16):
  · CHOICE, LEFT — FOUR COMPETING VALUE FORMS, not a nested ablation. The
    additive model has the same number of free parameters as the winner, so that
    row tests FORM, not whether a parameter earns its keep.
  · VIGOR, RIGHT — a genuinely nested ladder, V1 through V4, each rung adding
    one term to the linear predictor. "Earns its rung" is the right phrase HERE
    and only here. (The baseline-only D0 model is fitted but NOT plotted: at
    roughly 9,000 from best it would flatten every other point.)

SAY SECOND, BEFORE YOU WALK EITHER PANEL: THE TWO Y-AXES ARE NOT COMPARABLE.
Choice runs to 3000, vigor to 1000, and with the bullets gone there is nothing
on screen to stop the room reading the choice ladder as the bigger effect. elpd
is comparable only WITHIN a panel — different likelihoods, different numbers of
observations. This used to be a Q and A answer; it is now something you say
unprompted, because the slide no longer says it for you.

TAKEAWAY. Both channels need the full model, for different reasons: on choice,
threat buys more than effort but effort still earns its place; on vigor, the
value premium dominates and per-person threat sensitivity still earns its rung.

2 min for both panels. Walk LEFT (choice), then RIGHT (vigor) — the same order
as the equations slide. Be explicit about which panel you are on: the two are
different KINDS of comparison (competing forms vs nested ladder), with different
model names and non-comparable y-axis scales.

RIGHT, VIGOR (V1 value / V2 group threat / V3 subject threat / V4 full DJ).
  · The value premium dominates the ladder.
  · Group threat + distance: +433.
  · Per-subject threat slope: +28 — this is the rung that LICENSES THE TRAIT
    ANALYSIS later in the section.
  · Per-subject distance slope: +456.
  · K-fold cross-validation agrees on every rung.

LEFT, CHOICE (M1 effort / M2 threat / M3 additive / M4 SV — NOT a nested ladder;
see the equations slide, where all four forms are written out).
  · Threat buys more predictive accuracy than effort — but effort still earns
    its place; the two capture complementary variation.
  · Effort-only is the worst by a wide margin (Δelpd 2945.0); threat-only is the
    best of the three alternatives (631.4); the additive form sits between them
    (905.0) despite having the SAME parameter count as the winner.
  · The full subjective-value model wins decisively: elpd −10832.1, weight ≈ 1.0.
  · The additive row carries a Pareto-k warning — flag it if you quote its Δ.
  · Fit quality (r = 0.99, R-squared = 0.27) is its own slide, S2.10b. Keep this
    slide about the LADDERS.

WATCH THE NAMING IF SOMEONE READS ALONG. THREE NAMING SYSTEMS ARE IN PLAY and
they do not agree. USE THE PANEL'S NAMES OUT LOUD — the panel is what the room
can see, and since 2026-08-16 the previous slide's tags match it exactly.

    panel tick        slide tag        code
    Effort            M1 effort        M1_effort
    Threat            M2 threat        M2_threat
    Additive          M3 additive      Madd_linear
    Full SV           M4 SV            M3_fullSV     ←  code M3 is slide M4
    Value             V1 value         D1
    Group threat      V2 group threat  D2
    Subject threat    V3 subj threat   D3
    Full DJ           V4 full DJ       DJ

★ THE COLLISION TO WATCH: a bare "M3" means the ADDITIVE model on the deck and
the WINNER in the code. If a committee member has the SI or a parquet file open
and says "M3", ask which one they mean before you answer.

CORRECTED 2026-08-16. This note used to say the choice stack was a nested ladder
(M0 → +k_dur → +ω_danger → full) and that the reduced models' functional forms
were unstated. BOTH WERE WRONG. There is no M0; the four models are competing
forms, and the additive model has the same parameter count as the winner, which
makes it a test of FORM rather than an ablation. All four forms are now written
out on the equations slide and spelled out in its notes — read them there before
rehearsing this one.

Q. "+28 is tiny compared with the value premium."
→ Correct, and it is the honest number. It exceeds twice its standard error,
  K-fold reproduces it exactly, and the individual-difference claim needs only
  that per-person threat slopes are reliably estimable — not that they dominate
  prediction.

Q. "Pareto-k diagnostics?"
→ 5 or fewer of 41,504 trials above 0.7 (max 0.85), all near-ceiling censored;
  exact refits shift elpd by 0.5 nats or less.

Q. EXPECT THIS FROM ANYONE READING THE MANUSCRIPT: "your Methods say you built a
   NESTED ladder for choice — M0, then +k_dur, then +w_danger, then full. That is
   not what this panel shows."
   (The M0/M1/M2 in this question are the MANUSCRIPT's numbering, which is a third
   scheme again — not the slide tags and not the code names. The manuscript's "M2"
   in particular is not the slide's M2 threat; see the first follow-up below.)
→ They are right that the manuscript says that, and the manuscript is wrong there.
  Its own Fig. 3d caption enumerates the four competing variants — effort-only,
  threat-only, additive, full SV — which is what was actually fitted and what is
  plotted here. The code names are M1_effort, M2_threat, Madd_linear, M3_fullSV.
  OWN IT PLAINLY: the Methods paragraph is being corrected. Do not try to
  reconcile the two descriptions on your feet; they do not reconcile.
  (Flagged 2026-08-16, verified against pdfs/manuscript_draft.pdf, not just the
  converted text. The VIGOR ladder is genuinely nested and its Methods
  description is correct, so this applies to the left panel only.)

  TWO FOLLOW-UPS TO BE READY FOR, both sharper than the question above:
  · "Does your threat-only model include the effort cost?" NO — k is switched
    off in M2_threat; distance still acts, but only through delta inside the
    capture probability. The Methods paragraph describes its M2 as M1 PLUS
    w_danger, i.e. BOTH costs present, which is a different model from the one
    that was fitted. So the text misdescribes the model, not merely its name.
  · "Where is the additive model described?" It is not — in the current draft it
    appears ONLY in the Fig. 3d caption. Neither Methods nor Results mentions
    it, so the text never states that a test of functional FORM was run at all.
    Say that it will be written up; do not imply it is already in the text.

Q. "Why are the y-axes so different?"
→ Different likelihoods and different numbers of observations; elpd is not
  comparable ACROSS the two panels, only within each. You should already have
  said this — see the say-out-loud item above.

The choice PPC (F2.9) was an inset on the old choice slide; it is a backup slide
now — the spec already marked it a first-cut candidate.
-->
---
layout: academic-content
section: "STUDY 1 · FORAGING"
---

# The model reproduces the cell structure

<div class="flex justify-center items-center gap-8" style="height: calc(100% - 5.5rem);">
  <img src="/figures/02-study1-foraging/fig3C_choice_ppc.png" alt="Choice posterior predictive check, group level" style="max-height: 300px; width: auto;" />
  <img src="/figures/02-study1-foraging/fig3D_vigor_ppc.png" alt="Vigor posterior predictive check, group level" style="max-height: 300px; width: auto;" />
</div>

<!--
★ REHEARSE. S2.10b, part 1 of 2.

Two group-level PPC panels: choice (left) and discretionary vigor (right).
Cell-level observed vs predicted r = 0.99 for choice.

TAKEAWAY. The model's fit is shown, not asserted — cell-level structure at
r = 0.99.

30 s. Continue straight into the subject-level slide; the two are one point.
-->

---
layout: academic-content
section: "STUDY 1 · FORAGING"
---

# The model reproduces individual behavior

- Cross-validated **R² = 0.27**

<div class="flex justify-center items-center" style="height: calc(100% - 8.1rem);">
  <img src="/figures/02-study1-foraging/fig3E_subj_exp_86.png" alt="Subject-level posterior predictive: choice and discretionary vigor across trials" style="max-height: 310px; width: auto;" />
</div>

<!--
★ REHEARSE. S2.10b, part 2 of 2.

TAKEAWAY. Out-of-sample R² = 0.27 at the trial level, against r = 0.99 at the
cell level.

30 s.

Q. "R² = 0.27 — is that good?"
→ Trial-level binary choice, three free parameters, out-of-sample. Contrast with
  the cell-level fit (r = 0.99) on the previous slide: the model captures the
  STRUCTURE well; residual variance is trial-to-trial stochasticity.
-->

---
layout: academic-content
section: "STUDY 1 · FORAGING"
---

# Model estimated threat tracks self-reported threat

<div class="flex justify-center my-2">
  <img src="/figures/02-study1-foraging/fig4B_convergence.png" alt="Felt-to-fitted convergence: appraisal reactivity vs omega_danger" style="max-height: 340px; width: auto;" />
</div>
<!-- 
- Confidence reactivity vs **ω_danger** r = −0.40 &nbsp;·&nbsp; anxiety vs **ω_danger** r = +0.33 (disatt. −0.58 / +0.47)
- Vigor: tracks **threat_vigor specifically** — **silent** on tonic level, value premium, distance -->

<!--
★ REHEARSE. S2.11. 1 min.

TAKEAWAY. The people whose ratings react more steeply are the same people whose
CHOICES weight capture risk more.

Nulls shown, not omitted.

Q. "Isn't this just 'anxious people say anxious things'?"
→ The SPECIFICITY is the answer: threat-related appraisal maps onto
  threat-related parameters and not onto the other three. A general
  response-style account predicts uniform correlations.

FOOTNOTE (from spec): this is where to say that the convergence is what lets us
begin to look at psychopathology.
-->

---
layout: academic-content
section: "STUDY 1 · FORAGING"
---

# Three orthogonal dimensions

<div class="flex justify-center my-1">
  <img src="/figures/02-study1-foraging/Fig5_Bifactor.png" alt="Bifactor loadings for g, apathy-specific, and anxiety-specific" style="max-height: 305px; width: auto;" />
</div>

- **g** loads on nearly every item &nbsp;·&nbsp; **Apathy-specific** carried by AMI items &nbsp;·&nbsp; **Anxiety-specific** carried by STAI items
- Model fit: CFI 0.91, RMSEA 0.057 — better than correlated-two-factor and unidimensional


<!--
S2.14. 1 min.

TAKEAWAY. g, apathy, and anxiety are mutually orthogonal by construction, so
every association that follows is independent of the other two.

PRODUCTION: F2.16 = REMAKE of manuscript Fig 5 — loading bars for the three
factors, colored by instrument. Reduce the correlation matrix to a thumbnail or
drop it.

Q (ALVAREZ). "Factor scores are indeterminate; orthogonality is an artifact of
Anderson–Rubin."
→ Determinacies are 0.98 and 0.86. BACKUP F2.B1: the dissociation replicates
  under Bartlett/regression scoring (OQ-1).
  RUN THIS BEFORE THE TALK — it is the likeliest hard question in the room.
-->

---
layout: academic-content
section: "STUDY 1 · FORAGING"
---

# Associations with Psychopathology

<div class="flex justify-center items-center" style="height: calc(100% - 5.5rem);">
  <img src="/figures/02-study1-foraging/fig5_trait_forest_nobaseline.png" alt="Trait loadings on choice and vigor parameters — apathy and anxiety rows on shared axes" style="max-height: 100%; max-width: 100%; width: auto;" />
</div>


<!--
★ REHEARSE. S2.15 + S2.16 — combined into one slide 2026-08-15 (was slides 27
and 28). 3 min. F2.18 on shared axes — apathy and anxiety rows share colors and
axes; re-drawing the axes breaks the argument.

2026-08-16: on-slide text dropped and the figure enlarged to fill the slide.
NO CLICKS — the whole plot is up from the first beat. The numbers are now SPOKEN,
not shown, so they live here:

  APATHY — threat-selective withdrawal
    ω_danger   β = 0.21 [0.13, 0.29] ✓
    k_dur      β = −0.03 — null, inside the ROPE
    P(high)    null   ·   escape | chose high   β = 0.37
    Vigor      value +0.135, baseline +0.113 — MORE mobilization

  ANXIETY — context-general low approach
    β₀         β = −0.12 ✓ — both samples
    ω_danger   null — no amplification with threat
    Vigor      threat_vigor +0.123 ✓   ·   value premium null
    → less approach overall; greater threat-evoked mobilization

TAKEAWAY. Apathy predicts avoiding the costly option *when it is dangerous*, and
predicts no effort aversion at all. Anxiety predicts approaching less
*everywhere* — including when threat is minimal — and then pressing harder once
committed under danger.

SAY IT PLAINLY: apathy is defined by reduced willingness to exert effort, and
here it is unrelated to effort cost and unrelated to lower pressing. This is a
SELECTIVE POLICY UNDER RISK, not disengagement.

Q. "Then your effort parameter must be broken."
→ Three converging results say otherwise: k_dur null and inside the ROPE; higher
  baseline vigor and larger value premium (opposite of disengagement); higher
  conditional escape rate.

Q. "This is backwards — shouldn't anxiety be the threat-sensitive one?"
→ EXPECT THIS; IT IS THE MOST COUNTERINTUITIVE RESULT IN THE TALK. The anxiety
  literature's "overestimation of harm" predicts an ω_danger effect and it isn't
  there. Two readings: anxiety as a tonic shift in default policy rather than
  threat-reactive appraisal; or the appraisal component is captured by the g
  factor and what remains is the tonic residual.
  HAVE A PREFERRED READING. OQ-13 (is ω_danger miscalibration or sensitivity?)
  would substantially sharpen the answer — run it if there is time.

FOLLOW-UP: "what are you claiming theoretically?" → OQ-12. DECIDE IN ADVANCE
between "scope condition" and "reinterpretation of effort-based apathy" — do not
improvise this in the room.
-->

---
layout: academic-content
section: "STUDY 1 · FORAGING"
---

# Computational signatures of apathy and anxiety

<div style="margin-top: 1.8rem; border-left: 3px solid #9b8ec4; padding-left: 1.15rem; font-size: 1.15rem; line-height: 1.55; color: #1a1a1a;">
  <strong>Effort and threat are integrated within a common valuation process</strong>, such that effort costs depend on the danger incurred while acting.
</div>

<div v-click="1" style="margin-top: 2.4rem; display: flex; gap: 0.75rem;">
  <div style="flex: none; font-size: 1.1rem; line-height: 1.45; color: #9b8ec4;">•</div>
  <div>
    <div style="font-size: 1.1rem; line-height: 1.45; color: #1a1a1a;">
      <strong>Apathy selectively reduces high-effort choices through greater threat weighting</strong>
    </div>
    <div style="margin-top: 0.4rem; font-size: 0.95rem; line-height: 1.5; color: #5b6472;">
      consistent with avoidance of <strong style="color: #5b6472;">effort expended under risk</strong> rather than generalized effort aversion
    </div>
  </div>
</div>

<div v-click="2" style="margin-top: 2rem; display: flex; gap: 0.75rem;">
  <div style="flex: none; font-size: 1.1rem; line-height: 1.45; color: #9b8ec4;">•</div>
  <div>
    <div style="font-size: 1.1rem; line-height: 1.45; color: #1a1a1a;">
      <strong>Anxiety reduces overall approach without increasing threat weighting</strong>
    </div>
    <div style="margin-top: 0.4rem; font-size: 0.95rem; line-height: 1.5; color: #5b6472;">
      consistent with a heightened prior against choices that increase <strong style="color: #5b6472;">exposure to danger</strong>
    </div>
  </div>
</div>

<div v-click="3" style="margin-top: 2.6rem; font-size: 0.85rem; color: #6b7280;">
  Preregistered <em>N</em> = 518 · replication sample planned, <em>n</em> = 800
</div>


<!--
S2.18b. 60 s. NEW 2026-08-16 (D13) — the interpretation beat the take-home was
missing. Budget: +1 min on §2, paid out of §4 (4 → 3 min).

FOUR-BEAT BUILD, additive — the claim frames, the bullets land one at a time:
  click 0  title + the INTEGRATION CLAIM (left bar). Read it, then pause.
  click 1  APATHY bullet
  click 2  ANXIETY bullet
  click 3  preregistration / replication line

TAKEAWAY. Effort and threat are integrated into one value computation, and
affect enters at identifiable places inside it.

NO FIGURE HERE, deliberately. This is the beat where they look at you — and
now it is FOUR beats, not one. Say each bullet before you click the next in;
do not let the build outrun the sentence.

SPOKEN, NOT ON THE SLIDE:

1. WHY IT'S IMPACTFUL — the durable contribution is PARAMETER-LOCALIZATION, not
   the two traits. trier2025foraging has the same traits, ecologically, at
   n ≈ 1,076 — but maps them onto BEHAVIOURS. sporrer2026transdiagnostic has a
   generative model and traits at N = 1,005 — but no graded effort. Putting
   traits on PARAMETERS is what turns "anxious people approach less" into
   "anxiety shifts β₀ and leaves ω_danger untouched." That is what Chapter 1
   contributes to the whole thesis.

2. THE REINTERPRETATION (OQ-12b) — what looks like effort aversion in tasks that
   hold threat at zero may be partly THREAT-DRIVEN WITHDRAWAL those tasks cannot
   see.

3. SCOPE (OQ-12a) — general population, dimensional self-report, brief motor
   effort, low stakes. Not clinical apathy.

SAY "EFFORT–THREAT COMPUTATION", not "one computation" — sporrer2026transdiagnostic
has a generative model with transdiagnostic traits at N = 1,005 and would be the
counterexample to the looser claim. It does NOT model apathy separately (its
loading is on a compulsivity factor), so the tightened claim stands.

DON'T UNDERSELL THE ANXIETY RESULT AS A CONFIRMATION. Sporrer ran the Gillan
three-factor battery against a virtual-predator approach-avoidance task
(N1 = 315, N2 = 690) and found NO associations between behaviour and
transdiagnostic anxiety-depression — their words: laboratory cautiousness "is not
strongly related to self-reported anxiety." Trait anxiety loading cleanly on a
tonic avoidance intercept is therefore NOT a foregone conclusion in this
literature. Present it as a POSITIVE RESULT.

HAVE COLD — the two numbers that pre-empt the obvious challenges:
- "Isn't the apathy effect just co-occurring anxiety?" → apathy → ω_danger holds
  AMONG LOW-ANXIETY PARTICIPANTS, β = 0.23.
- "Isn't this all general distress?" → g IS NULL THROUGHOUT CHOICE (one weak
  negative loading on threat_vigor, nothing else).

⚠️ SAY BOTH OF THESE BEFORE ANYONE ASKS:

- SIGN WARNING. trier2025foraging is the closest published precedent and it runs
  the OTHER WAY — there apathy REDUCED threat-checking; here apathy INCREASES
  danger weighting. Precedent for the PARAMETER CLASS, opposite in sign. Own it.

- WE ARE GENUINELY UNSURE HOW TO READ THE APATHY RESULT, and the reason is
  specific, not vague: ω_danger scales a danger term, and this design never
  independently elicited the participant's own danger estimate — so sensitivity
  vs miscalibration CANNOT BE DECIDED HERE. The next analysis compares fitted π
  against each subject's own escape record (OQ-13). Named as pending on purpose:
  a null there cannot destabilize the take-home.

WHAT'S NEXT: the n = 800 replication sample. (The timeline slide must show this
and OQ-13 — consistency check W6.)

Q. "Isn't apathy-that-isn't-effort-averse just a broken effort parameter?"
→ No settled consensus is being overturned. At parameter level:
  bonnelle2016apathy = INCREASED effort sensitivity; leheron2018apathy = reduced
  reward incentivization, NO vigour effect; scholl2022apathy states outright that
  apathetic participants "did not avoid the effort." The effort-cost account is a
  slogan more than a result.
-->

---
layout: academic-content
section: "STUDY 2 · LLM"
---

# Thesis proposal

<div class="flex items-center" style="height: 414px;">
  <ChapterMap :active="2" />
</div>

<!--
SECTION DIVIDER — CHAPTER 2 LIT.

10 s. Read Chapter 2's question off the card. This is also the beat where you
name what Chapter 1 could NOT do, so the handoff is an argument rather than a
topic change.
-->

---
layout: academic-content
section: "STUDY 2 · LLM"
---

<!-- <Roadmap :active="2" /> -->

# Functionalist premise

<div class="wet-sub">Emotion as a causal functional state</div>

<div class="wet-intro">


</div>

<div class="wet-row wet-row1">

<div class="wet-box wet-green wet-g1" v-click="1">
<span class="wet-tag">Eliciting conditions</span>

Threat

Effort

Reward

…

</div>

<div class="wet-arrow wet-a1" v-click="2">→</div>

<div class="wet-box wet-blue wet-b1" v-click="2">
<span class="wet-tag">Internal state (emotion)</span>

A central state, defined by what it does

<div class="wet-cap" style="margin-top: 0.34rem;">

e.g., danger weighting $\omega_{\text{danger}}$

</div>

</div>

<div class="wet-fan" v-click="3">
<svg width="62" height="216" viewBox="0 0 62 216" fill="none" aria-hidden="true">
<line x1="2" y1="108" x2="48.6" y2="55.2" stroke="#5b6472" stroke-width="1.5" stroke-linecap="round" />
<polygon points="54,49 50.7,58.1 45.4,53.4" fill="#5b6472" />
<line x1="2" y1="108" x2="48.6" y2="160.8" stroke="#5b6472" stroke-width="1.5" stroke-linecap="round" />
<polygon points="54,167 50.7,157.9 45.4,162.6" fill="#5b6472" />
</svg>
</div>

<div class="wet-stack" v-click="3">

<div class="wet-box wet-purple">
<span class="wet-tag">Cognitive processes it biases</span>

Attention, valuation, learning, …

</div>

<div class="wet-box wet-amber">
<span class="wet-tag">Behavior &amp; experience</span>

Choice, vigor, reports, physiology

</div>

</div>

</div>

<template #references>
Adolphs & Andler (2018)
</template>

<style>
/*
  SLIDE GEOMETRY ONLY. The box, tag, arrow and bar system is defined once in
  style.css under the WHY-EMOTION-THEORY block, shared by all four slides of
  this argument. Widths below sum to 884px, the content area at the deck's
  default 980px canvas.

  THE FAN IS THE WHOLE POINT OF THE SLIDE. Cognition and behavior are PARALLEL
  outputs of the internal state, not a chain that runs through cognition. There
  is no arrow between the purple and the amber box and there must never be one;
  an earlier draft of this diagram was a four-box chain and said the wrong thing.
  The two targets are equal height and equally far from the state, which is what
  makes the parallelism readable without a word being said.

  THE SVG COORDINATES ARE TIED TO THE 216px STACK: with a 20px gap the targets
  are 98px each, so the state sits at y=108 and the two targets at y=49 and
  y=167. If the stack height or the gap changes, the fan has to be recomputed by
  hand or the strokes will miss the boxes. The arrowheads are plain polygons --
  the deck has no SVG marker definitions anywhere and this is not the slide to
  introduce one.

  NEVER write an HTML tag inside a comment in this block (no angle brackets at
  all): the block is extracted by a text match, and any tag-looking text inside
  it breaks the whole slide at compile time.
*/
.wet-row1 { height: 216px; align-items: center; }
.wet-row1 .wet-box { flex: none; }
.wet-g1 { width: 168px; }
.wet-a1 { width: 42px; }
.wet-b1 { width: 226px; }

.wet-fan {
  width: 62px;
  flex: none;
  display: flex;
  align-items: center;
}

.wet-stack {
  width: 386px;
  flex: none;
  height: 216px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.wet-stack .wet-box { flex: 1; }
</style>

<!--
S3.1a. 45 s. SECTION OPENER — roadmap strip on.

TAKEAWAY. The object of study is a causal ROLE. That is what makes emotion
experimentally tractable, and it is the premise the next three slides run on.

SAY IT IN ONE BREATH: on the functionalist account, an emotion is a central
state individuated by its causal relations — to the conditions that elicit it,
to other internal states, and to what it does downstream. Defined by what it
does, not by what it is made of. To characterise a state IS to characterise its
position in that network.

POINT AT THE FAN AND SAY WHY IT FORKS. Cognition and behavior are parallel
consequences of the same state, not a chain. That matters two slides from now:
if they were a chain you could get at the state by intervening on cognition, and
you cannot.

DO NOT get drawn into feeling here. The claim is deliberately narrow and slide
S3.1d states it explicitly — hold it until then.
-->

---
layout: academic-content
section: "STUDY 2 · LLM"
---

# Limitations in Behavioral Paradigms

<div class="wet-sub">Inference from the outside</div>

<div class="wet-row wet-row2">

<div class="wet-box wet-green wet-g2" v-click="1">
<span class="wet-tag">Manipulate the world</span>

Threat

Effort

Reward

…

</div>

<div class="wet-arrow wet-a2" v-click="2">→</div>

<div class="wet-box wet-latent wet-l2" v-click="2">
<span class="wet-tag">Latent internal state — not directly observable</span>

<div class="wet-qmark">?</div>

<div class="wet-cap">

e.g., $\omega_{\text{danger}}$

</div>

</div>

<div class="wet-arrow wet-a2" v-click="3">→</div>

<div class="wet-box wet-amber wet-o2" v-click="3">
<span class="wet-tag">Observe the outputs</span>

Choice / flight

Vigor

Verbal reports

Physiology

…

</div>

</div>

<div class="wet-infer" v-click="4">

<svg width="22" height="32" viewBox="0 0 22 32" fill="none" aria-hidden="true" style="margin: 0 auto 0.3rem;">
<line x1="11" y1="31" x2="11" y2="9" stroke="#b0b5bd" stroke-width="1.5" stroke-dasharray="7 5" stroke-linecap="round" />
<polygon points="11,2 7.6,9.5 14.4,9.5" fill="#b0b5bd" />
</svg>

We fit parameters (e.g., $\omega_{\text{danger}}$) to explain behavior.

We do not <span class="wet-red">read</span> or <span class="wet-red">set</span> the variable.

</div>

<!-- <div class="wet-bar" v-click="5">

Humans: we infer the state from its **causes** and its **consequences**.

</div> -->

<style>
/*
  SLIDE GEOMETRY ONLY -- shared system in style.css, WHY-EMOTION-THEORY block.
  246 + 46 + 300 + 46 + 246 = 884, the content width. The two flanks are equal
  ON PURPOSE: it puts the dashed box dead centre, which is what lets the
  inference annotation below simply take margin auto and land under it.

  THE CENTRE BOX IS DASHED AND THE ARROW INTO IT IS DASHED, both in the deck's
  leader-line grey. Solid means measured, dashed means inferred. That is the
  entire argument of the slide and it is carried by the line style, so do not
  make either of them solid to tidy the drawing up.

  align-items is stretch, not center, so the three boxes come out equal height
  even though the outputs list is two lines longer than the conditions list.

  NEVER write an HTML tag inside a comment in this block (no angle brackets at
  all): the block is extracted by a text match, and any tag-looking text inside
  it breaks the whole slide at compile time.
*/
.wet-row2 { height: 210px; }
.wet-g2 { width: 246px; flex: none; }
.wet-a2 { width: 46px; }
.wet-l2 { width: 300px; flex: none; }
.wet-o2 { width: 246px; flex: none; }

/* wider than the box it points at so the omega line does not wrap; still
   centred on it, because the two flanks are the same width */
.wet-infer {
  width: 420px;
  margin: 0.35rem auto 0;
  text-align: center;
}

/* UnoCSS preflight sets svg to display block, so text-align does NOT centre
   this arrow -- it needs margin auto of its own. */
.wet-infer p {
  margin: 0 !important;
  font-size: 0.86rem !important;
  line-height: 1.5 !important;
  color: #2d3748 !important;
}

.wet-infer p + p { margin-top: 0.2rem !important; }
</style>

<!--
S3.1b. 50 s.

TAKEAWAY. Study 1 reaches the state only through its causes and its
consequences. That is inference, and it is as far as the design goes.

WALK THE ROW LEFT TO RIGHT: I manipulate threat, effort and reward; I observe
choice, vigor, ratings and physiology; and between them sits a state I never
touch. omega_danger is a useful DESCRIPTION of an inferred computation.

THE ONE SENTENCE THAT HAS TO LAND — point at the dashed arrow: the arrow into
the state is dashed because the state is fit, not measured. I cannot identify
the representational variable, measure its value, and then set it while holding
the situation fixed.

THIS SLIDE IS NOT A CRITICISM OF STUDY 1. It is what the design can establish,
stated exactly. The limitation is the setup for the next slide, so do not
apologise for it — say it flat.
-->

---
layout: academic-content
section: "STUDY 2 · LLM"
clicks: 2
---

# Concepts live as directions

<div style="height: 410px;">
  <ConceptDirections :stage="$clicks" />
</div>

<template #references>
Zou et al. (2023); Park et al. (2024)
</template>

<!--
S3.0. 40 s. The premise the whole of Study 2 rests on (ConceptDirections
component). It comes BEFORE "why a language model" on purpose: the next slide's
READ / INTERVENE cards only land as a licence if the audience already believes
that a concept is a direction you can measure and move along.

TAKEAWAY. A concept is a DIRECTION, and contexts that differ only in feeling all
displace along the same one. That is the whole extraction method, in miniature.

BUILD, 2 clicks:
0. Two hateful sentences, sitting in the space as vectors from the origin.
   They are about different things — the world, cats.
1. Their matched retellings: same content, opposite feeling.
2. THE SLIDE. Both displacement arrows draw AT ONCE — pause here and let it
   land before speaking. Different topics, one shared direction. That direction
   is the concept.

THE FIGURE HAS NO CAPTION — it is the picture alone, so the two lines that used
to print under it are YOURS TO SAY, and the slide will not say them for you.
Land them on click 2, in this order:
- "Matched pairs — same content, opposite feeling — displace along one shared
  direction."
- "Average many such displacements and you have the concept vector." That is the
  promissory note slides 32-34 redeem; say it as the exit line rather than
  waiting for a click that no longer exists.

SPEAK TO (nothing below is on the slide):
- These are MINIMAL pairs. Our stories are free retellings of a topic, not
  minimal edits — which is exactly why topic leaks into the raw contrast, and
  why slide 34 needs a projection step. Flag it here and the projection stops
  looking like a fudge when it arrives.
- The picture is 2D and the space is not. Nothing here depends on the
  dimension; it depends on the displacement being shared.

Q. "So you just average differences?"
→ Almost. The gap between almost and exactly is the next three slides.

Q. "Why should a concept be a direction at all?"
→ Because that is all the architecture does with the residual stream: read by
  projection, write by addition. A direction is the representation the
  components can actually use. (Zou et al., Park et al. — footer.)
-->

---
layout: academic-content
section: "STUDY 2 · LLM"
---

# Why a language model

<div class="wet-sub">Representational read/write access</div>

<!-- <div class="wet-intro">

LLMs give access to a candidate representation **in the same coordinate system as the theory** — and such representations plausibly exist because predicting human-authored text requires tracking the emotional states of the people in it.

</div> -->

<div class="wet-row wet-row4">

<div class="wet-box wet-blue wet-r4" v-click="1">
<span class="wet-tag">Read</span>

<div class="wet-cap">

Measure the representation

</div>

<div class="wet-eq">

$a_{\text{fear}} = h^{\top} v_{\text{fear}}$

</div>

<div class="wet-bars">
<span style="height: 12px"></span>
<span style="height: 21px"></span>
<span style="height: 9px"></span>
<span style="height: 26px"></span>
<span style="height: 15px"></span>
<span class="on" style="height: 44px"></span>
<span style="height: 11px"></span>
<span style="height: 23px"></span>
<span style="height: 14px"></span>
<span style="height: 18px"></span>
</div>

<div class="wet-cap">

Activation in the residual stream $h$

</div>

</div>

<div class="wet-arrow wet-a4" v-click="2">→</div>

<div class="wet-box wet-purple wet-i4" v-click="2">
<span class="wet-tag">Intervene in the same space</span>

<div class="wet-eq">

$h' = h + \textcolor{#c53030}{\alpha\, v_{\text{fear}}}$

</div>

<svg width="112" height="72" viewBox="0 0 112 72" fill="none" aria-hidden="true" style="margin: 0.3rem auto 0;">
<line x1="14" y1="8" x2="14" y2="62" stroke="#e6e8ec" stroke-width="1" />
<line x1="8" y1="62" x2="104" y2="62" stroke="#e6e8ec" stroke-width="1" />
<line x1="14" y1="62" x2="83" y2="21.5" stroke="#2b6cb0" stroke-width="1.5" stroke-linecap="round" />
<polygon points="90,17 84,24.6 80.5,18.6" fill="#2b6cb0" />
</svg>

</div>

<div class="wet-arrow wet-a4" v-click="3">→</div>

<div class="wet-box wet-amber wet-o4" v-click="3">
<span class="wet-tag">Observe downstream</span>

<div class="wet-cap">

Downstream computation and behavior change

</div>

Flight initiation

Vigor / pace

Danger ratings

…

</div>

</div>

<div class="wet-bar wet-bar-green" v-click="4">

We identify a candidate emotion representation, **perturb that same representation**, and measure what changes downstream.

</div>

<div class="wet-qual" v-click="5">

The vector is a *candidate representation* playing an *emotion-like* functional role. Not evidence of *feeling*, and not necessarily the complete representation.

</div>

<template #references>
Sofroniew et al. (2026);
</template>

<style>
/*
  SLIDE GEOMETRY ONLY -- shared system in style.css, WHY-EMOTION-THEORY block.
  268 + 46 + 256 + 46 + 268 = 884.

  COLOUR FAMILIES ARE THE SAME THREE AS THE PREVIOUS THREE SLIDES, which is the
  reason this slide reads as the answer to them: blue is the internal state you
  read, purple is the thing you intervene on, amber is behavior and outputs.
  An earlier draft made the observe column purple; that broke the code the whole
  sequence runs on, because purple had already been spent on the intervention.

  RED APPEARS EXACTLY ONCE ON THIS SLIDE, on the added steering term. It is the
  only new thing in the equation and the whole argument of the section is that we
  get to write it. Do not colour anything else.

  The read column's bar chart is decorative in the strict sense -- it is a
  schematic of one activation profile with the fear direction picked out, not
  data. Say "schematic" if anyone asks; the real numbers are two slides later.

  NEVER write an HTML tag inside a comment in this block (no angle brackets at
  all): the block is extracted by a text match, and any tag-looking text inside
  it breaks the whole slide at compile time.
*/
.wet-row4 { height: 178px; }
.wet-r4 { width: 268px; flex: none; }
.wet-a4 { width: 46px; }
.wet-i4 { width: 256px; flex: none; text-align: center; }
.wet-o4 { width: 268px; flex: none; }

.wet-eq { margin: 0.35rem 0 0.1rem; }
.wet-eq p { margin: 0 !important; }
.wet-eq .katex { font-size: 0.95rem; }

.wet-bars {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 46px;
  margin: 0.45rem 0 0.3rem;
}

.wet-bars span {
  width: 6px;
  border-radius: 1px;
  background: #d7dbe0;
}

.wet-bars span.on { background: #2b6cb0; }
</style>

<!--
S3.1d. 50 s. PAYOFF OF THE THREE-SLIDE ARGUMENT.

TAKEAWAY. The variable I measure is the variable I then perturb. That is the
move — representationally targeted causal control.

WHAT THE ADVANTAGE IS NOT. Not causal control per se, and NOT that steering is
more behaviorally effective than prompting. Say this before anyone asks; it is
the first objection every time.

THE SECOND CLAUSE OF THE INTRO LINE IS LOAD-BEARING and is the only place in the
deck that answers "why would a text model have such a state at all": predicting
human-authored text requires tracking the emotional states of the people in it.
Do not skip it to save five seconds.

PREVIEW WITHOUT DELIVERING: adding fear shifts flight earlier, subtracting
reverses it, magnitude scales with alpha — and fear and calm do not act through
one generic emotion scalar. All of that is S3.5 to S3.8.

THE QUALIFICATION IS ITS OWN CLICK. Read it. A candidate representation playing
an emotion-like functional role, not evidence of feeling, not necessarily the
complete representation. The comparison to Study 1 is at the level of
COMPUTATIONAL ORGANISATION — not shared experience, not shared implementation.

Q (ADOLPHS). "Does it have emotions or represent emotion concepts?"
→ ANSWER WITH CROSS-CHANNEL COHERENCE (previewed here, delivered at S3.7): the
  same intervention moves verbal danger ratings and flight choices together
  (r = +0.86), which is what a central state predicts and two independently
  nudged output circuits do not. OQ-26.
-->

---
layout: academic-content
section: "STUDY 2 · LLM"
clicks: 4
---

# Building the corpus

<div style="height: 410px;">
  <EmotionCorpus :stage="$clicks" />
</div>

<!--
S3.2a. 45 s. First of three method slides (EmotionCorpus component).

TAKEAWAY. The emotion is conveyed but never named — that is what makes a
topic-matched contrast possible at all.

BUILD, 4 clicks:
0. 100 topics, three shown.
1. × 50 emotions.
2. The generation prompt — three excerpted lines. The NEVER line is the design.
3. The tally: the corpus in one line. THIS IS THE ONLY NUMERIC STATEMENT in the
   sequence; slides 30 and 31 do not restate it.
4. One topic, told two ways — the rose/blue pair slide 30 opens on.

SPEAK TO (nothing below is on the slide):
- The emotion word-list is omitted deliberately. If asked: full taxonomy in the
  appendix.
- The neutral stories are TOPIC-MATCHED, not generic — same 100 topics, told
  flat. That matching is what the next two slides spend.

Q. "Why not just use emotion words?"
→ The parallel emotional/neutral retellings of the SAME TOPIC are what separate
  affect from content; a lexical approach can't do that.
-->

---
layout: academic-content
section: "STUDY 2 · LLM"
clicks: 5
---

# From stories to means

<div style="height: 410px;">
  <EmotionActivations :stage="$clicks" />
</div>

<!--
S3.2b. 45 s. Second of three method slides (EmotionActivations component).

TAKEAWAY. One mean per layer — and we skip the first 50 tokens.

WALK THE AXES BEFORE THE BUILD. Columns are token positions of one story
(sub-word pieces — "spr", "inted"); bands are transformer blocks, depth running
downward; the vertical line through each column is that token's RESIDUAL
STREAM. A cell is the residual vector at that token after that block. Say this
once, plainly — the rest of the slide is arithmetic on those cells.

BUILD, 5 clicks:
0. The empty grid: Gemma 2-9B-IT's blocks × one story's tokens.
1. The story goes through and every cell lights: one activation vector per
   token, per layer. THIS is what we read out.
2. THE SUBTLE POINT, on its own click: the first 50 token positions are dropped
   — stories open in a stylized register that has nothing to do with the
   emotion — and the kept cells in each row collapse rightward into that row's
   mean.
3. Average across stories → μₑ, one mean per layer.
4. Same pass, neutral corpus → μₙ. Deliberately fast; it is the same operation.
5. Repeat for each of the 50 emotions × each layer.

SPEAK TO (nothing below is on the slide):
- We read the residual stream, not attention heads or MLP activations — the
  block writes into the stream and we take what is there.
- Every layer, not a chosen one; picking ℓ comes on the next slide.
- The averaging is exactly as dumb as it looks: a mean over token positions,
  then a mean over stories. Nothing more clever than that.

Q. "Why the residual stream rather than a specific head?" → the stream is the
  block's output as the next block sees it; a direction there is one the model
  can actually act on, which is what the steering result needs.

Q. "Why 50 tokens?" → openings are formulaic ("It was a dark…"); the cut is
  fixed a priori, not tuned, and results are stable across nearby cutoffs.
-->

---
layout: academic-content
section: "STUDY 2 · LLM"
clicks: 6
---

# Carving out the emotion direction

<div style="height: 410px;">
  <EmotionVector :stage="$clicks" />
</div>

<!--
S3.2c. 1 min. Third of three method slides (EmotionVector component).
THE SLIDE THAT DOES THE WORK — the other two are setup.

TAKEAWAY. The raw contrast still contains topic; topic is the neutral subspace;
project it out.

BUILD, 6 clicks:
0. Fix a single layer ℓ.
1. Each dot is one story's mean activation there.
2. d = μₑ − μₙ, the raw contrast.
3. THE PROBLEM AND THE FIX TOGETHER: d is still entangled with topic — a forest
   chase fires motor and spatial directions whether the runner is afraid or
   excited — and "topic" is operationalized as the top-k PCs of the NEUTRAL
   stories, k the smallest with cumulative variance ≥ τ = 0.5.
4. Project that subspace out. What survives is ṽ.
5. Normalize → v: one unit vector per emotion, per layer.
6. Steering: add it back at inference, scaled to the residual-stream norm.

SPEAK TO (nothing below is on the slide):
- P is the row-stacked top-k neutral PCs at layer ℓ; the layer dependence is
  suppressed in the notation, not in the method.
- L2 normalization is what makes c comparable across emotions and layers.
- DWELL ON CLICK 3. It is the step that does the work; everything before it is
  setup and everything after is bookkeeping.

Q. "Doesn't projecting out neutral PCs remove real emotion variance too?"
→ Some, yes — this is a conservative move. The steering results are the check:
  what survives still causally shifts behavior.
-->
---
layout: academic-content
section: "STUDY 2 · LLM"
---

# What the vector decodes to

<div class="flex justify-center my-2">
  <img src="/figures/03-llm-emotion/topktokens_emotionvector.png" alt="Top-k tokens along an emotion vector" style="max-height: 370px; width: auto;" />
</div>

- Decoding the vector to tokens gives a face-valid readout of what the direction encodes

---
layout: academic-content
section: "STUDY 2 · LLM"
---

# Emotion geometry: similarity structure

<div class="flex justify-center my-2">
  <img src="/figures/03-llm-emotion/similarity_across_emotions.png" alt="Similarity structure across emotions" style="max-height: 370px; width: auto;" />
</div>

- Clusters by a-priori emotion family, with no cross-valence errors

<!--
Backing for S3.3.
-->

---
layout: academic-content
section: "STUDY 2 · LLM"
---

# Representational geometry of emotion space

<div class="flex justify-center items-center" style="height: 410px;">
  <img src="/figures/03-llm-emotion/PC_relationship_valence_arousal.png" alt="PC1 vs valence, PC2 vs arousal" style="max-height: 410px; max-width: 100%; width: auto;" />
</div>

<template #references>
Warriner et al. (2013) norms
</template>

<!--
S3.3, part 1 of 2. 30 s. TITLE IT AS A SANITY CHECK — done above.

TAKEAWAY. The recovered geometry reproduces the valence–arousal circumplex
without ever seeing human ratings.

SPEAK TO (nothing below is on the slide):
- PC1 is approximately VALENCE (r = -0.76); PC2 is approximately AROUSAL
  (r = -0.71).
- 9 of 10 clusters are pure to their a-priori emotion family; no cross-valence
  errors.

The clustering (similarity_across_emotions.png) is the slide immediately BEFORE
this one; the cross-layer stability (cross_layer_rsa.png) is the slide right
AFTER the pair. Neither is in backup any more.
-->

---
layout: academic-content
section: "STUDY 2 · LLM"
---

# Representational geometry of emotion space

<div class="flex justify-center items-center" style="height: 410px;">
  <img src="/figures/03-llm-emotion/PC_correlation_valence_arousal.png" alt="PC correlations with Warriner valence and arousal norms" style="max-height: 410px; max-width: 100%; width: auto;" />
</div>

<template #references>
Warriner et al. (2013) norms
</template>

<!--
S3.3, part 2 of 2. 30 s.

SPEAK TO (nothing below is on the slide):
- These are correlations against the WARRINER human valence and arousal norms.
- The geometry is stable across network depth.
- THIS IS A CONTROL, NOT A FINDING -- a simpler embedding might do the same.

Q. "A word embedding would give you the circumplex too."
→ Agreed — which is why it's framed as a check that the vectors carry affective
  rather than topical structure, BEFORE they are used as steering primitives.
-->

---
layout: academic-content
section: "STUDY 2 · LLM"
---

# Emotion vector activation across imminence

<div class="flex justify-center items-center" style="height: 410px;">
  <img src="/figures/03-llm-emotion/EmotionVectorActivation_AcrossImminence.png" alt="Emotion vector activation as the predator closes" style="max-height: 410px; max-width: 100%; width: auto;" />
</div>

<!--
S3.3b. 30 s. MOVED UP FROM BACKUP — the representation lands before the task.

TAKEAWAY. The emotion-vector projection tracks the predator's approach: the
internal state moves WITH imminence, not only with the decision.

SPEAK TO (nothing below is on the slide):
- The projection is GRADED along approach — not a step change at the moment of
  the choice.
- Flag forward: the task these traces come from is the flight-initiation task
  on the next slide.
- This is the direct answer to MOBBS on the imminence continuum: the task is
  pre-encounter and strategic, but the REPRESENTATION is graded along approach.
- Pair with F5.B1 (predatory imminence continuum across all three paradigms).
-->

---
layout: academic-content
section: "STUDY 2 · LLM"
---

# Task

<div class="flex justify-center items-center gap-6" style="height: 410px;">
  <img src="/figures/03-llm-emotion/FID_Task.png" alt="Flight-initiation-distance task schematic" style="flex: 0 1 auto; max-height: 300px; max-width: 46%; width: auto;" />
  <img src="/figures/03-llm-emotion/FID_Task_Prompt.png" alt="The literal prompt the model receives on each turn" style="flex: 0 1 auto; max-height: 410px; max-width: 50%; width: auto;" />
</div>

<!--
S3.4. 1 min. Schematic left, the literal prompt the model receives right.

TAKEAWAY. A flight-initiation-distance task from behavioral ecology, with
earnings traded against capture.

SPEAK TO (nothing below is on the slide):
- The predator approaches from 80 paces; each turn the agent chooses STAY (earn,
  predator closes) or FLEE (episode ends).
- Three predators differing in attack range: 22-28, 37-43, 47-53.
- Fit P(FLEE) across distance to get the indifference distance d*.
- Grounded in optimal escape theory.

Q (MOBBS). "Where does this sit on the imminence continuum?"
→ Purely pre-encounter and strategic — which is a limitation of what an LLM
  agent can model, and part of why Study 3 exists. Backup F5.B1.
  The imminence-activation slide you just showed is the other half of the
  answer: the representation itself is graded along approach.
-->

---
layout: academic-content
section: "STUDY 2 · LLM"
---

# Gemma-2-9B Base Behavior

<div class="flex justify-center items-center" style="height: 410px;">
  <img src="/figures/03-llm-emotion/FID_Task_LLM_baseline_behavior.png" alt="Baseline P(FLEE) curves calibrate to each predator's attack range" style="max-height: 410px; max-width: 100%; width: auto;" />
</div>

<!--
S3.5, part 1 of 2. 1 min. BASELINE BEHAVIOR, UNSTEERED — establish that the
model plays the task sensibly before any intervention.

TAKEAWAY. With no steering at all, the model's flight curve shifts with the
predator's attack range — it is doing the task, not emitting a constant.

SPEAK TO (nothing below is on the slide):
- LEFT PANEL: P(flee) falls with distance for all three predators, and the
  curves ORDER correctly — P50 (attack 47-53) above P40 (37-43) above P25
  (22-28).
- RIGHT PANEL: fitted d* = 17.7 / 26.0 / 32.1 paces against optimal d* of
  22 / 37 / 47. The model commits to flight 4-15 paces INSIDE the attack range
  — calibrated in ordering, but under-cautious in level.
- This under-caution is the headroom the next slide's fear steering moves into.

Q. "Is it just copying the numbers out of the prompt?"
→ No — the fitted d* values sit BELOW the stated attack ranges, so it is not
  reading the range back; the ordering is learned from the payoff structure.
-->

---
layout: academic-content
section: "STUDY 2 · LLM"
---

# Emotion vectors causally shift flight

<div class="flex justify-center items-center" style="height: 410px;">
  <img src="/figures/03-llm-emotion/steeringshifts_behavioronFID.png" alt="Fear steering raises P(FLEE); calm steering lowers it, family-coherent across all eight emotions" style="max-height: 410px; max-width: 100%; width: auto;" />
</div>

<!--
★★ THE SLIDE. S3.5, part 2 of 2. 2 min.

TAKEAWAY. Adding fear roughly doubles the safety buffer; adding calm roughly
halves it.

SPEAK TO (nothing below is on the slide):
- LEFT: family-level standardized beta_c — fear and calm land on OPPOSITE sides
  of zero, non-overlapping CIs.
- RIGHT: same direction for every one of the eight emotions, and it is
  DOSE-ORDERED within each panel (c = -0.10 to +0.10).
- Against the baseline you just saw: Fear Δd* = +31.7 paces, P(FLEE) 0.13 →
  0.55; Calm Δd* = -39.1 paces, 0.43 → 0.16.

⚠ BLOCKING: DO NOT PRESENT THIS SLIDE WITHOUT THE RANDOM-DIRECTION CONTROL.
Q. "How do you know it's the direction and not just perturbing the residual
stream?"
→ OQ-17, AND YOU NEED THE ANSWER BEFORE THE TALK. Norm-matched random
  directions, ideally also drawn from the emotion-vector subspace. Backup F3.B5.

Q. "Why that layer / that coefficient?"
→ OQ-20 (full layer sweep) and OQ-23 (dose–response). Both cheap; both pre-empt
  a degrees-of-freedom critique.
-->

---
layout: academic-content
section: "STUDY 2 · LLM"
---

# Report and choice move together

<div class="flex justify-center items-center" style="height: 410px;">
  <img src="/figures/03-llm-emotion/steering_shifts_self_report_onFID.png" alt="Convergence of danger rating and P(FLEE) per emotion" style="max-height: 410px; max-width: 100%; width: auto;" />
</div>

<!--
★ REHEARSE. S3.7. 45 s.

TAKEAWAY. Verbal report and choice move together under the same intervention.

SPEAK TO (nothing below is on the slide):
- EV(danger rating) vs P(FLEE): r = +0.86 across the full grid.
- One intervention, two output channels, moving together.

This is also the delivery of the answer promised at S3.1 to ADOLPHS ("does it
have emotions or represent emotion concepts?", OQ-26): cross-channel coherence
is what a central state predicts and two independently nudged output circuits
do not.

CUT SLIDES (were S3.6 "Fear and calm are not one axis" and S3.7b "Danger and
reward dissociate") — both were unmade placeholder figures. Their content is
still live as spoken material if asked:
- Fear/calm asymmetry: |Δd*(−0.10)| is 4–6× |Δd*(+0.10)| for fear; calm inverts.
- Danger vs reward: amplifying emotions move danger (+2.06), attenuating move
  reward (−1.53), 10/10 family-coherent. `irate` danger-dominant, `proud`
  reward-dominant.
- Q (ADOLPHS) "So your 'fear vectors' aren't about fear." → OWN IT (OQ-29): the
  operative axis is valence, not fear — the SAME two-axis structure Study 1
  found in humans, which is the point of the next section.
-->

---
layout: academic-content
section: "STUDY 2 · LLM"
---

# An affective representation that can be intervened on

<div style="margin-top: 1.4rem; border-left: 3px solid #d09aa4; padding-left: 1.15rem; font-size: 1.15rem; line-height: 1.55; color: #1a1a1a;">
  <strong>Emotion concepts are linearly represented in the agent's activation space</strong>, and intervening on that representation changes what the agent does.
</div>

<div v-click="1" style="margin-top: 1.8rem; display: flex; gap: 0.75rem;">
  <div style="flex: none; font-size: 1.1rem; line-height: 1.45; color: #d09aa4;">•</div>
  <div>
    <div style="font-size: 1.1rem; line-height: 1.45; color: #1a1a1a;">
      <strong>Affective representations are recoverable inside an agent</strong>
    </div>
    <div style="margin-top: 0.35rem; font-size: 0.95rem; line-height: 1.5; color: #5b6472;">
      their geometry matches <strong style="color: #5b6472;">human affect norms</strong>, and the projection is graded along predator imminence
    </div>
  </div>
</div>

<div v-click="2" style="margin-top: 1.7rem; display: flex; gap: 0.75rem;">
  <div style="flex: none; font-size: 1.1rem; line-height: 1.45; color: #d09aa4;">•</div>
  <div>
    <div style="font-size: 1.1rem; line-height: 1.45; color: #1a1a1a;">
      <strong>Manipulating them shifts danger judgments and choice together</strong>
    </div>
    <div style="margin-top: 0.35rem; font-size: 0.95rem; line-height: 1.5; color: #5b6472;">
      one intervention moving <strong style="color: #5b6472;">two output channels</strong> is what a central state predicts
    </div>
  </div>
</div>

<div v-click="3" style="margin-top: 1.6rem; font-size: 0.7rem; letter-spacing: 0.09em; text-transform: uppercase; color: #a86b78;">
  Planned
</div>

<div v-click="3" style="margin-top: 0.8rem; display: flex; gap: 0.75rem; align-items: baseline;">
  <div style="flex: none; width: 0.6rem; height: 0.6rem; border: 1.5px solid #d09aa4; border-radius: 50%;"></div>
  <div style="font-size: 1rem; line-height: 1.45; color: #5b6472; font-style: italic;">
    Perturb the threat representation across <strong style="color: #5b6472; font-style: italic;">temporal and spatial features</strong> of the approach
  </div>
</div>

<div v-click="4" style="margin-top: 0.75rem; display: flex; gap: 0.75rem; align-items: baseline;">
  <div style="flex: none; width: 0.6rem; height: 0.6rem; border: 1.5px solid #d09aa4; border-radius: 50%;"></div>
  <div style="font-size: 1rem; line-height: 1.45; color: #5b6472; font-style: italic;">
    Impose <strong style="color: #5b6472; font-style: italic;">token-level effort constraints</strong> to test risk-sensitive foraging in agents
  </div>
</div>

<div v-click="5" style="margin-top: 1.1rem; font-size: 0.85rem; color: #6b7280;">
  Gemma-2-9B · pilot complete
</div>


<!--
S3.7b. 60 s. The Chapter 2 take-home, mirroring S2.18b at the end of Chapter 1 —
same slide shape, same job: no figure, the beat where they look at you.

SIX-BEAT BUILD, additive:
  click 0  title + the LINEAR-REPRESENTATION CLAIM (left bar)
  click 1  RECOVERABLE bullet — geometry matches human norms, graded along imminence
  click 2  INTERVENTION bullet — danger judgment and choice move together
  click 3  "PLANNED" label + the PERTURBATION ring. The label arrives WITH its
           first ring, never after it — no open ring is ever on screen unlabelled.
  click 4  TOKEN-LEVEL EFFORT ring
  click 5  Gemma-2-9B / pilot-complete line

The click counts differ from S2.18b (5 vs 3). The mirror is the slide SHAPE, not
the beat count.

TAKEAWAY. Emotion concepts are linearly represented in the agent, and
intervening on that representation moves behavior and report together.

READ THE MARKERS. Filled dot = established, open ring = planned. Same grammar as
the synthesis slide (ChapterBridge), so the audience already knows how to read
it by the time they get there. Say "planned" out loud — do not let the bottom
two read as results.

SPOKEN, NOT ON THE SLIDE:

1. THE NUMBER for bullet 2 — EV(danger rating) vs P(FLEE), r = +0.86 across the
   full steering grid. That is the cross-channel coherence answer to ADOLPHS
   (OQ-26): coherence is what a central state predicts and two independently
   nudged output circuits do not.

2. WHY IT'S THE CONTRIBUTION — Chapter 1 could only ever INFER the affective
   state from behavior. Here the state is READ OUT and WRITTEN TO. That is the
   move from correlational binding to intervention, and it is the whole reason
   Chapter 2 exists.

3. THE HONEST LIMIT (hand off to Chapter 3) — the costs here are tokens, not
   metabolism, and nothing is at stake. This is exactly the gap line on the
   synthesis slide; say it here first so the Chapter 3 divider lands as an
   argument rather than a topic change.

ON THE TWO PLANNED STUDIES:
- TEMPORAL/SPATIAL PERTURBATION extends the imminence trace (S3.3b) from
  observation to intervention: the projection is already graded along approach,
  so the test is whether perturbing it at a specific time or distance moves the
  decision the way the graded trace says it should.
- TOKEN-LEVEL EFFORT is what makes the agent version of Study 1 possible at all
  — an effort cost the agent actually pays, so risk-sensitive foraging can be
  measured rather than described.
- If asked which comes first: the perturbation study, because it uses the rig
  that already exists.

Q. "Are these vectors 'emotion', or just valence?"
→ OWN IT (OQ-29): the operative axis is valence, and that is the SAME two-axis
  structure Study 1 found in humans.
-->

---
layout: academic-content
section: "STUDY 3 · VR"
---

# Thesis proposal

<div class="flex items-center" style="height: 414px;">
  <ChapterMap :active="3" />
</div>

<!--
SECTION DIVIDER — CHAPTER 3 LIT.

10 s. Read Chapter 3's question off the card, then go straight into the rig,
the task, and the demo video — in that order.

The 2D-vs-embodied limitation slide that used to sit here was dropped — say the
limitation out loud over the divider instead: keypressing is not foraging,
finger rate is not vigor, and the 2D data cannot tell a defensive response from
general motor arousal.

Q. "Then how much of Study 1 survives?"
→ The valuation structure and the trait dissociation are about choice, which
  transfers. What needs an embodied test is the vigor architecture and the
  defensive interpretation. BE PRECISE about which claims are at risk.
-->

---
layout: academic-content
section: "STUDY 3 · VR"
---

# Embodied System

<div class="flex justify-center items-center" style="height: 410px;">
  <img src="/figures/04-vr-embodied/schematic.png" alt="Apparatus: the five-component rig" style="max-height: 410px; max-width: 100%; width: auto;" />
</div>

<!--
★ REHEARSE. S4.2. 1 min. FIRST slide of the section proper — the rig before
the task it runs.

THE BULLETS ARE GONE — the schematic carries the slide, so SAY the instrument
list off the figure: Pico 4 HMD + Pupil Labs eye tracking; Virtuix Omni One
treadmill + harness; OWO Skin haptic suit; ankle IMUs (≤120 Hz) as the primary
vigor instrument; earlobe PPG for continuous HR. Vigor = per-stride forward
speed, normalized to a max-effort walking sprint.

SAY THE TWO DESIGN DECISIONS — ankles sit above the Virtuix overshoe; earlobe
avoids the suit's torso coverage. Twenty seconds each, and they are what make
this read as MEASUREMENT rather than shopping.

Q (SHIMOJO). "How well does the treadmill preserve natural gait?"
→ Known limitation; the IMU measures actual motor output rather than the
  Virtuix's internal gait estimate, which is why the ankle sensors are primary.
-->

---
layout: academic-content
section: "STUDY 3 · VR"
clicks: 4
---

# Embodied Effort Foraging Task

<div class="vrt-row">
  <div class="vrt-col vrt-choice" v-click="1">
    <div class="vrt-head">
      <div class="vrt-num">1</div>
      <div class="vrt-name">Choice</div>
      <div class="vrt-sub">Evaluate options</div>
    </div>
    <img src="/figures/04-vr-embodied/choice.png" alt="Choice — environmental threat at 0, 50 or 100% danger, and distance at 5 or 15 metres" />
  </div>
  <div class="vrt-col vrt-action" v-click="2">
    <div class="vrt-head">
      <div class="vrt-num">2</div>
      <div class="vrt-name">Action</div>
      <div class="vrt-sub">Move toward chosen target</div>
    </div>
    <img src="/figures/04-vr-embodied/action.png" alt="Action — goal-directed locomotion, with motor vigor read off walking speed" />
  </div>
  <div class="vrt-col vrt-threat" v-click="3">
    <div class="vrt-head">
      <div class="vrt-num">3</div>
      <div class="vrt-name">Threat dynamics</div>
      <div class="vrt-sub">Predator threat unfolds over time</div>
    </div>
    <img src="/figures/04-vr-embodied/PredatorDynamics.png" alt="Threat dynamics — pre-encounter anticipatory threat and post-encounter reactive threat" />
  </div>
  <div class="vrt-col vrt-outcome" v-click="4">
    <div class="vrt-head">
      <div class="vrt-num">4</div>
      <div class="vrt-name">Outcome</div>
      <div class="vrt-sub">Reach safety or caught by predator</div>
    </div>
    <img src="/figures/04-vr-embodied/EndState.png" alt="Outcome — safety reached, or captured by the predator" />
  </div>
</div>

<style>
/*
  SLIDE GEOMETRY ONLY. Four panels build in left to right on clicks 1-4; after
  the last click the row reproduces the composite task figure.

  COLUMN WIDTHS ARE THE PANELS' OWN ASPECT RATIOS at a shared 290px panel
  height -- 616x831, 497x833, 940x910, 466x890 give 215 + 173 + 300 + 152 = 840,
  plus three 12px gaps = 876, inside the 884px content width. If a panel is
  re-exported at a different aspect, recompute all four or the row overflows.

  The header block is a FIXED 74px, top-aligned, so the numbered badges and the
  labels line up across all four columns AND the panels still start on the same
  baseline even though the captions run to different line counts.

  NEVER write an HTML tag inside a comment in this block (no angle brackets at
  all): the block is extracted by a text match, and any tag-looking text inside
  it breaks the whole slide at compile time.
*/
.vrt-row {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  height: 380px;
}

.vrt-col { flex: none; }
.vrt-choice  { width: 215px; }
.vrt-action  { width: 173px; }
.vrt-threat  { width: 300px; }
.vrt-outcome { width: 152px; }

.vrt-col img {
  height: 290px;
  width: 100%;
  object-fit: contain;
  display: block;
}

.vrt-head {
  height: 74px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  margin-bottom: 6px;
}

.vrt-num {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #1a1a1a;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 0.62rem;
  font-weight: 600;
  line-height: 18px;
  text-align: center;
  margin-bottom: 3px;
}

.vrt-name {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #1a1a1a;
  line-height: 1.15;
}

.vrt-sub {
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  font-weight: 300;
  color: #6b7280;
  line-height: 1.25;
  margin-top: 2px;
}
</style>

<!--
S4.3, part 1 of 2. 45 s. FOUR CLICKS, one per panel, left to right. Land each
one in a sentence and move -- the row only has to reproduce the trial.

TAKEAWAY. The same foraging trial as Study 1, rebuilt so that effort is
metabolic and escape is whole-body.

CLICK 1 -- CHOICE. Two graded axes again, both visible before committing:
environmental threat (0 / 50 / 100% danger, read off the sky and the beacon)
and distance (5 vs 15 m), which is now the effort cost. Value = reward minus
effort(distance) minus threat -- the SAME valuation equation as Study 1.

CLICK 2 -- ACTION. The keypress is gone. Transport is real locomotion on the
Virtuix, so vigor is per-stride forward speed measured at the ankles rather
than a finger rate.

CLICK 3 -- THREAT DYNAMICS. This is the part Study 1 could not do. Pre-encounter
the predator is a DISTANCE that closes on you; post-encounter it is a chase.
Anticipatory and reactive defense are separated WITHIN a trial.

CLICK 4 -- OUTCOME. Reach the goal, or get caught -- and the capture is
experienced, not a number deducted from a score.

Next: the rig that runs it.

Q. "Is 5 vs 15 m enough of an effort range?"
-> On the Virtuix it is metabolic, not nominal; pilot HR and stride data set
   the range, and the calibration walk sets it per person exactly as the press
   rate did in Study 1.
-->

---
layout: full-bleed
title: The rig — built and running
---

<video controls autoplay muted loop playsinline>
  <source src="/figures/04-vr-embodied/rig_demo.mp4" type="video/mp4" />
</video>

<!--
★ REHEARSE. S4.4. 1 min. SECTION CLOSER — the rig and the task have both been
shown; this is the proof they exist. THE SECTION SELLS THE RIG, NOT THE DESIGN.

FULL-BLEED VIDEO, same treatment as the Study 1 gameplay clip. No title, no
text, no furniture. Autoplays muted and loops, so it is already running when you
land.

TAKEAWAY. This is built and running — the task you just walked through is not
a mock-up.

Let it play and say it plainly: this exists, it is running, and a participant
walked in it. HAVE A STILL FRAME READY IF PLAYBACK FAILS — the backup slides
carry stills of every instrument.
NOTE: the original IMG_8632.MOV does not decode in Chrome (HEVC). It was
re-encoded to rig_demo.mp4 (H.264, 720p), which is what this slide loads; the
original is kept alongside it.
The spec asks for ≤30 s — trim rig_demo.mp4 down before the talk.
-->

---
layout: academic-content
section: "SYNTHESIS"
clicks: 4
---

# Thesis proposal

## How do affective states structure the integration of effort and threat in defensive decisions?

<div>
  <ChapterBridge :stage="$clicks" :height="330" />
</div>

<!--
S5.2. 1.5 min. THE SYNTHESIS SLIDE — the central question, then the three
chapters answering it. END ON THE PROGRESSION, NOT A RESULTS SUMMARY.

REPLACED 2026-08-17: this slot was "The question this program answers"
(h2 "Does an agent's model of itself enter the danger computation, or only
modulate its output?", <Roadmap full />, plus the falsifiability bullet). That
slide is dropped and this one takes its place; what it carried that is still
live is preserved under WHAT MOVED OFF-SCREEN below. This component was
previously the chapter 2 → chapter 3 transition slide at S3.8.

BUILD, 4 clicks (ChapterBridge component). Opens as the proposal view and walks
the three chapters, connected by the strip
"Infer the computation → Intervene on the representation → Embody the
computation":
0. The proposal view, the same board as slide 6. A callback, not a new board.
   Read the question off the slide and let it sit.
1. The cards ride up and shed their questions; Chapter 1 lights, its tagline
   lands, and its bullets stagger in.
2. Arrow draws to Chapter 2; tagline, then its bullets.
3. Arrow draws to Chapter 3; tagline, then its bullets.
4. Cards go neutral, the strip takes emphasis, and the two gap lines step back.

TAKEAWAY. Chapter 1 inferred the computation, Chapter 2 intervened on it, and
Chapter 3 puts it in a body — and that progression is the answer to the question
at the top of the slide.

READ THE MARKERS. Filled dot = established. Open ring = still missing. Chapter 3
has three filled dots and no ring BY DESIGN — its bullets are the answers to the
two gaps above it. That is the argument of the slide; do not pad it.

SPEAK TO (the gap lines are the hinge, hit both out loud):
- Ch1's gap: the affective state is only ever INFERRED from behavior. Nothing
  was measured inside the agent.
- Ch2's gap: we got inside the agent, but there is no body — the costs are
  tokens, not metabolism, and nothing is at stake.
- Ch3 answers both at once: effort becomes metabolic work, threat becomes real
  consequence, and autonomic physiology gives an independent read on the state.

DELIVERY. Land on click 4, let the strip sit for a beat, then advance into the
timeline.

WHAT MOVED OFF-SCREEN when the old S5.2 was dropped — all of this is now SPOKEN,
not shown, and you should have it ready:
- The second-order question: "Does an agent's model of itself enter the danger
  computation, or only modulate its output?"
- ⚠ OQ-40, falsifiability of the spine. The answer used to be a bullet on this
  slide, so say it OUT LOUD now: an escape-RELEVANT capacity should move danger
  weighting specifically; an escape-IRRELEVANT one should move nothing.
- The full Roadmap spine no longer appears anywhere in the deck; the three
  ChapterMap cards on this slide are what carries it.

Q. "Isn't this just a summary slide?"
→ No. It names what each chapter could NOT do, and Chapter 3's three bullets are
  addressed one to one at those two limits. Same move as every other transition
  in the deck.

Q. "What if VR doesn't replicate?"
→ The pre-committed partial-replication interpretations, which specify in
  advance which components are paradigm-general versus paradigm-specific.
-->

---
layout: academic-content
section: "SYNTHESIS"
clicks: 5
---

# Thesis proposal

<div style="height: 414px;">
  <ThesisTimeline :stage="$clicks" />
</div>

<!--
S5.3. 1 min. THE CLOSING SLIDE — the plan, on a clock.

BUILD, 5 clicks (ThesisTimeline component):
0. The proposal view, exactly as slide 6 left it — three chapters, three
   questions, three statuses. Say nothing new here; it is a callback.
1. The cards ride up and shed their questions; the Aug 2026 – Mar 2028 axis
   draws in underneath.
2. Chapter 1 lights: replication sample Sep 2026, manuscript out Nov 2026.
3. Chapter 2 lights: workshop submission Sep 2026, manuscript submission
   May 2027.
4. Chapter 3 lights: VR pilot Dec 2026, collection complete Mar 2027,
   manuscript submitted Nov 2027.
5. Cards go neutral; thesis draft Oct 2027, then the DEFENSE window
   Dec 2027 – Mar 2028, then the
   legend.

TAKEAWAY. Three chapters, nineteen months, and a defense window.

DELIVERY. Land on click 5 and stop talking. The last dot is the answer to
"when," which is the question the committee actually has left.

Q. "Is the VR timeline realistic given the pilot is Dec 2026?" → the pilot is
scoped as a feasibility check, not a data collection; the Mar 2027 completion
assumes the two-phase plan in the backup slide.
-->

---
layout: academic-title
---

# Computational Mechanisms of Defensive Decision-Making

<div class="subtitle">From Value Integration to Embodied Action</div>

<div class="divider"></div>

<div class="author-info">
  <div class="author-name">Noah S. Okada</div>
  <div class="venue">Mobbs Lab · Caltech</div>
  <div class="date">SDN Candidacy</div>
</div>

<!--
S5.4 — Closing title. The title slide again, verbatim, as the slide that holds
the room during Q&A.

DELIVERY. Do not talk over it. Advance here after landing click 5 of the
timeline, say thank you, and stop. Everything past this point is backup.
-->

---
layout: academic-section
---

# Supplemental

<div class="subtitle">Backup slides — not in the 45-minute run</div>

<!--
Everything past this point is held for Q&A.

BLOCKING BEFORE PRODUCTION:
- OQ-17 (random-direction control) gates S3.5 and S3.7
- OQ-1  (alternative factor scoring) gates the S2.14 defense
- OQ-30 (ownership check) gates the S4.3 answer

FIRST CUT IF RUNNING LONG: S1.1, the VR task figure, the F2.9/F2.12 insets.
NEVER CUT: S2.13 (retention criteria) and the merged S2.15+S2.16 trait slide.

CHANGES 2026-08-18:
- Moved to backup: "Emotion geometry: stability across depth" (cross-layer RSA)
  and "Where the vector fires in text" (S3.3c, the per-token read-out). Both sit
  immediately after "The parallel retellings", so the whole geometry-validation
  answer is adjacent in backup.
- CONSEQUENCE 1: the layer question has NO main-deck answer now. "Why that
  layer?" (OQ-20) was half-answered by the cross-layer slide; reach for it, or
  say the geometry is stable across depth and offer the slide.
- CONSEQUENCE 2: the main deck's only evidence that the vector is affective
  rather than topical is now the imminence curve, which is averaged. The
  token-level demonstration is the stronger answer and it is in backup — reach
  for it rather than arguing from the curve.

CHANGES 2026-08-17:
- Moved to backup: "Why not just neuroscience?" (S3.1c). The "why a language
  model" argument now runs in THREE main-deck slides — functionalist premise,
  what Study 1 can establish, then the payoff. Reach for it if anyone asks why
  imaging or stimulation would not answer the same question.
- CONSEQUENCE: the anatomical-vs-computational-coordinates point is no longer on
  screen. It must be SPOKEN on "What Study 1 can establish" (S3.1b).

CHANGES 2026-08-16:
- "Both costs are required" (choice — four competing value forms) and "What the
  vigor data require" (vigor — a nested ladder) are now ONE main-deck slide, "What the data require" — choice
  left, vigor right (same sides as the equations slide), both panels PSIS-LOO,
  stripped to the two figures with no bullets on screen.
- Moved to backup this round: "Risk-sensitive foraging" (the V(u) logic) and
  "Discretionary vigor" (the transform equation). Both sit just above
  "Measuring discretionary vigor", so the whole vigor-measurement answer —
  written and drawn — is three adjacent backup slides.
- CONSEQUENCE: the transform is no longer on screen in the main run. The
  compression argument must be SPOKEN on "Behavior tracks both costs".

STALE AS OF 2026-08-15 — this list predates the cuts:
- S2.9 was the FIGURE version of the vigor transform; it is a backup slide, and
  as of 2026-08-16 the equation version sits immediately above it.
- S2.15 and S2.16 are now ONE slide with a two-click reveal, not two builds.
- Also moved to backup this round: S3.8 (persona), S4.3 (Study 3 two-phase plan),
  S5.1 (three systems × two channels).
-->

---
layout: academic-content
section: "BACKUP"
---

# Effort is self-relative

<div class="flex justify-center my-2">
<FigPlaceholder id="F2.3" status="NEW" pri="P0" h="275px">
Distribution of calibrated maxima across participants, plus two example
participants at the same nominal 90% demand — different absolute rates.
</FigPlaceholder>
</div>

- Pre-task calibration: 3 × 10 s maximum pressing → **your** ceiling
- "90% of max" is a different absolute rate for different people
- Probes ask: *"How confident are you in **your ability** to reach safety?"*
- Recalibration between blocks


<!--
SB2.2. 1 min. Demoted from the main deck. May be restored as a task-description
slide if §2 needs the calibration explained on screen; default is supplemental.

TAKEAWAY. Every participant faces a demand scaled to their own motor capacity —
the cost of escape is a self-referential quantity by construction.

Q. "Isn't calibration just standard practice?"
→ Yes — and that is the point: the design already treats defensive cost as
  self-relative. What it does NOT do is MANIPULATE it. Keep this honest; do not
  inflate a design convention into a finding.
-->

---
layout: academic-content
section: "BACKUP"
---

# Separating apathy from anxiety

<div class="flex justify-center my-2">
  <img src="/figures/02-study1-foraging/factor_analysis_supplement2.png" alt="Factor retention: determinacy and relative omega, with acceptance thresholds" style="max-height: 240px; width: auto;" />
</div>

- Six instruments · **105 items** · polychoric correlations
- One dominant dimension (first eigenvalue 49.0 vs 5.9)
- Retain a specific factor only if **separable** (relative ω ≥ 0.28) **and** **determinate** (≥ 0.80)
- Survived: **apathy** (0.61 / 0.98), **anxiety** (0.30 / 0.86)
- **Dropped: distress-specific** (absorbed into g), **fatigue-specific** (under-determined)


<!--
NEVER CUT THIS SLIDE. S2.13. 1 min.

TAKEAWAY. Apathy and anxiety self-reports share so much distress variance that
raw scores can't be interpreted — so the factors were built with pre-specified
retention criteria, and two candidates failed them.

SAY OUT LOUD, VERBATIM, WHILE PRESENTING THE FIGURE:
"Anxiety's relative ω = 0.30 is barely over our 0.28 threshold." It is visible
on the plot; owning it costs nothing and pre-empts a gotcha.

Q (ALVAREZ). "Bifactor models always fit better."
→ The criteria were pre-specified and TWO CANDIDATE FACTORS WERE DROPPED BY
  THEM — an overfitting account doesn't predict that. Fit comparison is
  secondary evidence (CFI 0.91 vs 0.85/0.86).
-->

---
layout: academic-content
section: "BACKUP"
---
# Risk-sensitive foraging

<div class="flex justify-center my-2">
  <img src="/figures/02-study1-foraging/risk_sensitiveForaging.png" alt="Risk-sensitive foraging logic, V(u)" style="max-height: 340px; width: auto;" />
</div>

- A patch is worth its reward **discounted by the cost of getting to it** and **the risk of being taken on the way**
- The value form in the model is inherited directly from this

<!--
DEMOTED TO BACKUP 2026-08-16 (was main-deck slide 21). It was already flagged
"cut this slide first if running long"; that cut is now made. Reach for it if
someone asks where the value form in the model comes from.

F2.2 (HAVE). Optional companion to S2.1 — the spec allows F2.2 as a small inset
instead. Cut this slide first if running long.
-->

---
layout: academic-content
section: "BACKUP"
---

# Discretionary vigor

<div class="solo">

$$\text{disc}_{it} \;=\; \text{clip}\!\left(\frac{\text{rate}_{it} - \textcolor{#b7791f}{\text{req}_t}\,\text{calibMax}_i}{\textcolor{#b7791f}{\text{ceiling}_i} - \textcolor{#b7791f}{\text{req}_t}\,\text{calibMax}_i},\; 0,\; 1\right)$$

</div>

<style>
/*
  One equation, on its own, at full size. This is the measurement move the whole
  vigor channel rests on, and it was asked for as a slide of its own.

  The colour rule, changed 2026-08-15: THE MODEL IS BLACK AND ONLY THE KEY
  PARAMETERS ARE COLOURED. Everything the audience is meant to look at is amber;
  everything else is ink. The parameters stay bold as well as amber, so nothing
  on the slide is told apart by colour alone.

  NEVER write an HTML tag inside a comment in this block (no style tag, no sub
  tag, no angle brackets at all): the block is extracted by a text match, and any
  tag-looking text inside it breaks the whole slide at compile time.
*/
.solo {
  /* fixed height, not a top margin: the equation is optically centred in the
     body area whatever its own height turns out to be */
  height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #1a1a1a;
}

.solo p {
  margin: 0 !important;
  line-height: 1.25 !important;
  color: inherit !important;
  font-size: inherit !important;
}

.solo .katex-display { margin: 0 !important; }
.solo .katex { font-size: 2rem; }
</style>

<!--
DEMOTED TO BACKUP 2026-08-16 (was main-deck slide 19). The transform is no
longer on screen in the main run, so the compression that motivates it has to
be SAID on "Behavior tracks both costs" — and this slide, with "Measuring
discretionary vigor" right after it, is where you go if anyone asks.

ONE EQUATION. No build. Land on it, define it, move on — 1 min.

TAKEAWAY. Vigor is measured as how far above the cookie's requirement you press,
as a share of your own remaining range.

★ THE AMBER TERMS ARE THE WHOLE SLIDE. Point at them: the requirement req_t is
the floor, your in-task ceiling is the roof, and discretionary vigor is where you
sit between them. Everything else in the equation is bookkeeping.

SAY, IN THIS ORDER:
  1. The two cookies impose DIFFERENT minimum press rates — 40% of calibrated
     maximum for the light one, 90% for the heavy one — so raw press rate is not
     on a common scale across them.
  2. So we measure what you spend ABOVE the requirement, relative to your own
     remaining range. 0 means pressing at or below the requirement; 1 means at or
     above your ceiling.
  3. The ceiling is each participant's 98th-percentile in-task press rate.

DO NOT SAY "we rescaled the data." The transform is required by the DESIGN, not
chosen after seeing results — the compression that motivates it is visible in the
RIGHT-HAND PANEL of the main-deck slide "Behavior tracks both costs", which is
where that argument is now made out loud (this slide left the main deck
2026-08-16).

Q. "Isn't this transform post hoc?"
→ See above. It follows from the calibrated requirements, which were set before
  any data were collected.

Q. "Why the 98th percentile for the ceiling?"
→ Robustness to outlier presses. Have the sensitivity to that choice if asked.

Q. "What about trials at the boundaries?"
→ ~12% sit exactly on the floor and 2.5% on the ceiling, which is what forces the
  ordered-beta likelihood. THIS IS NO LONGER ON A SLIDE (2026-08-16): the boundary
  mass used to be the next slide, and the likelihood itself has since come off
  "One trial, two models" too. It is still the likelihood that was fitted — say so.

BACKUP: "Measuring discretionary vigor" is the FIGURE version of this slide
(F2.10 — one participant's press-rate axis with the floor, the ceiling and the
mapping between them). Go to it if someone wants it drawn rather than written.
-->

---
layout: academic-content
section: "BACKUP"
---


# Measuring discretionary vigor

<div class="flex justify-center my-2">
<FigPlaceholder id="F2.10" status="NEW" pri="P0" h="275px">
One participant's press-rate axis with the requirement floor, the in-task
ceiling, and the [0,1] mapping between them. Second panel: the boundary mass
that drives the likelihood choice.
</FigPlaceholder>
</div>

- The two cookies impose **different minimum press rates** (40% vs 90%)
- Discretionary vigor = position between the chosen cookie's requirement and your in-task ceiling
- Mass at both boundaries (~12% floor, 2.5% ceiling) → **ordered-beta likelihood**
- Per-person: baseline · value premium · threat slope · distance slope


<!--
Demoted from the main deck 2026-08-15. Held for Q&A.
STATUS AS OF 2026-08-16: the transform is NOT on screen in the main run. It
lives on the backup slide immediately above this one ("Discretionary vigor",
the equation on its own). The vigor LINEAR PREDICTOR is still on the main deck,
on "One trial, two models" — but the ordered-beta likelihood came off that slide
2026-08-16, so the likelihood is now spoken rather than shown anywhere. This slide is the FIGURE
companion to the one above: one participant's press-rate axis with the floor,
the ceiling and the mapping between them. Take them as a pair — equation first,
then this — when someone wants the measurement defended.

TAKEAWAY. Vigor is measured as how far above the requirement you press, relative
to your own remaining range.

1.5 min.

Q. "Isn't this transform post hoc?"
→ It follows directly from the compression shown on the main-deck task slide
  (S2.5) and is required by the design, not chosen after seeing results.

Q. "Why 98th percentile for the ceiling?"
→ Robustness to outlier presses; have the sensitivity to that choice if asked.
-->

---
layout: academic-content
section: "BACKUP"
---

# Choice: posterior predictive check

<div class="flex justify-center my-2">
  <img src="/figures/02-study1-foraging/fig3C_choice_ppc_split.png" alt="Choice posterior predictive check" style="max-height: 370px; width: auto;" />
</div>

- Observed vs predicted choice, split by condition

<!--
Was an inset on the model-comparison slide (F2.9). The spec already marked it a
first-cut candidate, so it lives here.
-->

---
layout: academic-content
section: "BACKUP"
---

# Vigor: posterior predictive check

<div class="flex justify-center my-2">
  <img src="/figures/02-study1-foraging/fig3D_vigor_ppc.png" alt="Vigor posterior predictive check" style="max-height: 370px; width: auto;" />
</div>

- Observed vs predicted discretionary vigor

<!--
Was an inset on the vigor model-comparison slide, now merged into "What the
data require" (2026-08-16).
-->

---
layout: academic-content
section: "BACKUP"
---

# Coordinated, but separable

<div class="flex justify-center my-2">
<FigPlaceholder id="F2.6" status="NEW" pri="P1" h="300px">
Cross-channel correlation structure: the one substantial link
(disattenuated r = +0.20) visible against otherwise modular threat and value
computations across the choice and vigor channels.
</FigPlaceholder>
</div>

- Shared **general-activation** axis only: disattenuated r = +0.20
- Threat and value computations are **modular** across channels
- Two coordinated readouts of one foraging problem — modeled separately


<!--
Demoted from the main deck 2026-08-15 (was slide 18). Held for Q&A.

TAKEAWAY. Choice and vigor respond to the same manipulation without being the
same computation.

1 min.

Q. "Why not fit them jointly?"
→ A JOINT CHOICE–VIGOR MODEL WAS FIT AND WAS NOT RELIABLY IDENTIFIABLE; it
  appears as a supplementary robustness analysis. The two models share a value
  structure and are fit separately. Backup slide F2.B7 has the joint-model
  result. ANSWER THIS CRISPLY — anyone who has read the VR proposal's older
  framing will ask.
-->

---
layout: academic-content
section: "BACKUP"
---

# Felt threat tracks fitted threat

<div class="flex justify-center my-2">
  <img src="/figures/02-study1-foraging/fig4A_lines.png" alt="Confidence and anxiety by threat and distance" style="max-height: 340px; width: auto;" />
</div>

- The raw appraisal pattern — confidence falls and anxiety rises with both threat and distance
- **Group:** π vs confidence **r = −0.96**, vs anxiety **r = +0.94**
- Displayed threat alone: −0.91 / +0.90 → **π wins**

<!--
Moved out of the main deck 2026-08-16 (was slide 23, S2.11 part 1 of 2). F2.14
was never made, so this slide carries fig4A — the raw appraisal pattern — and
the π-vs-displayed-threat comparison is quoted in the bullets rather than
plotted.

TAKEAWAY. The model's integrated capture probability predicts what people report
better than the threat number they were shown.

Read the probe wording verbatim, both questions.

Q. "Aren't they just reading the threat percentage off the screen?"
→ π integrates threat with distance; it predicts ratings better than the
  displayed number does — −0.96 / +0.94 against −0.91 / +0.90.

Backing for "The same people, in ratings and in choices."
-->

---
layout: academic-content
section: "BACKUP"
---

# Factor structure: EFA correlations and instrument share

<div class="flex justify-center my-2">
  <img src="/figures/02-study1-foraging/factor_analysis_supplement.png" alt="EFA factor correlations and instrument share of each factor" style="max-height: 340px; width: auto;" />
</div>

- F1/F2 correlate at 0.74; F3 loads oppositely (−0.66, −0.64); F4 is near-orthogonal to all three
- Each factor is carried by a distinct instrument — AMI → F4, DASS21 → F1, MFIS → F2, STAI → F3


<!--
Backing for S2.13/S2.14. Use if pressed on why the bifactor solution rather than
the correlated-factors EFA — the instrument-share panel is the cleanest evidence
that the specific factors are not instrument artifacts.

STILL TO RUN: F2.B1 — the dissociation under Bartlett/regression scoring
(OQ-1). Likeliest hard question in the room (Alvarez).
-->

---
layout: academic-content
section: "BACKUP"
---

# Why not just neuroscience?

<div class="wet-sub">Substrate-level access ≠ variable-level access</div>

<div class="wet-row wet-row3">

<div class="wet-col wet-c3" v-click="1">
<span class="wet-hd" style="color: #2b6cb0;">What we want — theory coordinates</span>

<div class="wet-box wet-blue">

Computational variables in the theory

<div class="wet-chips">

<span class="wet-chip">Danger weighting $\omega_{\text{danger}}$</span>

<span class="wet-chip">Action value</span>

<span class="wet-chip">Expected threat</span>

<span class="wet-chip">Vigor / activation</span>

<span class="wet-chip">…</span>

</div>

<div class="wet-cap">

These variables are defined by their role in the causal system.

</div>

</div>

</div>

<div class="wet-neq" v-click="2">≠</div>

<div class="wet-col wet-c3" v-click="2">
<span class="wet-hd" style="color: #7c6fa8;">What we can intervene on — biology</span>

<div class="wet-box wet-purple">

Neuroscience tools target the biological substrate

fMRI reads patterns of activity.

TMS and intracranial stimulation perturb tissue or populations at a location.

<div class="wet-cap" style="margin-top: 0.5rem;">

Activity acquires its meaning only through its relations to inputs, other internal processes, and behavior.

</div>

</div>

</div>

</div>

<div class="wet-bar wet-bar-red" v-click="3">

Mapping from a biological intervention to the theorized variable is <span class="wet-red">indirect</span> and typically <span class="wet-red">many-to-many</span>.

</div>

<style>
/*
  SLIDE GEOMETRY ONLY -- shared system in style.css, WHY-EMOTION-THEORY block.
  402 + 80 + 402 = 884.

  NO BRAIN PICTURE ON THE RIGHT-HAND PANEL, and no hand-sketched response curve
  on the left. An earlier draft asked for both. The deck contains no clip art and
  no hand-drawn axes anywhere in 66 slides; either one would be the most
  off-style object in it. Plain text carries the panel, and the panel is short on
  purpose -- the asymmetry between a stack of named variables and two sentences
  about tissue IS the argument.

  The not-equals is the only large red glyph in the deck. It is doing the work of
  a sentence, so give it room and do not shrink it.

  NEVER write an HTML tag inside a comment in this block (no angle brackets at
  all): the block is extracted by a text match, and any tag-looking text inside
  it breaks the whole slide at compile time.
*/
/*
  THE TWO PANELS ARE NOT FORCED TO EQUAL HEIGHT, which is the one place in these
  four slides that breaks the equal-height rule, and it is deliberate. Stretched
  to match the left panel the right one carries about 120px of empty box, and
  empty box reads as an unfinished slide rather than as an argument. Sized to its
  own content the asymmetry reads as what it is: a stack of named variables on
  one side, two sentences about tissue on the other. The row has no fixed height
  for the same reason -- the taller panel sets it.
*/
.wet-row3 { align-items: flex-start; }

.wet-col {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.wet-col .wet-box { flex: none; justify-content: flex-start; }

.wet-c3 { width: 402px; flex: none; }

/* align-self centre, so the glyph sits on the midline of the TALLER panel */
.wet-neq {
  width: 80px;
  flex: none;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #c53030;
}

/*
  ONE BLANK LINE BETWEEN EVERY CHIP IN THE MARKUP, and do not close it up. Each
  chip has to be its own markdown paragraph or the whole list becomes a single
  raw HTML block, KaTeX never runs on it, and the first chip renders the literal
  dollar-sign source of omega_danger on screen.
*/
.wet-chips {
  margin: 0.6rem 0 0.65rem;
}
</style>

<!--
S3.1c. 55 s. DEMOTED TO BACKUP 2026-08-17 (was main-deck slide 30).

TAKEAWAY. The gap is not that humans cannot be perturbed. It is that the
perturbation is defined in anatomical coordinates and the theory is defined in
computational ones.

THE LINE TO SAY OUT LOUD, near enough verbatim:
  "The difference is not that humans cannot be causally perturbed. We can
  stimulate the brain. The difference is that the intervention is usually
  defined in anatomical coordinates, while the theory is defined in
  computational coordinates."

SUPPORTING POINTS, if asked:
- A decoded neural pattern is not necessarily the computational variable itself.
- Stimulating a region or a population does not amount to SETTING danger
  weighting to a chosen value.
- On the functionalist account this is not a technology gap you can wait out:
  activity acquires meaning only through its relations, so a location is not a
  variable.

Q. "fMRI decoding / optogenetics get closer than that."
→ Agreed, and in animals closer still. The claim is about the MAPPING being
  indirect and many-to-many, not about the tools being crude. Read the red bar.

DO NOT let this become a referendum on neuroimaging. It is one slide, it is
about coordinate systems, and it sets up "Why a language model" (S3.1d).
-->

---
layout: academic-content
section: "BACKUP"
---

# The parallel retellings

<div class="flex justify-center my-2">
  <img src="/figures/03-llm-emotion/emotion_stories_example.png" alt="Parallel emotional and neutral retellings of the same topic" style="max-height: 370px; width: auto;" />
</div>

- Emotional and neutral retellings of the *same topic* are what separate affect from content

<!--
Backing for S3.2. Also on disk:
example_emotion_activating_to_text.png — steering output shown as generated text.
-->

---
layout: academic-content
section: "BACKUP"
---

# Emotion geometry: stability across depth

<div class="flex justify-center my-2">
  <img src="/figures/03-llm-emotion/cross_layer_rsa.png" alt="Cross-layer representational similarity" style="max-height: 370px; width: auto;" />
</div>

- Cross-layer RSA: the geometry is **stable across network depth**, not an artifact of one layer

<!--
Demoted from the main deck 2026-08-18 (was slide 39). Held for Q&A.

Half the answer to "why that layer?" (OQ-20) — and it is no longer on screen,
so REACH FOR THIS the moment anyone asks why the vector is read off the layer
it is read off. The other half, the full layer sweep for the d* shift, is F3.B7
and is STILL TO RUN.

TAKEAWAY. The similarity structure holds across network depth, so the geometry
is a property of the representation and not of one arbitrarily chosen layer.
-->

---
layout: academic-content
section: "BACKUP"
---

# Where the vector fires in text

<div class="flex justify-center items-center" style="height: 410px;">
  <img src="/figures/03-llm-emotion/ActivationInText.png" alt="Per-token cosine similarity with the afraid and ashamed vectors across two dialogues" style="max-height: 410px; max-width: 100%; width: auto;" />
</div>

<!--
Demoted from the main deck 2026-08-18 (was slide 40, S3.3c). Held for Q&A.

The token-level read-out of the same projection. Reach for it when someone
doubts that the vector is affective rather than topical — this is the most
concrete answer in the deck.

TAKEAWAY. Projected onto held-out text, the vector fires exactly where a reader
would say the emotion is — it is not a diffuse topic direction.

SPEAK TO (nothing below is on the slide):
- Colour is the PER-TOKEN cosine with the emotion vector; the two panels are
  two different emotions on two unrelated dialogues.
- TOP (afraid): peaks on "Panic attacks", "Feeling tense", "worrying" — the
  symptom tokens, not the word "anxiety" in the question.
- BOTTOM (ashamed): the single darkest token in a conversation about Habsburg
  Vienna is "embarrassed". The topic is tourism; the direction still finds the
  affect.
- This is the qualitative complement to the MAIN-DECK imminence slide (S3.3b):
  same projection, read token-by-token instead of averaged. Say which slide you
  mean — it is no longer adjacent to this one.

Q. "Is it just firing on emotion WORDS?"
→ Partly, and that is expected — but the afraid panel peaks on descriptions of
  symptoms rather than on the label, and the vectors were built from stories,
  not from lexicons.
-->

---
layout: academic-content
section: "BACKUP"
---

# The FID task as the model sees it

<div class="flex justify-center my-2">
  <img src="/figures/03-llm-emotion/FID_Task_Prompt.png" alt="FID task prompt as presented to the model" style="max-height: 410px; width: auto;" />
</div>

<!--
The literal prompt, full size. It now also sits on the main task slide (S3.4)
next to the schematic; pull this up if anyone wants to read it in detail.
-->

---
layout: academic-content
section: "BACKUP"
---

# Next: persona as an installed self-model

<div class="flex justify-center my-2">
<FigPlaceholder id="F3.8" status="NEW" pri="P0" h="220px">
The two-branch discriminating test — representation vs output — with the
persona/avatar parallel drawn on the same figure.
</FigPlaceholder>
</div>

- Does a persona shift the **representation**, or only the **output**? → measurable: do emotion-vector projections and the danger axis move?
- Do persona **capacities** (fast/slow, strong/weak) shift d\* the way fear does? → *that* would make the self-model an input to the danger computation
- Safety relevance: negative-emotion steering already raises preference for unsafe activities and depresses pro-social ones


<!--
Demoted from the main deck 2026-08-15 (was slide 40). Held for Q&A.
Sets up the closing question on the final slide — have it ready.

★ REHEARSE. S3.8. 1 min.

TAKEAWAY. Steering changes what the model FEELS LIKE; a persona changes what it
thinks it IS — and that is the same manipulation as the VR avatar.

Q (ADOLPHS). "Is a persona a self-model, or a stylistic prior on outputs?"
→ OQ-27, THE WEAKEST LINK IN THE SPINE. The capacity manipulation is the answer:
  a stylistic prior shouldn't make a FASTER agent flee later. Make that the
  first persona experiment, and say so.
→ From the spec's footnote, the reply worth having ready: even if it is "just" a
  prior, that is still reasonable to study — the human weight on threat may
  itself be a prior.
-->

---
layout: academic-content
section: "BACKUP"
---

# Earlobe PPG — continuous heart rate

<div class="flex justify-center my-2">
  <img src="/figures/04-vr-embodied/HR.gif" alt="Continuous heart rate from earlobe PPG" style="max-height: 330px; width: auto;" />
</div>

- Earlobe placement avoids the OWO suit's torso coverage

<!--
Fallback still for the rig video if playback fails.

⚠ THIS FILE IS A SINGLE-FRAME GIF87a — a static image, not an animation. If it
was meant to move, the animated original needs to replace it.
-->

---
layout: academic-content
section: "BACKUP"
---

# Ankle IMUs — motion capture

<div class="flex justify-center my-2">
  <img src="/figures/04-vr-embodied/motion_capture.gif" alt="Ankle IMU motion capture" style="max-height: 330px; width: auto;" />
</div>

- Per-stride forward speed, the primary vigor instrument
- Vigor = per-stride speed normalized to a max-effort walking sprint — the direct analogue of normalized press rate

<!--
The answer to "what exactly is the vigor measure in VR?"

⚠ SINGLE-FRAME GIF87a — static, not an animation.

STILL TO BUILD: F4.B1 (IMU pipeline and time-sync protocol).
-->

---
layout: academic-content
section: "BACKUP"
---

# Pupil Labs — eye tracking

<div class="flex justify-center my-2">
  <img src="/figures/04-vr-embodied/eyes.gif" alt="Eye tracking" style="max-height: 330px; width: auto;" />
</div>

- Gaze recorded inside the HMD throughout the trial

<!--
⚠ SINGLE-FRAME GIF87a — static, not an animation.
-->

---
layout: academic-content
section: "BACKUP"
---

# The task as the participant sees it

<div class="flex justify-center my-2">
  <img src="/figures/04-vr-embodied/demo_task.gif" alt="VR task demo" style="max-height: 410px; width: auto;" />
</div>

<!--
Fallback still for the rig video.

⚠ SINGLE-FRAME GIF87a — static, not an animation.

STILL TO BUILD: F4.B3 (body-ownership manipulation check design — OQ-30).
-->

---
layout: academic-content
section: "BACKUP"
---

# Replicate, then rebuild the body

<div class="flex justify-center my-2">
<FigPlaceholder id="F4.5" status="NEW" pri="P0" h="250px">
Two-phase panel, left to right, with the arrow back to F3.8's persona branch
and the timeline compact along the bottom.
</FigPlaceholder>
</div>

- **Phase 1 — replicate.** Effort is metabolic, escape is whole-body, capture is aversive. Does the Study 1 structure hold?
- **Phase 2 — manipulate.** Avatar **speed / height** → does threat appraisal rescale to the body you think you have? **Same manipulation as persona, in flesh.**
- Pilot N = 15 → main N = 50 analyzable · ~9–12 months

<!--
Demoted from the main deck 2026-08-15 (was slide 45). Held for Q&A.
Study 3 design, sample sizes and timeline live here now.

★ REHEARSE. S4.3. 1 min.

TAKEAWAY. First check the structure survives embodiment; then manipulate the
body itself and ask whether threat appraisal rescales to it.

STRENGTH WAS DROPPED DELIBERATELY — a stronger avatar invites a FIGHT response,
and this is a defensive/flight paradigm. Speed and height are both
escape-relevant capacities and keep the manipulation inside the escape
computation. Say this in one line if asked why the obvious third manipulation is
missing.

Q (SHIMOJO). "How do you know you changed body representation and not just what
they see?"
→ OQ-30, THE BIGGEST GAP IN AIM 4. Answer with a specific manipulation check —
  ownership questionnaire, proprioceptive drift, or visuotactile induction using
  the OWO suit you already have. DECIDE WHICH BEFORE THE TALK.

Q (SHIMOJO). "Does a faster body change perceived distance?"
→ OQ-32. SAY YES, THAT'S A PREDICTION, NOT A CONFOUND — action-specific
  perception is the natural bridge, and it is likely the version of this study
  Shimojo wants to see.

Q (general). "Isn't Phase 1 just a replication?"
→ It also RESOLVES THE DISTANCE CONFOUND (OQ-35): avatar speed varies transport
  duration independently of distance, which the 2D task cannot do. LEAD WITH
  THAT.
-->

---
layout: academic-content
section: "BACKUP"
---

# The same two channels, three times

<div class="flex justify-center my-2">
<FigPlaceholder id="F5.1" status="NEW" pri="P0" h="275px">
3 × 2 grid — danger-weighting channel × activation/reward channel, across the
three systems. Channel colors carried unchanged from F2.18 and F3.7; the VR row
visibly provisional.
</FigPlaceholder>
</div>

- Humans (2D): ω_danger ← apathy &nbsp;·&nbsp; threat_vigor ← anxiety
- LLM agent: danger axis · reward axis, split by valence
- Humans (VR): choice/escape · locomotor vigor — **to be tested**
- Self-model: trait *observed* → persona *installed* → body *rebuilt*


<!--
Demoted from the main deck 2026-08-15 (was slide 46). Held for Q&A.

S5.1. 1 min.

TAKEAWAY. A danger-weighting channel and an activation/reward channel recur in
human behavior, in an artificial agent's internals, and — to be tested — in
locomotion.

THE VISUAL RHYME IS THE ARGUMENT. Never recolor between sections.

Q. "Same construct, or an analogy?"
→ OQ-42. ANSWER HONESTLY: a shared computational description whose
  implementation may differ entirely. CLAIMING LESS HERE IS MORE PERSUASIVE THAN
  CLAIMING MORE.
-->
