import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import TransitionLink from "gatsby-plugin-transition-link"
import { gsap } from "gsap"

export function fadeOut() {
  gsap.to("main", { duration: 0.8, opacity: 0 })
}
export function fadeIn() {
  gsap.fromTo("main", { opacity: 0 }, { opacity: 1, duration: 1 })
}

const Branding = () => {
  const { allWordpressSiteMetadata } = useStaticQuery(graphql`
    query {
      allWordpressSiteMetadata {
        nodes {
          name
        }
      }
    }
  `)
  return (
    <div>
      <TransitionLink
        to="/"
        exit={{
          length: 0.8,
          trigger: ({ exit, node }) =>
            fadeOut({
              exit,
              node,
              direction: "out",
            }),
        }}
        entry={{
          delay: 1,
          length: 0.8,
          trigger: ({ exit, node }) =>
            fadeIn({
              exit,
              node,
              direction: "in",
            }),
        }}
      >
        {allWordpressSiteMetadata.nodes[0].name}
      </TransitionLink>
    </div>
  )
}

export default Branding
