import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import { gsap } from "gsap"
import TransitionLink from "gatsby-plugin-transition-link"

const StyledNav = styled.nav`
  transition: opacity 300ms ease-in;

  a:not(:last-of-type) {
    margin-right: 3rem;
  }
  @media (max-width: 768px) {
    margin-top: 0.5rem;
    visibility: ${({ open }) => (open ? "visible" : "hidden")};
    opacity: ${({ open }) => (open ? "1" : "0")};
  }

  @media (max-width: 520px) {
    position: absolute;
    top: 2rem;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    padding: 0.5rem;
    background: white;
    z-index: 99;
  }
`

export function fadeOut() {
  gsap.to(".tl-edges", { duration: 0.8, opacity: 0 })
}
export function fadeIn() {
  gsap.fromTo(".tl-edges", { opacity: 0 }, { opacity: 1, duration: 1 })
}

const Nav = ({ open, setOpen }) => {
  const { wordpressWpApiMenusMenusItems } = useStaticQuery(graphql`
    query MainMenuQuery {
      wordpressWpApiMenusMenusItems(name: { eq: "Main Menu" }) {
        items {
          object_slug
          object_id
          title
        }
      }
    }
  `)

  return (
    <StyledNav open={open}>
      {wordpressWpApiMenusMenusItems.items.map(menuItem => {
        return (
          <TransitionLink
            to={`/${menuItem.object_slug}`}
            onClick={() => setOpen(!open)}
            key={menuItem.object_id}
            exit={{
              length: 0.5,
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
            {menuItem.title}
          </TransitionLink>
        )
      })}
    </StyledNav>
  )
}

export default Nav
