(function () {
  "use strict";
  const D = window.PORTFOLIO || {};
  const $ = (s) => document.querySelector(s);

  /* ---------- helpers ---------- */
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // {blue|text} -> <span class="t-blue">text</span>
  const hl = (s) => esc(s).replace(/\{(blue|pink|green|amber)\|([^}]+)\}/g, '<span class="t-$1">$2</span>');
  const plain = (s) => String(s ?? "").replace(/\{(?:blue|pink|green|amber)\|([^}]+)\}/g, "$1");

  const li = (items) => (items || []).map((t) => `<li>${hl(t)}</li>`).join("");
  const chips = (items) =>
    items && items.length ? `<div class="chips">${items.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>` : "";
  const url = (u) => (/^(https?:|mailto:|tel:|#)/.test(u) ? u : `https://${u}`);
  const hide = (el) => el && (el.closest("section") || el).setAttribute("hidden", "");

  /* ---------- simple binds ---------- */
  document.querySelectorAll("[data-bind]").forEach((el) => (el.textContent = D[el.dataset.bind] || ""));
  // keep hyphenated names (e.g. CHIHAB-EDDINE) together in the hero
  document.querySelectorAll(".hero__name [data-bind]").forEach((el) => (el.textContent = el.textContent.replace(/-/g, "‑")));
  if (D.name) document.title = `${D.name} — ${(D.roles || [])[0] || "Portfolio"}`;

  const avail = $("#availability");
  if (D.availability) avail.lastElementChild.textContent = D.availability;
  else avail.remove();

  // resumeUrl: "file.pdf", or { light, dark } to match the current theme
  const resume = $("#resumeBtn");
  const syncResume = () => {
    const r = D.resumeUrl;
    const theme = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    resume.href = typeof r === "string" ? r : r[theme] || r.dark || r.light;
  };
  if (D.resumeUrl && (typeof D.resumeUrl === "string" || D.resumeUrl.light || D.resumeUrl.dark)) syncResume();
  else resume.remove();

  const tagline = $("#tagline");
  if (D.tagline) tagline.innerHTML = hl(D.tagline);
  else tagline.remove();

  $("#summary").innerHTML = li(D.summary);

  /* ---------- stats ---------- */
  if (D.stats && D.stats.length) {
    $("#stats").innerHTML = D.stats
      .map((s) => `<div class="reveal"><dt>${esc(s.value)}</dt><dd>${esc(s.label)}</dd></div>`)
      .join("");
  } else $("#stats").remove();

  /* ---------- editor snippet ---------- */
  (function snippet() {
    const s = D.snippet || {};
    const k = (t) => `<span class="t-pink">${t}</span>`;
    const str = (t) => `<span class="t-green">"${esc(t)}"</span>`;
    const lines = [
      `${k("const")} <span class="t-blue">developer</span> = {`,
      `  name: ${str(D.name)},`,
      `  role: ${str((D.roles || [])[0] || "")},`,
      `  location: ${str(D.location)},`,
    ];
    if (s.stack && s.stack.length) {
      // wrap the array across lines so it never overflows the card
      const rows = [];
      let row = [], len = 0;
      s.stack.forEach((t) => {
        const w = String(t).length + 4; // quotes + ", "
        if (row.length && len + w > 30) { rows.push(row); row = []; len = 0; }
        row.push(t); len += w;
      });
      if (row.length) rows.push(row);
      lines.push(`  stack: [`);
      rows.forEach((r) => lines.push(`    ${r.map(str).join(", ")},`));
      lines.push(`  ],`);
    }
    if (s.focus) lines.push(`  focus: ${str(s.focus)},`);
    if ("coffee" in s) lines.push(`  coffee: <span class="t-amber">${!!s.coffee}</span>,`);
    lines.push(
      `  <span class="t-blue">hire</span>: () =&gt; ${k("true")},`,
      `};`,
      ``,
      `<span style="opacity:.6">// ${esc(D.availability || "let's talk")}</span>`
    );
    $("#snippet").innerHTML = lines.map((l) => `<span class="ln">${l || " "}</span>`).join("");
  })();

  /* ---------- experience ---------- */
  if (D.experience && D.experience.length) {
    $("#experienceList").innerHTML = D.experience
      .map(
        (j) => `
      <li class="job reveal">
        <article class="job__card">
          <h3 class="job__role">&lt;${esc(j.role)}&gt;</h3>
          <p class="job__meta">&lt;${esc(j.company)}${j.location ? ", " + esc(j.location) : ""}&gt;<span>${esc(j.period)}</span></p>
          <div class="job__body">
            <ul class="comments">${li(j.bullets)}</ul>
            ${chips(j.stack)}
          </div>
        </article>
      </li>`
      )
      .join("");
  } else hide($("#experienceList"));

  /* ---------- projects ---------- */
  if (D.projects && D.projects.length) {
    $("#projectList").innerHTML = D.projects
      .map((p) => {
        const links = [
          p.live ? `<a href="${esc(url(p.live))}" target="_blank" rel="noopener">live_demo</a>` : "",
          p.code ? `<a href="${esc(url(p.code))}" target="_blank" rel="noopener">source_code</a>` : "",
        ].join("");
        return `
      <article class="project reveal${p.featured ? " project--featured" : ""}">
        ${p.featured ? `<p class="project__tag">// featured</p>` : ""}
        <h3 class="project__title">&lt;${esc(p.title)}&gt;</h3>
        ${p.role ? `<p class="project__role"><span class="t-pink">@role</span> ${esc(p.role)}</p>` : ""}
        <p class="project__desc">${hl(p.description)}</p>
        ${p.bullets ? `<ul class="comments" style="margin-top:10px">${li(p.bullets)}</ul>` : ""}
        ${chips(p.stack)}
        ${links ? `<div class="project__links">${links}</div>` : ""}
      </article>`;
      })
      .join("");
  } else hide($("#projectList"));

  /* ---------- skills ---------- */
  if (D.skills && D.skills.length) {
    $("#skillList").innerHTML = D.skills
      .map((g) => `<div class="skill reveal"><h3>&lt;${esc(g.group)}&gt;</h3><ul class="comments">${li(g.items)}</ul></div>`)
      .join("");
  } else hide($("#skillList"));

  /* ---------- education + certs ---------- */
  const eduEl = $("#educationList");
  const certEl = $("#certList");
  eduEl.innerHTML = (D.education || [])
    .map(
      (e) => `<ul class="comments edu reveal">
        <li>${hl(e.degree)}</li>
        <li class="edu__school">${hl(e.school)}</li>
        ${e.period ? `<li class="edu__school">${hl(e.period)}</li>` : ""}
      </ul>`
    )
    .join("");
  certEl.innerHTML = li(D.certifications);
  if (!eduEl.innerHTML.trim()) eduEl.parentElement.remove();
  if (!certEl.innerHTML.trim()) certEl.parentElement.remove();
  if (!eduEl.isConnected || !certEl.isConnected) $(".split__divider")?.remove();
  if (!eduEl.isConnected && !certEl.isConnected) $("#education").remove();

  /* ---------- testimonials ---------- */
  if (D.testimonials && D.testimonials.length) {
    const initials = (n) => String(n || "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
    $("#testimonialList").innerHTML = D.testimonials
      .map((t) => {
        const avatar = t.avatar
          ? `<img class="quote__avatar" src="${esc(t.avatar)}" alt="" loading="lazy" width="44" height="44" />`
          : `<span class="quote__avatar" aria-hidden="true">${esc(initials(t.name))}</span>`;
        const role = [t.role, t.company].filter(Boolean).map(esc).join(" • ");
        return `
      <figure class="quote reveal">
        <blockquote class="quote__body"><p>${hl(t.quote)}</p></blockquote>
        <figcaption class="quote__author">
          ${avatar}
          <span>
            <span class="quote__name"><span class="t-pink">@author</span> ${esc(t.name)}</span>
            ${role ? `<span class="quote__role"><span class="t-pink">@role</span> ${role}</span>` : ""}
          </span>
        </figcaption>
      </figure>`;
      })
      .join("");
  } else hide($("#testimonialList"));

  /* ---------- contact + footer ---------- */
  const c = D.contact || {};
  // profile entries: "domain.com/me" (linked) or { text, url } where url "" means no link
  const profile = (label, v) => {
    if (!v) return null;
    if (typeof v === "string") return { label, text: v, href: url(v) };
    return v.text ? { label, text: v.text, href: v.url ? url(v.url) : "" } : null;
  };
  const contactItems = [
    c.email && { label: "email", text: c.email, href: `mailto:${c.email}` },
    c.phone && { label: "phone", text: c.phone, href: `tel:${c.phone.replace(/[^\d+]/g, "")}` },
    profile("linkedin", c.linkedin),
    profile("github", c.github),
  ].filter(Boolean);
  const ext = (href) => (/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : "");

  $("#contactLinks").innerHTML = contactItems
    .map((i, n) => {
      const cls = `btn ${n === 0 ? "btn--primary" : "btn--ghost"}`;
      return i.href
        ? `<a class="${cls}" href="${esc(i.href)}"${ext(i.href)}>${esc(i.label)}()</a>`
        : `<span class="${cls} btn--static">${esc(i.label)}()</span>`;
    })
    .join("");

  $("#footerBar").innerHTML = `
    <span>© ${new Date().getFullYear()} {${esc(D.name)}}</span>
    <span class="footer__links">${contactItems
      .map((i) => (i.href ? `<a href="${esc(i.href)}"${ext(i.href)}>{${esc(i.text)}}</a>` : `<span>{${esc(i.text)}}</span>`))
      .join("")}</span>`;

  /* ---------- typed role ---------- */
  (function typed() {
    const el = $("#typed");
    const roles = (D.roles || []).map(plain).filter(Boolean);
    if (!roles.length) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || roles.length === 1) {
      el.textContent = roles[0];
      return;
    }
    let r = 0, i = 0, del = false;
    (function tick() {
      const word = roles[r];
      el.textContent = word.slice(0, i);
      let wait = del ? 35 : 70;
      if (!del && i === word.length) { del = true; wait = 1800; }
      else if (del && i === 0) { del = false; r = (r + 1) % roles.length; wait = 350; }
      i += del ? -1 : 1;
      setTimeout(tick, wait);
    })();
  })();

  /* ---------- theme toggle ---------- */
  const root = document.documentElement;
  $("#themeToggle").addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    if (resume.isConnected) syncResume();
  });

  /* ---------- mobile menu ---------- */
  const burger = $("#burger");
  const links = $("#navLinks");
  const setMenu = (open) => {
    links.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
  };
  burger.addEventListener("click", () => setMenu(!links.classList.contains("is-open")));
  links.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  /* ---------- nav: hide links to removed sections ---------- */
  links.querySelectorAll("a").forEach((a) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target || target.hidden) a.remove();
  });

  /* ---------- scroll effects ---------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el, n) => {
      el.style.transitionDelay = `${(n % 4) * 60}ms`;
      io.observe(el);
    });

    const navMap = new Map([...links.querySelectorAll("a")].map((a) => [a.getAttribute("href").slice(1), a]));
    const spy = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const a = navMap.get(e.target.id);
          if (a && e.isIntersecting) {
            navMap.forEach((x) => x.classList.remove("is-active"));
            a.classList.add("is-active");
          }
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navMap.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }
})();
