import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import { useState } from "react";

type CountryReview = {
  username: string;
  rating: number;
  text: string;
  duration: string;
  priceRange: string;
  services: string[];
};

type CountryReach = {
  code: string;
  name: string;
  flag: string;
  projects?: number;
  coordinates: { x: number; y: number };
  review?: CountryReview;
};

const countryReach: CountryReach[] = [
  { code: "us", name: "United States", flag: "🇺🇸", projects: 106, coordinates: { x: 205, y: 182 } },
  {
    code: "gb",
    name: "United Kingdom",
    flag: "🇬🇧",
    projects: 41,
    coordinates: { x: 446, y: 112 },
    review: {
      username: "gordgoodfellow",
      rating: 5,
      text: "As usual, MBA exceeded my expectations in every way...",
      duration: "2 days",
      priceRange: "$100–$200",
      services: ["Formulas & Macros"],
    },
  },
  { code: "de", name: "Germany", flag: "🇩🇪", projects: 26, coordinates: { x: 543, y: 113 } },
  { code: "au", name: "Australia", flag: "🇦🇺", projects: 15, coordinates: { x: 819, y: 371 } },
  { code: "fr", name: "France", flag: "🇫🇷", projects: 8, coordinates: { x: 492, y: 179 } },
  { code: "ca", name: "Canada", flag: "🇨🇦", projects: 29, coordinates: { x: 222, y: 112 } },
  { code: "br", name: "Brazil", flag: "🇧🇷", coordinates: { x: 336, y: 337 } },
  { code: "ae", name: "United Arab Emirates", flag: "🇦🇪", coordinates: { x: 583, y: 220 } },
  { code: "pk", name: "Pakistan", flag: "🇵🇰", coordinates: { x: 630, y: 215 } },
  { code: "cn", name: "China", flag: "🇨🇳", coordinates: { x: 704, y: 174 } },
];

const knownProjectTotal = countryReach.reduce((total, country) => total + (country.projects ?? 0), 0);

