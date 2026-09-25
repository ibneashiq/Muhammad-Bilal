import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Code2,
  Database,
  FileSpreadsheet,
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
    eyebrow: "Business intelligence",
    title: "Dynamic Excel BI Dashboard",
    description:
      "Turned scattered operational data into a decision-ready dashboard with refreshable KPIs, trend views, and drill-down reporting.",
    tags: ["Excel", "Power Query", "VBA", "Data Viz"],
    accent: "lime",
    visual: "dashboard",
    review:
      "Muhammad turned a messy reporting process into something our team actually enjoys using. Clear, fast, and extremely well thought through.",
    reviewer: "Operations lead · Fiverr",
  },
  {
    number: "02",
    eyebrow: "Microsoft 365 extension",
    title: "Custom C# VSTO Add-in for Word",
    description:
      "Removed repetitive document setup with a branded Word add-in that validates content, inserts approved blocks, and exports clean deliverables.",
    tags: ["C#", ".NET", "VSTO", "Visual Studio"],
    accent: "blue",
    visual: "word",
    review:
      "The add-in saves our team hours every week. Bilal understood the workflow quickly and delivered a polished tool with great communication.",
    reviewer: "Agency founder · Fiverr",
  },
  {
    number: "03",
    eyebrow: "Workflow automation",
    title: "Automated Data Processing Macro",
    description:
      "Replaced a manual, error-prone handoff with a one-click macro that cleans files, maps fields, and prepares the next system upload.",
    tags: ["VBA", "Excel", "Automation", "CSV"],
    accent: "orange",
    visual: "macro",
    review:
      "Exactly what I needed: reliable automation that works for the people using it, not just a clever script. Would absolutely hire again.",
    reviewer: "Finance manager · Fiverr",
  },
  {
    number: "04",
    eyebrow: "Desktop productivity",
    title: "C# Desktop Operations Console",
    description:
      "Built a focused .NET desktop app that gives a small team one place to run jobs, inspect exceptions, and export audit-ready results.",
    tags: ["C#", ".NET", "WinForms", "SQL"],
    accent: "violet",
    visual: "console",
    review:
      "A dependable application that feels much bigger than the brief. The process was smooth and the final result is already part of our daily work.",
    reviewer: "Project manager · Fiverr",
  },
];

const clientMarks = ["NORTHSTAR", "PIVOT / CO", "KINETIC", "FIELDNOTE", "MERIDIAN"];

