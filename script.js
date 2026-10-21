// ===== Site settings: edit these only with REAL details =====
const SITE = {
  contactEmail: "",   // e.g. "hello@yourdomain.com" — leave empty to hide contact buttons
};

document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu
  const btn = document.querySelector(".menu-btn");
  const list = document.querySelector(".nav ul");
  if (btn && list) {
    btn.addEventListener("click", () => {
      const open = list.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
    list.querySelectorAll("a").forEach(a => a.addEventListener("click", () => list.classList.remove("open")));
  }
  // Footer year
  document.querySelectorAll("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));
  // Contact links: shown only when a real email is configured
  document.querySelectorAll("[data-contact]").forEach(el => {
    if (SITE.contactEmail) {
      el.href = "mailto:" + SITE.contactEmail + "?subject=" + encodeURIComponent(el.dataset.subject || "RentMyBae enquiry");
    } else {
      el.hidden = true;
    }
  });
});
