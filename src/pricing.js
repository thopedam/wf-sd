let businessMonthly, businessYearly, enterpriseMonthly, enterpriseYearly;

$(".counter")
  .find(".number")
  .each((index, item) => {
    if (index === 0) businessMonthly = item;
    else if (index === 1) enterpriseMonthly = item;
    else if (index === 2) businessYearly = item;
    else if (index === 3) enterpriseYearly = item;
  });

const animate = (element, from, to) => {
  gsap.fromTo(
    element,
    { innerText: from },
    {
      innerText: to,
      duration: 0.5,
      ease: "circ.inOut",
      snap: { innerText: 1 },
    }
  );
};

const handleAnimation = (active, inactive) => {
  active.forEach((item, index) => {
    animate(item, inactive[index].innerText, item.innerText);
  });
};

const handleMutation = (mutation) => {
  if (mutation.type === "attributes" && mutation.attributeName === "class") {
    const target = mutation.target;
    if (target.classList.contains("w--tab-active")) {
      const isBusinessMonthlyActive =
        $(target).find($(businessMonthly)).length > 0;

      if (isBusinessMonthlyActive) {
        handleAnimation(
          [businessMonthly, enterpriseMonthly],
          [businessYearly, enterpriseYearly]
        );
      } else {
        handleAnimation(
          [businessYearly, enterpriseYearly],
          [businessMonthly, enterpriseMonthly]
        );
      }
    }
  }
};

const observer = new MutationObserver((mutations) => {
  mutations.forEach(handleMutation);
});

document.querySelectorAll(".w-tab-pane").forEach((pane) => {
  observer.observe(pane, { attributes: true });
});
