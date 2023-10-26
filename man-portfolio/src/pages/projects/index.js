import { graphql, Link } from "gatsby"
import React from "react"
import Layout from "../../components/layout"
import * as containerStyles from "../../styles/projects.module.css"

const Projects = ({ data }) => {
  const projects = data.allMarkdownRemark.nodes
  return (
    <Layout>
      <div className={containerStyles.portfolio}>
        <h2>Portfolio</h2>
        <h3>Projects & Websites I've Created</h3>
        <div className={containerStyles.projects}>
          <a href="https://my-music-app-livid.vercel.app/" target="_blank">
            <div>
              <img src="../Screenshot (2990).png" alt="My Music app" />
              <h3>My Music App</h3>
              <p>Next js</p>
            </div>
          </a>
          <a href="https://todo-app-8ic.pages.dev/" target="_blank">
            <div>
              <img src="../Screenshot (4103).png" alt="Todo App" />
              <h3>Todo App</h3>
              <p>React, Redux</p>
            </div>
          </a>
          <a href="https://shopping-cart-dmp.pages.dev/" target="_blank">
            <div>
              <img src="../Screenshot (4006).png" alt="Shopping Cart" />
              <h3>Shopping Cart</h3>
              <p>React, Redux Toolkit</p>
            </div>
          </a>
          <a href="https://real-estate-land-b9n5.vercel.app/" target="_blank">
            <div>
              <img
                src="../Screenshot (2992).png"
                alt="Real Estate Land Project"
              />
              <h3>Real Estate Land</h3>
              <p>Next js</p>
            </div>
          </a>
          <a href="https://ecommerce-v2.pages.dev" target="_blank">
            <div>
              <img src="../Screenshot (3285).png" alt="ecommerce crud v2" />
              <h3>Ecommerce CRUD test project version ii</h3>
              <p>React</p>
            </div>
          </a>
          <a
            href="https://ecommerce-crud-test-project.pages.dev/"
            target="_blank"
          >
            <div>
              <img src="../Screenshot (3254).png" alt="ecommerce crud" />
              <h3>Ecommerce CRUD test project</h3>
              <p>React</p>
            </div>
          </a>
          <a href="https://the-dash.pages.dev/" target="_blank">
            <div>
              <img src="../Screenshot (991).png" alt="the dash" />
              <h3>The Dash</h3>
              <p>Html, Css and Javascript</p>
            </div>
          </a>
          <a href="https://the-bank.pages.dev/" target="_blank">
            <div>
              <img src="../Screenshot (990).png" alt="the bank" />
              <h3>The Bank</h3>
              <p>Html, Css and Javascript</p>
            </div>
          </a>
          <a href="https://the-eclipse-618f27.webflow.io/" target="_blank">
            <div>
              <img src="../Screenshot (1017).png" alt="The Eclipse" />
              <h3>The Eclipse</h3>
              <p>Webflow</p>
            </div>
          </a>
          <Link to="/blog">
            <div>
              <img src="../Screenshot (994).png" alt="the blog" />
              <h3>The Blog</h3>
              <p>React</p>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Projects

//export page query
export const query = graphql`
  query ProjectsPage {
    allMarkdownRemark {
      nodes {
        frontmatter {
          stack
          title
          slug
        }
        id
      }
    }
  }
`
