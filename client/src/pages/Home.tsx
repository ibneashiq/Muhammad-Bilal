import {
  ArrowDownRight,
  BarChart3,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Check,
  Clipboard,
  Code2,
  Database,
  FileSpreadsheet,
  FileText,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Menu,
  Moon,
  Palette,
  Play,
  Quote,
  Send,
  Sparkles,
  Sun,
  Waves,
  Youtube,
  Workflow,
  X,
} from "lucide-react";
import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import serviceDashboardImage from "../assets/service-financial-dashboards.jpg";
import serviceAddinImage from "../assets/service-excel-addins.jpg";
import globalReachGif from "../assets/global-reach.gif";
import globalReachPoster from "../assets/global-reach-poster.jpg";
import upworkLogo from "../assets/upwork-icon.svg";
import fiverrLogo from "../assets/fiverr-icon.jpg";

type Theme = "light" | "dark" | "warm" | "cool";
type CarouselDirection = "normal" | "reverse";

type HomeProps = {
  theme: Theme;
  toggleTheme: () => void;
};

// PROJECT CONTENT: Replace the sample copy, metrics, and review text with your
// real client work. Keep the structure so each case study stays scannable.
const projects = [
  {
    number: "01",
    eyebrow: "Melbourne Geotech · Excel automation",
    title: "Engineering Report Generation Tool",
    description: "Manual assembly of soil and foundation data was slow and exposed the team to calculation errors.",
    solution: "Built a customized Excel macro application with an intuitive UserForm and one-click PDF publishing.",
    impact: "Cut report preparation from hours to under 5 minutes with 100% calculation consistency.",
    tags: ["Excel VBA", "UserForms", "PDF Publishing", "Engineering"],
    accent: "lime",
    visual: "dashboard",
    review: "Outstanding experience working with MBA. Exceptional attention to detail, seamless communication, and top-notch quality.",
    reviewer: "Fiverr client · United Kingdom",
  },
  {
    number: "02",
    eyebrow: "Kalpa NL · Word + Excel pipeline",
    title: "Automated EAN Barcode Mail Merge System",
    description: "Thousands of product packaging records required repeated manual formatting and quality checks.",
    solution: "Programmed an automated Word–Excel mail merge pipeline supporting dynamic EAN generation.",
    impact: "Reduced turnaround time by 80% and earned a client bonus on Upwork for exceptional execution.",
    tags: ["Word VBA", "Excel VBA", "EAN / Barcode", "Mail Merge"],
    accent: "blue",
    visual: "word",
    review: "He was professional, responsive, and accommodating. He understood my needs and created the right solution to meet them.",
    reviewer: "Upwork client · Netherlands",
  },
  {
    number: "03",
    eyebrow: "Scriptomat · Word add-in stabilization",
    title: "Enterprise Word Add-In Stabilization",
    description: "A legacy Microsoft Word add-in suffered from formatting bugs and cross-version instability.",
    solution: "Debugged and refactored VBA code modules, optimizing the text replacement and formatting logic.",
    impact: "Successfully deployed the update with zero regressions reported by active end-users.",
    tags: ["Word VBA", "Debugging", "Text Processing", "Add-in QA"],
    accent: "orange",
    visual: "macro",
    review: "I thought my issues with using Word for Mac would be difficult, but he figured out how to make it work. He exceeded expectations.",
    reviewer: "Fiverr client · United States",
  },
  {
    number: "04",
    eyebrow: "Finance operations · reconciliation",
    title: "Financial Automation & QuickBooks Data Pipeline",
    description: "Repetitive data re-entry between accounting spreadsheets and ERP tools consumed valuable weekly hours.",
    solution: "Automated a workbook pipeline with reconciliation rules, audit checks, and data validation checkpoints.",
    impact: "Replaced 10+ hours of weekly manual bookkeeping with dependable automated validation.",
    tags: ["Excel BI", "Power Query", "QuickBooks", "Audit Checks"],
    accent: "violet",
    visual: "console",
    review: "Thank you very much Muhammad.",
    reviewer: "Upwork client · 5.0/5 review",
  },
];

