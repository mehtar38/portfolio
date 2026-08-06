import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import { skills, type Skill } from "../data/skills";

interface SkillCatcherProps {
  onClose: () => void;
}

interface ActiveSkill {
  instanceId: string;
  skill: Skill;
  x: number;
  y: number;
  driftX: number;
  driftY: number;
}

const MAX_ACTIVE = 4;
const SPAWN_INTERVAL = 1400;
const BANK_HEIGHT = 110;
const HEADER_HEIGHT = 90;

export default function SkillCatcher({ onClose }: SkillCatcherProps) {
  const [activeSkills, setActiveSkills] = useState<ActiveSkill[]>([]);
  const [caughtIds, setCaughtIds] = useState<Set<string>>(new Set());
  const [recentCatch, setRecentCatch] = useState<string | null>(null);

  const activeSkillsRef = useRef(activeSkills);
  const caughtIdsRef = useRef(caughtIds);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  activeSkillsRef.current = activeSkills;
  caughtIdsRef.current = caughtIds;

  const allCaught = caughtIds.size === skills.length;

  const weightedSkillPool = (available: Skill[]) => {
    return available.flatMap((skill) => {
      if (skill.difficulty === "easy") return [skill, skill, skill];
      if (skill.difficulty === "medium") return [skill, skill];
      return [skill];
    });
  };

  const spawnSkill = useCallback(() => {
    if (activeSkillsRef.current.length >= MAX_ACTIVE) return;

    const available = skills.filter(
      (skill) => !caughtIdsRef.current.has(skill.id),
    );

    if (!available.length) return;

    const pool = weightedSkillPool(available);

    const skill = pool[Math.floor(Math.random() * pool.length)];

    const instance: ActiveSkill = {
      instanceId: `${skill.id}-${Date.now()}`,
      skill,
      x: 8 + Math.random() * 78,
      y: 8 + Math.random() * 60,
      driftX: (Math.random() - 0.5) * 50,
      driftY: (Math.random() - 0.5) * 40,
    };

    setActiveSkills((prev) => [...prev, instance]);

    const timer = setTimeout(() => {
      setActiveSkills((prev) =>
        prev.filter((item) => item.instanceId !== instance.instanceId),
      );
    }, skill.duration);

    timersRef.current.push(timer);
  }, []);

  useEffect(() => {
    if (allCaught) return;

    spawnSkill();

    const interval = setInterval(spawnSkill, SPAWN_INTERVAL);

    return () => {
      clearInterval(interval);
      timersRef.current.forEach(clearTimeout);
    };
  }, [allCaught, spawnSkill]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleCatch = (active: ActiveSkill) => {
    setActiveSkills((prev) =>
      prev.filter((item) => item.instanceId !== active.instanceId),
    );

    setCaughtIds((prev) => {
      const updated = new Set(prev);
      updated.add(active.skill.id);
      return updated;
    });

    setRecentCatch(active.skill.id);

    setTimeout(() => {
      setRecentCatch(null);
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        fixed inset-0 z-[100]
        flex flex-col
        bg-foreground/20 backdrop-blur-sm
      "
    >
      <header
        className="flex items-center justify-between px-6 md:px-10 border-b border-white/10"
        style={{ height: HEADER_HEIGHT }}
      >
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-white/50">
            Game Mode
          </p>

          <p className="text-white mt-2">
            Catch the skills. Build the collection.
          </p>

          <p className="text-white/40 text-xs mt-1">
            {caughtIds.size} / {skills.length} collected
          </p>
        </div>

        <button
          onClick={onClose}
          className="
            w-10 h-10
            border border-white/20
            text-white/70
            hover:text-white
            transition
          "
        >
          <HiX size={20} />
        </button>
      </header>

      <div
        className="relative flex-1 overflow-hidden"
        style={{ paddingBottom: BANK_HEIGHT }}
      >
        {allCaught && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              scale: [0.2, 1.15, 1],
            }}
            className="
              absolute inset-0
              flex items-center justify-center
              text-white/50
              text-3xl
            "
          >
            Collection complete.
          </motion.div>
        )}

        <AnimatePresence>
          {activeSkills.map((skill) => (
            <FloatingSkill
              key={skill.instanceId}
              active={skill}
              onCatch={() => handleCatch(skill)}
            />
          ))}
        </AnimatePresence>
      </div>

      <SkillBank caughtIds={caughtIds} recentCatch={recentCatch} />
    </motion.div>
  );
}

function FloatingSkill({
  active,
  onCatch,
}: {
  active: ActiveSkill;
  onCatch: () => void;
}) {
  const Icon = active.skill.icon;
  const hard = active.skill.difficulty === "hard";

  return (
    <motion.button
      onClick={onCatch}
      initial={{
        opacity: 0,
        scale: 0.2,
      }}
animate={
  hard
    ? {
        opacity: 1,
        scale: [0.2, 1.15, 1],
        x: [0, active.driftX, -active.driftX, 0],
        y: [0, active.driftY, -active.driftY, 0],
      }
    : {
        opacity: 1,
        scale: [0.2, 1.15, 1],
        y: [0, -4, 0],
      }
}
exit={{
  opacity: 0,
  scale: 0.2,
  y: 20,
  rotate: 15,
}}
      transition={{
        duration: hard ? active.skill.duration / 1000 : 0.3,
          ease: "easeOut",
        repeat: hard ? Infinity : 0,
      }}
      className="
        absolute
        flex flex-col items-center gap-2
        text-white
      "
      style={{
        left: `${active.x}%`,
        top: `${active.y}%`,
      }}
    >
      <span
        className="flex items-center justify-center w-16 h-16 text-accent"
        style={{
          filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.18))",
        }}
      >
        <Icon size={42} />
      </span>

      <span className="text-xs">{active.skill.name}</span>
    </motion.button>
  );
}

function SkillBank({
  caughtIds,
  recentCatch,
}: {
  caughtIds: Set<string>;
  recentCatch: string | null;
}) {
  return (
    <div
      className="
border-t border-white/10
bg-black/80
px-6 py-4
"
      style={{
        height: BANK_HEIGHT,
      }}
    >
      <p className="text-white/40 text-xs uppercase tracking-widest mb-3">
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
                recentCatch === skill.id
                  ? {
                      scale: [1, 1.3, 1],
                    }
                  : {}
              }
              className={`
flex flex-col items-center gap-1
text-xs
transition
${caught ? "text-cyan-400" : "text-white/20 grayscale"}
`}
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
