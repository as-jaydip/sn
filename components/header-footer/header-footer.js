(function () {
  "use strict";

  var body = document.body;
  var root = body.getAttribute("data-root") || "./";

  document.querySelectorAll("[data-route]").forEach(function (link) {
    var route = link.getAttribute("data-route").replace(/^\/+|\/+$/g, "");
    link.setAttribute("href", root + (route ? route + "/" : ""));
  });

  var headerSlot = document.querySelector("[data-site-header]");
  var footerSlot = document.querySelector("[data-site-footer]");
  if (headerSlot) {
    loadComponent(headerSlot, root + "components/header-footer/header.html", "site header", function (markup) {
      headerSlot.innerHTML = markup;
      resolveRoutes(headerSlot, root);
      initializeNavigation(headerSlot);
      markCurrentPage(headerSlot);
    });
  }

  if (footerSlot) {
    loadComponent(footerSlot, root + "components/header-footer/footer.html", "site footer", function (markup) {
      footerSlot.innerHTML = markup;
      resolveRoutes(footerSlot, root);
      setCurrentYear(footerSlot);
    });
  }

  setCurrentYear(document);

  function loadComponent(slot, url, label, onLoad) {
    fetch(url).then(function (response) {
      if (!response.ok) throw new Error("Unable to load " + label + " (" + response.status + ").");
      return response.text();
    }).then(function (markup) {
      onLoad(markup);
      slot.removeAttribute("data-component-error");
    }).catch(function (error) {
      console.error("StockNexa " + label + " loading failed:", error);
      slot.textContent = "The " + label + " could not be loaded. Please refresh the page.";
    });
  }

  function setCurrentYear(scope) {
    scope.querySelectorAll("[data-current-year]").forEach(function (node) {
      node.textContent = new Date().getFullYear();
    });
  }

  function resolveRoutes(scope, base) {
    scope.querySelectorAll("[data-route]").forEach(function (link) {
      var route = link.getAttribute("data-route").replace(/^\/+|\/+$/g, "");
      link.setAttribute("href", base + (route ? route + "/" : ""));
    });
  }

  function initializeNavigation(scope) {
    var toggle = scope.querySelector(".menu-toggle");
    var navigation = scope.querySelector(".primary-nav");
    if (!toggle || !navigation) return;

    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      toggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
      navigation.classList.toggle("is-open", !expanded);
    });

    document.addEventListener("click", function (event) {
      if (!scope.contains(event.target)) {
        navigation.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation");
      }
    });
  }

  function markCurrentPage(scope) {
    var current = "/" + (body.getAttribute("data-page-route") || "/").replace(/^\/+|\/+$/g, "");
    scope.querySelectorAll("[data-route]").forEach(function (link) {
      var route = "/" + link.getAttribute("data-route").replace(/^\/+|\/+$/g, "");
      if (route === current) link.setAttribute("aria-current", "page");
    });
  }

  document.querySelectorAll("form[data-placeholder-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var status = form.querySelector(".form-status, .sn-form-status");
      if (status) status.textContent = "This form is a frontend placeholder and is not connected to a service.";
    });
  });
}());
