import {
  ArrowDownRight,
  BarChart3,
  ArrowUpRight,
  Check,
  Clipboard,
  Code2,
  Database,
  FileSpreadsheet,
  FileText,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Menu,
  Moon,
  Play,
  Quote,
  Sparkles,
  Sun,
  Workflow,
  X,
} from "lucide-react";
import { FormEvent, MouseEvent, useState } from "react";

type Theme = "light" | "dark";

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
  { number: "04", title: "Acrobat Pro Fillable PDFs & Data Extraction", description: "Smart fillable forms, automated data parsing between Excel, Word, and PDF, and secure document workflows.", tags: ["Adobe Acrobat Pro", "Acrobat JavaScript", "PDF to Excel"], icon: "pdf" },
];

const clientMarks = [
  { name: "Lawlift GmbH", src: "/manus-storage/lawlift-gmbh_92163cdb.jpg" },
  { name: "Pensions and Annuities Limited", src: "/manus-storage/pensions-annuities-limited_b1d81541.png" },
  { name: "Pontal Brazil", src: "/manus-storage/pontalbrazil_1c38ade8.png" },
  { name: "Wireless Tower Solutions", src: "/manus-storage/wireless-tower-solutions_114aec62.png" },
];
const reviewScreenshots = [
  { name: "compwi", src: "/manus-storage/compwi_1e586993.png" },
  { name: "deangwilliamson", src: "/manus-storage/deangwilliamson_7bfb41c1.png" },
  { name: "dhunter_editor", src: "/manus-storage/dhunter_editor_ac0fb1aa.png" },
  { name: "gordgoodfellow", src: "/manus-storage/gordgoodfellow_419c657a.png" },
  { name: "mary00harrison", src: "/manus-storage/mary00harrison_267a4532.png" },
  { name: "muktarali320", src: "/manus-storage/muktarali320_d9c6368f.png" },
  { name: "weaver_nicole", src: "/manus-storage/weaver_nicole_a7d4caac.png" },
];