const services = [
  { number: "01", title: "Custom Excel Add-Ins & VSTO Development", description: "Bespoke desktop tools, custom ribbon tabs, UserForms, and COM extensions that operate seamlessly inside Microsoft Excel.", tags: ["VSTO", ".xlsm", "Ribbon XML", "UserForm GUI", "C# / VB.NET"], icon: "excel" },
  { number: "02", title: "Interactive Business & Financial Dashboards", description: "Automated KPI trackers, dynamic pivot reports, and financial models built with deep accounting rigor, backed by an MBA in Finance.", tags: ["Power Query", "Financial Modeling", "KPI Dashboards", "QuickBooks"], icon: "dashboard" },
  { number: "03", title: "MS Word & Document Assembly Automation", description: "High-speed VBA macros for batch text cleaning, complex spintax processing, transcript formatting, and barcode/EAN mail merges.", tags: ["Word VBA", "Bulk Formatting", "Mail Merge", "Regex Scripting"], icon: "word" },
];

const serviceIllustrations: Record<string, { src: string; alt: string }> = {
  "01": { src: serviceAddinImage, alt: "Excel add-in development, custom tools, and data automation illustration" },
  "02": { src: serviceDashboardImage, alt: "Business dashboard, financial reporting, and secure workflow illustration" },
};

type ClientLogo = { name: string; src: string; country?: string; flag?: string };
type ReviewScreenshot = { name: string; src: string };

