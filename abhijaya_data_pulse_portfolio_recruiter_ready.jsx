"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Download,
  Briefcase,
  Database,
  Rocket,
  ArrowRight,
} from "lucide-react";

// -- DATA CONFIG (Edit this only) -------------------------------------------------
const PROFILE = {
  name: "Abhijaya Singh",
  role: "Data Engineer",
  headline: "Azure · Databricks · PySpark · SQL",
  summary:
    "Data Engineer with 4+ years designing scalable pipelines on Azure & Databricks. Strong in PySpark, SQL, Delta Lake, and cost/performance optimization.",
  location: "India (Open to Remote/Hybrid)",
  email: "abhijaya@email.com",
  phone: "+91-9604135196",
  linkedin: "https://www.linkedin.com/in/abhijaya6",
  github: "https://github.com/",
  resumeUrl: "/Abhijaya_Singh_Resume.pdf", // replace on deploy
};

const KPIS = [
  { label: "Years", value: 4, caption: "Experience" },
  { label: "Pipelines", value: 60, caption: "Built & Prod" },
  { label: "TB+, Rows", value: "3+ TB · 1B+", caption: "Processed" },
  { label: "Domains", value: 2, caption: "Retail, Supply Chain" },
];

const SKILLS = [
  {
    name: "Azure",
    impact: [
      "Designed ADLS + ADF orchestration with Key Vault & RBAC",
      "Cut storage cost ~20% via tiering & lifecycle rules",
    ],
    weight: 85,
  },
  {
    name: "Databricks",
    impact: [
      "Delta Lake pipelines; optimized shuffle & skew with AQE",
      "Deployed jobs with cluster policies & UC governance",
    ],
    weight: 88,
  },
  {
    name: "PySpark",
    impact: [
      "SCD2 MERGE, window functions, checkpointed streams",
      "Reduced job time 22→5 min using partitioning & cache",
    ],
    weight: 85,
  },
  {
    name: "SQL",
    impact: [
      "Wrote 100+ analytical queries, CTEs, incremental loads",
      "Materialized views for faster BI; tuned with EXPLAIN",
    ],
    weight: 90,
  },
  {
    name: "Airflow",
    impact: ["DAGs for SLA tracking & retries", "Secrets via env/VAULT"],
    weight: 70,
  },
  {
    name: "Python",
    impact: ["ETL utilities, validators, tests", "Typing + pydantic for safety"],
    weight: 92,
  },
];

const PROJECTS = [
  {
    title: "Retail Data Lake Modernization (Big Retail Giant)",
    problem:
      "Legacy ETL on-prem causing long refresh cycles and high infra cost.",
    approach:
      "Migrated to Azure (ADLS Gen2 + ADF) and Databricks Delta Lake; implemented bronze/silver/gold with CDC and SCD2 using MERGE; fine-grained access via UC.",
    impact:
      "Processing 1B+ rows/day; refresh TAT cut by 40%; storage cost down ~20%; reliability ↑ with data quality checks.",
    tech: ["Azure", "ADF", "Databricks", "Delta Lake", "PySpark", "SQL"],
  },
  {
    title: "Supply Chain Analytics Platform",
    problem: "Lack of visibility in inventory, shipments, and stockouts.",
    approach:
      "Modeled fact/dimension tables in Databricks; built incremental PySpark pipelines to track supplier lead time, warehouse stock, and delivery delays.",
    impact:
      "Stockout rate ↓ 25%, optimized reorder cycles, dashboards adopted by 200+ planners.",
    tech: ["PySpark", "SQL", "Delta Lake", "Power BI"],
  },
];

const EXPERIENCE = [
  {
    company: "TCS (Client: Big Retail Giant)",
    role: "Data Engineer",
    period: "2019 – 2025",
    bullets: [
      "Built end-to-end ELT on Azure/Databricks with CI/CD",
      "Implemented partitioning & Z-Ordering; fixed data skew",
      "Set up monitoring, retries, and idempotent upserts",
    ],
  },
];

const STACK_USAGE = [
  { name: "Azure", value: 28 },
  { name: "Databricks", value: 26 },
  { name: "PySpark", value: 22 },
  { name: "SQL", value: 20 },
  { name: "Airflow", value: 4 },
];

const PULSE = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  value: Math.round(40 + Math.random() * 60),
}));

