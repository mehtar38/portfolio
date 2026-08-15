import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import { skills, type Skill } from "../data/skills";

interface SkillCatcherProps {
  onClose: () => void;
}

interface Target {
  instanceId: string;
  skill: Skill;
  x: number;
  y: number;
  size: number;
  moving: boolean;
  driftX: number;
  driftY: number;
}

interface FlyingArrow {
  id: string;
  targetX: number;
  targetY: number;
  angle: number;
}

interface HitEffect {
  id: string;
  x: number;
  y: number;
  skillName: string;
  color: string;
}

const MAX_TARGETS = 2;
const SPAWN_INTERVAL = 1400;
const HEADER_HEIGHT = 80;
const BANK_HEIGHT = 100;

export default function SkillCatcher({ onClose }: SkillCatcherProps) {
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const [targets, setTargets] = useState<Target[]>([]);
  const [caughtIds, setCaughtIds] = useState<Set<string>>(new Set());

  const [aim, setAim] = useState({ x: 50, y: 55 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawPower, setDrawPower] = useState(0);

  // Visual Effects
  const [flyingArrows, setFlyingArrows] = useState<FlyingArrow[]>([]);
  const [hitEffects, setHitEffects] = useState<HitEffect[]>([]);

  const drawStartRef = useRef<number | null>(null);
  const targetsRef = useRef(targets);
  const caughtRef = useRef(caughtIds);

  targetsRef.current = targets;
  caughtRef.current = caughtIds;

  const allCaught = caughtIds.size === skills.length;

  /* ------------------------- TARGET SPAWNING ------------------------- */
  const spawnTarget = useCallback(() => {
    if (targetsRef.current.length >= MAX_TARGETS) return;

    const available = skills.filter(
      (skill) => !caughtRef.current.has(skill.id)
    );

    if (!available.length) return;

    const skill = available[Math.floor(Math.random() * available.length)];

    let size = 90;
    let y = 35;
    let moving = false;

    if (skill.difficulty === "easy") {
      size = 95;
      y = 38 + Math.random() * 20;
    } else if (skill.difficulty === "medium") {
      size = 75;
      y = 25 + Math.random() * 20;
    } else if (skill.difficulty === "hard") {
      size = 60;
      y = 18 + Math.random() * 25;
      moving = true;
    }

    const target: Target = {
      instanceId: `${skill.id}-${Date.now()}-${Math.random()}`,
      skill,
      x: 15 + Math.random() * 70,
      y,
      size,
      moving,
      driftX: (Math.random() - 0.5) * 180,
      driftY: (Math.random() - 0.5) * 70,
    };

    setTargets((prev) => [...prev, target]);

    setTimeout(() => {
      setTargets((prev) =>
        prev.filter((item) => item.instanceId !== target.instanceId)
      );
    }, skill.duration);
  }, []);

  // Guarantee at least 2 targets are always present on screen
  useEffect(() => {
    if (allCaught) return;

    const maintainMinTargets = () => {
      const availableCount = skills.filter(
        (s) => !caughtRef.current.has(s.id)
      ).length;

      if (!availableCount) return;

      const minRequired = Math.min(2, availableCount);
      const missing = minRequired - targetsRef.current.length;

      for (let i = 0; i < missing; i++) {
        spawnTarget();
      }
    };

    maintainMinTargets();

    const interval = setInterval(() => {
      maintainMinTargets();
      if (targetsRef.current.length < MAX_TARGETS) {
        spawnTarget();
      }
    }, SPAWN_INTERVAL);

    return () => clearInterval(interval);
  }, [allCaught, spawnTarget]);

  /* ------------------------- MOUSE AIMING ------------------------- */
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setAim({
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(5, Math.min(90, y)),
    });
  };

  /* ------------------------- DRAWING & SHOOTING ------------------------- */
  const startDrawing = () => {
    if (allCaught) return;
    setIsDrawing(true);
    drawStartRef.current = Date.now();
  };

  const releaseArrow = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const start = drawStartRef.current;
    if (!start) return;

    const elapsed = Date.now() - start;
    const power = Math.min(elapsed / 1000, 1);
    setDrawPower(power);

    const dx = aim.x - 50;
    const dy = aim.y - 88;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    const arrowId = `arrow-${Date.now()}`;
    const targetX = aim.x;
    const targetY = aim.y;

    setFlyingArrows((prev) => [
      ...prev,
      { id: arrowId, targetX, targetY, angle },
    ]);

    setTimeout(() => {
      setFlyingArrows((prev) => prev.filter((a) => a.id !== arrowId));
      checkHit(targetX, targetY, power);
      setDrawPower(0);
    }, 160);
  };

  /* ------------------------- HIT DETECTION ------------------------- */
  const checkHit = (shotX: number, shotY: number, power: number) => {
    const hitRadius = 7 + power * 6;

    const hit = targetsRef.current.find((target) => {
      const dx = target.x - shotX;
      const dy = target.y - shotY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const difficultyMultiplier =
        target.skill.difficulty === "easy"
          ? 1.8
          : target.skill.difficulty === "medium"
          ? 1.3
          : 0.9;

      return distance < hitRadius * difficultyMultiplier;
    });

    if (!hit) return;

    const color =
      hit.skill.difficulty === "easy"
        ? "#38bdf8"
        : hit.skill.difficulty === "medium"
        ? "#34d399"
        : "#c084fc";

    const effectId = `hit-${Date.now()}`;
    setHitEffects((prev) => [
      ...prev,
      { id: effectId, x: hit.x, y: hit.y, skillName: hit.skill.name, color },
    ]);

    setTimeout(() => {
      setHitEffects((prev) => prev.filter((e) => e.id !== effectId));
    }, 700);

    setTargets((prev) =>
      prev.filter((target) => target.instanceId !== hit.instanceId)
    );

    setCaughtIds((prev) => new Set(prev).add(hit.skill.id));
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex flex-col bg-zinc-950 text-white font-sans"
    >
      {/* HEADER */}
      <header
        className="shrink-0 flex items-center justify-between px-6 md:px-10 border-b border-white/10"
        style={{ height: HEADER_HEIGHT }}
      >
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            Skills
          </p>
          <p className="mt-1 text-sm md:text-base text-white/80">
            If it’s easy to hit, I’m good at it. If it’s flying around like chaos, yeah that’s accurate too.
          </p>
          <p className="mt-0.5 text-xs text-white/30">
            {caughtIds.size} / {skills.length} collected
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close game"
          className="flex items-center justify-center w-10 h-10 border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition"
        >
          <HiX size={20} />
        </button>
      </header>

      {/* GAME CANVAS */}
      <div
        ref={gameAreaRef}
        onMouseMove={handleMouseMove}
        onMouseDown={startDrawing}
        onMouseUp={releaseArrow}
        onMouseLeave={() => isDrawing && releaseArrow()}
        className="relative flex-1 overflow-hidden cursor-crosshair select-none bg-zinc-950"
        style={{ paddingBottom: BANK_HEIGHT }}
      >
        {/* Subtle Background Glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
        </div>

        {/* TARGETS */}
        <AnimatePresence>
          {targets.map((target) => (
            <TargetItem key={target.instanceId} target={target} />
          ))}
        </AnimatePresence>

        {/* FLYING ARROW PROJECTILES */}
        {flyingArrows.map((arrow) => (
          <motion.div
            key={arrow.id}
            initial={{ left: "50%", top: "88%", scale: 1, opacity: 1 }}
            animate={{
              left: `${arrow.targetX}%`,
              top: `${arrow.targetY}%`,
              scale: 0.6,
            }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            style={{ rotate: `${arrow.angle + 90}deg` }}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-0.5 h-10 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </motion.div>
        ))}

        {/* HIT FX PARTICLES */}
        <AnimatePresence>
          {hitEffects.map((fx) => (
            <HitExplosion key={fx.id} fx={fx} />
          ))}
        </AnimatePresence>

        {/* CROSSHAIR AIM */}
        <motion.div
          animate={{
            left: `${aim.x}%`,
            top: `${aim.y}%`,
            scale: isDrawing ? 1.2 : 1,
          }}
          transition={{
            left: { duration: 0.05 },
            top: { duration: 0.05 },
            scale: { duration: 0.15 },
          }}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/40 flex items-center justify-center"
        >
          <span className="absolute left-1/2 top-1/2 h-px w-12 -translate-x-1/2 bg-white/20" />
          <span className="absolute left-1/2 top-1/2 w-px h-12 -translate-y-1/2 bg-white/20" />
        </motion.div>

        {/* BOW */}
        <Bow aim={aim} isDrawing={isDrawing} drawPower={drawPower} />

        {/* INSTRUCTIONS */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-white/30">
            {isDrawing ? "Hold... release when ready" : "Click and hold to draw"}
          </p>

          {isDrawing && (
            <div className="mt-3 h-1 w-32 overflow-hidden rounded-full bg-white/10 text-center">
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{
                  width: `${Math.min(
                    ((Date.now() - (drawStartRef.current ?? Date.now())) / 1000) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          )}
        </div>

        {/* VICTORY OVERLAY */}
        {allCaught && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/50 backdrop-blur-sm"
          >
            <div className="text-center">
              <p className="font-serif text-4xl md:text-5xl">
                You've conquered them all
              </p>
              <p className="mt-3 text-sm text-white/40">Just like me!</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* SKILL BANK */}
      <SkillBank caughtIds={caughtIds} />
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                SUB-COMPONENTS                              */
/* -------------------------------------------------------------------------- */

function TargetItem({ target }: { target: Target }) {
  const Icon = target.skill.icon;
  const isHard = target.skill.difficulty === "hard";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: target.moving ? [0, target.driftX, -target.driftX, 0] : 0,
        y: target.moving ? [0, target.driftY, -target.driftY, 0] : 0,
      }}
      exit={{ opacity: 0, scale: 0.4 }}
      transition={{
        opacity: { duration: 0.3 },
        scale: { duration: 0.35 },
        x: isHard ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { duration: 0 },
        y: isHard ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { duration: 0 },
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${target.x}%`, top: `${target.y}%` }}
    >
      <div
        className="relative flex items-center justify-center rounded-full border-2 border-white/30 bg-zinc-900/80 backdrop-blur-sm"
        style={{
          width: target.size,
          height: target.size,
          boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
        }}
      >
        <div
          className="absolute rounded-full border border-white/20"
          style={{ inset: target.size * 0.17 }}
        />
        <div
          className="absolute rounded-full border border-white/10"
          style={{ inset: target.size * 0.34 }}
        />

        <Icon size={target.size * 0.28} className="relative z-10 text-white/80" />
      </div>

      <p className="mt-2 text-center text-[10px] tracking-wide text-white/50">
        {target.skill.name}
      </p>
    </motion.div>
  );
}

function Bow({
  aim,
  isDrawing,
  drawPower,
}: {
  aim: { x: number; y: number };
  isDrawing: boolean;
  drawPower: number;
}) {
  const bowX = 50;
  const bowY = 88;

  const dx = aim.x - bowX;
  const dy = aim.y - bowY;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  const stringPull = isDrawing ? 20 + drawPower * 30 : 0;

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-[88%] -translate-x-1/2 -translate-y-1/2 origin-top"
      animate={{ rotate: angle + 90 }}
      transition={{ duration: 0.06 }}
    >
      <div className="relative w-28 h-36 flex items-center justify-center">
        <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
          {/* Metallic Metallic Arc */}
          <path
            d="M 12 10 Q 50 -15 88 10"
            fill="none"
            stroke="url(#silverBow)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Dynamic String */}
          <path
            d={`M 12 10 L 50 ${10 + stringPull} L 88 10`}
            fill="none"
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="1.2"
          />

          {/* Arrow */}
          {isDrawing && (
            <g transform={`translate(50, ${10 + stringPull})`}>
              <line x1="0" y1="0" x2="0" y2="-60" stroke="#ffffff" strokeWidth="2" />
              <polygon points="0,-66 -4,-56 4,-56" fill="#ffffff" />
            </g>
          )}

          <defs>
            <linearGradient id="silverBow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#52525b" />
              <stop offset="50%" stopColor="#e4e4e7" />
              <stop offset="100%" stopColor="#52525b" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </motion.div>
  );
}

function HitExplosion({ fx }: { fx: HitEffect }) {
  const particles = Array.from({ length: 6 });

  return (
    <div
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${fx.x}%`, top: `${fx.y}%` }}
    >
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] tracking-wider uppercase font-mono px-2 py-0.5 rounded border border-white/20 bg-zinc-900/90 text-white"
      >
        + {fx.skillName}
      </motion.div>

      {/* Burst Particles */}
      {particles.map((_, i) => {
        const angle = (i / particles.length) * 360;
        const rad = (angle * Math.PI) / 180;
        const dist = 35;
        const x = Math.cos(rad) * dist;
        const y = Math.sin(rad) * dist;

        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x, y, opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-white"
          />
        );
      })}
    </div>
  );
}

/* REVERTED SKILL BANK */
function SkillBank({ caughtIds }: { caughtIds: Set<string> }) {
  return (
    <div
      className="shrink-0 border-t border-white/10 bg-black/80 px-6 py-4"
      style={{ height: BANK_HEIGHT }}
    >
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/30">
        Skill Bank
      </p>

      <div className="flex gap-5 overflow-x-auto">
        {skills.map((skill) => {
          const Icon = skill.icon;
          const caught = caughtIds.has(skill.id);

          return (
            <motion.div
              key={skill.id}
              animate={
                caught
                  ? {
                      scale: [1, 1.2, 1],
                    }
                  : {}
              }
              className={`flex shrink-0 flex-col items-center gap-1 text-xs transition ${
                caught ? "text-white font-medium" : "text-white/20 grayscale"
              }`}
            >
              <Icon size={24} />
              <span>{skill.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}