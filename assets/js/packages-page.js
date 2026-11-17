(function () {
  "use strict";
  var page = document.querySelector(".sn-plans-wrapper");
  if (!page) return;
  page.querySelectorAll(".sn-faq-item").forEach(function (item) {
    var question = item.querySelector(".sn-faq-question");
    if (!question) return;
    question.addEventListener("click", function () {
      var shouldOpen = question.getAttribute("aria-expanded") !== "true";
      page.querySelectorAll(".sn-faq-item").forEach(function (other) {
        var otherQuestion = other.querySelector(".sn-faq-question");
        var answer = other.querySelector(".sn-faq-answer");
        var isOpen = other === item && shouldOpen;
        other.classList.toggle("active", isOpen);
        if (otherQuestion) otherQuestion.setAttribute("aria-expanded", String(isOpen));
        if (answer) answer.setAttribute("aria-hidden", String(!isOpen));
      });
    });
  });
}());
