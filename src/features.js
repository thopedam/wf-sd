/* -------------------------------------------------------------------------- */
/*                                Customer CRM                                */
/* -------------------------------------------------------------------------- */

const tabs = [
  {
    barName: ".features-customers-tab-bar-top",
    barElement: ".bar",
    horizontal: true,
  },
  {
    barName: ".features-collaboration-tab-menu",
    barElement: ".vertical-bar",
    horizontal: false,
  },
  {
    barName: ".features-reporting-tab-menu",
    barElement: ".vertical-bar",
    horizontal: false,
  },
];

const duration = 8;

tabs.forEach(({ barName, horizontal, barElement }) => {
  let timeout;
  let timeline;
  $(barName)
    .children()
    .each((_, element) => {
      element.onclick = () => {
        currentElement = $(element);
        tick();
      };
    });

  let currentElement = $(barName).children().first();

  let isElementInView = false;

  const tick = () => {
    clearTimeout(timeout);
    timeline?.totalProgress(1).kill();

    if (isElementInView) {
      timeline = gsap
        .timeline()
        .fromTo(
          currentElement.find(barElement),
          {
            transformOrigin: horizontal ? "bottom left" : "top center",
            scaleX: horizontal ? 0 : 1,
            scaleY: horizontal ? 1 : 0,
            opacity: 1,
            background: "#6904C1",
          },
          {
            scaleX: 1,
            scaleY: horizontal ? undefined : 1,
            duration,
            ease: "linear",
          }
        )
        .to(currentElement.find(barElement), {
          scaleY: horizontal ? 0.5 : 1,
          opacity: horizontal ? 1 : 0,
          duration: 0.2,
          background: "#A0A1AE",
          ease: "power1.in",
        });
    }

    timeout = setTimeout(() => {
      let next = currentElement.next();
      if (currentElement.next().length === 0) {
        next = $(barName).children().first();
      }
      if (isElementInView) {
        next.trigger("click");
      }
    }, duration * 1000);
  };

  $($(barName).children().first().trigger("click"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isElementInView = entry.isIntersecting;
        if (isElementInView) {
          tick();
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
    }
  );

  $(barName)
    .children()
    .each((_, element) => {
      observer.observe(element);
    });
});
