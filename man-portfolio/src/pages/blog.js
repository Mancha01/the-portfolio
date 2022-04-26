import React from 'react'
import Layout from '../components/layout'
import '../styles/global.css'
import * as containerStyles from "../styles/home.module.css"

const Blog = () => {
  return (
      <Layout>
    <div className='blog'>
        <a href="https://github.com/Mancha01/the-blog" className={containerStyles.btn} target='_blank'>Github Repository</a>
        <img src="../Screenshot (992).png" alt="the blog" />
        <hr />
        <hr />
        <img src="../Screenshot (993).png" alt="the blog" />
        <hr />
        <hr />
        <img src="../Screenshot (994).png" alt="the blog" />
        <hr />
        <hr />
        <img src="../Screenshot (995).png" alt="the blog" />
        <hr />
        <hr />
        <img src="../Screenshot (996).png" alt="the blog" />
        <hr />
        <hr />
    </div>
    </Layout>
  )
}

export default Blog