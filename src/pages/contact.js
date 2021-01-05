import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import SEO from "../components/seo"
import Img from "gatsby-image"

const ContactPage = () => {
  const { wordpressPage } = useStaticQuery(graphql`
    query ContactPageQuery {
      wordpressPage(slug: { eq: "contact" }) {
        featured_media {
          localFile {
            childImageSharp {
              fluid(quality: 100, maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        content
        slug
        title
      }
    }
  `)

  return (
    <>
      <Helmet bodyAttributes={{ class: `${wordpressPage.slug}` }} />
      <SEO title={wordpressPage.title} />
      <div className="page-wrapper">
        <Img
          fluid={wordpressPage.featured_media.localFile.childImageSharp.fluid}
        />

        <div
          className="contact-page-content page-content-wrapper"
          dangerouslySetInnerHTML={{ __html: wordpressPage.content }}
        ></div>
      </div>
    </>
  )
}

export default ContactPage