const logoAssets = import.meta.glob<string>("../assets/logos/*.{png,jpg,jpeg,webp,svg}", {
  eager: true,
  query: "?url",
  import: "default",
});
const reviewAssets = import.meta.glob<string>("../assets/reviews/*.{png,jpg,jpeg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});
const flagAssets = import.meta.glob<string>("../assets/flags/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});
const flagsByCountryCode = Object.fromEntries(
  Object.entries(flagAssets).map(([filePath, src]) => [
    (filePath.split("/").pop() ?? "").replace(/\.svg$/i, "").toLowerCase(),
    src,
  ]),
);

function getAssetName(filePath: string) {
  const fileName = filePath.split("/").pop() ?? "";
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .split(" ")
    .map((word) => word.toLowerCase() === "gmbh" ? "GmbH" : `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

function getLogoCountry(countryCode: string) {
  if (!/^[a-z]{2}$/i.test(countryCode)) return undefined;
  const code = countryCode.toLowerCase();
  const flag = flagsByCountryCode[code];
  if (!flag) return undefined;

  const country = new Intl.DisplayNames(["en"], { type: "region" }).of(code.toUpperCase());
  if (!country || country.toLowerCase() === code || country === "Unknown Region") return undefined;

  return { country, flag };
}

const clientMarks: ClientLogo[] = Object.entries(logoAssets)
  .map(([filePath, src]) => {
    const slug = (filePath.split("/").pop() ?? "").replace(/\.[^.]+$/, "");
    const [countryCode, ...companySlug] = slug.split("-");
    const countryDetails = getLogoCountry(countryCode);
    const name = getAssetName(countryDetails ? companySlug.join("-") : slug);
    return { name, src, ...countryDetails };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const reviewScreenshots: ReviewScreenshot[] = Object.entries(reviewAssets)
  .map(([filePath, src]) => ({ name: getAssetName(filePath), src }))
  .sort((a, b) => a.name.localeCompare(b.name));

function advanceCarousel(
  track: HTMLDivElement | null,
  viewport: HTMLDivElement | null,
  direction: CarouselDirection,
  frameRef: { current: number | undefined },
) {
  if (!track || !viewport) return;

  const animation = track.getAnimations()[0];
  const duration = animation?.effect?.getComputedTiming().duration;
  const cycleWidth = track.scrollWidth / 2;
  const firstCard = track.firstElementChild as HTMLElement | null;

  if (!animation || typeof duration !== "number" || !cycleWidth || !firstCard) {
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    viewport.scrollBy({
      left: (direction === "normal" ? 1 : -1) * ((firstCard?.getBoundingClientRect().width ?? 0) + gap),
      behavior: "smooth",
    });
    return;
  }

  if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current);

  const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
  const distance = firstCard.getBoundingClientRect().width + gap;
  const delta = duration * distance / cycleWidth;
  let from = typeof animation.currentTime === "number" ? animation.currentTime : 0;
  let startedAt: number | undefined;
  const currentDirection = animation.effect?.getTiming().direction;

  animation.pause();
  if (currentDirection !== direction) {
    from = (Math.floor(from / duration) + 1) * duration - (from % duration);
    animation.currentTime = from;
  }
  animation.effect?.updateTiming({ direction });
  animation.playbackRate = 1;
  const to = from + delta;

  const animateStep = (timestamp: number) => {
    if (startedAt === undefined) startedAt = timestamp;
    const progress = Math.min((timestamp - startedAt) / 420, 1);
    const easedProgress = 1 - (1 - progress) ** 3;
    animation.currentTime = from + (to - from) * easedProgress;

    if (progress < 1) {
      frameRef.current = requestAnimationFrame(animateStep);
      return;
    }

    frameRef.current = undefined;
    animation.play();
  };

  frameRef.current = requestAnimationFrame(animateStep);
}

function LogoMark({ logo, duplicate = false }: { logo: ClientLogo; duplicate?: boolean }) {
  return (
    <div className="client-mark" title={logo.name} aria-label={duplicate ? undefined : `Client logo: ${logo.name}`} aria-hidden={duplicate || undefined}>
      <img src={logo.src} alt="" />
      <span className="client-mark-name">{logo.name}</span>
      {logo.country && logo.flag && <span className="client-country"><img className="client-country-flag" src={logo.flag} alt="" /><span>{logo.country}</span></span>}
    </div>
  );
}

function FeaturedClients() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => () => {
    if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <section className="trusted-strip clients-strip" id="featured-clients" aria-labelledby="featured-clients-heading">
      <div className="section-wrap trusted-inner">
        <h2 className="trusted-label" id="featured-clients-heading">Featured clients</h2>
        <div className="client-carousel">
          <button className="client-carousel-control client-carousel-control-prev" type="button" aria-label="Show previous featured client" title="Previous client" onClick={() => advanceCarousel(trackRef.current, viewportRef.current, "reverse", frameRef)}>
            <ChevronLeft size={19} aria-hidden="true" />
          </button>
          <div className="client-marquee" role="region" aria-label="Featured client companies" ref={viewportRef}>
            <div className="client-marks" ref={trackRef}>
              {clientMarks.map((logo) => <LogoMark key={logo.src} logo={logo} />)}
              {clientMarks.map((logo) => <LogoMark key={`${logo.src}-duplicate`} logo={logo} duplicate />)}
            </div>
          </div>
          <button className="client-carousel-control client-carousel-control-next" type="button" aria-label="Show next featured client" title="Next client" onClick={() => advanceCarousel(trackRef.current, viewportRef.current, "normal", frameRef)}>
            <ChevronRight size={19} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

function GlobalReachSection() {
  return (
    <section className="global-reach section-wrap" id="global-reach" aria-labelledby="global-reach-heading">
      <div className="global-reach-heading">
        <p className="section-index">Worldwide reach</p>
        <h2 id="global-reach-heading">Trusted beyond<br /><em>borders.</em></h2>
      </div>
      <figure className="global-reach-visual" aria-hidden="true">
        <picture>
          <source media="(prefers-reduced-motion: reduce)" srcSet={globalReachPoster} />
          <img className="global-reach-map" src={globalReachGif} alt="" loading="lazy" decoding="async" />
        </picture>
      </figure>
    </section>
  );
}

function AutomationGraphic() {
  return (
    <div className="automation-graphic" aria-label="Illustration of connected business automation steps">
      <div className="graphic-scanline" />
      <div className="graphic-caption">
        <span className="pulse-dot" />
        AUTOMATION SYSTEM / ONLINE
      </div>
      <div className="node node-source">
        <span className="node-kicker">INPUT</span>
        <strong>Excel</strong>
        <small>raw operations data</small>
      </div>
      <div className="node node-process">
        <span className="node-kicker">PROCESS</span>
        <Workflow size={18} />
        <strong>Rules + logic</strong>
        <small>clean / validate / route</small>
      </div>
      <div className="node node-output">
        <span className="node-kicker">OUTPUT</span>
        <Sparkles size={18} />
        <strong>Better decisions</strong>
        <small>reports people trust</small>
      </div>
      <svg className="graphic-lines" viewBox="0 0 540 370" fill="none" aria-hidden="true">
        <path d="M167 164H201C214 164 221 157 221 144V110H246" />
        <path d="M361 110H392C409 110 409 179 426 179H455" />
        <path d="M361 225H393C410 225 410 179 426 179" />
        <circle cx="221" cy="144" r="4" />
        <circle cx="410" cy="179" r="4" />
      </svg>
      <div className="graphic-footer">
        <span>VBA</span><span>C#</span><span>OFFICE.JS</span><span>BI</span>
      </div>
    </div>
  );
}

function VideoPlaceholder({ visual, accent }: { visual: string; accent: string }) {
  const visualCopy: Record<string, { label: string; code: string }> = {
    dashboard: { label: "dashboard-preview.xlsx", code: "refresh_kpis()" },
    word: { label: "word-addin / review", code: "InsertApprovedBlock()" },
    macro: { label: "data-cleaner.xlsm", code: "MapColumns → Export" },
    console: { label: "ops-console.exe", code: "RunBatchJob()" },
  };
  const copy = visualCopy[visual];

  return (
    <div className={`video-placeholder video-${accent}`}>
      {/* VIDEO DROP ZONE: Replace this entire placeholder with a <video> tag or
          a Loom/Vimeo embed. Keep the .video-frame aspect ratio for consistency. */}
      <div className="video-topbar">
        <span className="window-dots"><i /><i /><i /></span>
        <span>{copy.label}</span>
        <span className="video-time">00:00 / 01:24</span>
      </div>
      <div className="video-frame">
        {visual === "dashboard" && (
          <div className="mini-dashboard">
            <div className="mini-kpi-row"><span /><span /><span /></div>
            <div className="mini-chart"><i /><i /><i /><i /><i /><i /></div>
            <div className="mini-table"><span /><span /><span /><span /></div>
          </div>
        )}
        {visual === "word" && (
          <div className="mini-document"><div className="mini-toolbar"><b /> <b /> <b /> <b /></div><span className="doc-line wide" /><span className="doc-line" /><span className="doc-line medium" /><span className="doc-highlight" /><span className="doc-line wide" /><span className="doc-line short" /></div>
        )}
        {visual === "macro" && (
          <div className="mini-code"><span><em>01</em> Sub ProcessFiles()</span><span><em>02</em> CleanColumns ws</span><span><em>03</em> MapHeaders source</span><span className="code-active"><em>04</em> ExportReadyFile</span><span><em>05</em> End Sub</span></div>
        )}
        {visual === "console" && (
          <div className="mini-console"><span><b>●</b> batch_042 / complete</span><span><b>●</b> batch_043 / running</span><span><b>●</b> batch_044 / queued</span><div className="console-progress"><i /></div></div>
        )}
        <button className="play-button" type="button" aria-label={`Play ${copy.label} demo`}>
          <Play fill="currentColor" size={17} />
        </button>
      </div>
      <div className="video-caption"><span><span className="live-dot" /> DEMO PLACEHOLDER</span><span>{copy.code}</span></div>
    </div>
  );
}

function ServicesSection() {
  const icons = { excel: FileSpreadsheet, dashboard: BarChart3, word: FileText };
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | undefined>(undefined);

  return <section className="services-section section-wrap" id="services">
    <div className="services-intro">
      <div className="services-copy">
        <div className="section-heading"><div><h2>Office work,<br /><em>made operational.</em></h2></div></div>
        <p>Specialist automation for teams that need fewer handoffs, cleaner data, and reliable output inside the tools they already use.</p>
      </div>
    </div>
    <div className="services-carousel">
      <button className="client-carousel-control services-carousel-control-prev" type="button" aria-label="Show previous service" title="Previous service" onClick={() => advanceCarousel(trackRef.current, viewportRef.current, "reverse", frameRef)}>
        <ChevronLeft size={19} aria-hidden="true" />
      </button>
      <div className="services-carousel-viewport" aria-label="Services" ref={viewportRef}>
        <div className="services-grid" ref={trackRef}>
          {services.map((service) => { const Icon = icons[service.icon as keyof typeof icons]; const illustration = serviceIllustrations[service.number]; return <article className="service-card" key={service.number}><div className="service-top"><Icon size={22} /></div><h3>{service.title}</h3>{illustration && <img className="service-illustration" src={illustration.src} alt={illustration.alt} />}<p>{service.description}</p><div className="tag-list">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>; })}
        </div>
      </div>
      <button className="client-carousel-control services-carousel-control-next" type="button" aria-label="Show next service" title="Next service" onClick={() => advanceCarousel(trackRef.current, viewportRef.current, "normal", frameRef)}>
        <ChevronRight size={19} aria-hidden="true" />
      </button>
    </div>
  </section>;
}

function ReviewGallery({ onOpen }: { onOpen: (review: ReviewScreenshot) => void }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => () => {
    if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <section className="reviews-section section-wrap" id="reviews">
      <div className="section-heading reviews-heading">
        <div><h2>Good work,<br /><em>said better.</em></h2></div>
        <p>Real feedback from Fiverr and Upwork clients — shown as proof of how the work feels to use, not just how it is built.</p>
      </div>
      <div className="review-carousel">
        <button className="client-carousel-control review-carousel-control-prev" type="button" aria-label="Show previous client review" title="Previous review" onClick={() => advanceCarousel(trackRef.current, viewportRef.current, "reverse", frameRef)}>
          <ChevronLeft size={19} aria-hidden="true" />
        </button>
        <div className="review-marquee" aria-label="Fiverr client reviews" ref={viewportRef}>
          <div className="review-track" ref={trackRef}>
            {reviewScreenshots.map((review, index) => (
              <article className="review-card" key={`${review.name}-primary-${index}`} role="button" tabIndex={0} onClick={() => onOpen(review)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onOpen(review); } }}>
                <div className="review-screenshot-slot"><img src={review.src} alt={`Client review from ${review.name}`} /></div>
              </article>
            ))}
            {reviewScreenshots.map((review, index) => (
              <article className="review-card" key={`${review.name}-clone-${index}`} role="presentation" tabIndex={-1} aria-hidden="true" onClick={() => onOpen(review)}>
                <div className="review-screenshot-slot"><img src={review.src} alt="" /></div>
              </article>
            ))}
          </div>
        </div>
        <button className="client-carousel-control review-carousel-control-next" type="button" aria-label="Show next client review" title="Next review" onClick={() => advanceCarousel(trackRef.current, viewportRef.current, "normal", frameRef)}>
          <ChevronRight size={19} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className="project-card">
      <div className="project-card-header">
        <span className={`project-number accent-${project.accent}`}>{project.number}</span>
        <span className="project-eyebrow">{project.eyebrow}</span>
        <ArrowUpRight className="project-arrow" size={20} />
      </div>
      <VideoPlaceholder visual={project.visual} accent={project.accent} />
      <div className="project-copy">
        <h3>{project.title}</h3>
        <div className="case-study-details">
          <div className="case-study-detail"><span>Challenge</span><p>{project.description}</p></div>
          <div className="case-study-detail"><span>Solution</span><p>{project.solution}</p></div>
          <div className="case-study-detail case-study-impact"><span>Impact</span><p>{project.impact}</p></div>
        </div>
        <div className="tag-list" aria-label="Technologies used">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
      <blockquote className="review-block">
        <Quote size={20} />
        <p>“{project.review}”</p>
        <footer>{project.reviewer}</footer>
      </blockquote>
    </article>
  );
}

export default function Home({ theme, toggleTheme }: HomeProps) {
  const heroSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFloatingActions, setShowFloatingActions] = useState(false);
  const [isContactSectionVisible, setIsContactSectionVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ReviewScreenshot | null>(null);

  const validateEmail = (value: string) => {
    if (!value) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  const smoothScrollTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    closeMenu();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const error = validateEmail(email.value);
    setEmailError(error);
    setSubmitError("");
    if (error) {
      email.focus();
      return;
    }

    setSubmitting(true);
    try {
      // FORM HANDOFF: AJAX keeps the visitor on this portfolio page while
      // FormSubmit delivers the form fields to ibn.e.ashiq@gmail.com.
      const response = await fetch("https://formsubmit.co/ajax/26a7b879632aba3a587ed210be5296c0", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error("FormSubmit request failed");
      setSubmitted(true);
      form.reset();
    } catch {
      setSubmitError("The form could not send right now. Please continue on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("ibn.e.ashiq@gmail.com");
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      setSubmitError("Copy is unavailable here. Please email ibn.e.ashiq@gmail.com directly.");
    }
  };

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const heroSection = heroSectionRef.current;
    const contactSection = contactSectionRef.current;
    if (!heroSection || !contactSection) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === heroSection) setShowFloatingActions(!entry.isIntersecting);
        if (entry.target === contactSection) setIsContactSectionVisible(entry.isIntersecting);
      }
    });
    observer.observe(heroSection);
    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedReview) return;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setSelectedReview(null); };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKeyDown); document.body.style.overflow = previousOverflow; };
  }, [selectedReview]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Muhammad Bilal home" onClick={(event) => smoothScrollTo(event, "top")}>
          <span className="brand-initial">MB</span>
          <span className="brand-name">Muhammad Bilal</span>
        </a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a href="#featured-clients" onClick={(event) => smoothScrollTo(event, "featured-clients")}>Clients</a>
          <a href="#services" onClick={(event) => smoothScrollTo(event, "services")}>Services</a>
          <a href="#reviews" onClick={(event) => smoothScrollTo(event, "reviews")}>Reviews</a>
          <a href="#work" onClick={(event) => smoothScrollTo(event, "work")}>Work</a>
          <a href="#contact" onClick={(event) => smoothScrollTo(event, "contact")}>Contact</a>
        </nav>
        <div className="header-actions">
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Current theme: ${theme}. Switch to ${theme === "light" ? "dark" : theme === "dark" ? "warm" : theme === "warm" ? "cool" : "light"} theme`} title={`Current theme: ${theme}`}>
            {theme === "light" ? <Sun size={17} /> : theme === "dark" ? <Moon size={17} /> : theme === "warm" ? <Palette size={17} /> : <Waves size={17} />}
            <span>{theme === "light" ? "Light" : theme === "dark" ? "Dark" : theme === "warm" ? "Warm" : "Cool"}</span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section section-wrap" ref={heroSectionRef}>
          <div className="hero-copy">
            <h1>Turn Your Workflows<br className="hero-title-break" /> into <em>Single-Click</em> Add-in</h1>
            <p className="hero-subhead">Helpful Dashboards, One-Click Add-Ins, Document Automation</p>
            <p className="hero-description">I build custom solutions that automate repetitive tasks, connect applications, streamline documents, and turn complex processes into simple one-click tools.</p>
            <div className="hero-actions hero-actions-stacked">
              <a className="button button-primary" href="#contact" onClick={(event) => smoothScrollTo(event, "contact")}><Send size={16} /> Start a project <ArrowUpRight className="hero-action-arrow" size={15} /></a>
              <a className="button whatsapp-button" href="https://wa.me/923462116322" target="_blank" rel="noreferrer" aria-label="Let's Talk on WhatsApp"><MessageCircle size={17} /> Let's Talk <ArrowUpRight className="hero-action-arrow" size={15} /></a>
            </div>
          </div>
          <div className="profile-visual">
            <div className="profile-photo-frame">
              <img src="/manus-storage/ChatGPT_6c7e1dbf.png" alt="Muhammad Bilal, freelance software and workflow automation developer" />
              <a className="profile-float-tag profile-tag-top-rated" href="#reviews" onClick={(event) => smoothScrollTo(event, "reviews")}><span aria-hidden="true">⚡</span><span className="profile-tag-copy"><strong>Muhammad Bilal</strong><small>Top Rated Automation Specialist</small></span></a>
              <a className="profile-float-tag profile-tag-specialist" href="#services" onClick={(event) => smoothScrollTo(event, "services")}><span className="pulse-dot" aria-hidden="true" /> Automation Specialist <ArrowUpRight size={13} aria-hidden="true" /></a>
              <a className="profile-float-tag profile-tag-availability" href="#contact" onClick={(event) => smoothScrollTo(event, "contact")}><span className="profile-online-dot" aria-hidden="true" /> Available</a>
            </div>
            <div className="profile-metrics" aria-label="Professional results">
              <div className="profile-metric"><strong>375+</strong><span>Commercial projects delivered</span></div>
              <a className="profile-metric" href="#global-reach" onClick={(event) => smoothScrollTo(event, "global-reach")} aria-label="175 plus international clients. Explore global reach"><strong>175+</strong><span>International clients</span></a>
              <div className="profile-metric"><strong>100%</strong><span>Job Success Rate</span></div>
            </div>
          </div>
        </section>

        <FeaturedClients />

        <GlobalReachSection />

        <ServicesSection />

        <ReviewGallery onOpen={setSelectedReview} />

        <section className="work-section section-wrap" id="work">
          <div className="section-heading work-heading">
            <div><h2>Proof, not promises.</h2></div>
            <p>Enterprise-minded Office automation that turns messy inputs into consistent, measurable output.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact" ref={contactSectionRef}>
          <div className="contact-intro"><h2>Have a workflow<br /><em>worth fixing?</em></h2><p>Share the process, tools, and timeline. I will come back with a practical route to a faster, more accurate workflow.</p><div className="quick-connect" aria-label="Quick connect options">
              <div className="email-connect"><span className="channel-logo channel-gmail"><Mail size={16} /></span><span className="email-copy"><strong>Direct Email</strong><small>ibn.e.ashiq@gmail.com</small></span><a className="email-open" href="mailto:ibn.e.ashiq@gmail.com">Email <ArrowUpRight size={13} /></a><button type="button" className="copy-email" onClick={copyEmail}>{copiedEmail ? <><Check size={14} /> Copied</> : <><Clipboard size={14} /> Copy</>}</button></div>
              <a className="contact-channel whatsapp-contact" href="https://wa.me/923462116322" target="_blank" rel="noreferrer"><span className="channel-logo channel-whatsapp"><MessageCircle size={16} /></span><span><strong>WhatsApp me</strong><small>+92 346 2116322 · fastest reply</small></span><ArrowUpRight size={15} /></a>
              <div className="contact-marketplace-row"><a className="contact-channel" href="https://upwork.com/freelancers/muhammadbilal88" target="_blank" rel="noreferrer"><span className="channel-logo channel-upwork"><span className="upwork-icon-wrap"><img className="marketplace-icon upwork-icon" src={upworkLogo} alt="" /></span></span><span><strong>Upwork</strong><small>Direct hire</small></span><ArrowUpRight size={15} /></a><a className="contact-channel" href="https://www.fiverr.com/s/d0DyPYZ" target="_blank" rel="noreferrer"><span className="channel-logo channel-fiverr"><img className="marketplace-icon fiverr-icon" src={fiverrLogo} alt="" /></span><span><strong>Fiverr</strong><small>Direct order</small></span><ArrowUpRight size={15} /></a></div>
            </div></div>
          <div className="form-card">
            {submitted ? <div className="success-state"><span className="success-icon"><Check size={22} /></span><h3>Message received.</h3><p>Thanks — you will be contacted shortly with possible options and a practical solution.</p><button className="text-link" type="button" onClick={() => setSubmitted(false)}>Send another message <ArrowUpRight size={16} /></button></div> : <form onSubmit={handleSubmit}>
              <input type="hidden" name="_subject" value="New portfolio project inquiry" /><input type="hidden" name="_template" value="table" /><input type="hidden" name="_captcha" value="false" />
              <div className="form-row"><label>Name<input name="name" type="text" placeholder="Your name" required /></label><label>Email<input name="email" type="email" placeholder="you@company.com" required aria-invalid={Boolean(emailError)} onBlur={(event) => setEmailError(validateEmail(event.target.value))} onChange={(event) => setEmailError(validateEmail(event.target.value))} />{emailError && <span className="field-error" role="alert">{emailError}</span>}</label></div>
              <label>Service needed<select name="serviceNeeded" defaultValue="" required><option value="" disabled>Select a service</option><option>Custom Excel / VSTO Add-in</option><option>MS Word Macro</option><option>Business Dashboard</option><option>Fillable PDF / Other</option></select></label>
              <label>Project description & timeline<textarea name="description" rows={5} placeholder="What needs automating, and when would you like it ready?" required /></label>
              <button className="button button-primary form-submit" type="submit" disabled={submitting}>{submitting ? <><span className="submit-spinner" aria-hidden="true" /> Sending…</> : <>Send project brief <ArrowUpRight size={18} /></>}</button>
              <p className="form-note">Expect a response and initial project scope within 24 hours.</p>{submitError && <p className="form-error" role="alert">{submitError} <a href="https://wa.me/923462116322" target="_blank" rel="noreferrer">Open WhatsApp</a></p>}
            </form>}
          </div>
        </section>
      </main>

      {showFloatingActions && (
        <div className="floating-actions" aria-label="Quick navigation and contact actions">
          {!isContactSectionVisible && (
            <>
              <a className="floating-action floating-whatsapp" href="https://wa.me/923462116322" target="_blank" rel="noreferrer"><MessageCircle size={18} /><span>WhatsApp</span></a>
              <a className="floating-action floating-project" href="#contact" onClick={(event) => smoothScrollTo(event, "contact")}><Sparkles size={17} /><span>Start a project</span></a>
            </>
          )}
          <button className="floating-action floating-top" type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ChevronUp size={19} /></button>
        </div>
      )}

      {selectedReview && (
        <div className="review-lightbox" role="dialog" aria-modal="true" aria-label={`Full Fiverr review from ${selectedReview.name}`} onClick={() => setSelectedReview(null)}>
          <div className="lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <div className="lightbox-toolbar"><span>Fiverr review · {selectedReview.name}</span><button type="button" className="lightbox-close" aria-label="Close review" onClick={() => setSelectedReview(null)}><X size={22} /></button></div>
            <div className="lightbox-image-wrap"><img src={selectedReview.src} alt={`Full Fiverr review from ${selectedReview.name}`} /></div>
            <p className="lightbox-hint">Click outside or press Esc to close</p>
          </div>
        </div>
      )}

      <footer className="site-footer section-wrap"><div className="footer-brand"><span className="brand-initial">MB</span><span>© 2026 Muhammad Bilal</span></div><span className="footer-note">Excel, Office, and workflow systems that give good work room to breathe.</span><div className="footer-links" aria-label="Social and contact links">
        <a href="mailto:ibn.e.ashiq@gmail.com" aria-label="Email Muhammad Bilal"><Mail size={17} /></a>
        <a href="https://www.facebook.com/ibn.ashiq/" target="_blank" rel="noreferrer" aria-label="Facebook"><span className="social-letter">f</span></a>
        <a href="https://www.instagram.com/ibn.e.ashiq/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} /></a>
        <a href="https://www.linkedin.com/in/bilalashiq/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
        <a href="https://www.youtube.com/@VBAbyMBA" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={17} /></a>
        <a href="https://github.com/ibneashiq" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
        <a href="https://wa.me/923462116322" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={17} /></a>
      </div></footer>
    </div>
  );
}
