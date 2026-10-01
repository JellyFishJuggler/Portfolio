/* Timing and geometry for the first-visit intro on home.
 *
 * This is the JS half of the sequence. The CSS half — the bar's own fade,
 * the wordmark's rise, the card stagger and the two reveal delays — lives in
 * theme.css as --intro-* tokens, because CSS is what runs it. Every number
 * appears in exactly one of the two places; the tokens that are derived from
 * the flight length (--intro-header-delay, --intro-cards-delay) are
 * calculated from --intro-flight, so retiming the flight is a one-line
 * change here plus one there.
 *
 * Durations are in seconds, to match framer-motion. */

export const INTRO = {
  /* the wordmark */
  rise: 0.8, // slides up into the centred pose, from its clip box
  flight: 1, // centred pose -> the hero position it normally sits in

  /* the loading bar */
  barDelay: 0.4, // after the wordmark starts rising
  barFade: 0.3, // in, and out again
  barHold: 0.25, // how long a full bar is held before it fades
  barLead: 0.1, // the bar starts fading this long before the flight
  barGap: 32, // clearance between the wordmark and the bar

  /* the reveal, as a fraction of the flight */
  headerAt: 0.6,
  cardsAt: 0.55,
  reveal: 0.6, // opacity/rise length for both
  cardStagger: 0.07, // between cards, in DOM order
  cardRise: 24, // how far below their final place the cards start

  /* progress: a floor on how long the intro lasts, not a claim about work */
  ceiling: 0.85, // where the bar creeps to while anything is still loading
  creep: 1.4, // time to reach that ceiling
  taskCap: 4, // stop waiting for real tasks after this and finish anyway
  settle: 0.3, // the last stretch from wherever progress is up to 100
  skipFill: 0.18, // how fast a skip fills the bar

  /* the font gate */
  fontsCap: 1.5, // measure this long after mount at the very latest

  /* the centred pose */
  width: 0.62, // wordmark width as a share of the viewport width…
  widthNarrow: 0.88, // …below narrowBreakpoint
  narrowBreakpoint: 600,
  nudge: -24, // the centre sits this far above the middle of the viewport
  minScale: 1.2, // the wordmark is never shown smaller than its resting size,
  maxScale: 3, // and never blown up past this
};

/* The roll easing, shared with the wordmark's rise in CSS. */
export const INTRO_EASE = [0.76, 0, 0.24, 1];

export default INTRO;
