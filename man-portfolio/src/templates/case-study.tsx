import * as React from "react"
import { Link, type HeadFC, type PageProps } from "gatsby"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Reveal from "../components/Reveal"
import { caseStudies } from "../data/content"

type Ctx = { slug: string }

const find = (slug: string) => caseStudies.find(c => c.slug === slug)!

const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Reveal as="section" className="grid gap-4 border-t border-line py-10 md:grid-cols-[14rem_1fr]">
    <h2 className="eyebrow pt-1">{title}</h2>
    <div>{children}</div>
  </Reveal>
)

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map(i => (
      <li key={i} className="flex gap-3 leading-relaxed">
        <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        <span>{i}</span>
      </li>
    ))}
  </ul>
)

const CaseStudyPage = ({ pageContext }: PageProps<object, Ctx>) => {
  const c = find(pageContext.slug)
  const idx = caseStudies.findIndex(x => x.slug === c.slug)
  const next = caseStudies[(idx + 1) % caseStudies.length]

  return (
    <Layout>
      <article className="container-x pb-16 pt-28 sm:pt-36">
        <Reveal>
          <Link to="/#work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent">
            <FiArrowLeft aria-hidden /> All work
          </Link>
        </Reveal>

        <header className="relative mt-8 max-w-3xl">
          <Reveal>
            <div aria-hidden className={`mb-6 h-1.5 w-24 rounded-full bg-gradient-to-r ${c.accent}`} />
            <p className="text-sm font-medium uppercase tracking-wider text-muted">
              {c.client} · {c.year}
            </p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{c.title}</h1>
            <p className="mt-5 text-xl leading-relaxed text-muted">{c.tagline}</p>
          </Reveal>
        </header>

        <Reveal className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="bg-surface p-5">
            <p className="text-xs uppercase tracking-wider text-muted">My role</p>
            <p className="mt-1 font-medium">{c.role}</p>
          </div>
          {c.metrics.map(m => (
            <div key={m.label} className="bg-surface p-5">
              <p className="font-display text-2xl font-bold text-accent">{m.value}</p>
              <p className="text-xs text-muted">{m.label}</p>
            </div>
          ))}
        </Reveal>

        <div className="mt-14">
          <Block title="The problem">
            <p className="text-lg leading-relaxed">{c.problem}</p>
          </Block>
          <Block title="What I built">
            <Bullets items={c.built} />
          </Block>
          <Block title="Architecture">
            <Bullets items={c.architecture} />
          </Block>
          <Block title="Stack">
            <ul className="flex flex-wrap gap-2">
              {c.stack.map(s => (
                <li key={s} className="chip !text-sm">
                  {s}
                </li>
              ))}
            </ul>
          </Block>
          <Block title="Outcome">
            <p className="text-lg leading-relaxed">{c.outcome}</p>
          </Block>
        </div>

        <Reveal className="mt-10">
          <Link
            to={`/work/${next.slug}/`}
            className="card spotlight group flex items-center justify-between gap-4 p-6 transition hover:border-accent/60 sm:p-8"
          >
            <div>
              <p className="text-xs uppercase tracking-wider text-muted">Next project</p>
              <p className="mt-1 text-xl font-semibold">{next.title}</p>
            </div>
            <FiArrowRight aria-hidden className="text-xl text-muted transition group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        </Reveal>
      </article>
    </Layout>
  )
}

export default CaseStudyPage

export const Head: HeadFC<object, Ctx> = ({ pageContext, location }) => {
  const c = find(pageContext.slug)
  return <Seo title={c.title} description={c.tagline} pathname={location.pathname} />
}
