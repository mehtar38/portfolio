import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail, HiOutlineDocumentText } from "react-icons/hi";
import { IoGameControllerOutline } from "react-icons/io5";
import { sidebarContent } from "../data/sidebarContent";
import SkillCatcher from '../components/SkillCatcher';
import type { PageType } from "../types";

interface SidebarProps {
  activePage: PageType;
  onNavigateHome?: () => void;
}

const links = [
  { label: "GitHub", href: "https://github.com/mehtar38", icon: FaGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/mehtarutvi", icon: FaLinkedin },
  { label: "Resume", href: "https://drive.google.com/file/d/1A_0Et9ry54qXMFnu9V-vbyHQ6QUz7B9H/view?usp=sharing", icon: HiOutlineDocumentText },
  { label: "Email", href: "mailto:mehtarh@uci.edu", icon: HiOutlineMail },
];

const contentEase = [0.25, 0.1, 0.25, 1] as const;

/** Fixed sidebar with page-specific context that animates on change */
export default function Sidebar({ activePage, onNavigateHome }: SidebarProps) {
  const [gameMode, setGameMode] = useState(false);
  const content = sidebarContent[activePage];

  const handleGameModeToggle = () => {
    setGameMode((prev) => !prev);
  };

  return (
    <>
      {/* ── Mobile top bar ── */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-5 py-4">
          <button type="button" onClick={onNavigateHome} className="text-left">
            <p className="font-serif text-xl text-foreground">Rutvi Mehta</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={activePage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-xs text-muted tracking-wide"
              >
                {content.heading}
              </motion.p>
            </AnimatePresence>
          </button>

          <nav className="flex items-center gap-4">
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                aria-label={label}
                className="text-muted hover:text-accent transition-colors duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Desktop fixed sidebar ── */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 w-[320px] h-screen border-r border-border bg-background z-40">
        <div className="flex flex-col justify-between h-full px-10 py-14">
          <div>
            {/* Identity — always visible */}
            <button
              type="button"
              onClick={onNavigateHome}
              className="text-left group"
            >
              <h1 className="font-serif text-3xl text-foreground tracking-tight group-hover:text-accent transition-colors duration-300">
                Rutvi Hetal Mehta
              </h1>
              <p className="mt-1 text-sm text-muted tracking-wide uppercase">
                Software Developer
              </p>
            </button>

            {/* Dynamic section context — animates on page change */}
            <div className="mt-8 min-h-30 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: contentEase }}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3">
                    {content.heading}
                  </p>
                  <p className="text-muted text-[15px] leading-relaxed">
                    {content.text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Contact links — always visible */}
            <nav className="mt-10 flex flex-col gap-1">
              {links.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="group/link flex items-center gap-3 py-2.5 text-foreground hover:text-accent transition-colors duration-200"
                >
                  <Icon
                    size={16}
                    className="text-muted group-hover/link:text-accent transition-colors duration-200"
                  />
                  <span className="text-sm tracking-wide">{label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Game Mode toggle — placeholder */}
          <div className="pt-8 border-t border-border">
            <button
              type="button"
              onClick={handleGameModeToggle}
              aria-pressed={gameMode}
              className="flex items-center justify-between w-full py-2 text-sm text-muted hover:text-foreground transition-colors duration-200"
            >
              <span className="flex items-center gap-2.5">
                <IoGameControllerOutline size={18} />
                Game Mode
              </span>
              <span
                className={`relative w-10 h-5.5 rounded-full transition-colors duration-300 ${
                  gameMode ? "bg-accent" : "bg-border"
                }`}
              >
                <span
                  className={`absolute top-0.75 left-0.75 w-4 h-4 rounded-full bg-background shadow-sm transition-transform duration-300 ${
                    gameMode ? "translate-x-4.5" : "translate-x-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </aside>
          <AnimatePresence>
      {gameMode && (
        <SkillCatcher
          onClose={() => setGameMode(false)}
        />
      )}
    </AnimatePresence>
    </>
  );
}
