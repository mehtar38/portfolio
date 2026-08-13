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
import ny from "../assets/ny.jpg";
import spotfiy from "../assets/spotify.jpg";

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
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      {/* Subtle stars */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        {[...Array(40)].map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white"
            style={
              {
                // left: `${Math.random() * 100}%`,
                // top: `${Math.random() * 100}%`,
              }
            }
          />
        ))}
      </div>

      <PageContainer className="relative z-10 max-w-6xl! py-10">
        <BackButton onBack={onBack} />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-serif text-5xl md:text-7xl leading-tight tracking-tight"
        >
          Interests
        </motion.h1>

        <p className="mt-4 max-w-2xl text-zinc-400">
          Introducing some personality here!
        </p>

        <div className="mt-10 grid grid-cols-12 gap-4 auto-rows-30">
          {/* Quote */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-12 row-span-3 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 md:p-12 backdrop-blur"
          >
            <div className="h-0.5 w-16 bg-fuchsia-400" />
            <blockquote className="mt-8 font-serif text-3xl md:text-5xl leading-tight text-zinc-100">
              “Nothing is boring, you just haven’t spent enough time with it.”
            </blockquote>
            <p className="mt-8 text-xs uppercase tracking-[0.25em] text-zinc-500">
              Personal philosophy
            </p>
          </motion.section>

          {/* Science feature */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative col-span-12 md:col-span-7 row-span-4 overflow-hidden rounded-3xl border border-cyan-500/20 bg-linear-to-br from-cyan-500/10 via-zinc-900 to-zinc-900 p-8"
          >
            <PiPlanet
              className="absolute right-6 top-6 text-cyan-300/20"
              size={88}
            />
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
              Science canon event
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl leading-tight">
              The article that changed my life
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-zinc-300">
              A chapter from Discovery’s <em>Universe</em> book series followed
              a single photon leaving a star and travelling for billions of
              years before finally reaching a young girl’s eye. Along the way it
              silently witnessed exploding stars, drifting galaxies, our planets
              and the end of dinosaurs. Haven't been the same since.
            </p>
          </motion.section>

          {/* Duolingo stat */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-5 row-span-2 rounded-3xl border border-emerald-500/20 bg-linear-to-br from-emerald-500/10 to-zinc-900 p-8 flex flex-col justify-between"
          >
            <PiTranslate className="text-emerald-300" size={34} />
            <div>
              <p className="text-6xl font-serif text-emerald-200">720+</p>
              <h3 className="mt-2 text-xl font-medium">Spanish streak</h3>
              <p className="mt-2 text-zinc-300">
                730+ day streak that's opened my world a little more!x
              </p>
            </div>
          </motion.section>
          {/* Places */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-12 row-span-2 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8"
          >
            <div className="flex items-center gap-2 text-zinc-300">
              <PiGlobe size={22} />
              <h3 className="text-lg font-medium">Places I’ve called home</h3>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {["Mumbai", "California", "New Jersey", "New York"].map(
                (place) => (
                  <div
                    key={place}
                    className="group relative rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-12 text-center overflow-hidden"
                  >
                    {/* Text */}
                    <p className="text-sm text-zinc-400 transition-opacity duration-300 group-hover:opacity-0">
                      {place}
                    </p>

                    {/* Hover Image */}
                    <img
                      src={places[place]}
                      alt={place}
                      className="absolute inset-0 w-full h-full object-fill opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                ),
              )}
            </div>
          </motion.section>

          {/* Guitar */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-4 row-span-2 rounded-3xl border border-violet-500/20 bg-linear-to-br from-violet-500/10 to-zinc-900 p-8 flex flex-col justify-between"
          >
            <PiGuitar className="text-violet-300" size={36} />
            <div>
              <h3 className="text-2xl font-serif">Guitar</h3>
              <p className="mt-3 text-zinc-300 leading-relaxed">
                Picked it up seven years ago. Still learning, still enjoying it,
                and still occasionally pretending I’m better than I am.
              </p>
            </div>
          </motion.section>

          {/* Movies */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-4 row-span-2 rounded-3xl border border-amber-500/20 bg-linear-to-br from-amber-500/10 to-zinc-900 p-8 flex flex-col justify-between"
          >
            <PiFilmSlate className="text-amber-300" size={36} />
            <div>
              <h3 className="text-2xl font-serif">Movies</h3>
              <p className="mt-3 text-zinc-300 leading-relaxed">
                I have an unreasonable number of favorite films and an even
                longer list of scenes that stayed with me for years.
              </p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-4 row-span-2 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col justify-between"
          >
            <div className="flex-1 rounded-2xl border border-zinc-700 bg-zinc-950/60 overflow-hidden">
              <img
                src={spotfiy}
                alt="Spotify screenshot"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.section>

          {/* Philosophy + writing */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-8 row-span-3 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8"
          >
            <div className="flex flex-wrap items-center gap-3 text-zinc-300">
              <PiBookOpen size={22} />
              <PiPencilSimple size={22} />
              <span className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Reading • thinking • writing
              </span>
            </div>

            <h3 className="mt-6 font-serif text-3xl leading-tight">
              Philosophy, history, literature, and the notes app
            </h3>

            <p className="mt-5 max-w-2xl leading-relaxed text-zinc-300">
              Lately I’ve been borrowing ideas from philosophy, history, and
              literature almost as often as from computer science. I keep a
              running collection of thoughts, half-finished essays, and
              questions I don’t yet know how to answer.
            </p>

            <p className="mt-5 max-w-2xl leading-relaxed text-zinc-300">
              It would be cool to write a book someday, even if it starts as a
              folder full of messy drafts.
            </p>
          </motion.section>

          {/* Universe videos */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-4 row-span-3 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 flex flex-col justify-between"
          >
            <PiPlanet className="text-cyan-300" size={34} />
            <div>
              <h3 className="text-2xl font-serif">Universe rabbit holes</h3>
              <p className="mt-3 text-zinc-300 leading-relaxed">
                Some evenings I watch videos about black holes, quantum
                mechanics, and the age of the universe.
              </p>
              <p className="mt-4 text-zinc-500 text-sm">
                Other evenings I discover that even cosmology can be boring if
                the narrator talks too slowly.
              </p>
            </div>
          </motion.section>
        </div>

        <p className="mt-10 text-center text-sm text-zinc-500">
          This page intentionally breaks the portfolio’s light theme. Consider
          it a small dark-mode rebellion.
        </p>
      </PageContainer>
    </div>
  );
}
