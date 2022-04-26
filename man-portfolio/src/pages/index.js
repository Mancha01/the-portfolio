import React from "react"
import Layout from "../components/layout"
import * as containerStyles from "../styles/home.module.css"
import { Link } from "gatsby"

export default function Home() {
  return <Layout>
  <section className={containerStyles.header} >
    
    <div>
      <h2>Design</h2>
        <h3>Develop & Deploy</h3>
      <p>Front End Developer</p>
      <Link className={containerStyles.btn} to='/projects'>My Portfolio Projects</Link>
    </div>
    <img src="/web-design-2906159_1920.jpg" alt="site banner" className={containerStyles.img} />
  </section>
  </Layout>
  
}

