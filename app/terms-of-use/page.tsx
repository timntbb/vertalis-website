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
    const terrainStep = 24;

    let terrain: { x: number; y: number }[] = [];
    let aliens: { x: number; y: number; size: number; drift: number }[] = [];

    const clamp = (value: number, min: number, max: number) =>
      Math.max(min, Math.min(max, value));

    const difficultyRamp = (distanceValue: number) =>
      clamp(distanceValue / 1800, 0, 1.4);

    const baseTerrainY = () => canvas.height - 46;

    const appendTerrainPoint = () => {
      const last = terrain[terrain.length - 1];
      const ramp = difficultyRamp(currentDistance);

      const variance = 10 + ramp * 22;
      const maxTerrainRise = 55 + ramp * 115;
      const minY = canvas.height - maxTerrainRise;
      const maxY = canvas.height - 24;

      let nextY =
        (last?.y ?? baseTerrainY()) +
        (Math.random() * 2 - 1) * variance;

      if (Math.random() < 0.10 + ramp * 0.12) {
        nextY -= Math.random() * (10 + ramp * 30);
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
      rocketY = canvas.height * 0.42;
      velocityY = 0;
      frame = 0;
      currentDistance = 0;
      terrain = [];
      aliens = [];
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

      setBestRun((prevBest) => {
        if (prevBest && currentDistance <= prevBest.distance) return prevBest;

        const nextBest = { name: "Best Run!", distance: currentDistance };
        window.localStorage.setItem("vertalisRocketBest", JSON.stringify(nextBest));
        bestRunRef.current = nextBest;
        return nextBest;
      });
    };

    const pressInput = () => {
      if (gameState === "crashed") {
        resetGame();
        return;
      }

      startGame();
      isInputDown = true;
    };

    const releaseInput = () => {
      isInputDown = false;
    };

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

    const handlePointerDown = (e: PointerEvent | MouseEvent) => {
      e.preventDefault();
      pressInput();
    };

    const handlePointerUp = (e: PointerEvent | MouseEvent) => {
      e.preventDefault();
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
    document.addEventListener("visibilitychange", handleVisibilityChange);

    canvas.addEventListener("mousedown", handlePointerDown);
    canvas.addEventListener("mouseup", handlePointerUp);
    canvas.addEventListener("mouseleave", handlePointerUp);
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
      ctx.fillStyle = "#0a0a0c";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#ffffff18";
      for (let i = 0; i < 45; i++) {
        const x = (i * 61 - frame * 0.35) % canvas.width;
        const y = (i * 31) % canvas.height;
        ctx.fillRect(x < 0 ? x + canvas.width : x, y, 2, 2);
      }

      ctx.strokeStyle = "#c060201f";
      for (let x = 0; x < canvas.width; x += 34) {
        ctx.beginPath();
        ctx.moveTo(x - ((frame * 0.18) % 34), 0);
        ctx.lineTo(x - ((frame * 0.18) % 34), canvas.height);
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
        currentDistance = Math.floor(frame / 8);
        setDistance(currentDistance);

        const difficulty = difficultyRamp(currentDistance);

        const gravity = 0.09 + difficulty * 0.042;
        const thrust = -0.145 - difficulty * 0.025;
        const maxFallSpeed = 2.6 + difficulty * 0.8;
        const maxRiseSpeed = -2.15 - difficulty * 0.5;
        const speed = 2.25 + difficulty * 1.55;

        if (isInputDown) {
          velocityY += thrust;
        }

        velocityY += gravity;
        velocityY *= 0.992;
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
          currentDistance > 70 &&
          frame % Math.max(145 - Math.floor(difficulty * 45), 72) === 0
        ) {
          aliens.push({
            x: canvas.width + 80,
            y: Math.random() * (canvas.height * 0.45) + 35,
            size: Math.random() * 8 + 42,
            drift: Math.random() * 0.45 + 0.2,
          });
        }

        const alienSpeed = speed + 0.45;
        aliens.forEach((alien) => {
          alien.x -= alienSpeed;
          alien.y += Math.sin(frame * 0.035) * alien.drift;
        });

        aliens = aliens.filter((alien) => alien.x > -alien.size * 2);

        checkCollisions();
      }

      drawTerrain();
      drawAliens();
      drawFlame();
      drawRocket();

      if (gameState === "ready") {
        ctx.fillStyle = "rgba(0,0,0,0.45)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawPixelText("VERTALIS ROCKET RUN", canvas.width / 2 - 92, canvas.height / 2 - 10, 16);
        drawPixelText("HOLD SPACE OR TOUCH TO LAUNCH", canvas.width / 2 - 132, canvas.height / 2 + 18, 12);
        drawPixelText(
          bestRunRef.current
            ? `BEST RUN - ${bestRunRef.current.distance}`
            : "BEST RUN - NO RUNS YET",
          bestRunRef.current ? canvas.width / 2 - 76 : canvas.width / 2 - 92,
          canvas.height / 2 + 58,
          12
        );
      }

      if (gameState === "crashed") {
        ctx.fillStyle = "rgba(0,0,0,0.65)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawPixelText("MISSION RESET", canvas.width / 2 - 68, canvas.height / 2 - 10, 16);
        drawPixelText("PRESS SPACE TO TRY AGAIN", canvas.width / 2 - 102, canvas.height / 2 + 18, 12);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    seedTerrain();
    draw();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      canvas.removeEventListener("mousedown", handlePointerDown);
      canvas.removeEventListener("mouseup", handlePointerUp);
      canvas.removeEventListener("mouseleave", handlePointerUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchcancel", handleTouchEnd);
      canvas.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="mb-10 overflow-hidden rounded-[1.4rem] border border-[#c06020]/25 bg-black shadow-[0_28px_90px_-62px_rgba(192,96,32,0.85)]">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#111114] px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-neutral-400">
        <span>Vertalis // Arcade Mode</span>
        <span className="text-[#d87a3b]">Distance: {distance}</span>
      </div>

      <canvas
        ref={canvasRef}
        width={900}
        height={330}
        className="block w-full touch-none bg-[#0a0a0c]"
      />
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