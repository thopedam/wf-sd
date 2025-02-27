/* -------------------------------------------------------------------------- */
/*                             A new breed of CRM                             */
/* -------------------------------------------------------------------------- */

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
  { scale: 1.5, xPercent: -500, yPercent: -200, rotateZ: -45 },
  {
    scale: 1.0,
    xPercent: positionX,
    yPercent: positionY,
    rotateZ: rotate,
    stagger: 1.0,
  },
  "start"
);
function getRandom(seed, max) {
  const x = Math.sin(1 + seed * 1238796123);
  console.log(x);
  return x * max;
}

function rotate(i) {
  return getRandom(i, 10);
}
function positionX(i) {
  return 10 * (i % 2 === 0 ? 1 : -1);
}
function positionY(i) {
  return i * 15;
}

/* -------------------------------------------------------------------------- */
/*                    Still fighting your CRM, not selling?                   */
/* -------------------------------------------------------------------------- */

gsap.from(".number", {
  scrollTrigger: {
    trigger: ".section_stats46",
    start: "top center",
    toggleActions: "play play play reset",
  },
  innerText: 0,
  duration: 2,
  snap: {
    innerText: 1,
  },
});

/* -------------------------------------------------------------------------- */
/*                        Unify, automate,sell smarter                        */
/* -------------------------------------------------------------------------- */

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".ht-1",
    scrub: 1,
    start: "-320px top",
    end: "bottom bottom",
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
  ".layout254_image",
  { opacity: 0.0 },
  { opacity: 1.0, stagger: 1.0 },
  "start"
).to(".layout254_image", { opacity: 0.0, stagger: 1.0 }, "end");

/* -------------------------------------------------------------------------- */
/*                 Unlock your sales potential with agentic AI                */
/* -------------------------------------------------------------------------- */

let switchTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".home-counter-switch",
    start: "60% 50%",
    end: "60% 50%",
    toggleActions: "play none reverse none",
  },
});
switchTl.add("start", 0);
switchTl.fromTo(".out_image", { opacity: 1.0 }, { opacity: 0.0 }, "start");
switchTl.fromTo(".in_image", { opacity: 0.0 }, { opacity: 1.0 }, "start");
switchTl.fromTo(".num_in", { opacity: 0.2 }, { opacity: 1.0 }, "start");
switchTl.fromTo(".num_out", { opacity: 1.0 }, { opacity: 0.2 }, "start");
