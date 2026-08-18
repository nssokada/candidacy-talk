<template>
  <div class="ec">
    <svg class="dg" :viewBox="`0 0 ${VB_W} ${VB_H}`" role="img"
         :aria-label="'Corpus construction: 100 topics crossed with 50 emotions, a generation prompt that forbids naming the emotion, and a matched emotional/neutral story pair'">

      <!-- ================= topics column (stage 0) ================= -->
      <g class="grp is-on">
        <g v-for="(t, i) in TOPICS" :key="t.label" class="card topic" :style="d(0, i)">
          <rect :x="TOP_X" :y="topicY(i)" :width="TOP_W" :height="CARD_H" :rx="CARD_R" />
          <!-- Thumbnail. Placeholder rounded rect until the cropped PNGs land;
               swapping one in is a one-line change — give the topic a `thumb`. -->
          <image v-if="t.thumb" :href="withBase(t.thumb)" :x="TOP_X + 8" :y="topicY(i) + 8"
                 :width="THUMB" :height="THUMB" preserveAspectRatio="xMidYMid slice"
                 class="thumb-img" />
          <template v-else>
            <rect class="thumb" :x="TOP_X + 8" :y="topicY(i) + 8" :width="THUMB" :height="THUMB" rx="4" />
            <text class="thumb-t" :x="TOP_X + 8 + THUMB / 2" :y="topicY(i) + 8 + THUMB / 2 + 3"
                  text-anchor="middle">{{ t.tag }}</text>
          </template>
          <text v-for="(ln, j) in t.label" :key="ln" class="topic-t"
                :x="TOP_X + THUMB + 20" :y="topicY(i) + (t.label.length === 1 ? 34 : 26 + j * 15)">{{ ln }}</text>
        </g>
        <g class="tail" :style="d(0, 3)">
          <circle v-for="k in 3" :key="k" :cx="TOP_X + 14 + (k - 1) * 9" :cy="TAIL_Y" r="1.8" />
          <text class="tail-t" :x="TOP_X + 48" :y="TAIL_Y + 4">×100 topics</text>
        </g>
      </g>

      <!-- ================= the cross ================= -->
      <g class="grp" :class="{ 'is-on': stage >= 1 }">
        <text class="cross" :x="CROSS_X" :y="COL_MID + 8" text-anchor="middle" :style="d(1, 0)">×</text>
      </g>

      <!-- ================= emotions column (click 1) ================= -->
      <g class="grp" :class="{ 'is-on': stage >= 1 }">
        <g v-for="(e, i) in EMOTIONS" :key="e" class="card emo" :style="d(1, i + 1)">
          <rect :x="EMO_X" :y="emoY(i)" :width="EMO_W" :height="EMO_H" :rx="CARD_R" />
          <text class="emo-t" :x="EMO_X + EMO_W / 2" :y="emoY(i) + EMO_H / 2 + 5"
                text-anchor="middle">{{ e }}</text>
        </g>
        <g class="tail" :style="d(1, 4)">
          <circle v-for="k in 3" :key="k" :cx="EMO_X + 12 + (k - 1) * 9" :cy="EMO_TAIL_Y" r="1.8" />
          <text class="tail-t" :x="EMO_X + 44" :y="EMO_TAIL_Y + 4">×50 emotions</text>
        </g>
      </g>

      <!-- ================= prompt card (click 2) =================
           Three excerpted lines, never the full prompt. Mono is the deck's own
           Fira Code (slides.md frontmatter). -->
      <g class="grp" :class="{ 'is-on': stage >= 2 }">
        <g class="prompt" :style="d(2, 0)">
          <rect class="pbox" :x="P_X" :y="P_Y" :width="P_W" :height="P_H" :rx="CARD_R" />
          <rect class="pspine" :x="P_X" :y="P_Y" width="3" :height="P_H" />
          <text class="plabel" :x="P_X + 18" :y="P_Y + 19">GENERATION PROMPT</text>
          <text class="pline" :x="P_X + 18" :y="P_Y + 42" xml:space="preserve">Write {n} stories … a character who is feeling <tspan class="pvar">{emotion}</tspan>.</text>
          <text class="pline" :x="P_X + 18" :y="P_Y + 61" xml:space="preserve"><tspan class="pnever">NEVER</tspan> use the word '<tspan class="pvar">{emotion}</tspan>' or any direct synonyms.</text>
          <text class="pline" :x="P_X + 18" :y="P_Y + 80" xml:space="preserve">Convey it only through actions, body language, dialogue, context.</text>
        </g>
      </g>

      <!-- ================= tally (click 3) =================
           The slide's ONLY numeric statement — slide B must not restate it. -->
      <g class="grp" :class="{ 'is-on': stage >= 3 }">
        <g class="tally" :style="d(3, 0)">
          <line class="trule" :x1="0" :y1="T_Y" :x2="VB_W" :y2="T_Y" />
          <text class="tmain" :x="VB_W / 2" :y="T_Y + 28" text-anchor="middle" xml:space="preserve"><tspan class="n-emo">50</tspan> emotions  ×  <tspan class="n-ink">100</tspan> topics  ×  <tspan class="n-ink">12</tspan> retellings  +  <tspan class="n-neu">1,200</tspan> neutral stories</text>
          <text class="tsub" :x="VB_W / 2" :y="T_Y + 46" text-anchor="middle">generated with Gemini 3.1 Pro</text>
        </g>
      </g>

      <!-- ================= story pair (click 4) =================
           The punchline: the emotion is conveyed but never named. This card
           style is the A -> B seam — EmotionActivations opens on the same
           cards, stacked. -->
      <g class="grp" :class="{ 'is-on': stage >= 4 }">
        <g v-for="(s, i) in STORIES" :key="s.head" class="card story" :class="s.tone" :style="d(4, i)">
          <rect :x="storyX(i)" :y="S_Y" :width="S_W" :height="S_H" :rx="CARD_R" />
          <rect class="s-band" :x="storyX(i)" :y="S_Y" :width="S_W" height="22" :rx="CARD_R" />
          <rect class="s-band-fill" :x="storyX(i)" :y="S_Y + 12" :width="S_W" height="10" />
          <text class="s-head" :x="storyX(i) + 12" :y="S_Y + 15">{{ s.head }}</text>
          <text v-for="(ln, j) in s.body" :key="ln" class="s-body"
                :x="storyX(i) + 12" :y="S_Y + 42 + j * 16">{{ ln }}</text>
        </g>
        <text class="s-cap" :x="STORY_MID" :y="S_Y + S_H + 22" text-anchor="middle" :style="d(4, 2)">
          same topic — emotion carried entirely by the telling
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { C, FONT, MONO, VB_W, VB_H, CARD_R, EASE_ZOOM } from '../emotionVizTokens.js'

