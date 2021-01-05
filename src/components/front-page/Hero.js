import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Hero = () => {
  const { wordpressPage } = useStaticQuery(graphql`
    query {
      wordpressPage(slug: { eq: "front-page" }) {
        acf {
          front_page_hero {
            localFile {
              childImageSharp {
                fluid(quality: 100, maxWidth: 2000) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <div className="fp__hero-wrapper">
      <Img
        className="fp__hero-image"
        fluid={
          wordpressPage.acf.front_page_hero.localFile.childImageSharp.fluid
        }
      />
    </div>
  )
}

export default Hero