function LogoMark({ name }: { name: string }) {
  return (
    <div className="client-mark" aria-label={`Placeholder client logo: ${name}`}>
      <span className="mark-dot" aria-hidden="true" />
      <span>{name}</span>
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
        <p>{project.description}</p>
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const error = validateEmail(email.value);
    setEmailError(error);
    if (error) {
      event.preventDefault();
      email.focus();
      return;
    }

    setSubmitting(true);
    // FORM HANDOFF: FormSubmit posts the four form fields to your inbox and
    // redirects to its hosted confirmation page after a successful send.
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
          <a href="#approach" onClick={(event) => smoothScrollTo(event, "approach")}>Approach</a>
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
            <p className="hero-kicker">Freelance software & workflow automation developer</p>
            <h1>Less busywork.<br /><em>More momentum.</em></h1>
            <p className="hero-description">I build practical automation systems, custom Office tools, and business intelligence dashboards that make complex work feel simple.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work" onClick={(event) => smoothScrollTo(event, "work")}>See the work <ArrowDownRight size={18} /></a>
              <a className="text-link" href="#contact" onClick={(event) => smoothScrollTo(event, "contact")}>Start a project <ArrowUpRight size={17} /></a>
            </div>
            <div className="hero-proof"><span><Check size={15} /> Office automation</span><span><Check size={15} /> Custom software</span><span><Check size={15} /> Decision-ready BI</span></div>
          </div>
          <AutomationGraphic />
        </section>

        <section className="trusted-strip" aria-label="Trusted by placeholder client logos">
          <div className="section-wrap trusted-inner">
            <span className="trusted-label">Trusted by teams that value clarity</span>
            <div className="client-marks">
              {/* LOGO SWAP ZONE: Replace these text marks with your real SVG/PNG
                  client logos. Keep them monochrome for a restrained look. */}
              {clientMarks.map((mark) => <LogoMark key={mark} name={mark} />)}
            </div>
          </div>
        </section>

        <section className="work-section section-wrap" id="work">
          <div className="section-heading work-heading">
            <div><span className="section-index">01 / Selected work</span><h2>Proof, not promises.</h2></div>
            <p>Real-world automation shaped around how teams already work — with just enough craft to make it feel effortless.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
          </div>
        </section>

        <section className="approach-section" id="approach">
          <div className="section-wrap approach-grid">
            <div className="approach-intro"><span className="section-index">02 / The approach</span><h2>Built for the messy middle.</h2><p>Most teams do not need more software. They need the right parts of their existing work to connect.</p></div>
            <div className="approach-list">
              <div className="approach-item"><span>01</span><div><h3>Map the friction</h3><p>We find the repetitive handoffs, hidden rework, and manual decisions slowing the team down.</p></div></div>
              <div className="approach-item"><span>02</span><div><h3>Build the useful bit</h3><p>A focused tool or workflow that fits the existing stack instead of asking everyone to start over.</p></div></div>
              <div className="approach-item"><span>03</span><div><h3>Leave it understandable</h3><p>Documented logic, clean interfaces, and handover-ready code your team can keep using.</p></div></div>
            </div>
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <div className="contact-intro"><span className="section-index">03 / Start a conversation</span><h2>Have a workflow<br /><em>worth fixing?</em></h2><p>Tell me what is slowing your team down. I will come back with a clear first step — no jargon, no bloated proposal.</p><div className="contact-aside"><Mail size={17} /><a href="mailto:ibn.e.ashiq@gmail.com">ibn.e.ashiq@gmail.com</a></div><div className="contact-aside"><MessageCircle size={17} /><a href="https://wa.me/923462116322" target="_blank" rel="noreferrer">WhatsApp: +92 346 2116322</a></div></div>
          <div className="form-card">
            {submitted ? <div className="success-state"><span className="success-icon"><Check size={22} /></span><h3>Message received.</h3><p>Thanks for reaching out. In the live version, this is where your preferred email delivery or CRM handoff will connect.</p><button className="text-link" type="button" onClick={() => setSubmitted(false)}>Send another message <ArrowUpRight size={16} /></button></div> : <form action="https://formsubmit.co/ibn.e.ashiq@gmail.com" method="POST" onSubmit={handleSubmit}>
              <input type="hidden" name="_subject" value="New portfolio project inquiry" /><input type="hidden" name="_template" value="table" /><input type="hidden" name="_captcha" value="false" />
              <div className="form-row"><label>Name<input name="name" type="text" placeholder="Your name" required /></label><label>Email<input name="email" type="email" placeholder="you@company.com" required aria-invalid={Boolean(emailError)} onBlur={(event) => setEmailError(validateEmail(event.target.value))} onChange={(event) => setEmailError(validateEmail(event.target.value))} />{emailError && <span className="field-error" role="alert">{emailError}</span>}</label></div>
              <label>Project type<select name="projectType" defaultValue="" required><option value="" disabled>Select one</option><option>Excel / Office automation</option><option>Custom C# / .NET software</option><option>BI dashboard</option><option>Office add-in</option><option>Something else</option></select></label>
              <label>Description<textarea name="description" rows={5} placeholder="What would you like to make easier?" required /></label>
              <button className="button button-primary form-submit" type="submit" disabled={submitting}>{submitting ? <><span className="submit-spinner" aria-hidden="true" /> Sending…</> : <>Send project brief <ArrowUpRight size={18} /></>}</button>
              <p className="form-note">Four fields. One useful conversation. No budget question.</p>
            </form>}
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap"><div className="footer-brand"><span className="brand-initial">MB</span><span>© 2026 Muhammad Bilal</span></div><span className="footer-note">Software that gives good work room to breathe.</span><div className="footer-links"><a href="mailto:ibn.e.ashiq@gmail.com" aria-label="Email Muhammad Bilal"><Mail size={17} /></a><a href="https://www.facebook.com/ibn.ashiq/" target="_blank" rel="noreferrer" aria-label="Facebook"><span className="social-letter">f</span></a><a href="https://www.linkedin.com/in/bilalashiq/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a><a href="https://wa.me/923462116322" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={17} /></a><Github size={17} aria-hidden="true" /></div></footer>
    </div>
  );
}
