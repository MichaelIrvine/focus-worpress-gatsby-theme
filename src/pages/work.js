import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import { Helmet } from "react-helmet"
import Img from "gatsby-image"
import SEO from "../components/seo"

const WorkPage = () => {
  const [loadedClass, setLoadedClass] = useState(false)

  const { allWordpressWpPortfolio, wordpressPage } = useStaticQuery(graphql`
    query WorkArchivePageQuery {
      allWordpressWpPortfolio {
        edges {
          node {
            title
            status
            slug
            id
            featured_media {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 500) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
      wordpressPage(title: { eq: "Work" }) {
        title
        slug
      }
    }
  `)

  return (
    <>
      <Helmet bodyAttributes={{ class: `${wordpressPage.slug}` }} />
      <SEO title={wordpressPage.title} />
      <div className="portfolio__grid-wrapper">
        {allWordpressWpPortfolio.edges.map((edge, index) => {
          return (
            <Link
              key={`${edge.node.title}-${index}`}
              to={edge.node.slug}
              className="portfolio-item__wrapper"
            >
              <Img
                className={`portfolio-item ${loadedClass ? "visible" : ""}`}
                loading="lazy"
                fadeIn={true}
                durationFadeIn={1000}
                fluid={edge.node.featured_media.localFile.childImageSharp.fluid}
                onLoad={() => setLoadedClass(true)}
              />
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default WorkPage
