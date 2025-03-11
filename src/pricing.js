const tabs = [
  { name: ".section-pricing-overview", tab: ".pricing-cards-overview" },
  { name: ".pricing-table", tab: ".pricing-table-tab" },
];
tabs.forEach(({ name, tab }) => {
  let businessMonthly, businessYearly, enterpriseMonthly, enterpriseYearly;

  $(name)
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
        const currentActive = $(name).find(".tab-link.w--current")[0].innerText;
        // Find tab links that contain the specified text
        const otherTab = tabs.filter((tab) => tab.name !== name)[0].name;
        $(otherTab).find(`.tab-link:contains(${currentActive})`)[0].click();
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

  document.querySelectorAll(tab).forEach((pane) => {
    observer.observe(pane, { attributes: true });
  });
});
