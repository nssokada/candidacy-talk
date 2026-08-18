<!--
  ConceptDirections.vue — slide 30, the concept slide that opens the Study 2
  method sequence: a concept is a DIRECTION, and matched contexts that differ
  only in feeling all displace along the same one.

  This is the method in miniature, and it is deliberately a cartoon: slides
  32-34 do the same thing for real, on 6,000 stories, with a projection step.
  The shapes here are the shapes slide 34 opens on, so the audience meets the
  picture before it meets the mathematics.

  ONE SCENE, FOUR STATES. Stage 0 is the resting state and carries no motion of
  its own; each click adds a beat:

    0  the hateful contexts — two sentences that share a feeling
    1  their matched retellings, same content and opposite feeling
    2  the two displacements, drawn TOGETHER
    3  the payoff line

  Click 2 is the slide. Both arrows draw on ONE delay, not in sequence: the
  claim is that the two pairs move the same way, and a stroke chasing another
  stroke would say the opposite.

  Every visible state is a pure function of `stage`, so stepping backwards lands
  exactly where the forward step drew. Entrances stage, exits cut — the delays
  come from d1/d2/d3, which collapse to 0ms the moment their beat is not
  showing, or a backward step would replay the choreography in reverse.
-->
<template>
  <div class="cd">
    <svg class="dg" :viewBox="`0 0 ${VB_W} ${VB_H}`" role="img"
         aria-label="Two clusters of sentences in an activation space. Hateful contexts sit upper left, their matched loving retellings lower right, and the two topic-matched pairs are joined by parallel arrows along one shared direction labelled the love direction.">

      <defs>
        <marker id="cd-rose" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" :fill="C.emotion" />
        </marker>
      </defs>

      <!-- The sub-caption is drawn INSIDE the svg rather than as a sibling div:
           a real sub-caption element would eat into the 410px the component is
           given, and VB_H has to stay equal to that height or every user unit
           stops being one CSS pixel. -->
      <text class="sub" :x="0" :y="15">the linear representation hypothesis</text>

      <!-- ---------- the frame, and the hateful cluster (stage 0) ----------
           No reveal on any of this: stage 0 is what the slide rests at, and
           Slidev does not animate a slide's opening state. -->
      <g class="axes">
        <line :x1="ORG.x" :y1="ORG.y" :x2="ORG.x" :y2="70" />
        <line :x1="ORG.x" :y1="ORG.y" :x2="790" :y2="ORG.y" />
      </g>

      <ellipse class="cloud gray" :cx="HATE.cx" :cy="HATE.cy" :rx="HATE.rx" :ry="HATE.ry" />
      <text class="cl-lab" :x="HATE.cx" :y="HATE.cy - HATE.ry - 12" text-anchor="middle">hateful contexts</text>

      <template v-for="(p, i) in GRAY" :key="`g${i}`">
        <line class="ray" :x1="ORG.x" :y1="ORG.y" :x2="p.x" :y2="p.y" />
        <circle class="dot gray" :cx="p.x" :cy="p.y" r="4.5" />
        <text class="s-lab" :x="p.lx" :y="p.ly" :text-anchor="p.anchor">{{ p.text }}</text>
      </template>

      <!-- ---------- click 1: the matched retellings ----------
           Same topics, opposite feeling. The cluster grows in first so the dots
           have somewhere to land. -->
      <g class="beat" :class="{ 'is-on': stage >= 1 }">
        <ellipse class="cloud rose stg grow" :cx="LOVE.cx" :cy="LOVE.cy" :rx="LOVE.rx" :ry="LOVE.ry"
                 :style="d1(0, `${LOVE.cx}px ${LOVE.cy}px`)" />
        <template v-for="(p, i) in ROSE" :key="`r${i}`">
          <line class="ray stg" :x1="ORG.x" :y1="ORG.y" :x2="p.x" :y2="p.y" :style="d1(80 + i * 40)" />
          <circle class="dot rose stg" :cx="p.x" :cy="p.y" r="4.5" :style="d1(110 + i * 40)" />
          <text class="s-lab rose stg" :x="p.lx" :y="p.ly" :text-anchor="p.anchor"
                :style="d1(240 + i * 40)">{{ p.text }}</text>
        </template>
        <text class="cl-lab rose stg" :x="LOVE.cx" :y="LOVE.cy + LOVE.ry + 22" text-anchor="middle"
              :style="d1(340)">loving contexts</text>
      </g>

      <!-- ---------- click 2: the displacements ----------
           One delay for both, so they draw in lockstep. The heads are separate
           2px stubs because an SVG marker is painted at its vertex regardless
           of the dash pattern, and leaving them on the dash-drawn lines would
           park two arrowheads at the destinations before the strokes set off. -->
      <g class="beat" :class="{ 'is-on': stage >= 2 }">
        <template v-for="(s, i) in ARROWS" :key="`a${i}`">
          <line class="arr" :x1="s.x1" :y1="s.y1" :x2="s.x2" :y2="s.y2"
                :stroke-dasharray="s.len" :stroke-dashoffset="stage >= 2 ? 0 : s.len"
                :style="arrowStyle()" />
          <line class="arr head stg" :x1="s.x2 - s.ux * 2" :y1="s.y2 - s.uy * 2"
                :x2="s.x2" :y2="s.y2" marker-end="url(#cd-rose)" :style="d2(500)" />
        </template>

        <line class="leader stg" :x1="480" :y1="138" :x2="480" :y2="154" :style="d2(620)" />
        <text class="dir-lab stg" :x="480" :y="130" text-anchor="middle" :style="d2(650)">the “love” direction</text>

        <text class="cap stg" :x="0" :y="364" :style="d2(700)">{{ CAP[0] }}</text>
      </g>

      <!-- ---------- click 3: the payoff ---------- -->
      <g class="beat" :class="{ 'is-on': stage >= 3 }">
        <text class="cap stg" :x="0" :y="383" :style="d3(0)">{{ CAP[1] }}</text>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { C, FONT, VB_W, VB_H } from '../emotionVizTokens.js'

