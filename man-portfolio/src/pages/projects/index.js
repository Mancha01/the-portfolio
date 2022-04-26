import { graphql, Link } from 'gatsby'
import React from 'react'
import Layout from '../../components/layout'
import * as containerStyles from '../../styles/projects.module.css'

const 
Projects = ({data}) => {
    console.log(data)
    const projects = data.allMarkdownRemark.nodes
  return (
      <Layout>
    <div className={containerStyles.portfolio}>
        <h2>Portfolio</h2>
        <h3>Projects & Websites I've Created</h3>
        <div className={containerStyles.projects}>
            
                
                <a href="https://the-dash.pages.dev/" target='_blank'>
                <div>
                        <img src="../Screenshot (991).png" alt="the dash" />
                        <h3>The Dash</h3>
                        <p>Html, Css and Javascript</p>
                    </div>
                </a>
                <a href="https://the-bank.pages.dev/" target='_blank'>
                <div>
                        <img src="../Screenshot (990).png" alt="the bank" />
                        <h3>The Bank</h3>
                        <p>Html, Css and Javascript</p>
                    </div>
                </a>
                <Link to='/blog'>
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

export default 
Projects

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