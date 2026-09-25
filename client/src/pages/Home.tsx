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
    eyebrow: "Excel + Word intelligence",
    title: "Dynamic Excel & Word Document System",
    description:
      "Connected structured Excel data to polished Word outputs, replacing repetitive document preparation with a repeatable one-click workflow.",
    tags: ["Excel", "VBA", "Word", "Mail Merge"],
    accent: "lime",
    visual: "dashboard",
    review:
      "Outstanding experience working with MBA. Exceptional attention to detail, seamless communication, and top-notch quality.",
    reviewer: "Fiverr client · United Kingdom",
  },
  {
    number: "02",
    eyebrow: "Forms + productivity UI",
    title: "Custom VBA UserForm & Task Dashboard",
    description:
      "Turned a spreadsheet into a focused operations interface with custom forms, modern controls, and clear task visibility for everyday users.",
    tags: ["VBA", "UserForms", "Excel", "UI Design"],
    accent: "blue",
    visual: "word",
    review:
      "He was professional, responsive, and accommodating. He understood my needs and created the right solution to meet them.",
    reviewer: "Fiverr client · Canada",
  },
  {
    number: "03",
    eyebrow: "Cross-app automation",
    title: "Outlook + Excel Contact Processing",
    description:
      "Automated contact extraction and handoffs between Excel and Outlook so teams can move from raw lists to useful outreach data faster.",
    tags: ["Excel", "Outlook", "VBA", "Data Cleaning"],
    accent: "orange",
    visual: "macro",
    review:
      "I thought my issues with using Word for Mac would be difficult, but he figured out how to make it work. He exceeded expectations.",
    reviewer: "Fiverr client · United States",
  },
  {
    number: "04",
    eyebrow: "Business intelligence",
    title: "Automated Excel Dashboard & Data Viz",
    description:
      "Built a KPI-focused Excel BI tool with one-click refresh, interactive views, pivot analysis, and support for messy CSV, JSON, and API data.",
    tags: ["Excel", "Power Query", "Dashboards", "Data Analysis"],
    accent: "violet",
    visual: "console",
    review:
      "Thank you very much Muhammad.",
    reviewer: "Upwork client · 5.0/5 review",
  },
];

const clientMarks = ["CLIENT LOGO / 01", "CLIENT LOGO / 02", "CLIENT LOGO / 03", "CLIENT LOGO / 04", "CLIENT LOGO / 05"];
const reviewScreenshots = [
  { source: "Fiverr review screenshot 01", quote: "Outstanding experience working with MBA. Exceptional attention to detail, seamless communication, and top-notch quality." },
  { source: "Fiverr review screenshot 02", quote: "He was professional, responsive, and accommodating. He understood my needs and created the right solution." },
  { source: "Fiverr review screenshot 03", quote: "He figured out how to make this work. He exceeded expectations." },
];

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

