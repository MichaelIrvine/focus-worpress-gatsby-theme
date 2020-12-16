import React from "react"
import { Link, useStaticQuery } from "gatsby"

import Layout from "../components/layout"

import SEO from "../components/seo"

const IndexPage = () => {
  const { allWordpressPage } = useStaticQuery(graphql`
    query {
      allWordpressPage(filter: { slug: { eq: "front-page" } }) {
        edges {
          node {
            path
            slug
            link
            title
            content
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <h1>{allWordpressPage.edges[0].node.title}</h1>
      <p
        dangerouslySetInnerHTML={{
          __html: allWordpressPage.edges[0].node.content,
        }}
      ></p>
    </Layout>
  )
}

export default IndexPage
