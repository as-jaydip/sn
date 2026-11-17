(function () {
  "use strict";
  var page = document.querySelector(".sn-root");
  if (!page) return;
  var fadeItems = page.querySelectorAll(".sn-fade-up");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("sn-animated");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px", threshold: 0.15 });
    fadeItems.forEach(function (item) { observer.observe(item); });
  } else {
    fadeItems.forEach(function (item) { item.classList.add("sn-animated"); });
  }
  var track = page.querySelector("#snMethodTrack");
  var previous = page.querySelector("#snPrevBtn");
  var next = page.querySelector("#snNextBtn");
  if (!track || !previous || !next) return;
  var currentIndex = 0;
  function updateCarousel() {
    var card = track.querySelector(".sn-method-card");
    if (!card) return;
    var gap = parseFloat(window.getComputedStyle(track).gap) || 0;
    var step = card.getBoundingClientRect().width + gap;
    var maxOffset = Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
    var maxIndex = Math.ceil(maxOffset / step);
    currentIndex = Math.min(currentIndex, maxIndex);
    var offset = Math.min(currentIndex * step, maxOffset);
    track.style.transform = "translateX(-" + offset + "px)";
    previous.disabled = currentIndex === 0;
    next.disabled = offset >= maxOffset;
  }
  previous.addEventListener("click", function () { currentIndex = Math.max(0, currentIndex - 1); updateCarousel(); });
  next.addEventListener("click", function () { currentIndex += 1; updateCarousel(); });
  window.addEventListener("resize", updateCarousel);
  updateCarousel();
}());
