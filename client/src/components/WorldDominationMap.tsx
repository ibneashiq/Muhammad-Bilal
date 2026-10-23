import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import { useState } from "react";

type CountryReview = {
  client: string;
  rating: number;
  text: string;
  duration: string;
  scope: string;
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
  {
    code: "us",
    name: "United States",
    flag: "🇺🇸",
    projects: 106,
    coordinates: { x: 205, y: 182 },
    review: {
      client: "Scriptomat & Rich Herbert Law",
      rating: 5,
      text: "I thought my issues with using Word for Mac would be difficult, but he figured out how to make it work. He exceeded expectations and delivered flawless cross-platform stability.",
      duration: "3 days",
      scope: "Enterprise Word Add-in",
      services: ["Word VBA", "Cross-Platform Mac/Win", "Add-in QA"],
    },
  },
  {
    code: "gb",
    name: "United Kingdom",
    flag: "🇬🇧",
    projects: 41,
    coordinates: { x: 446, y: 112 },
    review: {
      client: "2plan Wealth Management · Gord G.",
      rating: 5,
      text: "Outstanding experience working with MBA. Exceptional attention to detail, seamless communication, and top-notch code quality. Institutional-grade delivery.",
      duration: "2 days",
      scope: "Financial Modeling Add-In",
      services: ["Excel VBA", "Formulas & Macros", "Ribbon UI"],
    },
  },
  {
    code: "nl",
    name: "Netherlands",
    flag: "🇳🇱",
    projects: 34,
    coordinates: { x: 485, y: 112 },
    review: {
      client: "Kalpa NL & The Behaviors",
      rating: 5,
      text: "He was professional, responsive, and accommodating. He understood our exact packaging requirements and created the right high-speed barcode pipeline.",
      duration: "4 days",
      scope: "Automated Packaging Pipeline",
      services: ["Word–Excel Pipeline", "EAN-13 Barcodes", "Batch Mail Merge"],
    },
  },
  {
    code: "ca",
    name: "Canada",
    flag: "🇨🇦",
    projects: 29,
    coordinates: { x: 222, y: 112 },
    review: {
      client: "Enterprise Consulting · Ontario",
      rating: 5,
      text: "Replaced our manual reconciliation process with automated Power Query checkpoints. Cut 10+ hours of weekly repetitive bookkeeping with zero errors.",
      duration: "3 days",
      scope: "Financial BI ETL Pipeline",
      services: ["Power Query", "QuickBooks ETL", "Audit Checks"],
    },
  },
  {
    code: "de",
    name: "Germany",
    flag: "🇩🇪",
    projects: 26,
    coordinates: { x: 543, y: 113 },
    review: {
      client: "CITY-CAR & Lawlift GmbH",
      rating: 5,
      text: "Flawless technical execution, clean VBA structure, and very reliable delivery. Highly recommended for complex document and template automation.",
      duration: "3 days",
      scope: "Contract Assembly System",
      services: ["VBA Automation", "Document Engineering", "Data Modeling"],
    },
  },
  {
    code: "au",
    name: "Australia",
    flag: "🇦🇺",
    projects: 15,
    coordinates: { x: 819, y: 371 },
    review: {
      client: "Melbourne Geotech",
      rating: 5,
      text: "Cut engineering report preparation from hours to under 5 minutes with 100% calculation consistency. Exceptional technical capability and fast turnaround.",
      duration: "5 days",
      scope: "Borehole Calculation Tool",
      services: ["Excel UserForms", "PDF Publishing", "Engineering Math"],
    },
  },
  { code: "fr", name: "France", flag: "🇫🇷", projects: 8, coordinates: { x: 492, y: 179 } },
  { code: "br", name: "Brazil", flag: "🇧🇷", coordinates: { x: 336, y: 337 } },
  { code: "ae", name: "United Arab Emirates", flag: "🇦🇪", coordinates: { x: 583, y: 220 } },
  { code: "pk", name: "Pakistan", flag: "🇵🇰", coordinates: { x: 630, y: 215 } },
  { code: "cn", name: "China", flag: "🇨🇳", coordinates: { x: 704, y: 174 } },
];