// -- PRESENTATION HELPERS --------------------------------------------------------
const fade = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function Section({ id, title, children, subtitle }) {
  return (
    <section
      id={id}
      className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16"
    >
      <motion.div
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white/90">
          {title}
        </h2>
        {subtitle && <p className="text-white/60 mt-1">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </motion.div>
    </section>
  );
}

function Badge({ children }) {
  return (
    <span className="px-2.5 py-1 rounded-full text-xs bg-white/10 text-white/80 border border-white/10">
      {children}
    </span>
  );
}

// -- PAGE -----------------------------------------------------------------------
export default function DataPulsePortfolio() {
  return (
    <div className="min-h-screen w-full text-white bg-[#0b0f14] selection:bg-cyan-500/30">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur border-b border-white/5 bg-[#0b0f14]/70">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8 h-14">
          <a href="#" className="font-semibold tracking-wide">
            {PROFILE.name}
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="#skills" className="hover:text-white">
              Skills
            </a>
            <a href="#projects" className="hover:text-white">
              Projects
            </a>
            <a href="#experience" className="hover:text-white">
              Experience
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
            <a
              href={PROFILE.resumeUrl}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20"
            >
              <Download size={16} /> Resume
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(1000px_600px_at_50%_-20%,rgba(0,255,255,0.18),transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 text-xs text-cyan-300/80 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full">
                  <Database size={14} /> {PROFILE.headline}
                </div>
                <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
                  {PROFILE.name}
                </h1>
                <p className="mt-3 text-white/70 text-lg">{PROFILE.summary}</p>
                <div className="mt-6 grid sm:flex gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black hover:bg-white/90"
                  >
                    <Rocket size={18} /> Hire Me
                  </a>
                  <a
                    href={PROFILE.resumeUrl}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 hover:border-white/30"
                  >
                    <Download size={18} /> Download Resume
                  </a>
                </div>
                {/* Recruiter TL;DR */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {KPIS.map((k) => (
                    <div
                      key={k.label}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <div className="text-2xl font-semibold">{k.value}</div>
                      <div className="text-xs text-white/60">{k.caption}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pulse Chart */}
              <div className="flex-1 w-full h-56 sm:h-72 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <div className="text-sm text-white/60 mb-1">Career Pulse</div>
                <ResponsiveContainer width="100%" height="90%">
                  <LineChart data={PULSE}>
                    <XAxis dataKey="time" hide />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        background: "#0b0f14",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 8,
                      }}
                      labelStyle={{ color: "#9ca3af" }}
                    />
                    <Line type="monotone" dataKey="value" dot={false} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SKILLS */}
      <Section
        id="skills"
        title="Skills with Proof"
        subtitle="Visuals are cool; impact convinces. Each skill shows what it delivered."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS.map((s) => (
            <div
              key={s.name}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-white/20"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{s.name}</h3>
                <div className="text-xs text-white/60">{s.weight}%</div>
              </div>
              <div className="mt-3 h-2 rounded bg-white/10 overflow-hidden">
                <div className="h-full bg-white/80" style={{ width: `${s.weight}%` }} />
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/70 list-disc list-inside">
                {s.impact.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stack Usage Chart */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-white/70">Stack usage across projects</div>
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={STACK_USAGE}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    background: "#0b0f14",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                  }}
                  labelStyle={{ color: "#9ca3af" }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" title="Projects" subtitle="Real problems, measurable impact.">
        <div className="grid md:grid-cols-2 gap-4">
          {PROJECTS.map((p) => (
            <div key={p.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center gap-2 text-sm text-white/60 mb-1">
                <Briefcase size={16} /> Case Study
              </div>
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <div className="mt-3 grid gap-2 text-sm">
                <div>
                  <span className="text-white/60">Problem:</span> {p.problem}
                </div>
                <div>
                  <span className="text-white/60">Approach:</span> {p.approach}
                </div>
                <div>
                  <span className="text-white/60">Impact:</span> {p.impact}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" title="Experience" subtitle="What I owned & shipped.">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
          <div className="space-y-6">
            {EXPERIENCE.map((e, idx) => (
              <div key={idx} className="relative pl-10">
                <div className="absolute left-2 top-2 size-4 rounded-full bg-white/80" />
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold">
                      {e.role} · {e.company}
                    </h3>
                    <span className="text-xs text-white/60">{e.period}</span>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-white/80 list-disc list-inside">
                    {e.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact" subtitle="Quickest ways to reach me.">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm text-white/70">Prefer email or LinkedIn</div>
            <div className="mt-4 flex flex-col gap-3 text-white/90">
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 hover:underline"
              >
                <Mail size={18} /> {PROFILE.email}
              </a>
              <a
                href={`tel:${PROFILE.phone}`}
                className="inline-flex items-center gap-2 hover:underline"
              >
                <Phone size={18} /> {PROFILE.phone}
              </a>
              <a
                href={PROFILE.linkedin}
                className="inline-flex items-center gap-2 hover:underline"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
              <a
                href={PROFILE.github}
                className="inline-flex items-center gap-2 hover:underline"
              >
                <Github size={18} /> GitHub
              </a>
            </div>
            <div className="mt-6">
              <a
                href={PROFILE.resumeUrl}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 hover:border-white/30"
              >
                <Download size={18} /> Download Resume
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm text-white/70">Message</div>
            <form className="mt-3 grid gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                required
                placeholder="Your name"
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none"
              />
              <input
                required
                type="email"
                placeholder="Email"
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none"
              />
              <textarea
                required
                placeholder="How can I help?"
                rows={4}
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none"
              />
              <button className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white text-black hover:bg-white/90">
                Send <ArrowRight size={16} />
              </button>
              <p className="text-xs text-white/50">
                This is a static demo. Hook to Formspree / API on deploy.
              </p>
            </form>
          </div>
        </div>
      </Section>

      {/* SIMPLE FOOTER */}
      <footer className="mt-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10 text-sm text-white/60 flex items-center justify-between">
          <div>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</div>
          <a href="#" className="hover:text-white">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
