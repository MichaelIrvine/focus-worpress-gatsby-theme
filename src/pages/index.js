import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import SEO from "../components/seo"
import Hero from "../components/front-page/Hero"

const IndexPage = () => {
  const { allWordpressPage } = useStaticQuery(graphql`
    query {
      allWordpressPage(filter: { slug: { eq: "front-page" } }) {
        edges {
          node {
            title
          }
        }
      }
    }
  `)

  return (
    <>
      <Helmet bodyAttributes={{ class: "front-page" }} />
      <SEO title={allWordpressPage.edges[0].node.title} />
      <Hero />
    </>
  )
}

export default IndexPage
