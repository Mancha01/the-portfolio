/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Emmanuel Mancha Pam — Senior Frontend Engineer",
    description:
      "Senior frontend engineer building enterprise ERPs, CRMs, realtime dashboards and AI-assisted products with React, Next.js and TypeScript.",
    author: "Emmanuel Mancha Pam",
    // Override with GATSBY_SITE_URL if the site moves to a custom domain.
    siteUrl: process.env.GATSBY_SITE_URL || "https://the-portfolio.pages.dev",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-1LTZQ7BHYR"],
        pluginConfig: {
          head: true,
        },
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
  ],
}
