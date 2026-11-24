import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { profile, socials } from "../data/content"

type Props = {
  title?: string
  description?: string
  pathname?: string
  children?: React.ReactNode
}

const Seo = ({ title, description, pathname = "/", children }: Props) => {
  const { site } = useStaticQuery(graphql`
    query SeoQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `)
  const meta = site.siteMetadata
  const fullTitle = title ? `${title} · ${profile.name}` : meta.title
  const desc = description || meta.description
  const url = meta.siteUrl ? `${meta.siteUrl}${pathname}` : undefined
  const image = meta.siteUrl ? `${meta.siteUrl}/og-image.png` : "/og-image.png"

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    sameAs: socials.filter(s => s.icon !== "email").map(s => s.href),
    alumniOf: "University of Jos",
  }

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="theme-color" content="#070a18" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${profile.name}, ${profile.role}`} />
      {url && <meta property="og:url" content={url} />}
      {url && <link rel="canonical" href={url} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@EmmanuelPam9" />
      <meta name="twitter:image" content={image} />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="alternate icon" href="/favicon.ico" />
      <script type="application/ld+json">{JSON.stringify(personLd)}</script>
      {children}
    </>
  )
}

export default Seo