export function WorldDominationMap() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryReach | null>(null);
  const activeTooltip = countryReach.find((country) => country.code === hoveredCountry);

  return (
    <section aria-labelledby="world-map-heading" className="section-wrap py-16 sm:py-20 lg:py-24">
      <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Clients across the map</p>
          <h2 id="world-map-heading" className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Global client <span className="text-emerald-300">reach.</span>
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          <strong className="text-white">{knownProjectTotal}</strong> recorded sales across six reported countries
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(290px,0.8fr)]">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-3 shadow-2xl shadow-slate-950/30 sm:p-5">
          <div className="relative aspect-[1.55] min-h-64 w-full overflow-hidden rounded-2xl bg-slate-900 sm:aspect-[1.8]">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08),transparent_68%)]" />
            <svg
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 1000 500"
            >
              <defs>
                <pattern height="28" id="world-map-grid" patternUnits="userSpaceOnUse" width="28">
                  <path d="M28 0H0V28" stroke="#1e293b" strokeWidth="0.7" />
                </pattern>
                <linearGradient id="world-land" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#334155" />
                  <stop offset="1" stopColor="#1e293b" />
                </linearGradient>
              </defs>
              <rect fill="url(#world-map-grid)" height="500" width="1000" />
              <g fill="url(#world-land)" stroke="#475569" strokeLinejoin="round" strokeWidth="1.2">
                <path d="m88 105 30-27 51-9 31 14 22-6 29 18-8 17 23 13-4 18-24 5-7 20-20 5-14 31-19 13-7 29-18 12-11-13 4-23-15-16-3-24-19-12 5-17-20-8-12-23-23-5-8-20-23-3-8-19z" />
                <path d="m252 237 22 4 13 22 19 8 8 25-11 21-5 27-16 20-4 28-13 20-12-9-5-30-17-31 2-25-12-21 4-24-9-21 14-20z" />
                <path d="m431 103 22-13 24 8 12 18-9 13-18-2-12 13-20-7-13 7-17-10 6-18 18-1z" />
                <path d="m462 139 21-12 26 7 11 17 20 6 16 25-11 26-16 17-7 26-18 25-6 31-20 27-18-11-8-27-18-11-6-27-18-13 6-24-12-17 15-18 1-23 19-13z" />
                <path d="m494 102 23-15 29 6 18-9 37 7 21-9 31 16 35-1 22 15 31 7 9 16-24 7-21 21-20 2-11 19-20-6-18 15-12-8-12 15-19-7-12 13-15-10-20 6-13-13-15 4-14-18-22-4-10-18-22-3-10-17z" />
                <path d="m615 237 17-10 17 8 11 20-7 16-20 4-13-14z" />
                <path d="m777 309 34-17 31 6 25 16 9 25-17 17-7 28-22 12-23-10-18 2-14-18-21-8-7-26 17-10z" />
                <path d="m857 238 17-7 14 10-5 15-18 2z" />
                <path d="m396 74 11-7 13 3-3 10-14 3z" />
              </g>
            </svg>

            {countryReach.map((country) => {
              const isSelected = selectedCountry?.code === country.code;
              const isHovered = hoveredCountry === country.code;
              return (
                <motion.button
                  key={country.code}
                  aria-label={`${country.name}: ${country.projects === undefined ? "no sales total recorded" : `${country.projects} sales`}. Select to view review details.`}
                  aria-pressed={isSelected}
                  className="group absolute z-10 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:h-9 sm:w-9"
                  onBlur={() => setHoveredCountry((current) => current === country.code ? null : current)}
                  onClick={() => setSelectedCountry(country)}
                  onFocus={() => setHoveredCountry(country.code)}
                  onMouseEnter={() => setHoveredCountry(country.code)}
                  onMouseLeave={() => setHoveredCountry((current) => current === country.code ? null : current)}
                  style={{ left: `${country.coordinates.x / 10}%`, top: `${country.coordinates.y / 5}%` }}
                  type="button"
                  whileHover={{ scale: 1.18 }}
                  whileTap={{ scale: 0.94 }}
                >
                  <span className={`absolute inset-1 rounded-full blur-md transition-opacity ${isSelected || isHovered ? "bg-emerald-400/50 opacity-100" : "bg-emerald-400/25 opacity-70"}`} />
                  <span className={`relative grid h-3 w-3 place-items-center rounded-full border-2 border-slate-950 transition-colors ${isSelected ? "bg-sky-300 ring-4 ring-sky-300/25" : "bg-emerald-300 group-hover:bg-emerald-200"}`} />
                </motion.button>
              );
            })}

            <AnimatePresence>
              {activeTooltip && (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="pointer-events-none absolute bottom-3 left-3 z-20 flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/95 px-3 py-2.5 shadow-xl backdrop-blur sm:bottom-auto sm:left-auto sm:right-3 sm:top-3"
                  exit={{ opacity: 0, y: 5 }}
                  initial={{ opacity: 0, y: 5 }}
                  key={activeTooltip.code}
                  role="status"
                  transition={{ duration: 0.16 }}
                >
                  <span aria-hidden="true" className="text-xl">{activeTooltip.flag}</span>
                  <span>
                    <strong className="block text-xs font-semibold text-white">{activeTooltip.name}</strong>
                    <span className="block text-[11px] text-slate-400">
                      {activeTooltip.projects === undefined ? "Sales total not listed" : `${activeTooltip.projects} ${activeTooltip.projects === 1 ? "sale" : "sales"}`}
                    </span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute bottom-3 right-3 rounded-lg border border-slate-800 bg-slate-950/80 px-2.5 py-1.5 text-[10px] font-medium text-slate-400 backdrop-blur">
              Select a marker to explore
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-3 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" /> Country data</span>
            <span>Marker size is consistent; totals appear on hover or focus.</span>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {selectedCountry ? (
            <motion.article
              animate={{ opacity: 1, y: 0 }}
              className="flex min-h-72 flex-col rounded-3xl border border-slate-800 bg-slate-900 p-5 text-slate-100 shadow-xl shadow-slate-950/20 sm:p-6"
              exit={{ opacity: 0, y: 8 }}
              initial={{ opacity: 0, y: 8 }}
              key={selectedCountry.code}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">Client story</p>
                  <h3 className="flex items-center gap-2 text-xl font-semibold text-white">
                    <span aria-hidden="true" className="text-2xl">{selectedCountry.flag}</span>
                    {selectedCountry.name}
                  </h3>
                </div>
                <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs font-semibold text-emerald-200">
                  {selectedCountry.projects === undefined ? "Reach" : `${selectedCountry.projects} sales`}
                </span>
              </div>

              {selectedCountry.review ? (
                <>
                  <div aria-label={`${selectedCountry.review.rating} out of 5 stars`} className="mb-3 flex gap-1 text-amber-300">
                    {Array.from({ length: selectedCountry.review.rating }, (_, index) => <Star aria-hidden="true" className="fill-current" key={index} size={15} />)}
                  </div>
                  <blockquote className="mb-5 text-sm leading-6 text-slate-300">“{selectedCountry.review.text}”</blockquote>
                  <div className="mt-auto border-t border-slate-800 pt-4">
                    <p className="mb-3 text-sm font-semibold text-white">{selectedCountry.review.username}</p>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                      <div><dt className="text-slate-500">Duration</dt><dd className="mt-1 text-slate-200">{selectedCountry.review.duration}</dd></div>
                      <div><dt className="text-slate-500">Price range</dt><dd className="mt-1 text-slate-200">{selectedCountry.review.priceRange}</dd></div>
                      <div className="col-span-2">
                        <dt className="mb-1.5 text-slate-500">Service</dt>
                        <dd className="flex flex-wrap gap-1.5">
                          {selectedCountry.review.services.map((service) => <span className="rounded-full border border-emerald-900/70 bg-emerald-950/60 px-2.5 py-1 text-[11px] text-emerald-200" key={service}>{service}</span>)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </>
              ) : (
                <div className="flex flex-1 flex-col justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-5">
                  <MapPin aria-hidden="true" className="mb-3 text-emerald-300" size={20} />
                  <p className="text-sm font-semibold text-white">More client stories coming soon</p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    {selectedCountry.projects === undefined
                      ? `The ${selectedCountry.name} marker is ready for verified project totals and a client review.`
                      : `We have ${selectedCountry.projects} recorded sales in ${selectedCountry.name}. A review can be added here when available.`}
                  </p>
                </div>
              )}

              <a className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 transition-colors hover:text-emerald-200" href="#contact">
                Discuss a project <ArrowUpRight aria-hidden="true" size={14} />
              </a>
            </motion.article>
          ) : (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex min-h-72 flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900 p-5 text-slate-100 shadow-xl shadow-slate-950/20 sm:p-6"
              exit={{ opacity: 0, y: 8 }}
              initial={{ opacity: 0, y: 8 }}
              key="select-country"
              transition={{ duration: 0.2 }}
            >
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">Explore client stories</p>
                <h3 className="text-xl font-semibold text-white">Work that crosses borders.</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">Choose a marker to see the available sales total and client feedback for that country.</p>
              </div>
              <div className="mt-7 grid grid-cols-2 gap-2">
                {countryReach.filter((country) => country.projects !== undefined).slice(0, 4).map((country) => (
                  <button
                    className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2.5 text-left transition-colors hover:border-emerald-700/70 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                    key={country.code}
                    onClick={() => setSelectedCountry(country)}
                    type="button"
                  >
                    <span aria-hidden="true" className="text-lg">{country.flag}</span>
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-semibold text-slate-200">{country.name}</span>
                      <span className="text-[10px] text-slate-500">{country.projects} sales</span>
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
