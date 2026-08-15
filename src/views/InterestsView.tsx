import BackButton from "../components/BackButton";
import PageContainer from "../components/PageContainer";

import { motion } from "framer-motion";
import {
  PiBookOpen,
  PiFilmSlate,
  PiGlobe,
  PiGuitar,
  PiPencilSimple,
  PiPlanet,
  PiTranslate,
} from "react-icons/pi";
import mumbai from "../assets/mumbai.jpg";
import cali from "../assets/cali.jpg";
import nj from "../assets/nj.jpg";
import ny from "../assets/nyc.jpg";
import spotfiy from "../assets/spotify.jpg";
import pilots from "../assets/21p.jpg";

interface InterestsViewProps {
  onBack: () => void;
}

const places: Record<string, string> = {
  Mumbai: mumbai,
  California: cali,
  "New Jersey": nj,
  "New York": ny,
};

export default function InterestsView({ onBack }: InterestsViewProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-fuchsia-500/[0.07] blur-[140px]" />
        <div className="absolute right-[-150px] top-[35%] h-[550px] w-[550px] rounded-full bg-cyan-500/[0.06] blur-[150px]" />
        <div className="absolute bottom-[-150px] left-[35%] h-[450px] w-[450px] rounded-full bg-violet-500/[0.05] blur-[130px]" />
      </div>

      {/* Stars */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        {[
          [7, 12],
          [18, 24],
          [29, 8],
          [41, 18],
          [56, 9],
          [68, 27],
          [81, 13],
          [93, 32],
          [12, 55],
          [34, 68],
          [49, 47],
          [73, 76],
          [89, 61],
          [25, 91],
          [62, 89],
        ].map(([left, top], i) => (
          <span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-white"
            style={{
              left: `${left}%`,
              top: `${top}%`,
            }}
          />
        ))}
      </div>

      <PageContainer className="relative z-10 !max-w-7xl py-10">
        <div className="mt-4">
        <BackButton onBack={onBack}/>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Header                                                           */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-24"
        >

          <h1 className="max-w-4xl font-serif text-6xl leading-[0.9] tracking-tight md:text-8xl">
            Interests
          </h1>

          <p className="mt-7 max-w-md text-sm leading-7 text-zinc-500">
            Introducing some personality here!
          </p>

        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* Quote                                                            */}
        {/* ---------------------------------------------------------------- */}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mb-32 min-h-[420px] border-y border-zinc-800/80 py-16 md:py-24"
        >
          <div className="absolute left-0 top-16 h-24 w-px bg-fuchsia-400/70" />

          <blockquote className="mt-10 max-w-6xl pl-8 font-serif text-4xl leading-[1.05] tracking-tight text-zinc-100 md:text-6xl lg:text-7xl">
            “Nothing is boring, you just have to spend enough time with it.”
          </blockquote>
        </motion.section>

        {/* ---------------------------------------------------------------- */}
        {/* Science + Duolingo                                               */}
        {/* ---------------------------------------------------------------- */}

        <section className="relative mb-32">
          <div className="grid grid-cols-12 gap-y-20 md:gap-x-16">
            {/* Science */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative col-span-12 md:col-span-8"
            >
              <div className="absolute -left-5 top-0 h-full w-px bg-cyan-400/30" />

              <div className="pl-8 md:pl-12">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                  Science canon event
                </p>

                <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
                  The article that changed my life
                </h2>

                <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-400">
                  A chapter from Discovery’s <em>Universe</em> book series
                  followed a single photon leaving a star and travelling for
                  billions of years before finally reaching a young girl’s eye.
                  Along the way it silently witnessed exploding stars, drifting
                  galaxies, our planets and the end of dinosaurs. Haven't been
                  the same since.
                </p>
              </div>
            </motion.div>

            {/* Duolingo */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative col-span-12 flex items-end md:col-span-4"
            >
              <div className="relative w-full border-b border-zinc-800 pb-8 md:border-b-0 md:pb-0">
                <PiTranslate
                  size={32}
                  className="mb-8 text-emerald-300/80"
                />

                <p className="font-serif text-7xl leading-none text-emerald-200">
                  730+
                </p>

                <h3 className="mt-4 text-lg text-zinc-200">
                  Spanish Duolingo streak
                </h3>

                <p className="mt-3 max-w-xs text-sm leading-6 text-zinc-500">
                   
lo cual abrió un poco más mi mundo + ahora entiendo algunas canciones en español!
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Places                                                           */}
        {/* ---------------------------------------------------------------- */}

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-32"
        >
          <div className="mb-10 flex items-end justify-between border-b border-zinc-800 pb-5">
            <div>
              {/* <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                Places I've called home
              </p> */}

              <h2 className="mt-3 font-serif text-3xl md:text-5xl">
                Places I've called home
              </h2>
            </div>

            <PiGlobe
              size={30}
              className="mb-1 text-zinc-600"
            />
          </div>

          {/* The postcards */}
          <div className="grid grid-cols-2 gap-5 md:grid-cols-2 md:gap-8">
            {["Mumbai", "California", "New Jersey", "New York"].map(
              (place, index) => (
                <motion.div
                  key={place}
                  initial={{
                    opacity: 0,
                    y: 5
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}

                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="group relative aspect-[4/5] cursor-default overflow-hidden bg-zinc-900 shadow-2xl max-h-60 min-w-full"
                >
                  <img
                    src={places[place]}
                    alt={place}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 pt-16">
                    <p className="text-sm text-white">
                      {place}
                    </p>
                  </div>
                </motion.div>
              ),
            )}
          </div>

          <p className="mt-8 text-right text-xs uppercase tracking-[0.2em] text-zinc-700">
            So far
          </p>
        </motion.section>

        {/* ---------------------------------------------------------------- */}
        {/* Guitar + Music                                                   */}
        {/* ---------------------------------------------------------------- */}

        <section className="relative mb-32">
          <div className="grid grid-cols-12 items-center gap-y-20 md:gap-x-5">
            {/* Guitar */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative col-span-12 md:col-span-5"
            >
              <PiGuitar
                size={42}
                className="mb-8 text-violet-300/80"
              />

              <h2 className="mt-3 font-serif text-5xl md:text-6xl">
                Guitar.
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-zinc-400">
                Been a proud average Guitarist for 7 years and counting!
              </p>
            </motion.div>

            {/* Spotify */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative col-span-12 md:col-span-4"
            >
              <div className="absolute -left-10 top-0 hidden h-full w-px bg-zinc-800 md:block" />

              <p className="mb-5 text-xs uppercase tracking-[0.25em] text-zinc-600">
                Shoutouts
              </p>

              <div className="overflow-hidden">
                <img
                  src={spotfiy}
                  alt="Spotify screenshot"
                  className="w-full object-cover transition-transform duration-700 hover:scale-[1.02] max-h-100 max-w-2xs"
                />
              </div>
            </motion.div>

                <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="relative col-span-12 md:col-span-3"
    >
                   <p className="mb-5 text-xs uppercase tracking-[0.25em] text-zinc-600">
                
              </p>
      <div className="overflow-hidden rounded-xl">
        <img
          src={pilots}
          alt="Spotify screenshot"
          className="w-full object-cover max-h-75"
        />
      </div>
    </motion.div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Philosophy / writing                                             */}
        {/* ---------------------------------------------------------------- */}

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-32 border-t border-zinc-800 pt-16"
        >
          <div className="grid grid-cols-12 gap-y-12 md:gap-x-16">
            <div className="col-span-12 md:col-span-4">
              <div className="flex items-center gap-3 text-zinc-500">
                <PiBookOpen size={22} />
                <PiPencilSimple size={22} />
              </div>

              <p className="mt-7 text-xs uppercase tracking-[0.25em] text-zinc-600">
                Reading · thinking · writing
              </p>
            </div>

            <div className="col-span-12 md:col-span-8">
              <h2 className="font-serif text-4xl leading-tight md:text-5xl">
                Philosophy, history, literature, and the notes app
              </h2>

              <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-400">
                Lately I’ve been borrowing ideas from philosophy, history, and
                literature almost as often as from computer science. I keep a
                running collection of thoughts, half-finished essays, and
                questions I don’t yet know how to answer.
              </p>

              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400">
                It would be cool to write a book someday, even if it starts as
                a folder full of messy drafts.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ---------------------------------------------------------------- */}
        {/* Movies + Universe                                                */}
        {/* ---------------------------------------------------------------- */}

        <section className="mb-24 grid grid-cols-12 gap-y-20 md:gap-x-20">
          {/* Movies */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-12 md:col-span-5"
          >
            <PiFilmSlate
              size={38}
              className="mb-8 text-amber-300/70"
            />

            <h2 className="mt-3 font-serif text-5xl">
              Movies.
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-7 text-zinc-400">
              I have an unreasonable number of favorite films and an even
              longer list of scenes that stayed with me for years.
            </p>
          </motion.div>

          {/* Universe */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative col-span-12 md:col-span-7"
          >
            <div className="absolute -left-10 top-0 hidden h-full w-px bg-cyan-400/20 md:block" />

            <PiPlanet
              size={38}
              className="mb-8 text-cyan-300/70"
            />

            <h2 className="mt-3 font-serif text-4xl md:text-5xl">
              Sometimes I go looking for answers.
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-400">
              Some evenings I watch videos about black holes, quantum
              mechanics, and the age of the universe.
            </p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-600">
              Other evenings I discover that even cosmology can be boring if
              the narrator talks too slowly.
            </p>
          </motion.div>
        </section>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-zinc-800 pt-6 text-xs text-zinc-600">
          <span>This page intentionally breaks the portfolio’s light theme.</span>
        </div>
      </PageContainer>
    </div>
  );
}