/* -------------------------------------------------------------------------- */
/*                             A new breed of CRM                             */
/* -------------------------------------------------------------------------- */

const MOBILE_BREAKPOINT = 600;
const TABLET_BREAKPOINT = 990;
const MAX_WIDTH = 1280;
const WINDOW_HEIGHT = window.innerHeight;
const revalidateTimelines = [];
let width = window.innerWidth;

const staggerTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".sticky-cards-container",
    scrub: 1,
    start: "500px bottom",
    end: "90% bottom",
    toggleActions: "play reverse none none",
  },
});
staggerTL.add("start", 0);

staggerTL.fromTo(
  ".sticky-card",
  { scale: 1.5, xPercent: xStart, yPercent: -200, rotateZ: -45 },
  {
    scale: 1.0,
    xPercent: positionX,
    yPercent: positionY,
    rotateZ: rotate,
    stagger: 1.0,
  },
  "start"
);
revalidateTimelines.push(staggerTL);

const containerWidth = () =>
  $(".sticky-cards-container").length
    ? $(".sticky-cards-container").width()
    : 0;

const containerPercentage = () => (containerWidth() / MAX_WIDTH) * 80;

function getRandom(seed, max) {
  const x = Math.sin(Math.sin(1 * seed * 2238));
  return x * max;
}

function xStart(i) {
  return i % 2 === 0 ? 500 : -500;
}

function rotate(i) {
  return getRandom(i * 2, 3);
}

function positionX(i) {
  if (window.innerWidth < MOBILE_BREAKPOINT) {
    return 0; //getRandom(i * 5, 2);
  }
  let value =
    (containerPercentage() -
      (i % 3) * containerPercentage() +
      getRandom(i * 3, 5)) *
    -1;
  if (window.innerWidth < TABLET_BREAKPOINT) {
    value *= 0.5;
  }
  if (window.innerWidth > MAX_WIDTH) {
    value *= window.innerWidth / MAX_WIDTH;
  }
  return value;
}
function positionY(i) {
  if (window.innerWidth < MOBILE_BREAKPOINT) {
    return i * 2;
  }
  return Math.floor(i / 3) * 100 - 50 + getRandom(i / 12, -20);
}

/* -------------------------------------------------------------------------- */
/*                    Still fighting your CRM, not selling?                   */
/* -------------------------------------------------------------------------- */

gsap.from(".number", {
  scrollTrigger: {
    trigger: ".section-problem",
    start: "top center",
    toggleActions: "play play play reset",
  },
  innerText: 0,
  duration: 2,
  snap: {
    innerText: 1,
  },
});

const tabTimeline = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".section-problem",
      start: "top center",
      toggleActions: "play play play reset",
    },
  })

  .to(".tab-home", {
    height: "+=20px",
    marginTop: "-=20px",
    duration: 0.2,
    stagger: 0.1,
  })
  .to(
    ".tab-home",
    {
      height: "auto",
      marginTop: "+=20px",
      duration: 0.15,
      stagger: 0.1,
    },
    0.4
  );

/* -------------------------------------------------------------------------- */
/*                        Unify, automate,sell smarter                        */
/* -------------------------------------------------------------------------- */

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".ht-1",
    scrub: 1,
    start: `${WINDOW_HEIGHT} bottom`,
    end: "bottom center",
    toggleActions: "play reverse none none",
  },
});

tl.add("start", 0)
  .fromTo(".layout254_item", { opacity: 0.3 }, { opacity: 1.0, stagger: 1.0 })
  .add("end", 1)
  .to(".layout254_item", { opacity: 0.3, stagger: 1.0 }, "end");

tl.fromTo(
  ".layout254_item > .home-separator",
  { scaleX: 0.0 },
  { scaleX: 1.0, stagger: 1.0 },
  "start"
).to(".layout254_item > .home-separator", { scaleX: 0.0, stagger: 1.0 }, "end");

tl.fromTo(
  ".mobile-separator > .home-separator",
  { backgroundColor: "#3d3d3d", opacity: 0.3, scaleX: 0.0 },
  { backgroundColor: "#6904C1", opacity: 1.0, scaleX: 1.0, stagger: 1.0 },
  "start"
).to(
  ".mobile-separator > .home-separator",
  {
    backgroundColor: "#3d3d3d",
    opacity: 0.3,
    stagger: 1.0,
  },
  "end"
);

tl.fromTo(
  ".sticky-content",
  { opacity: 0.0 },
  { opacity: 1.0, stagger: 1.0 },
  "start"
).to(".sticky-content", { opacity: 0.0, stagger: 1.0 }, "end");

tl.fromTo(
  ".sticky-mobile-header",
  { opacity: 0.0 },
  { opacity: 1.0, stagger: 1.0 },
  "start"
).to(".sticky-mobile-header", { opacity: 0.0, stagger: 1.0 }, "end");

/* -------------------------------------------------------------------------- */
/*                 Unlock your sales potential with agentic AI                */
/* -------------------------------------------------------------------------- */

let switchTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".home-counter-switch",
    start: "100% 50%",
    end: "100% 50%",
    toggleActions: "play none reverse none",
  },
});

function endOpacity(i) {
  return window.innerWidth < TABLET_BREAKPOINT ? 0.0 : 0.2;
}

switchTl.add("start", 0);
switchTl.fromTo(".out_image", { opacity: 1.0 }, { opacity: 0.0 }, "start");
switchTl.fromTo(".in_image", { opacity: 0.0 }, { opacity: 1.0 }, "start");
switchTl.fromTo(".num_in", { opacity: endOpacity }, { opacity: 1.0 }, "start");

gsap.from(".counter-out, .counter-in", {
  scrollTrigger: {
    trigger: ".home-counter-switch",
    start: "top center",
    toggleActions: "play play play reset",
  },
  innerText: 30,
  duration: 1.5,
  snap: {
    innerText: 1,
  },
});

switchTl.fromTo(".num_out", { opacity: 1.0 }, { opacity: endOpacity }, "start");
revalidateTimelines.push(switchTl);

window.addEventListener("resize", () => {
  if (width === window.innerWidth) return;
  width = window.innerWidth;
  revalidateTimelines.forEach((tl) => {
    tl.invalidate();
    tl.restart();
  });
});
