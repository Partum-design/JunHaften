(() => {
  // ---------- Data (Meta Business Suite · Facebook /HaftenOficial · 8 sep – 5 oct 2026) ----------
  // Daily series read from the platform chart (approx.); sums to the exact 33,154 total.
  const START = new Date(2026, 8, 8);
  const VIEWS = [650, 300, 300, 200, 100, 50, 50, 50, 50, 50, 400, 150, 100, 50, 300, 150, 250, 6100, 750, 100, 400, 2500, 10200, 8100, 1254, 300, 150, 100];
  const ACTIVITY = [2, 0, 2, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 0, 2, 2, 0, 0, 2, 12, 31, 26, 8, 0, 0, 0];
  const CAMPAIGN = [21, 24]; // indices: 29 sep – 2 oct
  const TYPES = [
    { name: "Reel", pct: 43.9, followers: 0.14 },
    { name: "Enlace", pct: 27.9, followers: 0.01 },
    { name: "Foto", pct: 13.5, followers: 0.50 },
    { name: "Varias fotos", pct: 4.2, followers: 0.37 },
    { name: "Otro", pct: 0.1, followers: 0 },
  ];
  const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const dayLabel = (i) => { const d = new Date(START); d.setDate(d.getDate() + i); return `${d.getDate()} ${MONTHS[d.getMonth()]}`; };
  const fmt = (n, dec = 0) => n.toLocaleString("es-MX", { minimumFractionDigits: dec, maximumFractionDigits: dec });

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const SVGNS = "http://www.w3.org/2000/svg";
  const el = (tag, attrs = {}, parent) => {
    const n = document.createElementNS(SVGNS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  };
  const css = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  const isFlow = () => matchMedia("(max-width: 900px), (max-aspect-ratio: 1/1)").matches;

  // ---------- Stage scaling ----------
  const stage = $("#stage");
  let scale = 1;
  function fit() {
    if (isFlow()) { stage.style.transform = ""; scale = 1; return; }
    scale = Math.min(innerWidth / 1920, innerHeight / 1080);
    stage.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }

  // ---------- Trend chart ----------
  const tooltip = $("#tooltip");
  function drawTrend() {
    const host = $("#trendChart");
    const W = host.clientWidth, H = host.clientHeight;
    if (!W || !H) return;
    const small = W < 700;
    const fs = small ? 11 : 18;
    const m = { t: small ? 30 : 46, r: 12, b: small ? 26 : 40, l: small ? 40 : 76 };
    const iw = W - m.l - m.r, ih = H - m.t - m.b;
    const max = 12000;
    const x = (i) => m.l + (i / (VIEWS.length - 1)) * iw;
    const y = (v) => m.t + ih - (v / max) * ih;
    host.innerHTML = "";
    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": "Visualizaciones diarias, 8 de septiembre a 5 de octubre" }, host);

    // campaign band
    const bx0 = x(CAMPAIGN[0]) - iw / (VIEWS.length - 1) / 2, bx1 = x(CAMPAIGN[1]) + iw / (VIEWS.length - 1) / 2;
    el("rect", { x: bx0, y: m.t - (small ? 22 : 34), width: bx1 - bx0, height: ih + (small ? 22 : 34), fill: "rgba(229,72,77,.10)", rx: 10 }, svg);
    const bl = el("text", { x: (bx0 + bx1) / 2, y: m.t - (small ? 8 : 12), "text-anchor": "middle", fill: css("--red"), "font-size": fs, "font-weight": 700 }, svg);
    bl.textContent = small ? "Expo" : "Campaña AHR Expo";

    // grid + y axis
    const g = el("g", { class: "axis" }, svg);
    [0, 4000, 8000, 12000].forEach((v) => {
      el("line", { x1: m.l, x2: W - m.r, y1: y(v), y2: y(v), stroke: v ? "#1f2a40" : "#3a4762", "stroke-width": 1 }, g);
      const t = el("text", { x: m.l - 14, y: y(v) + fs * 0.35, "text-anchor": "end", fill: css("--ink-3"), "font-size": fs }, g);
      t.textContent = v ? fmt(v) : "0";
    });
    // x ticks every 5 days
    for (let i = 0; i < VIEWS.length; i += 5) {
      const t = el("text", { x: x(i), y: H - m.b + fs * 1.6, "text-anchor": "middle", fill: css("--ink-3"), "font-size": fs }, g);
      t.textContent = dayLabel(i);
    }

    // area + line
    const pts = VIEWS.map((v, i) => [x(i), y(v)]);
    const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
    const defs = el("defs", {}, svg);
    const grad = el("linearGradient", { id: "ga", x1: 0, x2: 0, y1: 0, y2: 1 }, defs);
    el("stop", { offset: "0", "stop-color": css("--red"), "stop-opacity": ".38" }, grad);
    el("stop", { offset: "1", "stop-color": css("--red"), "stop-opacity": "0" }, grad);
    el("path", { d: `${line} L${x(VIEWS.length - 1)} ${y(0)} L${x(0)} ${y(0)} Z`, fill: "url(#ga)" }, svg);
    const path = el("path", { d: line, fill: "none", stroke: css("--red"), "stroke-width": small ? 2 : 3, "stroke-linejoin": "round", "stroke-linecap": "round" }, svg);
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    path.getBoundingClientRect();
    path.style.transition = "stroke-dashoffset 1.6s cubic-bezier(.3,.7,.2,1)";
    requestAnimationFrame(() => (path.style.strokeDashoffset = 0));

    // annotations (selective direct labels)
    const ann = el("g", { class: "ann" }, svg);
    const annotate = (i, label, dy, left) => {
      el("circle", { cx: x(i), cy: y(VIEWS[i]), r: small ? 4 : 7, fill: css("--red"), stroke: css("--surface"), "stroke-width": 3 }, ann);
      const tx = x(i) + (left ? -1 : 1) * (small ? 8 : 16), anchor = left ? "end" : "start";
      const t1 = el("text", { x: tx, y: y(VIEWS[i]) + dy, "text-anchor": anchor, fill: css("--ink"), "font-size": small ? 13 : 24, "font-weight": 800, "font-family": "Archivo" }, ann);
      t1.textContent = "≈" + fmt(VIEWS[i]);
      const t2 = el("text", { x: tx, y: y(VIEWS[i]) + dy + (small ? 14 : 24), "text-anchor": anchor, fill: css("--ink-2"), "font-size": small ? 10 : 17 }, ann);
      t2.textContent = label;
    };
    annotate(22, "30 sep · día 2 de expo", small ? 4 : 6, true);
    annotate(17, "25 sep · pre-expo", small ? 4 : 6, true);

    // hover layer
    const cross = el("line", { y1: m.t, y2: m.t + ih, stroke: "#5b6782", "stroke-dasharray": "4 4", opacity: 0 }, svg);
    const dot = el("circle", { r: small ? 5 : 8, fill: css("--red"), stroke: "#fff", "stroke-width": 2, opacity: 0 }, svg);
    const hit = el("rect", { x: m.l, y: 0, width: iw, height: H, fill: "transparent" }, svg);
    const card = host.closest(".chart-card");
    const move = (ev) => {
      const r = svg.getBoundingClientRect();
      const k = r.width / W;
      const px = (ev.clientX - r.left) / k;
      const i = Math.max(0, Math.min(VIEWS.length - 1, Math.round(((px - m.l) / iw) * (VIEWS.length - 1))));
      cross.setAttribute("x1", x(i)); cross.setAttribute("x2", x(i)); cross.setAttribute("opacity", 1);
      dot.setAttribute("cx", x(i)); dot.setAttribute("cy", y(VIEWS[i])); dot.setAttribute("opacity", 1);
      tooltip.innerHTML = `<div class="tt-d">${dayLabel(i)}${i >= CAMPAIGN[0] && i <= CAMPAIGN[1] ? " · campaña" : ""}</div><b>≈${fmt(VIEWS[i])}</b> visualizaciones<br>Actividad de publicaciones: ${ACTIVITY[i]}`;
      const cr = card.getBoundingClientRect(), ck = cr.width / card.offsetWidth;
      const left = (r.left - cr.left) / ck + x(i) * (r.width / W) / ck;
      const top = (r.top - cr.top) / ck + y(VIEWS[i]) * (r.width / W) / ck;
      const tw = tooltip.offsetWidth;
      tooltip.style.left = (left + 20 + tw > card.offsetWidth ? left - tw - 20 : left + 20) + "px";
      tooltip.style.top = Math.max(10, top - 40) + "px";
      tooltip.style.opacity = 1;
    };
    hit.addEventListener("pointermove", move);
    hit.addEventListener("pointerleave", () => { tooltip.style.opacity = 0; cross.setAttribute("opacity", 0); dot.setAttribute("opacity", 0); });
  }

  // Activity strip: its own small chart sharing the x positions (no dual axis)
  function drawActivity() {
    const host = $("#activityChart");
    const W = host.clientWidth, H = host.clientHeight;
    if (!W || !H) return;
    const small = W < 700;
    const fs = small ? 11 : 17;
    const m = { t: small ? 22 : 34, r: 12, b: 4, l: small ? 40 : 76 };
    const iw = W - m.l - m.r, ih = H - m.t - m.b;
    const max = 32;
    const step = iw / (ACTIVITY.length - 1);
    const bw = Math.max(3, step * 0.55);
    host.innerHTML = "";
    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": "Actividad de publicaciones por día" }, host);
    const t = el("text", { x: m.l, y: fs, fill: css("--ink-2"), "font-size": fs, "font-weight": 600 }, svg);
    t.textContent = "Actividad de publicaciones por día";
    el("line", { x1: m.l, x2: W - m.r, y1: m.t + ih, y2: m.t + ih, stroke: "#3a4762" }, svg);
    ACTIVITY.forEach((v, i) => {
      if (!v) return;
      const h = (v / max) * ih;
      const cx = m.l + i * step;
      const inC = i >= CAMPAIGN[0] && i <= CAMPAIGN[1];
      el("rect", { x: cx - bw / 2, y: m.t + ih - h, width: bw, height: h, rx: Math.min(4, bw / 2), fill: inC ? css("--red") : "#56627c" }, svg);
      if (v >= 8) {
        const l = el("text", { x: cx, y: m.t + ih - h - 6, "text-anchor": "middle", fill: css("--ink-2"), "font-size": fs - 2, "font-weight": 600 }, svg);
        l.textContent = v;
      }
    });
  }

  // ---------- Donut ----------
  function drawDonut() {
    const svg = $("#donut");
    svg.innerHTML = "";
    const r = 88, c = 2 * Math.PI * r, gap = 6;
    const parts = [{ v: 84.9, col: css("--red") }, { v: 15.1, col: css("--blue") }];
    let off = 0;
    parts.forEach((p, idx) => {
      const len = (p.v / 100) * c - gap;
      const s = el("circle", { cx: 110, cy: 110, r, fill: "none", stroke: p.col, "stroke-width": 30, "stroke-dasharray": `0 ${c}`, "stroke-dashoffset": -off, "stroke-linecap": "butt" }, svg);
      s.style.transition = `stroke-dasharray 1.2s cubic-bezier(.3,.7,.2,1) ${idx * 0.25}s`;
      requestAnimationFrame(() => requestAnimationFrame(() => s.setAttribute("stroke-dasharray", `${len} ${c - len}`)));
      off += (p.v / 100) * c;
    });
  }

  // ---------- Content-type bars ----------
  function drawBars() {
    const host = $("#typeBars");
    const maxPct = TYPES[0].pct;
    host.innerHTML = TYPES.map((t) => {
      const w = (t.pct / maxPct) * 100;
      const f = t.followers * w, n = w - f;
      const segs = t.pct < 0.5
        ? `<span class="bar-seg n only" style="width:3px"></span>`
        : (f > 0.3 ? `<span class="bar-seg f" style="width:${f}%"></span>` : "") + `<span class="bar-seg n${f > 0.3 ? "" : " only"}" style="width:${n}%"></span>`;
      return `<div class="bar-row" title="${t.name}: ${t.pct}% · ~${Math.round(t.followers * 100)}% seguidores">
        <span class="bar-name">${t.name}</span><span class="bar-track">${segs}</span><span class="bar-val">${fmt(t.pct, 1)}%</span></div>`;
    }).join("");
  }

  // ---------- Count-up ----------
  function countUp(scope) {
    $$("[data-count]", scope).forEach((n) => {
      const end = parseFloat(n.dataset.count), dec = +(n.dataset.decimals || 0), suf = n.dataset.suffix || "";
      const t0 = performance.now(), dur = 1400;
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        n.textContent = fmt(end * e, dec) + suf;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  // ---------- Slides ----------
  const slides = $$(".slide");
  const dots = $("#dots");
  let cur = 0, timer = null;
  slides.forEach((s, i) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", s.dataset.title);
    b.title = s.dataset.title;
    b.onclick = () => go(i);
    dots.appendChild(b);
  });

  function onEnter(s) {
    countUp(s);
    if (s.classList.contains("slide-trend")) { drawTrend(); drawActivity(); }
    if (s.classList.contains("slide-audience")) { drawDonut(); drawBars(); }
    $$("video", s).forEach((v) => { v.currentTime = 0; v.play().catch(() => {}); });
  }

  function go(i) {
    i = (i + slides.length) % slides.length;
    slides[cur].classList.remove("is-active");
    $$("video", slides[cur]).forEach((v) => v.pause());
    cur = i;
    slides[cur].classList.add("is-active");
    $$("button", dots).forEach((b, k) => b.classList.toggle("on", k === cur));
    $("#counter").textContent = `${cur + 1} / ${slides.length}`;
    $("#progress").style.width = ((cur + 1) / slides.length) * 100 + "%";
    try { history.replaceState(null, "", "#" + (cur + 1)); } catch (e) {}
    onEnter(slides[cur]);
  }

  const next = () => go(cur + 1), prev = () => go(cur - 1);
  $("#btnNext").onclick = next;
  $("#btnPrev").onclick = prev;
  const togglePlay = () => {
    const b = $("#btnPlay");
    if (timer) { clearInterval(timer); timer = null; b.classList.remove("on"); b.textContent = "▶"; }
    else { timer = setInterval(next, 12000); b.classList.add("on"); b.textContent = "❚❚"; }
  };
  $("#btnPlay").onclick = togglePlay;
  const toggleFs = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.();
  };
  $("#btnFs").onclick = toggleFs;

  addEventListener("keydown", (e) => {
    if (isFlow()) return;
    if (["ArrowRight", "PageDown", " ", "Enter"].includes(e.key)) { e.preventDefault(); next(); }
    else if (["ArrowLeft", "PageUp", "Backspace"].includes(e.key)) { e.preventDefault(); prev(); }
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(slides.length - 1);
    else if (e.key.toLowerCase() === "f") toggleFs();
    else if (e.key.toLowerCase() === "p") togglePlay();
    else if (/^[1-9]$/.test(e.key) && +e.key <= slides.length) go(+e.key - 1);
  });

  // swipe
  let sx = null;
  stage.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
  stage.addEventListener("touchend", (e) => {
    if (sx == null || isFlow()) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    sx = null;
  });

  // hide controls when idle (TV mode)
  let idleT;
  const wake = () => { document.body.classList.remove("idle"); clearTimeout(idleT); idleT = setTimeout(() => document.body.classList.add("idle"), 3500); };
  addEventListener("pointermove", wake);
  wake();

  let rT;
  addEventListener("resize", () => {
    fit();
    clearTimeout(rT);
    rT = setTimeout(() => { drawTrend(); drawActivity(); }, 150);
  });

  fit();
  if (isFlow()) {
    // scroll layout: render everything once
    drawTrend(); drawActivity(); drawDonut(); drawBars();
    $$("video").forEach((v) => { v.autoplay = true; v.play().catch(() => {}); });
  }
  addEventListener("hashchange", () => {
    const h = parseInt(location.hash.slice(1), 10);
    if (h >= 1 && h <= slides.length && h - 1 !== cur) go(h - 1);
  });
  const start = parseInt(location.hash.slice(1), 10);
  go(start >= 1 && start <= slides.length ? start - 1 : 0);
})();