function LogoMark({ logo }: { logo: (typeof clientMarks)[number] }) {
  return (
    <div className="client-mark" title={logo.name} aria-label={`Client logo: ${logo.name}`}>
      <img src={logo.src} alt="" />
      <span className="client-mark-name">{logo.name}</span>
    </div>
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

function StatsStrip() {
  const stats = [
    ["375+", "commercial projects delivered"],
    ["175+", "international clients"],
    ["100%", "job success & verified seller"],
    ["MBA", "finance + workflow automation"],
  ];
  return <section className="stats-strip" aria-label="Professional results"><div className="section-wrap stats-grid">{stats.map(([value, label]) => <div className="stat-item" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>;
}

function ServicesSection() {
  const icons = { excel: FileSpreadsheet, dashboard: BarChart3, word: FileText, pdf: Clipboard };
  return <section className="services-section section-wrap" id="services">
    <div className="section-heading"><div><span className="section-index">01 / Core services</span><h2>Office work,<br /><em>made operational.</em></h2></div><p>Specialist automation for teams that need fewer handoffs, cleaner data, and reliable output inside the tools they already use.</p></div>
    <div className="services-grid">{services.map((service) => { const Icon = icons[service.icon as keyof typeof icons]; return <article className="service-card" key={service.number}><div className="service-top"><span className="service-number">{service.number}</span><Icon size={22} /></div><h3>{service.title}</h3><p>{service.description}</p><div className="tag-list">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>; })}</div>
  </section>;
}

function ReviewGallery() {
  return (
    <section className="reviews-section section-wrap" id="reviews">
      <div className="section-heading reviews-heading">
        <div><span className="section-index">02 / Client reviews</span><h2>Good work,<br /><em>said better.</em></h2></div>
        <p>Real feedback from Fiverr and Upwork clients — shown as proof of how the work feels to use, not just how it is built.</p>
      </div>
      <div className="review-gallery">
        {reviewScreenshots.map((review) => (
          <article className="review-card" key={review.name} title={`Fiverr review from ${review.name}`}>
            <div className="review-screenshot-slot"><img src={review.src} alt={`Fiverr review from ${review.name}`} /><span className="review-hover-name">{review.name}</span></div>
            <div className="review-caption"><Quote size={16} /><span>Fiverr review · {review.name}</span></div>
          </article>
        ))}
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

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
          <a href="#work" onClick={(event) => smoothScrollTo(event, "work")}>Selected work</a>
          <a href="#reviews" onClick={(event) => smoothScrollTo(event, "reviews")}>Reviews</a>
          <a href="#contact" onClick={(event) => smoothScrollTo(event, "contact")}>Contact</a>
        </nav>
        <div className="header-actions">
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            <span>{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
          <a className="header-cta" href="#contact" onClick={(event) => smoothScrollTo(event, "contact")}>Let's talk <ArrowUpRight size={16} /></a>
        </div>
      </header>

      <main id="top">
        <section className="hero-section section-wrap">
          <div className="hero-copy">
            <div className="availability"><span className="pulse-dot" /> Available for freelance projects</div>
            <p className="hero-kicker">Muhammad Bilal · Excel VBA, VSTO & Office Automation Specialist · MBA in Finance</p>
            <h1>Custom Excel Add-Ins,<br /><em>VBA Macros & Workflow Automation</em></h1><p className="hero-subhead">Built for enterprise speed & accuracy.</p>
            <p className="hero-description">Helping businesses eliminate manual data entry, automate complex reports, and build professional desktop Office extensions. Over 375+ successful projects delivered worldwide.</p>
            <div className="hero-actions hero-actions-stacked">
              <a className="button button-primary" href="#contact" onClick={(event) => smoothScrollTo(event, "contact")}>Start a Project <ArrowUpRight size={18} /></a>
              <a className="button button-secondary" href="https://upwork.com/freelancers/muhammadbilal88" target="_blank" rel="noreferrer">Hire on Upwork <ArrowUpRight size={16} /></a>
              <a className="button button-secondary" href="https://www.fiverr.com/s/d0DyPYZ" target="_blank" rel="noreferrer">Order on Fiverr <ArrowUpRight size={16} /></a>
            </div>
            <p className="hero-proofline">Over 375+ successful projects delivered worldwide.</p>
          </div>
          <div className="profile-visual">
            <div className="profile-photo-frame"><img src="/manus-storage/ChatGPT_6c7e1dbf.png" alt="Muhammad Bilal, freelance software and workflow automation developer" /></div>
            <div className="profile-label"><span className="pulse-dot" /> Muhammad Bilal <small>Excel + Office automation</small></div>
            <div className="profile-stat"><strong>MBA</strong><span>finance<br />+ Office<br />automation</span></div>
          </div>
        </section>

        <StatsStrip />

        <section className="trusted-strip clients-strip" aria-label="Featured client logos">
          <div className="section-wrap trusted-inner">
            <span className="trusted-label">Featured clients<br /><small>selected work</small></span>
            <div className="client-marks">
              {clientMarks.map((logo) => <LogoMark key={logo.name} logo={logo} />)}
            </div>
          </div>
        </section>

        <ServicesSection />

        <ReviewGallery />

        <section className="work-section section-wrap" id="work">
          <div className="section-heading work-heading">
            <div><span className="section-index">03 / Featured case studies</span><h2>Proof, not promises.</h2></div>
            <p>Enterprise-minded Office automation that turns messy inputs into consistent, measurable output.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <div className="contact-intro"><span className="section-index">05 / Instant connect</span><h2>Have a workflow<br /><em>worth fixing?</em></h2><p>Share the process, tools, and timeline. I will come back with a practical route to a faster, more accurate workflow.</p><div className="quick-connect" aria-label="Quick connect options">
              <div className="email-connect"><span className="channel-logo channel-gmail"><Mail size={16} /></span><span><strong>Business email</strong><small>ibn.e.ashiq@gmail.com</small></span><button type="button" className="copy-email" onClick={copyEmail}>{copiedEmail ? <><Check size={14} /> Copied</> : <><Clipboard size={14} /> Copy</>}</button></div>
              <a className="contact-channel" href="https://upwork.com/freelancers/muhammadbilal88" target="_blank" rel="noreferrer"><span className="channel-logo channel-upwork">U</span><span><strong>Upwork Direct Hire</strong><small>Hire through marketplace escrow</small></span><ArrowUpRight size={15} /></a>
              <a className="contact-channel" href="https://www.fiverr.com/s/d0DyPYZ" target="_blank" rel="noreferrer"><span className="channel-logo channel-fiverr">F</span><span><strong>Fiverr Direct Order</strong><small>Order a focused automation gig</small></span><ArrowUpRight size={15} /></a>
            </div></div>
          <div className="form-card">
            {submitted ? <div className="success-state"><span className="success-icon"><Check size={22} /></span><h3>Message received.</h3><p>Thanks — you will be contacted shortly with possible options and a practical solution.</p><button className="text-link" type="button" onClick={() => setSubmitted(false)}>Send another message <ArrowUpRight size={16} /></button></div> : <form onSubmit={handleSubmit}>
              <input type="hidden" name="_subject" value="New portfolio project inquiry" /><input type="hidden" name="_template" value="table" /><input type="hidden" name="_captcha" value="false" />
              <div className="form-row"><label>Name<input name="name" type="text" placeholder="Your name" required /></label><label>Email<input name="email" type="email" placeholder="you@company.com" required aria-invalid={Boolean(emailError)} onBlur={(event) => setEmailError(validateEmail(event.target.value))} onChange={(event) => setEmailError(validateEmail(event.target.value))} />{emailError && <span className="field-error" role="alert">{emailError}</span>}</label></div>
              <label>Service needed<select name="serviceNeeded" defaultValue="" required><option value="" disabled>Select a service</option><option>Custom Excel / VSTO Add-in</option><option>MS Word Macro</option><option>Business Dashboard</option><option>Fillable PDF / Other</option></select></label>
              <label>Project description & timeline<textarea name="description" rows={5} placeholder="What needs automating, and when would you like it ready?" required /></label>
              <button className="button button-primary form-submit" type="submit" disabled={submitting}>{submitting ? <><span className="submit-spinner" aria-hidden="true" /> Sending…</> : <>Send project brief <ArrowUpRight size={18} /></>}</button>
              <p className="form-note">You stay on this page. Your details go directly to Muhammad.</p>{submitError && <p className="form-error" role="alert">{submitError} <a href="https://wa.me/923462116322" target="_blank" rel="noreferrer">Open WhatsApp</a></p>}
            </form>}
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap"><div className="footer-brand"><span className="brand-initial">MB</span><span>© 2026 Muhammad Bilal</span></div><span className="footer-note">Excel, Office, and workflow systems that give good work room to breathe.</span><div className="footer-links"><a href="mailto:ibn.e.ashiq@gmail.com" aria-label="Email Muhammad Bilal"><Mail size={17} /></a><a href="https://www.facebook.com/ibn.ashiq/" target="_blank" rel="noreferrer" aria-label="Facebook"><span className="social-letter">f</span></a><a href="https://www.linkedin.com/in/bilalashiq/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a><a href="https://wa.me/923462116322" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={17} /></a><Github size={17} aria-hidden="true" /></div></footer>
    </div>
  );
}
