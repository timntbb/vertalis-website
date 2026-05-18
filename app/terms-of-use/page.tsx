"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function PixelTermsHeader() {
  const [capabilitiesOpen, setCapabilitiesOpen] = useState(false);
  const [mobileCapabilitiesOpen, setMobileCapabilitiesOpen] = useState(false);
  const closeCapabilitiesTimeoutRef = useRef<number | null>(null);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/#contact" },
    { label: "Attorney", href: "/about/tim-nichols" },
    { label: "Capabilities", href: "/about/founders" },
  ];

  const capabilityItems = [
    { label: "Founders", href: "/about/founders" },
    { label: "Governance", href: "/about/governance" },
    { label: "Capital Strategy", href: "/about/investors" },
    { label: "Employees", href: "/about/employees" },
    { label: "Intellectual Property", href: "/about/ip" },
  ];

  const clearCapabilitiesCloseTimeout = () => {
    if (closeCapabilitiesTimeoutRef.current !== null) {
      window.clearTimeout(closeCapabilitiesTimeoutRef.current);
      closeCapabilitiesTimeoutRef.current = null;
    }
  };

  const openCapabilitiesMenu = () => {
    clearCapabilitiesCloseTimeout();
    setCapabilitiesOpen(true);
  };

  const scheduleCapabilitiesClose = () => {
    clearCapabilitiesCloseTimeout();
    closeCapabilitiesTimeoutRef.current = window.setTimeout(() => {
      setCapabilitiesOpen(false);
      closeCapabilitiesTimeoutRef.current = null;
    }, 220);
  };

  useEffect(() => {
    return () => {
      clearCapabilitiesCloseTimeout();
    };
  }, []);

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-[#c06020]/40 bg-black/80 shadow-[0_6px_24px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 4px)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(192,96,32,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(192,96,32,0.04) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
        </div>
        <div className="absolute bottom-0 left-0 h-[3px] w-full bg-[linear-gradient(90deg,#6a3313_0%,#c06020_18%,#f3a261_50%,#c06020_82%,#6a3313_100%)]" />

        <div className="relative mx-auto max-w-6xl px-4 md:px-6">
          <div className="relative flex min-h-[96px] items-center justify-between gap-4">
            <style jsx global>{`
              @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Bungee&display=swap');
            `}</style>

            {/* LEFT: LOGO + BRAND */}
            <Link
              href="/"
              className="flex shrink-0 items-center gap-3 hover:opacity-90"
              style={{ marginLeft: "-75px", marginRight: "75px" }}
            >
              <Image
                src="/logo.png"
                alt="Vertalis logo"
                width={72}
                height={72}
                className="h-[72px] w-auto"
                style={{
                  imageRendering: "pixelated",
                  filter: "contrast(1.15) saturate(1.1)",
                }}
              />

              <div className="leading-tight">
                <div
                  style={{
                    fontFamily: "'Bungee', cursive",
                    fontSize: "1.3rem",
                    color: "#c06020",
                    letterSpacing: "0.05em",
                    textShadow: "1px 1px 0 #5a2b11, 2px 2px 0 #5a2b11, 3px 3px 0 #3b1c0b, -1px -1px 0 #f3a261",
                  }}
                >
                  Vertalis
                </div>

                <div
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "0.6rem",
                    color: "#9ca3af",
                    letterSpacing: "0.18em",
                    marginTop: "2px",
                  }}
                >
                  LEGAL COUNSEL, PLLC
                </div>
              </div>
            </Link>

            {/* CENTER: NAV */}
            <nav className="absolute left-1/2 -translate-x-1/2 hidden items-center gap-7 whitespace-nowrap lg:flex" style={{ marginLeft: "75px" }}>
              {navItems.map((item) => {
                if (item.label === "Capabilities") {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={openCapabilitiesMenu}
                      onMouseLeave={scheduleCapabilitiesClose}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          clearCapabilitiesCloseTimeout();
                          setCapabilitiesOpen((prev) => !prev);
                        }}
                        style={{
                          fontFamily: "'Press Start 2P', monospace",
                          fontSize: "0.65rem",
                          color: "#d4d4d8",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                        }}
                        className="m-0 border-0 bg-transparent p-0 leading-none hover:text-[#f3a261] transition-colors"
                        aria-expanded={capabilitiesOpen}
                        aria-haspopup="menu"
                      >
                        {item.label}
                      </button>

                      <div
                        className={`absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-2 transition-all ${
                          capabilitiesOpen
                            ? "pointer-events-auto translate-y-0 opacity-100"
                            : "pointer-events-none -translate-y-1 opacity-0"
                        }`}
                        onMouseEnter={openCapabilitiesMenu}
                        onMouseLeave={scheduleCapabilitiesClose}
                      >
                        <div
                          className="border border-[#f3a261]/40 bg-[#101012] p-2 shadow-[4px_4px_0_#5a2b11]"
                          role="menu"
                          aria-label="Capabilities"
                        >
                          {capabilityItems.map((capability) => (
                            <Link
                              key={capability.label}
                              href={capability.href}
                              role="menuitem"
                              style={{
                                fontFamily: "'Press Start 2P', monospace",
                                fontSize: "0.56rem",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                              }}
                              className="block border border-transparent px-2 py-2 text-[#d4d4d8] hover:border-[#f3a261]/40 hover:bg-[#1a1a1f] hover:text-[#f3a261]"
                              onClick={() => {
                                clearCapabilitiesCloseTimeout();
                                setCapabilitiesOpen(false);
                              }}
                            >
                              {capability.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "0.65rem",
                      color: "#d4d4d8",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                    className="hover:text-[#f3a261] transition-colors"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT: CTA */}
            <div className="hidden lg:block" style={{ marginRight: "-75px" }}>
              <Link
                href="/#contact"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                }}
                className="bg-[#c06020] text-black px-6 py-2 border border-[#f3a261]/60 shadow-[3px_3px_0_#5a2b11] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_#6b3212] transition-all"
              >
                LET&apos;S TALK
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 pb-4 lg:hidden">
            {navItems
              .filter((item) => item.label !== "Capabilities")
              .map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-neutral-300 transition-colors duration-150 hover:text-[#f3a261]"
                >
                  {item.label}
                </Link>
              ))}

            <button
              type="button"
              onClick={() => setMobileCapabilitiesOpen((prev) => !prev)}
              className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-neutral-300 transition-colors duration-150 hover:text-[#f3a261]"
              aria-expanded={mobileCapabilitiesOpen}
              aria-controls="mobile-capabilities-menu"
            >
              Capabilities
            </button>

            {mobileCapabilitiesOpen ? (
              <div
                id="mobile-capabilities-menu"
                className="grid w-full gap-2 rounded border border-[#f3a261]/35 bg-[#101012] p-3"
              >
                {capabilityItems.map((capability) => (
                  <Link
                    key={capability.label}
                    href={capability.href}
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "0.56rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                    className="border border-transparent px-2 py-2 text-[#d4d4d8] hover:border-[#f3a261]/40 hover:bg-[#1a1a1f] hover:text-[#f3a261]"
                    onClick={() => setMobileCapabilitiesOpen(false)}
                  >
                    {capability.label}
                  </Link>
                ))}
              </div>
            ) : null}

            <Link
              href="/#contact"
              className="inline-flex items-center justify-center border border-[#f3a261]/60 bg-[#c06020] px-5 py-2 font-mono text-[0.66rem] font-bold uppercase tracking-[0.18em] text-black shadow-[3px_3px_0_0_#5a2b11] transition-colors duration-150 hover:bg-[#da7b3b]"
            >
              Let&apos;s talk
            </Link>
          </div>
        </div>
      </header>

      <div className="h-[112px] lg:h-[96px]" aria-hidden="true" />
    </>
  );
}

function RocketGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [distance, setDistance] = useState(0);
  const [bestRun, setBestRun] = useState<{ name: string; distance: number } | null>(null);
  const bestRunRef = useRef<{ name: string; distance: number } | null>(null);
  const [status, setStatus] = useState<"ready" | "running" | "crashed">("ready");
  const [showOverlay, setShowOverlay] = useState(false);
  const pressInputRef = useRef<(() => void) | null>(null);
  const releaseInputRef = useRef<(() => void) | null>(null);
  const overlayTimeoutRef = useRef<number | null>(null);

  const triggerOverlayLaunch = () => {
    pressInputRef.current?.();
    releaseInputRef.current?.();
  };

  useEffect(() => {
    const savedBest = window.localStorage.getItem("vertalisRocketBest");
    if (!savedBest) return;

    try {
      const parsed = JSON.parse(savedBest) as { name?: unknown; distance?: unknown };
      if (typeof parsed.name === "string" && typeof parsed.distance === "number") {
        const loaded = { name: parsed.name, distance: parsed.distance };
        setBestRun(loaded);
        bestRunRef.current = loaded;
      }
    } catch {
      window.localStorage.removeItem("vertalisRocketBest");
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    let rocketX = 95;
    let rocketY = canvas.height * 0.42;
    let velocityY = 0;
    let frame = 0;
    let currentDistance = 0;
    let isInputDown = false;
    let gameState: "ready" | "running" | "crashed" = "ready";

    const rocketWidth = 10;
    const rocketHeight = 22;
    const rocketNoseHeight = 8;
    const terrainStep = 20;
    const simulationSpeedMultiplier = 1.5625;
    const difficultyMultiplier = 2.4;
    const flightResponseMultiplier = 2.2;

    let terrain: { x: number; y: number }[] = [];
    let aliens: { x: number; y: number; size: number; drift: number }[] = [];
    let explosionParticles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; color: string }[] = [];
    let crashTimestamp = 0;

    const clamp = (value: number, min: number, max: number) =>
      Math.max(min, Math.min(max, value));

    const difficultyRamp = (distanceValue: number) =>
      clamp((distanceValue / 1800) * difficultyMultiplier, 0, 1.4);

    const baseTerrainY = () => canvas.height - 46;

    const appendTerrainPoint = () => {
      const last = terrain[terrain.length - 1];
      const ramp = difficultyRamp(currentDistance);

      // Asymmetric cycle: 150m easy, 30m hard peak, then back to easy
      const cyclePos = currentDistance % 180;
      const waveFactor =
        cyclePos < 150 ? 0 : Math.sin(((cyclePos - 150) / 30) * Math.PI); // 0 during easy, 0→1→0 during hard

      const variance = 8 + ramp * 14 + waveFactor * 10;
      const maxTerrainRise = Math.min(
        55 + ramp * 80 + waveFactor * 55,
        canvas.height * 0.52,
      );
      const minY = canvas.height - maxTerrainRise;
      const maxY = canvas.height - 28;

      let nextY =
        (last?.y ?? baseTerrainY()) +
        (Math.random() * 2 - 1) * variance;

      if (Math.random() < 0.10 + ramp * 0.10 + waveFactor * 0.06) {
        nextY -= Math.random() * (8 + ramp * 20 + waveFactor * 12);
      }

      nextY = clamp(nextY, minY, maxY);

      terrain.push({
        x: (last?.x ?? -terrainStep) + terrainStep,
        y: nextY,
      });
    };

    const seedTerrain = () => {
      terrain = [];
      while (
        terrain.length === 0 ||
        terrain[terrain.length - 1].x < canvas.width + terrainStep * 3
      ) {
        appendTerrainPoint();
      }
    };

    const terrainHeightAtX = (x: number) => {
      if (terrain.length < 2) return canvas.height;

      for (let i = 0; i < terrain.length - 1; i++) {
        const left = terrain[i];
        const right = terrain[i + 1];

        if (x >= left.x && x <= right.x) {
          const t = (x - left.x) / (right.x - left.x || 1);
          return left.y + (right.y - left.y) * t;
        }
      }

      return terrain[terrain.length - 1].y;
    };

    const resetGame = () => {
      if (overlayTimeoutRef.current !== null) {
        window.clearTimeout(overlayTimeoutRef.current);
        overlayTimeoutRef.current = null;
      }
      setShowOverlay(false);
      rocketY = canvas.height * 0.42;
      velocityY = 0;
      frame = 0;
      currentDistance = 0;
      terrain = [];
      aliens = [];
      explosionParticles = [];
      crashTimestamp = 0;
      seedTerrain();
      gameState = "ready";
      setDistance(0);
      setStatus("ready");
    };

    const startGame = () => {
      if (gameState !== "running") {
        gameState = "running";
        setStatus("running");
      }
    };

    const crashGame = () => {
      if (gameState === "crashed") return;

      gameState = "crashed";
      setStatus("crashed");
      isInputDown = false;
      crashTimestamp = Date.now();

      const ex = rocketX + rocketWidth / 2;
      const ey = rocketY + rocketHeight / 2;
      explosionParticles = [];
      for (let i = 0; i < 55; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = Math.random() * 4.5 + 0.5;
        const life = Math.floor(Math.random() * 30 + 35);
        const roll = Math.random();
        const color =
          roll < 0.3
            ? "#ff2222"
            : roll < 0.6
              ? "#ff8800"
              : roll < 0.85
                ? "#ffe066"
                : "#ffffff";
        explosionParticles.push({
          x: ex + (Math.random() - 0.5) * 8,
          y: ey + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd - 1.5,
          life,
          maxLife: life,
          size: Math.random() * 5 + 2,
          color,
        });
      }

      setBestRun((prevBest) => {
        if (prevBest && currentDistance <= prevBest.distance) return prevBest;

        const nextBest = { name: "Best Run!", distance: currentDistance };
        window.localStorage.setItem("vertalisRocketBest", JSON.stringify(nextBest));
        bestRunRef.current = nextBest;
        return nextBest;
      });
      overlayTimeoutRef.current = window.setTimeout(() => setShowOverlay(true), 1500);
    };

    const pressInput = () => {
      if (gameState === "crashed") {
        if (Date.now() - crashTimestamp < 1500) return;
        resetGame();
        startGame();
        isInputDown = true;
        return;
      }

      startGame();
      isInputDown = true;
    };

  pressInputRef.current = pressInput;

  const releaseInput = () => {
      isInputDown = false;
    };

    releaseInputRef.current = releaseInput;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;

      e.preventDefault();
      pressInput();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;

      e.preventDefault();
      releaseInput();
    };

    const handlePointerDown = (e: PointerEvent) => {
      e.preventDefault();
      pressInput();
    };

    const handlePointerUp = (e: PointerEvent) => {
      e.preventDefault();
      releaseInput();
    };

    const handlePointerCancel = () => {
      releaseInput();
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      pressInput();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      releaseInput();
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    const handleWindowBlur = () => {
      releaseInput();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        releaseInput();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("pointerup", handlePointerCancel);
    window.addEventListener("pointercancel", handlePointerCancel);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerCancel);
    canvas.addEventListener("pointerleave", handlePointerCancel);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: false });
    canvas.addEventListener("touchcancel", handleTouchEnd, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

    const drawPixelText = (text: string, x: number, y: number, size = 12) => {
      ctx.font = `${size}px monospace`;
      ctx.fillStyle = "#f1f1f1";
      ctx.fillText(text, x, y);
    };

    const drawBackground = () => {
      const motionFrame =
        frame * (gameState === "running" ? simulationSpeedMultiplier : 1);

      ctx.fillStyle = "#0a0a0c";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#ffffff18";
      for (let i = 0; i < 45; i++) {
        const x = (i * 61 - motionFrame * 0.8) % canvas.width;
        const y = (i * 31) % canvas.height;
        ctx.fillRect(x < 0 ? x + canvas.width : x, y, 2, 2);
      }

      ctx.strokeStyle = "#c060201f";
      for (let x = 0; x < canvas.width; x += 34) {
        ctx.beginPath();
        ctx.moveTo(x - ((motionFrame * 0.45) % 34), 0);
        ctx.lineTo(x - ((motionFrame * 0.45) % 34), canvas.height);
        ctx.stroke();
      }
    };

    const drawRocket = () => {
      ctx.shadowColor = "#c06020";
      ctx.shadowBlur = 8;

      ctx.fillStyle = "#c06020";
      ctx.fillRect(rocketX, rocketY, rocketWidth, rocketHeight);

      ctx.fillStyle = "#d87a3b";
      ctx.beginPath();
      ctx.moveTo(rocketX, rocketY);
      ctx.lineTo(rocketX + rocketWidth / 2, rocketY - rocketNoseHeight);
      ctx.lineTo(rocketX + rocketWidth, rocketY);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#ffffffaa";
      ctx.fillRect(rocketX + 3, rocketY + 6, 3, 3);

      ctx.fillStyle = "#8f3f16";
      ctx.fillRect(rocketX - 3, rocketY + rocketHeight - 6, 3, 6);
      ctx.fillRect(rocketX + rocketWidth, rocketY + rocketHeight - 6, 3, 6);

      ctx.shadowBlur = 0;
    };

    const drawFlame = () => {
      if (!isInputDown || gameState !== "running") return;

      const originX = rocketX + rocketWidth / 2;
      const originY = rocketY + rocketHeight + 1;

      for (let i = 0; i < 90; i++) {
        const t = Math.pow(Math.random(), 1.7);
        const coneHalfWidth = 2 + t * 24;
        const xOffset = (Math.random() * 2 - 1) * coneHalfWidth;
        const yOffset = t * 58 + Math.random() * 5;
        const size = Math.floor(Math.random() * 4) + 1;
        const alpha = clamp(0.82 - t * 0.68 + Math.random() * 0.1, 0.08, 0.92);

        const toneRoll = Math.random();
        const color =
          toneRoll < 0.1
            ? `rgba(225,29,29,${alpha})`
            : toneRoll < 0.58
              ? `rgba(255,140,26,${alpha})`
              : `rgba(255,209,102,${alpha})`;

        ctx.fillStyle = color;
        ctx.fillRect(originX + xOffset, originY + yOffset, size, size);
      }
    };

    const drawTerrain = () => {
      if (terrain.length < 2) return;

      ctx.fillStyle = "#24242a";
      ctx.beginPath();
      ctx.moveTo(terrain[0].x, canvas.height);

      for (const point of terrain) {
        ctx.lineTo(point.x, point.y);
      }

      ctx.lineTo(terrain[terrain.length - 1].x, canvas.height);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "#2f2f37";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(terrain[0].x, terrain[0].y);
      for (let i = 1; i < terrain.length; i++) {
        ctx.lineTo(terrain[i].x, terrain[i].y);
      }
      ctx.stroke();
    };

    const drawAliens = () => {
      aliens.forEach((alien) => {
        const x = Math.round(alien.x);
        const y = Math.round(alien.y);
        const s = alien.size;
        const p = Math.max(3, Math.floor(s / 10));

        ctx.shadowColor = "rgba(74, 222, 128, 0.65)";
        ctx.shadowBlur = 10;

        ctx.fillStyle = "#166534";
        ctx.fillRect(x + p, y + p * 2, s - p * 2, s - p * 2);

        ctx.fillStyle = "#22c55e";
        ctx.fillRect(x + p * 2, y + p, s - p * 4, s - p);
        ctx.fillRect(x, y + p * 3, s, s - p * 5);

        ctx.fillStyle = "#4ade80";
        ctx.fillRect(x + p * 3, y + p * 2, p * 2, p);
        ctx.fillRect(x + s - p * 5, y + p * 2, p * 2, p);

        ctx.fillStyle = "#dcfce7";
        ctx.fillRect(x + p * 3, y + p * 4, p * 2, p * 2);
        ctx.fillRect(x + s - p * 5, y + p * 4, p * 2, p * 2);

        ctx.fillStyle = "#052e16";
        ctx.fillRect(x + p * 4, y + p * 5, p, p);
        ctx.fillRect(x + s - p * 4, y + p * 5, p, p);

        ctx.fillStyle = "#4ade80";
        ctx.fillRect(x + p * 2, y, p, p * 2);
        ctx.fillRect(x + s - p * 3, y, p, p * 2);
        ctx.fillRect(x + p * 2, y + s - p, p * 2, p);
        ctx.fillRect(x + s - p * 4, y + s - p, p * 2, p);

        ctx.shadowBlur = 0;
      });
    };

    const drawExplosion = () => {
      explosionParticles.forEach((p) => {
        const alpha = Math.max(0, p.life / p.maxLife);
        ctx.globalAlpha = alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fillStyle = p.color;
        ctx.fillRect(
          Math.round(p.x - p.size / 2),
          Math.round(p.y - p.size / 2),
          Math.round(p.size),
          Math.round(p.size),
        );
      });
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    const checkCollisions = () => {
      const rocketLeft = rocketX;
      const rocketRight = rocketX + rocketWidth;
      const rocketTop = rocketY - rocketNoseHeight;
      const rocketBottom = rocketY + rocketHeight;

      if (rocketTop < 0 || rocketBottom > canvas.height) {
        crashGame();
        return;
      }

      const terrainSamples = [rocketLeft + 2, rocketX + rocketWidth / 2, rocketRight - 2];
      for (const sampleX of terrainSamples) {
        if (rocketBottom >= terrainHeightAtX(sampleX) - 1) {
          crashGame();
          return;
        }
      }

      for (const alien of aliens) {
        const padding = alien.size * 0.18;

        const hitsAlien =
          rocketRight > alien.x + padding &&
          rocketLeft < alien.x + alien.size - padding &&
          rocketBottom > alien.y + padding &&
          rocketTop < alien.y + alien.size - padding;

        if (hitsAlien) {
          crashGame();
          return;
        }
      }
    };

    const draw = () => {
      frame++;

      drawBackground();

      if (gameState === "running") {
        currentDistance = Math.floor((frame * simulationSpeedMultiplier) / 10);
        setDistance(currentDistance);

        const difficulty = difficultyRamp(currentDistance);

         const gravity = (0.09 + difficulty * 0.042) * flightResponseMultiplier * 1.1 * 3 * 3;
        const thrust = (-0.145 - difficulty * 0.025) * flightResponseMultiplier * 1.9 * 3 * 3 * 3;
        const maxFallSpeed = (2.6 + difficulty * 0.8) * flightResponseMultiplier;
        const maxRiseSpeed = (-2.15 - difficulty * 0.5) * flightResponseMultiplier;
        const speedBoost = Math.pow(1.15, Math.min(Math.floor(currentDistance / 250), 4));
        const speed = (2.25 + difficulty * 1.55) * simulationSpeedMultiplier * speedBoost;

        if (isInputDown) {
          velocityY += thrust;
        }

        velocityY += gravity;
        velocityY *= 0.996;
        velocityY = clamp(velocityY, maxRiseSpeed, maxFallSpeed);
        rocketY += velocityY;

        terrain.forEach((point) => {
          point.x -= speed;
        });

        while (terrain.length > 2 && terrain[1].x < -terrainStep) {
          terrain.shift();
        }

        while (terrain[terrain.length - 1].x < canvas.width + terrainStep * 2) {
          appendTerrainPoint();
        }

        if (
          currentDistance > 40 &&
          frame % Math.max(
            Math.floor((145 - Math.floor(difficulty * 45)) * 1.18 / simulationSpeedMultiplier),
            21,
          ) === 0
        ) {
          aliens.push({
            x: canvas.width + 80,
            y: Math.random() * (canvas.height * 0.45) + 35,
            size: Math.random() * 23 + 10,
            drift: Math.random() * 0.45 + 0.2,
          });
        }

        const alienSpeed = speed + 0.45;
        aliens.forEach((alien) => {
          alien.x -= alienSpeed;
          alien.y +=
            Math.sin(frame * 0.035 * simulationSpeedMultiplier) *
            alien.drift *
            1.5;
        });

        aliens = aliens.filter((alien) => alien.x > -alien.size * 2);

        checkCollisions();
      }

      drawTerrain();
      drawAliens();
      if (gameState !== "crashed") {
        drawFlame();
        drawRocket();
      }

      if (gameState === "crashed") {
        explosionParticles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.12;
          p.life--;
        });
        explosionParticles = explosionParticles.filter((p) => p.life > 0);
        drawExplosion();
  }

  animationFrameId = requestAnimationFrame(draw);
    };

    seedTerrain();
    draw();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("pointerup", handlePointerCancel);
      window.removeEventListener("pointercancel", handlePointerCancel);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerCancel);
      canvas.removeEventListener("pointerleave", handlePointerCancel);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchcancel", handleTouchEnd);
      canvas.removeEventListener("touchmove", handleTouchMove);
      if (overlayTimeoutRef.current !== null) {
        window.clearTimeout(overlayTimeoutRef.current);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="mb-10 overflow-hidden rounded-[1.4rem] border border-[#c06020]/25 bg-black shadow-[0_28px_90px_-62px_rgba(192,96,32,0.85)]">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#111114] px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-neutral-400">
        <span>Vertalis // Arcade Mode</span>
        <span className="text-[#d87a3b]">Distance: {distance}</span>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={900}
          height={330}
          className="block w-full touch-none bg-[#0a0a0c]"
        />
        {(showOverlay || status === "ready") && (
        <>
          <style jsx global>{`
            @keyframes vrPulseGlow {
              0%, 100% { box-shadow: 0 0 18px rgba(196,106,43,0.55), 0 0 36px rgba(196,106,43,0.25); }
              50% { box-shadow: 0 0 32px rgba(244,123,32,0.9), 0 0 64px rgba(244,123,32,0.5), 0 0 90px rgba(244,123,32,0.18); }
            }
            @keyframes vrPanelFlicker {
              0%, 93%, 100% { opacity: 1; }
              95% { opacity: 0.75; }
              96% { opacity: 1; }
              98% { opacity: 0.88; }
            }
            @keyframes vrRadarPulse {
              0%, 100% { opacity: 0.07; transform: translate(-50%, -50%) scale(1); }
              50% { opacity: 0.17; transform: translate(-50%, -50%) scale(1.03); }
            }
            @keyframes vrFadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes vrStarFloat {
              0%, 100% { transform: translateX(0) translateY(0); }
              33% { transform: translateX(-7px) translateY(4px); }
              66% { transform: translateX(5px) translateY(-4px); }
            }
            .vr-restart-btn:hover {
              background: #f47b20 !important;
              transform: translateY(-1px);
            }
          `}</style>
          <div
            onClick={triggerOverlayLaunch}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(5,5,6,0.94)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Press Start 2P', monospace",
              cursor: 'pointer', overflow: 'hidden',
            }}
          >
            {/* Grid */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: 'linear-gradient(rgba(196,106,43,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(196,106,43,0.04) 1px, transparent 1px)',
              backgroundSize: '38px 38px',
            }} />
            {/* Drifting stars */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.32) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.44) 1px, transparent 1px)',
              backgroundSize: '130px 90px, 85px 110px, 175px 65px',
              backgroundPosition: '12px 18px, 42px 35px, 72px 8px',
              animation: 'vrStarFloat 9s ease-in-out infinite',
            }} />
            {/* Radar rings */}
            <div style={{
              position: 'absolute', left: '50%', top: '50%',
              width: 240, height: 240,
              border: '1px solid rgba(196,106,43,0.13)',
              borderRadius: '50%',
              animation: 'vrRadarPulse 3.5s ease-in-out infinite',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', left: '50%', top: '50%',
              width: 460, height: 460,
              border: '1px solid rgba(196,106,43,0.07)',
              borderRadius: '50%',
              animation: 'vrRadarPulse 3.5s ease-in-out infinite 1.1s',
              pointerEvents: 'none',
            }} />
            {/* Scanlines */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10,
              backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.13) 3px, rgba(0,0,0,0.13) 4px)',
            }} />
            {/* Content */}
            <div style={{
              position: 'relative', zIndex: 5,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              animation: 'vrFadeIn 0.45s ease-out',
              padding: '0 24px', maxWidth: 560, width: '100%',
            }}>
              <div style={{ fontSize: 'clamp(7px, 1vw, 9px)', color: '#c46a2b', letterSpacing: '0.3em', marginBottom: 10, opacity: 0.8 }}>
                // VERTALIS ARCADE //
              </div>
              <div style={{
                fontSize: 'clamp(16px, 2.8vw, 26px)', color: '#f47b20',
                letterSpacing: '0.18em', textAlign: 'center',
                textShadow: '0 0 24px rgba(244,123,32,0.65), 0 0 50px rgba(244,123,32,0.28)',
                marginBottom: 10, lineHeight: 1.3,
              }}>
                {status === "ready" ? "VERTALIS ROCKET RUN" : "Nice Crash!"}
              </div>
              <div style={{
                fontFamily: 'monospace', fontSize: 'clamp(9px, 1.3vw, 12px)',
                color: '#8a8a8a', letterSpacing: '0.16em', marginBottom: 20, textAlign: 'center',
              }}>
                {status === "ready"
                  ? "Systems calibrated. Awaiting launch input."
                  : "Structure broke under pressure."}
              </div>
              <div style={{
                background: '#101012', border: '1px solid rgba(196,106,43,0.3)',
                padding: '14px 28px', marginBottom: 20, width: '100%', maxWidth: 290,
                boxShadow: '0 0 16px rgba(196,106,43,0.09), inset 0 0 20px rgba(0,0,0,0.5)',
                animation: 'vrPanelFlicker 7s ease-in-out infinite',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 9, alignItems: 'center' }}>
                  <span style={{ fontSize: 'clamp(7px, 1vw, 9px)', color: '#8a8a8a', letterSpacing: '0.14em' }}>CURRENT RUN</span>
                  <span style={{ fontSize: 'clamp(8px, 1.1vw, 10px)', color: '#e8e1d5', letterSpacing: '0.1em' }}>{distance}</span>
                </div>
                <div style={{ height: 1, background: 'rgba(196,106,43,0.2)', marginBottom: 9 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 'clamp(7px, 1vw, 9px)', color: '#8a8a8a', letterSpacing: '0.14em' }}>BEST RUN</span>
                  <span style={{ fontSize: 'clamp(8px, 1.1vw, 10px)', color: '#f47b20', letterSpacing: '0.1em' }}>{bestRun?.distance ?? distance}</span>
                </div>
              </div>
              <button
                type="button"
                className="vr-restart-btn"
                onClick={(e) => { e.stopPropagation(); triggerOverlayLaunch(); }}
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 'clamp(8px, 1.4vw, 11px)',
                  background: '#c46a2b', color: '#050506',
                  border: '2px solid #f47b20', padding: '12px 32px',
                  letterSpacing: '0.16em', cursor: 'pointer',
                  animation: 'vrPulseGlow 2.2s ease-in-out infinite',
                  marginBottom: 14, transition: 'background 0.15s, transform 0.1s',
                }}
              >
                {status === "ready" ? "LAUNCH RUN" : "RESTART RUN"}
              </button>
              <div style={{
                fontFamily: 'monospace', fontSize: 'clamp(7px, 1vw, 9px)',
                color: '#8a8a8a', letterSpacing: '0.12em', textAlign: 'center', opacity: 0.65,
              }}>
                {status === "ready"
                  ? "PRESS SPACE OR TAP TO LAUNCH"
                  : "PRESS SPACE OR TAP TO LAUNCH AGAIN"}
              </div>
            </div>
          </div>
        </>
      )}
      </div>
    </div>
  );
}

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white">
      <PixelTermsHeader />

      <section className="px-4 pb-14 pt-8 md:px-6 md:pb-20 md:pt-10">
        <div className="mx-auto max-w-6xl">
          <RocketGame />

          <div className="overflow-hidden rounded-[2.1rem] border border-white/10 bg-[linear-gradient(170deg,rgba(255,255,255,0.035),rgba(255,255,255,0.012))] shadow-[0_28px_90px_-56px_rgba(0,0,0,0.9)]">
            <div className="px-6 py-10 md:px-10 md:py-12 lg:px-14 lg:py-14">
              <div className="max-w-[780px]">
                <p className="inline-flex rounded-full border border-[#c06020]/25 bg-[#c06020]/10 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#d87a3b]">
                  Vertalis Legal
                </p>

                <h1 className="mt-6 text-[clamp(2.6rem,5vw,4.2rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-white">
                  Terms of Use
                </h1>

                <p className="mt-5 text-sm leading-7 text-neutral-400 md:text-base">
                  Effective Date: January 1, 2026
                </p>

                <p className="mt-4 text-sm leading-7 text-neutral-500">
                  Glad you got that out of your system. Now for the legal part.
                </p>
              </div>

              <article className="mt-10 max-w-[780px] text-left text-[1.02rem] leading-[1.9] text-neutral-300 [&_h2]:mb-4 [&_h2]:mt-14 [&_h2]:border-t [&_h2]:border-white/10 [&_h2]:pt-8 [&_h2]:text-[1.95rem] [&_h2]:font-bold [&_h2]:tracking-[-0.035em] [&_h2]:text-white [&_h2:first-of-type]:mt-12 [&_h2:first-of-type]:border-t-0 [&_h2:first-of-type]:pt-0 [&_p]:mt-5 [&_p]:leading-[1.9]">
                <p>
                  Welcome to Vertalis Legal Counsel, PLLC. By accessing or using
                  this website, including its articles, insights, contact forms,
                  calculators, and other tools, you agree to these Terms of Use.
                  If you do not agree, you should not use this website.
                </p>

                <h2>No Attorney-Client Relationship</h2>
                <p>
                  Use of this website does not create an attorney-client
                  relationship between you and Vertalis Legal Counsel, PLLC.
                </p>
                <p>
                  No attorney-client relationship is formed unless and until
                  Vertalis Legal Counsel, PLLC expressly agrees in writing to
                  represent you through a signed engagement agreement.
                  Contacting the firm through this website, submitting a form,
                  sending an email, or using any calculator, tool, or
                  interactive feature does not create an attorney-client
                  relationship.
                </p>

                <h2>Educational Purposes Only</h2>
                <p>
                  All content on this website is provided for general educational
                  and informational purposes only.
                </p>
                <p>
                  This includes, without limitation, articles, insights,
                  commentary, legal discussions, business discussions,
                  calculators, simulations, and other materials. Nothing on this
                  website is legal advice, tax advice, financial advice, or a
                  substitute for advice from a qualified attorney who
                  understands your specific facts and circumstances.
                </p>
                <p>
                  You should not act, or refrain from acting, based on
                  information found on this website without first consulting an
                  attorney.
                </p>

                <h2>No Reliance</h2>
                <p>
                  The content on this website may not reflect the most current
                  legal, regulatory, or business developments. Laws vary by
                  jurisdiction, and outcomes depend on specific facts. Any
                  reliance on the content of this website is solely at your own
                  risk.
                </p>

                <h2>No Confidential Information</h2>
                <p>
                  You should not send confidential, sensitive, or privileged
                  information through this website, including through any contact
                  form or general inquiry submission.
                </p>
                <p>
                  Information sent to Vertalis Legal Counsel, PLLC through this
                  website will not be treated as confidential unless and until an
                  attorney-client relationship has been formally established
                  through a signed engagement agreement.
                </p>

                <h2>Third-Party Content and Tools</h2>
                <p>
                  This website may reference or incorporate third-party content,
                  software, links, or tools. Vertalis Legal Counsel, PLLC does
                  not control and is not responsible for the content, accuracy,
                  availability, or performance of any third-party resource.
                </p>

                <h2>Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, Vertalis Legal Counsel,
                  PLLC disclaims liability for any loss or damage arising out of
                  or related to the use of this website or reliance on any
                  content provided on this website.
                </p>

                <h2>Intellectual Property</h2>
                <p>
                  All content on this website, including text, branding,
                  graphics, design, and original tools, is the property of
                  Vertalis Legal Counsel, PLLC unless otherwise stated. It may
                  not be copied, reproduced, distributed, or used without prior
                  written permission.
                </p>

                <h2>Changes to These Terms</h2>
                <p>
                  Vertalis Legal Counsel, PLLC may update these Terms of Use at
                  any time without notice. Your continued use of the website
                  after any changes are posted constitutes your acceptance of
                  the revised Terms.
                </p>

                <h2>Contact</h2>
                <p>
                  If you have questions about these Terms of Use, please contact
                  Vertalis Legal Counsel, PLLC through the contact information
                  provided on this website.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}