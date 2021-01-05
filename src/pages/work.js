import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import { Helmet } from "react-helmet"
import Img from "gatsby-image"
import SEO from "../components/seo"

import TransitionLink from "gatsby-plugin-transition-link"
import { gsap } from "gsap"

export function animateOut() {
  gsap.to(".portfolio-item", { duration: 0.3, opacity: 0, stagger: 0.1 })
}
export function animateIn() {
  gsap.fromTo(".tl-edges", { opacity: 0 }, { opacity: 1, duration: 1 })
}

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
            <TransitionLink
              key={`${edge.node.title}-${index}`}
              to={edge.node.slug}
              className="portfolio-item__wrapper"
              exit={{
                length: 0.5,
                trigger: ({ exit, node }) =>
                  animateOut({
                    exit,
                    node,
                    direction: "out",
                  }),
              }}
              entry={{
                delay: 1,
                length: 0.8,
                trigger: ({ exit, node }) =>
                  animateIn({
                    exit,
                    node,
                    direction: "in",
                  }),
              }}
            >
              <Img
                className={`portfolio-item ${loadedClass ? "visible" : ""}`}
                loading="lazy"
                fadeIn={true}
                durationFadeIn={1000}
                fluid={edge.node.featured_media.localFile.childImageSharp.fluid}
                onLoad={() => setLoadedClass(true)}
              />
            </TransitionLink>
          )
        })}
      </div>
    </>
  )
}

export default WorkPage