function ReviewGallery() {
  return (
    <section className="reviews-section section-wrap" id="reviews">
      <div className="section-heading reviews-heading">
        <div><span className="section-index">02 / Client reviews</span><h2>Good work,<br /><em>said better.</em></h2></div>
        <p>Real feedback from Fiverr and Upwork clients. Replace each marked panel with your own review screenshot when ready.</p>
      </div>
      <div className="review-gallery">
        {reviewScreenshots.map((review) => (
          <article className="review-card" key={review.source}>
            {/* REVIEW SCREENSHOT SLOT: Drop a cropped Fiverr/Upwork screenshot in this area later. */}
            <div className="review-screenshot-slot"><span>DROP SCREENSHOT HERE</span><small>{review.source}</small></div>
            <blockquote><Quote size={18} /><p>“{review.quote}”</p></blockquote>
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
  const [submitError, setSubmitError] = useState("");

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
            <p className="hero-kicker">Freelance software & workflow automation developer</p>
            <h1>Less busywork.<br /><em>More momentum.</em></h1>
            <p className="hero-description">I build practical Excel, Word, Outlook, and Office automation systems that turn complex workflows into fast, understandable tools.</p>
            <div className="hero-actions">
              <a className="button button-primary whatsapp-button" href="https://wa.me/923462116322" target="_blank" rel="noreferrer"><MessageCircle size={18} /> Start a project</a>
              <a className="text-link" href="#work" onClick={(event) => smoothScrollTo(event, "work")}>See the work <ArrowDownRight size={17} /></a>
            </div>
            <div className="hero-proof"><span><Check size={15} /> 5+ years experience</span><span><Check size={15} /> 301 Fiverr reviews</span><span><Check size={15} /> Up to 90% faster workflows</span></div>
          </div>
          <div className="profile-visual">
            <div className="profile-photo-frame"><img src="/manus-storage/ChatGPT_6c7e1dbf.png" alt="Muhammad Bilal, freelance software and workflow automation developer" /></div>
            <div className="profile-label"><span className="pulse-dot" /> Muhammad Bilal <small>Software + workflow automation</small></div>
            <div className="profile-stat"><strong>5+</strong><span>years<br />building<br />better workflows</span></div>
          </div>
        </section>

        <section className="trusted-strip clients-strip" aria-label="Featured client logo placeholders">
          <div className="section-wrap trusted-inner">
            <span className="trusted-label">Featured clients<br /><small>logos coming soon</small></span>
            <div className="client-marks">
              {/* CLIENT LOGO SLOT: Replace each text mark with a monochrome SVG or PNG logo when ready. */}
              {clientMarks.map((mark) => <LogoMark key={mark} name={mark} />)}
            </div>
          </div>
        </section>

        <ReviewGallery />

        <section className="work-section section-wrap" id="work">
          <div className="section-heading work-heading">
            <div><span className="section-index">01 / Selected work</span><h2>Proof, not promises.</h2></div>
            <p>Real-world automation shaped around how teams already work — with just enough craft to make it feel effortless.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <div className="contact-intro"><span className="section-index">04 / Start a conversation</span><h2>Have a workflow<br /><em>worth fixing?</em></h2><p>Tell me what is slowing your team down. I will come back with a clear first step — no jargon, no bloated proposal.</p><div className="contact-aside"><Mail size={17} /><a href="mailto:ibn.e.ashiq@gmail.com">ibn.e.ashiq@gmail.com</a></div><div className="contact-aside"><MessageCircle size={17} /><a href="https://wa.me/923462116322" target="_blank" rel="noreferrer">WhatsApp: +92 346 2116322</a></div><div className="contact-aside profile-links"><a href="https://www.fiverr.com/sellers/ibn_e_ashiq/" target="_blank" rel="noreferrer">Fiverr profile</a><span>·</span><a href="https://www.upwork.com/freelancers/muhammadbilal88" target="_blank" rel="noreferrer">Upwork profile</a></div></div>
          <div className="form-card">
            {submitted ? <div className="success-state"><span className="success-icon"><Check size={22} /></span><h3>Message received.</h3><p>Thanks for reaching out. You will be contacted shortly with possible options and a practical next step.</p><button className="text-link" type="button" onClick={() => setSubmitted(false)}>Send another message <ArrowUpRight size={16} /></button></div> : <form action="https://formsubmit.co/ibn.e.ashiq@gmail.com" method="POST" onSubmit={handleSubmit}>
              <input type="hidden" name="_subject" value="New portfolio project inquiry" /><input type="hidden" name="_template" value="table" /><input type="hidden" name="_captcha" value="false" />
              <div className="form-row"><label>Name<input name="name" type="text" placeholder="Your name" required /></label><label>Email<input name="email" type="email" placeholder="you@company.com" required aria-invalid={Boolean(emailError)} onBlur={(event) => setEmailError(validateEmail(event.target.value))} onChange={(event) => setEmailError(validateEmail(event.target.value))} />{emailError && <span className="field-error" role="alert">{emailError}</span>}</label></div>
              <label>Project type<select name="projectType" defaultValue="" required><option value="" disabled>Select one</option><option>Excel / Office automation</option><option>Custom C# / .NET software</option><option>BI dashboard</option><option>Office add-in</option><option>Something else</option></select></label>
              <label>Description<textarea name="description" rows={5} placeholder="What would you like to make easier?" required /></label>
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
