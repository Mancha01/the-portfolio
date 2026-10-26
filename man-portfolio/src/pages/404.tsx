import * as React from "react"
import { Link, type HeadFC } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const NotFoundPage = () => (
  <Layout>
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <p className="font-display text-7xl font-bold text-gradient">404</p>
      <h1 className="mt-4 text-2xl font-semibold">This page doesn't exist.</h1>
      <p className="mt-2 text-muted">It may have moved when the site was rebuilt.</p>
      <Link to="/" className="btn-primary mt-8">
        Back home
      </Link>
    </section>
  </Layout>
)

export default NotFoundPage

export const Head: HeadFC = () => <Seo title="Not found" />
