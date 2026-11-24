import * as React from "react"
import { Link, type HeadFC } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { FiArrowRight, FiArrowUpRight, FiDownload, FiMapPin, FiMail } from "react-icons/fi"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Reveal from "../components/Reveal"
import SocialIcon from "../components/SocialIcon"
import CountUp from "../components/CountUp"
import Marquee from "../components/Marquee"
import Tilt from "../components/Tilt"
import {
  profile,
  socials,
  stats,
  experience,
  caseStudies,
  skills,
  certifications,
  education,
} from "../data/content"

const SectionHeading = ({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) => (
  <Reveal className="mb-10 max-w-2xl">
    <p className="eyebrow">{eyebrow}</p>
    <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
    {intro && <p className="mt-4 text-muted">{intro}</p>}
  </Reveal>
)

const headlineWords = ["I", "build", "the", "interfaces"]

const Hero = () => (
  <section className="container-x grid items-center gap-12 pb-16 pt-28 sm:pt-36 lg:grid-cols-[1.25fr_1fr] lg:pb-24">
    <div>
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 text-xs font-medium text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {profile.availability}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-6 font-display text-lg font-medium text-muted">
          Hi, I'm {profile.name}, a <span className="text-ink">{profile.role}</span>
        </p>
      </Reveal>
      <h1 className="mt-3 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
        {headlineWords.map((w, i) => (
          <React.Fragment key={w}>
            <span className="word-in" style={{ "--d": `${0.15 + i * 0.08}s` } as React.CSSProperties}>
              {w}
            </span>{" "}
          </React.Fragment>
        ))}
        <span
          className="word-in text-gradient"
          style={{ "--d": `${0.15 + headlineWords.length * 0.08 + 0.05}s` } as React.CSSProperties}
        >
          enterprises run on.
        </span>
      </h1>
      <Reveal delay={0.15}>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.subhead}</p>
      </Reveal>
      <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
        <a href="#work" className="btn-primary">
          View my work <FiArrowRight aria-hidden />
        </a>
        <a href={profile.resume} className="btn-ghost" download>
          <FiDownload aria-hidden /> Download résumé
        </a>
      </Reveal>
      <Reveal delay={0.25} className="mt-8 flex items-center gap-5 text-sm text-muted">
        <span className="inline-flex items-center gap-1.5">
          <FiMapPin aria-hidden /> {profile.location}
        </span>
        <span className="hidden h-4 w-px bg-line sm:block" />
        <ul className="flex items-center gap-4">
          {socials.map(s => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.icon === "email" ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={s.label}
                className="text-lg transition hover:text-accent"
              >
                <SocialIcon name={s.icon} />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>

    <Reveal delay={0.15} className="relative mx-auto w-full max-w-sm lg:max-w-none">
      <div aria-hidden className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-accent/40 via-accent2/30 to-transparent blur-2xl" />
      <Tilt className="relative overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <StaticImage
          src="../images/emmanuel.jpg"
          alt="Portrait of Emmanuel Mancha Pam"
          aspectRatio={4 / 5}
          transformOptions={{ cropFocus: "center" }}
          placeholder="blurred"
          loading="eager"
          layout="fullWidth"
        />
        <div className="absolute inset-x-3 bottom-3 rounded-xl border border-white/10 bg-black/55 p-3 text-white backdrop-blur-md">
          <p className="text-xs uppercase tracking-widest text-white/60">Currently</p>
          <p className="mt-0.5 text-sm font-medium">Senior Frontend Engineer @ Wragby</p>
        </div>
      </Tilt>
    </Reveal>
  </section>
)

const Stats = () => (
  <section aria-label="Highlights" className="container-x">
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
      {stats.map((s, i) => (
        <Reveal as="li" key={s.label} delay={i * 0.05} className="spotlight bg-surface p-6 sm:p-8">
          <p className="font-display text-3xl font-bold text-accent sm:text-4xl">
            <CountUp value={s.value} />
          </p>
          <p className="mt-1 text-sm text-muted">{s.label}</p>
        </Reveal>
      ))}
    </ul>
  </section>
)

const About = () => (
  <section id="about" className="container-x py-24">
    <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
      <SectionHeading eyebrow="About" title="Frontend engineer for complex, high-stakes software." />
      <div className="space-y-5 text-lg leading-relaxed text-muted">
        {profile.about.map((p, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <p>{p}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

const Experience = () => (
  <section id="experience" className="container-x py-24">
    <SectionHeading eyebrow="Experience" title="Where I've built." />
    <ol className="relative space-y-6 border-l border-line pl-6 sm:pl-10">
      {experience.map((r, i) => (
        <Reveal as="li" key={r.company} delay={i * 0.05} className="relative">
          <span
            aria-hidden
            className={`absolute -left-[31px] top-7 h-3 w-3 rounded-full ring-4 ring-bg sm:-left-[47px] ${
              i === 0 ? "bg-accent" : "bg-line"
            }`}
          />
          <div className="card spotlight p-6 sm:p-8">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-xl font-semibold">
                {r.title} <span className="text-muted">· {r.company}</span>
              </h3>
              <p className="shrink-0 text-sm text-muted">{r.period}</p>
            </div>
            <p className="mt-1 text-sm text-muted">
              {r.type} · {r.location}
            </p>
            <p className="mt-4 text-muted">{r.summary}</p>
            {r.highlights.length > 0 && (
              <ul className="mt-4 space-y-2">
                {r.highlights.map(h => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>
      ))}
    </ol>
  </section>
)

const Work = () => {
  const featured = caseStudies.filter(c => c.featured)
  const more = caseStudies.filter(c => !c.featured)
  return (
    <section id="work" className="container-x py-24">
      <SectionHeading
        eyebrow="Selected work"
        title="Platforms I've shaped."
        intro="Enterprise products I've led or built as a core engineer. Some clients are described rather than named."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {featured.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 2) * 0.06}>
            <Link
              to={`/work/${c.slug}/`}
              className="card spotlight group relative flex h-full flex-col overflow-hidden p-6 transition hover:-translate-y-1 hover:border-accent/60 sm:p-8"
            >
              <div aria-hidden className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${c.accent}`} />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted">{c.client}</p>
                  <h3 className="mt-2 text-2xl font-bold">{c.title}</h3>
                </div>
                <FiArrowUpRight
                  aria-hidden
                  className="shrink-0 text-xl text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </div>
              <p className="mt-3 text-muted">{c.tagline}</p>
              {c.metrics.length > 0 && (
                <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-line py-4">
                  {c.metrics.map(m => (
                    <div key={m.label}>
                      <dt className="sr-only">{m.label}</dt>
                      <dd className="font-display text-xl font-bold">{m.value}</dd>
                      <dd className="text-xs text-muted">{m.label}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <p className="mt-5 text-sm">
                <span className="text-muted">Role · </span>
                {c.role}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.stack.slice(0, 6).map(s => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {more.map(c => (
          <Reveal key={c.slug}>
            <Link
              to={`/work/${c.slug}/`}
              className="card spotlight group flex items-center justify-between gap-4 p-6 transition hover:border-accent/60"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted">{c.client}</p>
                <h3 className="mt-1 text-lg font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted">{c.tagline}</p>
              </div>
              <FiArrowUpRight aria-hidden className="shrink-0 text-xl text-muted group-hover:text-accent" />
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

const Skills = () => (
  <section id="skills" className="container-x py-24">
    <SectionHeading eyebrow="Toolkit" title="What I work with." />
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((g, i) => (
        <Reveal key={g.group} delay={(i % 3) * 0.05} className="card spotlight p-6">
          <h3 className="text-base font-semibold">{g.group}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {g.items.map(s => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>

    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_2fr]">
      <Reveal className="card spotlight p-6">
        <p className="eyebrow">Education</p>
        <h3 className="mt-3 text-lg font-semibold">{education.degree}</h3>
        <p className="text-muted">
          {education.school} · {education.year}
        </p>
        <p className="mt-3 text-sm text-muted">{education.nysc}</p>
      </Reveal>
      <Reveal className="card spotlight p-6">
        <p className="eyebrow">Certifications & training</p>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {certifications.map(c => (
            <li key={c.name}>
              {c.href ? (
                <a href={c.href} target="_blank" rel="noreferrer" className="font-medium underline-offset-4 hover:text-accent hover:underline">
                  {c.name}
                </a>
              ) : (
                <p className="font-medium">{c.name}</p>
              )}
              <p className="text-sm text-muted">{c.issuer}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
)

const Contact = () => (
  <section id="contact" className="container-x py-24">
    <Reveal className="card spotlight relative overflow-hidden p-8 text-center sm:p-14">
      <div aria-hidden className="absolute inset-0 -z-10 bg-aurora opacity-80" />
      <p className="eyebrow">Contact</p>
      <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold sm:text-5xl">
        Building something ambitious? <span className="text-gradient">Let's talk.</span>
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-muted">
        I'm open to senior and lead frontend roles, remote or hybrid. The fastest way to reach me is email.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href={`mailto:${profile.email}`} className="btn-primary">
          <FiMail aria-hidden /> {profile.email}
        </a>
        <a href="https://www.linkedin.com/in/emmanuel-pam-081b89ab/" target="_blank" rel="noreferrer" className="btn-ghost">
          <SocialIcon name="linkedin" /> LinkedIn
        </a>
        <a href={profile.resume} className="btn-ghost" download>
          <FiDownload aria-hidden /> Résumé
        </a>
      </div>
    </Reveal>
  </section>
)

const IndexPage = () => (
  <Layout>
    <Hero />
    <Stats />
    <Marquee />
    <About />
    <Experience />
    <Work />
    <Skills />
    <Contact />
  </Layout>
)

export default IndexPage

export const Head: HeadFC = () => <Seo />
