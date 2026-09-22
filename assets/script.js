// SP IT Solutions — shared site behaviour
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var banner = document.getElementById("cookie-banner");
  if (banner) {
    var consent = localStorage.getItem("spit_cookie_consent");
    if (!consent) {
      setTimeout(function () { banner.classList.add("show"); }, 600);
    }
    var acceptBtn = document.getElementById("cookie-accept");
    if (acceptBtn) {
      acceptBtn.addEventListener("click", function () {
        localStorage.setItem("spit_cookie_consent", "accepted");
        banner.classList.remove("show");
      });
    }
  }

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString();
      var email = (data.get("email") || "").toString();
      var company = (data.get("company") || "").toString();
      var service = (data.get("service") || "").toString();
      var message = (data.get("message") || "").toString();

      var subject = "Enquiry from " + name + (service ? " — " + service : "");
      var body =
        "Name: " + name + "\n" +
        "Email/phone: " + email + "\n" +
        "Company: " + company + "\n" +
        "Service of interest: " + service + "\n\n" +
        "Message:\n" + message;

      var mailto =
        "mailto:hello@spitsolutions.co.za" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailto;

      var status = document.getElementById("form-status");
      if (status) {
        status.textContent = "Opening your email app with your enquiry pre-filled. If nothing opens, email us directly at hello@spitsolutions.co.za or use WhatsApp below.";
        status.classList.add("show");
      }
      form.reset();
    });
  }

  var serviceSelect = document.getElementById("service-select");
  if (serviceSelect) {
    var params = new URLSearchParams(window.location.search);
    var pre = params.get("service");
    if (pre) {
      Array.from(serviceSelect.options).forEach(function (opt) {
        if (opt.value === pre) opt.selected = true;
      });
    }
  }
});