// stage = $clicks (0-3); every visible state is a pure function of it.
const props = defineProps({ stage: { type: Number, default: 0 } })

/* ---------- staging ----------
   Each beat is choreographed by per-element transition DELAYS. A delay must
   collapse to 0 the moment its beat is not showing, or stepping backwards
   would play the choreography in reverse — the deck's rule is that entrances
   stage and exits are instant. So the delay is a function of stage, exactly
   like everything else on the slide. */
const delay = (on, ms, origin) => ({
  transitionDelay: on ? `${ms}ms` : '0ms',
  ...(origin ? { transformOrigin: origin } : {}),
})
const d1 = (ms, origin) => delay(props.stage >= 1, ms, origin)
const d2 = (ms) => delay(props.stage >= 2, ms)
const d3 = (ms) => delay(props.stage >= 3, ms)

/* ---------- the space ----------
   Two clusters, four sentences. The pairs are topic-matched across clusters —
   world with world, cats with cats — which is the only reason the two
   displacements are the same vector. */
const ORG = { x: 110, y: 330 }
const HATE = { cx: 330, cy: 145, rx: 88, ry: 56 }
const LOVE = { cx: 640, cy: 235, rx: 92, ry: 58 }

/* Sentence labels sit on the OUTSIDE of each cluster — above the gray one,
   below the rose one — because the arrows leave the gray cluster to the right
   and arrive at the rose one from the upper left. Every other placement
   collides with an arrow or a cluster label; these positions are measured off
   the built slide, not guessed. */
const PTS = [
  { x: 312, y: 124, tone: 'gray', text: 'I hate the world',  lx: 312, ly: 108, anchor: 'middle' },
  { x: 352, y: 168, tone: 'gray', text: 'I dislike cats',    lx: 344, ly: 172, anchor: 'end' },
  { x: 612, y: 189, tone: 'rose', text: 'I love the world',  lx: 612, ly: 209, anchor: 'middle' },
  { x: 652, y: 233, tone: 'rose', text: 'I adore cats',      lx: 652, ly: 253, anchor: 'middle' },
]
const GRAY = PTS.filter((p) => p.tone === 'gray')
const ROSE = PTS.filter((p) => p.tone === 'rose')

/* Trim both ends so the arrowhead lands beside the dot, not on top of it. */
function seg(p, q, tA, tB) {
  const dx = q.x - p.x
  const dy = q.y - p.y
  const L = Math.hypot(dx, dy)
  const ux = dx / L
  const uy = dy / L
  return {
    x1: p.x + ux * tA, y1: p.y + uy * tA,
    x2: q.x - ux * tB, y2: q.y - uy * tB,
    len: L - tA - tB, ux, uy,
  }
}