export function WorldDominationMap() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryReach>(countryReach[0]); // Default to US
  const activeTooltip = countryReach.find((country) => country.code === hoveredCountry);

  return (
    <section
      id="global-reach"
      aria-labelledby="global-reach-heading"
      className="section-wrap py-20 lg:py-28"
    >
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-index text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
            Worldwide Reach
          </p>
          <h2
            id="global-reach-heading"
            className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[var(--ink)]"
          >
            Trusted beyond <em className="text-[var(--muted)] font-normal">borders.</em>
          </h2>
        </div>
        <p className="text-sm text-[var(--muted)] max-w-xs">
          Interactive map of verified international client engagements across North America, Europe, Asia, and Oceania.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(310px,0.85fr)]">
        {/* Interactive Map Visual */}
        <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 sm:p-5 shadow-[var(--shadow)]">
          <div className="relative aspect-[1.55] min-h-64 w-full overflow-hidden rounded-xl bg-[var(--surface-soft)] sm:aspect-[1.8]">
            <svg
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 1000 500"
            >
              <defs>
                <pattern height="24" id="world-map-grid" patternUnits="userSpaceOnUse" width="24">
                  <path d="M24 0H0V24" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect className="text-[var(--ink)]" fill="url(#world-map-grid)" height="500" width="1000" />
              <g
                className="text-[var(--ink)]"
                fill="currentColor"
                fillOpacity="0.14"
                stroke="currentColor"
                strokeOpacity="0.28"
                strokeLinejoin="round"
                strokeWidth="1.2"
              >
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

            {/* Country Markers */}
            {countryReach.map((country) => {
              const isSelected = selectedCountry?.code === country.code;
              const isHovered = hoveredCountry === country.code;
              return (
                <motion.button
                  key={country.code}
                  aria-label={`${country.name}: ${country.projects ? `${country.projects} projects` : "Client presence"}. Select to view case story.`}
                  aria-pressed={isSelected}
                  className="group absolute z-10 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full outline-none focus-visible:ring-3 focus-visible:ring-[var(--lime)] sm:h-9 sm:w-9 cursor-pointer"
                  onBlur={() => setHoveredCountry((current) => (current === country.code ? null : current))}
                  onClick={() => setSelectedCountry(country)}
                  onFocus={() => setHoveredCountry(country.code)}
                  onMouseEnter={() => setHoveredCountry(country.code)}
                  onMouseLeave={() => setHoveredCountry((current) => (current === country.code ? null : current))}
                  style={{ left: `${country.coordinates.x / 10}%`, top: `${country.coordinates.y / 5}%` }}
                  type="button"
                  whileHover={{ scale: 1.22 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <span
                    className={`absolute inset-0 rounded-full blur-sm transition-opacity ${
                      isSelected || isHovered ? "bg-[var(--lime)] opacity-80" : "bg-[var(--lime)] opacity-35"
                    }`}
                  />
                  <span
                    className={`relative grid h-3.5 w-3.5 place-items-center rounded-full border-2 border-[var(--surface)] transition-all ${
                      isSelected
                        ? "bg-[var(--lime)] ring-4 ring-[var(--lime)]/30 scale-110"
                        : "bg-[var(--lime)] group-hover:scale-110"
                    }`}
                  />
                </motion.button>
              );
            })}

            {/* Tooltip on Hover */}
            <AnimatePresence>
              {activeTooltip && (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="pointer-events-none absolute bottom-3 left-3 z-20 flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2.5 shadow-xl backdrop-blur sm:bottom-auto sm:left-auto sm:right-3 sm:top-3"
                  exit={{ opacity: 0, y: 5 }}
                  initial={{ opacity: 0, y: 5 }}
                  key={activeTooltip.code}
                  role="status"
                  transition={{ duration: 0.15 }}
                >
                  <span aria-hidden="true" className="text-xl">{activeTooltip.flag}</span>
                  <span>
                    <strong className="block text-xs font-semibold text-[var(--ink)]">{activeTooltip.name}</strong>
                    <span className="block text-[11px] text-[var(--muted)]">
                      {activeTooltip.projects ? `${activeTooltip.projects} projects delivered` : "Client engagements"}
                    </span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute bottom-3 right-3 rounded-lg border border-[var(--line)] bg-[var(--surface)]/90 px-2.5 py-1.5 text-[10px] font-medium text-[var(--muted)] backdrop-blur">
              Click any pin to inspect client story
            </div>
          </div>

          {/* Quick Select Pill Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-3 text-[11px] text-[var(--muted)]">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--lime)] shadow-[0_0_8px_var(--lime)]" />
              Verified international markets
            </span>
            <div className="flex flex-wrap gap-1.5">
              {countryReach.filter((c) => c.review).map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setSelectedCountry(c)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium border transition-colors cursor-pointer ${
                    selectedCountry.code === c.code
                      ? "border-[var(--lime)] bg-[var(--lime)] text-[var(--lime-ink)]"
                      : "border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {c.flag} {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Country Story Card */}
        <AnimatePresence mode="wait">
          <motion.article
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-72 flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 text-[var(--ink)] shadow-[var(--shadow)]"
            exit={{ opacity: 0, y: 6 }}
            initial={{ opacity: 0, y: 6 }}
            key={selectedCountry.code}
            transition={{ duration: 0.18 }}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                  Verified Case Study
                </p>
                <h3 className="flex items-center gap-2 text-xl font-bold font-display text-[var(--ink)]">
                  <span aria-hidden="true" className="text-2xl">{selectedCountry.flag}</span>
                  {selectedCountry.name}
                </h3>
              </div>
              {selectedCountry.projects && (
                <span className="rounded-full border border-[var(--line)] bg-[var(--surface-soft)] px-3 py-1 text-xs font-bold text-[var(--ink)]">
                  {selectedCountry.projects} projects
                </span>
              )}
            </div>

            {selectedCountry.review ? (
              <>
                <div aria-label={`${selectedCountry.review.rating} out of 5 stars`} className="mb-3 flex gap-1 text-amber-400">
                  {Array.from({ length: selectedCountry.review.rating }, (_, i) => (
                    <Star aria-hidden="true" className="fill-current" key={i} size={15} />
                  ))}
                </div>
                <blockquote className="mb-5 text-sm leading-relaxed text-[var(--ink)]">
                  “{selectedCountry.review.text}”
                </blockquote>
                <div className="mt-auto border-t border-[var(--line)] pt-4">
                  <p className="mb-3 text-xs font-bold text-[var(--ink)]">
                    {selectedCountry.review.client}
                  </p>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    <div>
                      <dt className="text-[var(--muted)] font-medium">Turnaround</dt>
                      <dd className="mt-0.5 text-[var(--ink)] font-semibold">{selectedCountry.review.duration}</dd>
                    </div>
                    <div>
                      <dt className="text-[var(--muted)] font-medium">Scope</dt>
                      <dd className="mt-0.5 text-[var(--ink)] font-semibold">{selectedCountry.review.scope}</dd>
                    </div>
                    <div className="col-span-2 pt-1">
                      <dt className="mb-1.5 text-[var(--muted)] font-medium">Focus Areas</dt>
                      <dd className="flex flex-wrap gap-1.5">
                        {selectedCountry.review.services.map((service) => (
                          <span
                            className="rounded-full border border-[var(--line)] bg-[var(--surface-soft)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--muted)]"
                            key={service}
                          >
                            {service}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col justify-center rounded-xl border border-dashed border-[var(--line)] bg-[var(--surface-soft)]/50 p-6 text-center">
                <MapPin aria-hidden="true" className="mb-2 text-[var(--lime)] mx-auto" size={24} />
                <p className="text-sm font-semibold text-[var(--ink)]">{selectedCountry.name} Portfolio Reach</p>
                <p className="mt-1 text-xs text-[var(--muted)] leading-relaxed">
                  International workflow automation delivered for clients in {selectedCountry.name}. Contact to discuss tailored requirements.
                </p>
              </div>
            )}

            <a
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--ink)] hover:text-[var(--lime)] transition-colors"
              href="#contact"
            >
              Start a project in {selectedCountry.name} <ArrowUpRight aria-hidden="true" size={14} />
            </a>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
