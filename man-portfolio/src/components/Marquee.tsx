import * as React from "react"
import type { IconType } from "react-icons"
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiRedux, SiReactquery, SiTailwindcss, SiVite,
  SiGatsby, SiExpo, SiVitest, SiGraphql, SiOpenapiinitiative, SiZod, SiDocker, SiGooglecloud,
  SiVercel, SiRadixui, SiPostgresql, SiTestinglibrary, SiDjango, SiClaude, SiGithubcopilot,
} from "react-icons/si"
import { VscAzure, VscAzureDevops } from "react-icons/vsc"
import { marqueeStack } from "../data/content"

const icons: Record<string, IconType> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "Redux Toolkit": SiRedux,
  "TanStack Query": SiReactquery,
  "Tailwind CSS": SiTailwindcss,
  Vite: SiVite,
  Gatsby: SiGatsby,
  "React Native / Expo": SiExpo,
  Vitest: SiVitest,
  GraphQL: SiGraphql,
  OpenAPI: SiOpenapiinitiative,
  Zod: SiZod,
  Docker: SiDocker,
  "Google Cloud": SiGooglecloud,
  Azure: VscAzure,
  "Azure DevOps": VscAzureDevops,
  Vercel: SiVercel,
  "Radix UI": SiRadixui,
  PostgreSQL: SiPostgresql,
  "Testing Library": SiTestinglibrary,
  Django: SiDjango,
  "Claude Code": SiClaude,
  "GitHub Copilot": SiGithubcopilot,
}

const Row = ({ hidden }: { hidden?: boolean }) => (
  <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
    {marqueeStack.map(name => {
      const Icon = icons[name]
      return (
        <li key={name} className="flex items-center gap-2.5 whitespace-nowrap text-sm font-medium text-muted">
          {Icon ? <Icon aria-hidden className="text-lg" /> : <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />}
          {name}
        </li>
      )
    })}
  </ul>
)

/** Endless strip of the tech stack; pauses on hover and stays static under reduced motion. */
const Marquee = () => (
  <section aria-label="Technologies I work with" className="marquee relative mt-16 overflow-hidden border-y border-line py-5">
    <div className="marquee-track flex w-max">
      <Row />
      <Row hidden />
    </div>
  </section>
)

export default Marquee