// stage = $clicks (0-4). Every visible state is a pure function of it, so
// stepping backwards restores the previous state for free.
const props = defineProps({ stage: { type: Number, default: 0 } })

/* ---------- content (copy is normative — see the plan) ---------- */
/* Vite rewrites root-absolute asset paths in markdown and plain HTML, but not
   in a bound attribute like this SVG image's `href` — so the deck deployed
   under a sub-path (the GitHub Pages project site at /candidacy-talk/) would
   ask for /figures/… and 404 while everything still worked locally. This is the
   same trap CropVideo.vue documents. BASE_URL is '/' in dev, so prefixing is a
   no-op here and the two copies of this file can stay identical. */
const withBase = (p) =>
  p && p.startsWith('/') ? (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + p : p

/* `thumb` is the one-line swap the build was designed around: set it to a path
   under public/figures (the symlink to ../../figures) and the labelled
   placeholder rect gives way to the image. Set it back to null and the
   placeholder returns. */
const TOPICS = [
  { tag: 'forest',  thumb: '/figures/03-llm-emotion/forest.png',     label: ['A person running', 'through a forest'] },
  { tag: 'airport', thumb: '/figures/03-llm-emotion/airport.png',    label: ['An unexpected delay', 'at the airport'] },
  { tag: 'exam',    thumb: '/figures/03-llm-emotion/graduation.png', label: ['Receiving news about', 'an exam result'] },
]
const EMOTIONS = ['afraid', 'joyful', 'angry']

const STORIES = [
  {
    tone: 'rose', head: 'emotional (fear)',
    body: ['She sprinted through the dark', 'forest, heart pounding, sure', 'something was chasing her…'],
  },
  {
    tone: 'blue', head: 'neutral',
    body: ['She walked through the forest', 'along a winding path.'],
  },
]

/* ---------- geometry ----------
   Authored against the 884px academic-content column. Three bands:
   columns + story pair on top, the prompt beneath them, the tally at the foot.
   The right half of the top band is deliberately empty until click 4 — that
   reserved space is what makes the punchline land instead of crowd. */
const THUMB = 56
const CARD_H = 60
const TOP_X = 0
const TOP_W = 250
const topicY = (i) => 6 + i * (CARD_H + 8)
const TAIL_Y = 6 + 3 * (CARD_H + 8) + 8   // 218

const CROSS_X = 278

const EMO_X = 306
const EMO_W = 126
const EMO_H = 44
const COL_MID = 6 + (3 * CARD_H + 2 * 8) / 2          // vertical centre of the topic stack
const EMO_TOP = COL_MID - (3 * EMO_H + 2 * 10) / 2
const emoY = (i) => EMO_TOP + i * (EMO_H + 10)
const EMO_TAIL_Y = EMO_TOP + 3 * (EMO_H + 10) + 2

const S_W = 200
const S_H = 108
const S_Y = 34
const S_X0 = 470
const S_GAP = 14
const storyX = (i) => S_X0 + i * (S_W + S_GAP)
const STORY_MID = S_X0 + S_W + S_GAP / 2

const P_X = 0
const P_Y = 250
const P_W = VB_W
const P_H = 94

const T_Y = 362

/* Stagger on the way IN only. A delayed exit makes backward stepping feel
   broken, so the hidden state always transitions at 0ms. */
function d(reveal, order) {
  return { transitionDelay: props.stage >= reveal ? `${order * 120}ms` : '0ms' }
}
</script>

<style scoped>
.ec {
  height: 410px;
  width: 100%;
}

.dg {
  width: 100%;
  height: 100%;
  overflow: visible;
  /* Diagram text lives in SVG text elements on purpose: style.css forces
     `Inter !important; font-weight: 300 !important` onto every div inside
     .slidev-layout, and SVG text escapes those selectors. */
  font-family: v-bind(FONT);
}

/* ---- reveal ---- */
.grp .card,
.grp .tail,
.grp .prompt,
.grp .tally,
.grp .cross,
.grp .s-cap {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 320ms ease, transform 320ms ease;
}

.grp.is-on .card,
.grp.is-on .tail,
.grp.is-on .prompt,
.grp.is-on .tally,
.grp.is-on .cross,
.grp.is-on .s-cap {
  opacity: 1;
  transform: translateY(0);
}

/* ---- topic cards ---- */
.topic rect {
  fill: v-bind('C.white');
  stroke: v-bind('C.rule');
  stroke-width: 1;
}

.thumb {
  fill: v-bind('C.thumbFill');
  stroke: v-bind('C.rule');
}

.thumb-img {
  clip-path: inset(0 round 4px);
}

.thumb-t {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.04em;
  fill: v-bind('C.gray');
}

.topic-t {
  font-size: 12.5px;
  font-weight: 400;
  fill: v-bind('C.ink');
}

/* ---- the cross ---- */
.cross {
  font-size: 26px;
  font-weight: 300;
  fill: v-bind('C.gray');
}

/* ---- emotion cards ---- */
.emo rect {
  fill: v-bind('C.emotionSoft');
  stroke: v-bind('C.emotion');
  stroke-width: 1;
}

.emo-t {
  font-size: 13px;
  font-weight: 500;
  fill: v-bind('C.emotionText');
}

/* ---- ellipsis tails ---- */
.tail circle {
  fill: v-bind('C.gray');
}

.tail-t {
  font-size: 11px;
  font-weight: 400;
  fill: v-bind('C.desc');
}

/* ---- prompt ---- */
.pbox {
  fill: v-bind('C.panel');
  stroke: v-bind('C.rule');
}

.pspine {
  fill: v-bind('C.gray');
  opacity: 0.5;
}

.plabel {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.1em;
  fill: v-bind('C.gray');
}

.pline {
  font-family: v-bind(MONO);
  font-size: 12.5px;
  font-weight: 400;
  fill: v-bind('C.ink');
}

.pvar {
  fill: v-bind('C.emotionText');
}

.pnever {
  font-weight: 600;
  fill: v-bind('C.ink');
}

/* ---- tally ---- */
.trule {
  stroke: v-bind('C.rule');
  stroke-width: 1;
}

.tmain {
  font-size: 15px;
  font-weight: 400;
  fill: v-bind('C.ink');
}

.n-emo { font-weight: 600; fill: v-bind('C.emotionText'); }
.n-neu { font-weight: 600; fill: v-bind('C.neutralText'); }
.n-ink { font-weight: 600; fill: v-bind('C.inkDeep'); }

.tsub {
  font-size: 11px;
  font-weight: 400;
  fill: v-bind('C.desc');
}

/* ---- story pair (the A -> B seam: EmotionActivations reuses this style) ---- */
.story rect {
  fill: v-bind('C.white');
  stroke-width: 1;
}

.story.rose rect { stroke: v-bind('C.emotion'); }
.story.blue rect { stroke: v-bind('C.neutral'); }

.story.rose .s-band,
.story.rose .s-band-fill { fill: v-bind('C.emotionSoft'); stroke: none; }
.story.blue .s-band,
.story.blue .s-band-fill { fill: v-bind('C.neutralSoft'); stroke: none; }

.s-head {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.story.rose .s-head { fill: v-bind('C.emotionText'); }
.story.blue .s-head { fill: v-bind('C.neutralText'); }

.s-body {
  font-size: 11.5px;
  font-weight: 400;
  fill: v-bind('C.ink');
}

.s-cap {
  font-size: 11px;
  font-weight: 400;
  fill: v-bind('C.desc');
}

@media (prefers-reduced-motion: reduce) {
  /* Same content on the same click; the movement goes away. */
  .grp .card,
  .grp .tail,
  .grp .prompt,
  .grp .tally,
  .grp .cross,
  .grp .s-cap {
    transform: none !important;
    transition: opacity 150ms ease !important;
    transition-delay: 0ms !important;
  }
}
</style>
