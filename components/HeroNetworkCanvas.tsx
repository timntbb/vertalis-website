"use client";

import React from "react";

type NetworkNode = {
  x: number;
  y: number;
  depth: number;
  hot: boolean;
  phase: number;
  t?: number;
};

type NetworkEdge = {
  a: number;
  b: number;
  pulse: boolean;
  offset: number;
  t?: number;
};

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function easeInOutCubic(v: number) {
  const t = clamp01(v);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function HeroNetworkCanvas({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasEl = canvas;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const ctxEl = ctx;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ORANGE: [number, number, number] = [214, 111, 36];
    const GREY: [number, number, number] = [92, 94, 100];

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: NetworkNode[] = [];
    let edges: NetworkEdge[] = [];
    let start = performance.now();
    let rafId = 0;
    let resizeTimer = 0;

    function build() {
      nodes = [];
      edges = [];

      const area = w * h;
      const desktopDensity = 118 / (1440 * 820);
      const dynamicDesktopCount = Math.round(area * desktopDensity);
      const count = w < 700 ? 64 : Math.max(96, Math.min(320, dynamicDesktopCount));
      const ox = w * 0.5;
      const oy = h * 0.5;
      const xMin = -w * 0.05;
      const xMax = w * 1.05;

      // Keep the center region a bit quieter so headline text remains readable.
      const quietW = Math.min(780, w * 0.52);
      const quietH = Math.min(300, h * 0.34);
      const quietLeft = ox - quietW * 0.5;
      const quietRight = ox + quietW * 0.5;
      const quietTop = oy - quietH * 0.5 - h * 0.03;
      const quietBottom = oy + quietH * 0.5 - h * 0.03;

      nodes.push({ x: ox, y: oy, depth: 0, hot: true, phase: Math.random() * 6.28 });

      for (let i = 1; i < count; i += 1) {
        // Mix uniform full-width sampling with a soft center bias to keep an organic core.
        const useCenterBias = Math.random() < 0.55;
        const tx = useCenterBias
          ? (Math.random() + Math.random() + Math.random()) / 3
          : Math.random();
        const ty = useCenterBias ? (Math.random() + Math.random()) / 2 : Math.random();

        let x = xMin + tx * (xMax - xMin);
        const y = ty * h;

        const inQuietZone = x > quietLeft && x < quietRight && y > quietTop && y < quietBottom;
        if (inQuietZone && Math.random() < 0.35) {
          const push = quietW * 0.32;
          x += x < ox ? -push : push;
          x = Math.max(xMin, Math.min(xMax, x));
        }

        const hotChance = inQuietZone ? 0.08 : 0.16;

        nodes.push({
          x,
          y,
          depth: Number.POSITIVE_INFINITY,
          hot: Math.random() < hotChance,
          phase: Math.random() * 6.28,
        });
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const near: Array<{ j: number; d: number }> = [];
        for (let j = 0; j < nodes.length; j += 1) {
          if (i === j) continue;
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < 205) near.push({ j, d });
        }

        near.sort((a, b) => a.d - b.d);

        for (const { j } of near.slice(0, 4)) {
          const exists = edges.some((e) => (e.a === i && e.b === j) || (e.a === j && e.b === i));
          if (!exists) {
            edges.push({ a: i, b: j, pulse: Math.random() < 0.22, offset: Math.random() * 5000 });
          }
        }
      }

      const q: number[] = [0];
      while (q.length > 0) {
        const cur = q.shift();
        if (cur === undefined) break;

        for (const e of edges) {
          if (e.a !== cur && e.b !== cur) continue;
          const other = e.a === cur ? e.b : e.a;
          if (nodes[other].depth > nodes[cur].depth + 1) {
            nodes[other].depth = nodes[cur].depth + 1;
            q.push(other);
          }
        }
      }

      const finite = nodes.filter((n) => Number.isFinite(n.depth)).map((n) => n.depth);
      const maxDepth = Math.max(...finite, 1);

      nodes.forEach((n) => {
        n.t = Number.isFinite(n.depth) ? (n.depth / maxDepth) * 4200 : Number.POSITIVE_INFINITY;
      });

      edges.forEach((e) => {
        const d = Math.min(nodes[e.a].depth, nodes[e.b].depth);
        e.t = Number.isFinite(d) ? (d / maxDepth) * 4200 : Number.POSITIVE_INFINITY;
      });
    }

    function resize() {
      const r = canvasEl.getBoundingClientRect();
      w = r.width;
      h = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvasEl.width = Math.round(w * dpr);
      canvasEl.height = Math.round(h * dpr);

      ctxEl.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      start = performance.now();
    }

    function drawAmbient() {
      const cx = w * 0.5;
      const cy = h * 0.5;
      ctxEl.save();

      for (const [rx, ry, a] of [
        [220, 150, 0.032],
        [350, 235, 0.026],
        [480, 320, 0.022],
        [620, 410, 0.015],
      ] as Array<[number, number, number]>) {
        ctxEl.beginPath();
        ctxEl.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctxEl.strokeStyle = `rgba(${ORANGE[0]},${ORANGE[1]},${ORANGE[2]},${a})`;
        ctxEl.lineWidth = 1;
        ctxEl.stroke();
      }

      ctxEl.restore();
    }

    function drawEdge(e: NetworkEdge, elapsed: number) {
      if (!Number.isFinite(e.t)) return;

      const a = nodes[e.a];
      const b = nodes[e.b];
      const local = elapsed - 350 - (e.t ?? Number.POSITIVE_INFINITY);
      if (local <= 0) return;

      const p = easeInOutCubic(Math.min(1, local / 900));
      const ex = a.x + (b.x - a.x) * p;
      const ey = a.y + (b.y - a.y) * p;

      ctxEl.beginPath();
      ctxEl.moveTo(a.x, a.y);
      ctxEl.lineTo(ex, ey);
      ctxEl.strokeStyle = `rgba(${GREY[0]},${GREY[1]},${GREY[2]},.135)`;
      ctxEl.lineWidth = 0.8;
      ctxEl.stroke();

      if (p < 1 && !reduced) {
        const hp = Math.max(0, p - 0.2);
        const sx = a.x + (b.x - a.x) * hp;
        const sy = a.y + (b.y - a.y) * hp;
        const g = ctxEl.createLinearGradient(sx, sy, ex, ey);
        g.addColorStop(0, "rgba(214,111,36,0)");
        g.addColorStop(1, "rgba(238,133,58,.95)");
        ctxEl.beginPath();
        ctxEl.moveTo(sx, sy);
        ctxEl.lineTo(ex, ey);
        ctxEl.strokeStyle = g;
        ctxEl.lineWidth = 1.35;
        ctxEl.stroke();
      }

      if (p >= 1 && e.pulse && !reduced) {
        const cycle = (elapsed + e.offset) % 5200;
        if (cycle < 2200) {
          const q = cycle / 2200;
          const x = a.x + (b.x - a.x) * q;
          const y = a.y + (b.y - a.y) * q;

          const trailLength = 0.28;
          const tq = Math.max(0, q - trailLength);
          const tx = a.x + (b.x - a.x) * tq;
          const ty = a.y + (b.y - a.y) * tq;

          const trail = ctxEl.createLinearGradient(tx, ty, x, y);
          trail.addColorStop(0, "rgba(214,111,36,0)");
          trail.addColorStop(0.45, "rgba(214,111,36,.16)");
          trail.addColorStop(1, "rgba(238,133,58,.58)");

          ctxEl.beginPath();
          ctxEl.moveTo(tx, ty);
          ctxEl.lineTo(x, y);
          ctxEl.strokeStyle = trail;
          ctxEl.lineWidth = 1.15;
          ctxEl.stroke();

          const glowRadius = 11.5;
          const glow = ctxEl.createRadialGradient(x, y, 0, x, y, glowRadius);
          glow.addColorStop(0, "rgba(242,143,68,.86)");
          glow.addColorStop(0.3, "rgba(214,111,36,.29)");
          glow.addColorStop(1, "rgba(214,111,36,0)");

          ctxEl.beginPath();
          ctxEl.arc(x, y, glowRadius, 0, Math.PI * 2);
          ctxEl.fillStyle = glow;
          ctxEl.fill();

          ctxEl.beginPath();
          ctxEl.arc(x, y, 1.7, 0, Math.PI * 2);
          ctxEl.fillStyle = "rgba(244,149,72,.96)";
          ctxEl.fill();
        }
      }
    }

    function drawNode(n: NetworkNode, elapsed: number) {
      if (!Number.isFinite(n.t)) return;

      const local = elapsed - 350 - (n.t ?? Number.POSITIVE_INFINITY);
      if (local <= 0) return;

      const a = easeInOutCubic(Math.min(1, local / 500));
      const breathe = reduced ? 0 : Math.sin(elapsed * 0.0012 + n.phase) * 0.15;
      const r = (n.hot ? 3.1 : 1.44) + breathe;

      if (n.hot) {
        const g = ctxEl.createRadialGradient(n.x, n.y, 0, n.x, n.y, 18);
        g.addColorStop(0, `rgba(${ORANGE[0]},${ORANGE[1]},${ORANGE[2]},${0.13 * a})`);
        g.addColorStop(1, "rgba(214,111,36,0)");
        ctxEl.beginPath();
        ctxEl.arc(n.x, n.y, 18, 0, Math.PI * 2);
        ctxEl.fillStyle = g;
        ctxEl.fill();
      }

      ctxEl.beginPath();
      ctxEl.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctxEl.fillStyle = n.hot
        ? `rgba(${ORANGE[0]},${ORANGE[1]},${ORANGE[2]},${0.78 * a})`
        : `rgba(${GREY[0]},${GREY[1]},${GREY[2]},${0.25 * a})`;
      ctxEl.fill();
    }

    function frame(now: number) {
      const elapsed = now - start;
      ctxEl.clearRect(0, 0, w, h);
      drawAmbient();
      edges.forEach((e) => drawEdge(e, elapsed));
      nodes.forEach((n) => drawNode(n, elapsed));

      if (!reduced) {
        rafId = window.requestAnimationFrame(frame);
      }
    }

    function onResize() {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (rafId) window.cancelAnimationFrame(rafId);
        resize();
        if (!reduced) {
          rafId = window.requestAnimationFrame(frame);
        } else {
          frame(performance.now() + 6000);
        }
      }, 120);
    }

    window.addEventListener("resize", onResize);

    resize();
    if (!reduced) {
      rafId = window.requestAnimationFrame(frame);
    } else {
      frame(performance.now() + 6000);
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      if (resizeTimer) window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
