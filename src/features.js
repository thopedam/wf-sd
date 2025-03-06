/* -------------------------------------------------------------------------- */
/*                                Customer CRM                                */
/* -------------------------------------------------------------------------- */

let timeout;
let timeline;
const barName = ".features-customers-tab-bar-top";

$(barName)
  .children()
  .each((_, element) => {
    element.onclick = () => {
      tick($(element));
    };
  });

const duration = 8;

const tick = (element) => {
  clearTimeout(timeout);
  timeline?.totalProgress(1).kill();
  const rect = element[0].getBoundingClientRect();
  const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
  if (isInView) {
    timeline = gsap
      .timeline()
      .fromTo(
        element.find(".bar"),
        {
          transformOrigin: "bottom left",
          scaleX: 0,
          scaleY: "100%",
          background: "#6904C1",
        },
        {
          scaleX: 1,
          duration,
          ease: "linear",
        }
      )
      .to(element.find(".bar"), {
        scaleY: "50%",
        duration: 0.2,
        background: "#A0A1AE",
        ease: "power1.in",
      });
  }
  timeout = setTimeout(() => {
    let next = element.next();
    if (element.next().length === 0) {
      next = $(barName).children().first();
    }

    if (isInView) {
      next.trigger("click");
    } else {
      tick(element);
    }
  }, duration * 1000);
};

$($(barName).children().first().trigger("click"));
