async function loadTooltips() {
  const tableBody = document.querySelector("#table-body");
  let tooltipElements = document.querySelectorAll("[data-tooltip-text]");

  tooltipElements.forEach((tooltip) => {
    tooltip.addEventListener("mouseout", (e) => {
      removeAllTooltips();
    });

    tooltip.addEventListener("mouseover", (e) => {
      let tooltipContext = e.currentTarget.getAttribute("data-tooltip-text");

      let element = document.createElement("div");
      element.classList.add("tooltip");
      element.innerHTML = tooltipContext;

      removeAllTooltips();
      console.log(element);

      // coordenates of the target
      let coords = e.currentTarget.getBoundingClientRect();

      // width of the target
      let targetWidth = e.currentTarget.width;

      // add coordenates on style to tooltip
      element.style.left = coords.left + targetWidth - 10 + "px";
      element.style.top = coords.top - 35 + "px";

      tableBody.appendChild(element);
    });
  });
}

function removeAllTooltips() {
  console.log("doing ");
  document.querySelectorAll(".tooltip").forEach((tooltip) => {
    tooltip.remove();
  });
}
