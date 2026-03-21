import React, { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ─── Utility ────────────────────────────────────────────────────────────────
function useDebounce(fn, delay) {
  const timer = useRef(null);
  return useCallback((...args) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => fn(...args), delay);
  }, [fn, delay]);
}

// ─── GooeyNav ───────────────────────────────────────────────────────────────
export default function GooeyNav({
  items,
  particleCount    = 12,
  particleDistances = [80, 10],
  particleR        = 90,
  initialActiveIndex = 0,
  animationTime    = 500,
  timeVariance     = 200,
  colors           = [1, 2, 3, 1, 2, 3, 1, 4],
  activeIndex: controlledActive,
  onItemClick,
}) {
  const navigate        = useNavigate();
  const containerRef    = useRef(null);
  const particleLayerRef = useRef(null);
  const filterRef       = useRef(null);
  const noiseRef        = useRef(null);
  const ulRef           = useRef(null);
  const activeIndexRef  = useRef(initialActiveIndex);
  const animatingRef    = useRef(false);
  const particlesRef    = useRef([]);
  const animFrameRef    = useRef(null);

  // Sync controlled active index
  useEffect(() => {
    if (controlledActive !== undefined && controlledActive !== activeIndexRef.current) {
      activeIndexRef.current = controlledActive;
      highlightItem(controlledActive, false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledActive]);

  // ── Noise turbulence animation — throttled to 10fps to avoid TBT ────────
  useEffect(() => {
    let frame = 0;
    let raf;
    let last = 0;
    const INTERVAL = 100; // ~10fps — imperceptible difference, huge TBT saving
    function tick(now) {
      raf = requestAnimationFrame(tick);
      if (now - last < INTERVAL) return;
      last = now;
      frame += 0.03;
      if (noiseRef.current) {
        noiseRef.current.setAttribute("baseFrequency", `${0.9 + Math.sin(frame) * 0.05}`);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── Particle helpers ────────────────────────────────────────────────────
  function getColorVar(idx) {
    const map = { 1: "#ff3b3b", 2: "#ffc107", 3: "#ffffff", 4: "#ff3b3b" };
    return map[idx] || "#ff3b3b";
  }

  function createParticle(x, y, color) {
    const el = document.createElement("div");
    el.className = "gooey-particle";
    el.style.cssText = `
      position:absolute;
      border-radius:50%;
      background:${getColorVar(color)};
      pointer-events:none;
      will-change:transform,opacity;
    `;
    particleLayerRef.current?.appendChild(el);
    return { el, x, y, vx: 0, vy: 0, life: 1, color };
  }

  function removeParticle(p) {
    p.el.remove();
  }

  // ── Highlight / animate ─────────────────────────────────────────────────
  function highlightItem(index, animate = true) {
    const lis = ulRef.current?.querySelectorAll("li");
    if (!lis) return;
    lis.forEach((li, i) => {
      li.classList.toggle("gooey-active", i === index);
    });
    if (!animate) return;
    spawnParticles(index);
  }

  function spawnParticles(index) {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const lis = ulRef.current?.querySelectorAll("li");
    if (!lis || !lis[index]) { animatingRef.current = false; return; }

    const rect      = lis[index].getBoundingClientRect();
    const navRect   = containerRef.current?.getBoundingClientRect();
    if (!navRect) { animatingRef.current = false; return; }

    const cx = rect.left - navRect.left + rect.width / 2;
    const cy = rect.top  - navRect.top  + rect.height / 2;

    // Clear old particles
    particlesRef.current.forEach(removeParticle);
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      const angle  = (Math.PI * 2 * i) / particleCount;
      const dist   = particleDistances[0] + Math.random() * (particleDistances[1] || 10);
      const color  = colors[i % colors.length];
      const p      = createParticle(cx, cy, color);
      const size   = 4 + Math.random() * (particleR / 20);
      p.el.style.width  = `${size}px`;
      p.el.style.height = `${size}px`;
      p.vx = Math.cos(angle) * dist / (animationTime / 16);
      p.vy = Math.sin(angle) * dist / (animationTime / 16);
      particlesRef.current.push(p);
    }

    const duration = animationTime + Math.random() * timeVariance;
    const start    = performance.now();

    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      particlesRef.current.forEach((p) => {
        const ease = 1 - t * t;
        p.el.style.transform = `translate(${p.vx * t * duration / 16}px, ${p.vy * t * duration / 16}px)`;
        p.el.style.opacity   = `${ease}`;
      });
      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        particlesRef.current.forEach(removeParticle);
        particlesRef.current = [];
        animatingRef.current = false;
      }
    }
    animFrameRef.current = requestAnimationFrame(step);
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      particlesRef.current.forEach(removeParticle);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Initial highlight ───────────────────────────────────────────────────
  useEffect(() => {
    highlightItem(initialActiveIndex, false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = useDebounce((index, href) => {
    if (index === activeIndexRef.current) return;
    activeIndexRef.current = index;
    highlightItem(index, true);
    onItemClick?.(index);
    navigate(href);
  }, 50);

  return (
    <div ref={containerRef} className="gooey-nav-container" aria-label="Main navigation">
      {/* SVG filter for gooey effect */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter ref={filterRef} id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%"
            colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
              result="gooey" />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
            <feTurbulence ref={noiseRef} type="fractalNoise" baseFrequency="0.9"
              numOctaves="2" result="noise" />
            <feDisplacementMap in="gooey" in2="noise" scale="3"
              xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div ref={particleLayerRef} className="gooey-particle-layer" aria-hidden="true" />

      <ul ref={ulRef} className="gooey-nav-list">
        {items.map((item, i) => (
          <li key={item.href} className={`gooey-nav-item${i === initialActiveIndex ? " gooey-active" : ""}`}>
            <button
              onClick={() => handleClick(i, item.href)}
              className="gooey-nav-btn"
              aria-current={i === (controlledActive ?? initialActiveIndex) ? "page" : undefined}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
