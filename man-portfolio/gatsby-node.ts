import path from "path"
import type { GatsbyNode } from "gatsby"
import { caseStudies } from "./src/data/content"

// One case-study page per entry in src/data/content.ts.
export const createPages: GatsbyNode["createPages"] = async ({ actions }) => {
  const template = path.resolve("src/templates/case-study.tsx")
  caseStudies.forEach(({ slug }) => {
    actions.createPage({ path: `/work/${slug}/`, component: template, context: { slug } })
  })
}
