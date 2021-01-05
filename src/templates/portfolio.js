import React from "react"
import { Helmet } from "react-helmet"
import Img from "gatsby-image"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby"

const PortfolioPageTemplate = ({ data, pageContext }) => {
  return (
    <>
      <Helmet bodyAttributes={{ class: "portfolio-item-template" }} />
      <SEO title="portfolio-item" />
      <div>
        <div className="page-wrapper portfolio-template">
          <div className="portfolio-item-content-wrapper">
            <h3>{data.wordpressWpPortfolio.title}</h3>
            <div
              className="portfolio-item-content"
              dangerouslySetInnerHTML={{
                __html: data.wordpressWpPortfolio.content,
              }}
            />
          </div>
          {/* TODO -- Make into gallery slider */}
          <Img
            fluid={
              data.wordpressWpPortfolio.featured_media.localFile.childImageSharp
                .fluid
            }
            fadeIn
          />
        </div>
        <div className="portfolio-nav">
          {pageContext.previous && (
            <Link to={`/work/${pageContext.previous.slug}`}>
              Previous Project: {pageContext.previous.title}
            </Link>
          )}

          {pageContext.next && (
            <Link to={`/work/${pageContext.next.slug}`}>
              Next Project: {pageContext.next.title}
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    wordpressWpPortfolio(slug: { eq: $slug }) {
      title
      content
      featured_media {
        localFile {
          childImageSharp {
            fluid(quality: 100, maxWidth: 500) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`

export default PortfolioPageTemplate