// world -> world and cats -> cats: the same delta, by construction.
const ARROWS = [seg(GRAY[0], ROSE[0], 8, 9), seg(GRAY[1], ROSE[1], 8, 9)]

/* The draw transition is inline and conditional, not a rule on `.arr`.
   The beats here are CUMULATIVE (stage >= 2 stays true at stage 3), so unlike
   the old exclusive scenes there is no group that blinks out and hides a
   trailing animation: a transition left declared at stage < 2 makes both arrows
   visibly RETRACT over half a second on a back step. Measured — it broke
   backward-step equality until this became conditional. */
const arrowStyle = () => ({
  transition: props.stage >= 2
    ? 'stroke-dashoffset 520ms cubic-bezier(0.16, 0.84, 0.44, 1) 60ms'
    : 'none',
})

const CAP = [
  'Matched pairs — same content, opposite feeling — displace along one shared direction.',
  'Average many such displacements and you have the concept vector. (This is the whole method, in miniature.)',
]
</script>

<style scoped>
.cd {
  position: relative;
  height: 410px;
  width: 100%;
}

.dg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  font-family: v-bind(FONT);
}

/* ---- staged reveals ----
   The hidden state carries NO transition, so every exit is instantaneous; the
   transition lives on the `.is-on` rule and the delay comes from d1/d2/d3,
   which return 0ms whenever their beat is off. Add `grow` to scale up about a
   bound origin.

   --soft, not a literal 1: the rays are deliberately faint at rest, and a
   reveal ending at full opacity would quietly restyle them. Anything with a
   resting opacity below 1 declares it as --soft and nothing declares `opacity`
   directly, so the hidden state stays a clean 0. */
.beat .stg { opacity: 0; }
.beat .stg.grow { transform: scale(0.9); }

.beat.is-on .stg {
  opacity: var(--soft, 1);
  transform: none;
  transition: opacity 260ms ease, transform 340ms cubic-bezier(0.16, 0.84, 0.44, 1);
}

/* ---- type ---- */
.sub {
  font-size: 14px;
  font-weight: 400;
  fill: #5b6472;   /* .wet-sub's colour: this line stands in for that element */
}

.cap {
  font-size: 13px;
  font-weight: 400;
  fill: v-bind('C.desc');
}

.cl-lab {
  font-size: 12.5px;
  font-weight: 500;
  fill: v-bind('C.gray');
}

.cl-lab.rose { fill: v-bind('C.emotionText'); }

.s-lab {
  font-size: 11.5px;
  font-weight: 400;
  fill: v-bind('C.ink');
}

.s-lab.rose { fill: v-bind('C.emotionText'); }

.dir-lab {
  font-size: 12.5px;
  font-weight: 500;
  fill: v-bind('C.emotionText');
}

/* ---- geometry ---- */
.axes line {
  stroke: v-bind('C.axisFaint');
  stroke-width: 1.4;
}

.cloud { stroke-width: 1; }

.cloud.gray {
  fill: v-bind('C.gray');
  fill-opacity: 0.09;
  stroke: v-bind('C.gray');
  stroke-opacity: 0.35;
}

.cloud.rose {
  fill: v-bind('C.emotion');
  fill-opacity: 0.14;
  stroke: v-bind('C.emotion');
  stroke-opacity: 0.5;
}

/* Thin rays from the origin: these are vectors, not free-floating dots. */
.ray {
  stroke: v-bind('C.axis');
  stroke-width: 0.9;
  --soft: 0.75;
  opacity: var(--soft);
}

.dot { fill: v-bind('C.gray'); }
.dot.rose { fill: v-bind('C.emotion'); }

.arr {
  stroke: v-bind('C.emotion');
  stroke-width: 2.4;
  fill: none;
  /* No transition here on purpose — see arrowStyle(). */
}

/* The head lands as the stroke arrives, not before it. */
.beat.is-on .arr.head { transition: opacity 140ms ease; }

.leader {
  stroke: v-bind('C.axis');
  stroke-width: 1;
}

/* ---- reduced motion ----
   Same content on the same click; every reveal becomes a plain fade and the
   arrows are simply there. */
@media (prefers-reduced-motion: reduce) {
  .beat .stg, .beat.is-on .stg, .beat.is-on .arr.head {
    transition: opacity 150ms ease !important;
    transition-delay: 0ms !important;
    transform: none !important;
  }

  .arr { transition: none !important; }
}
</style>
