const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query PortfolioItemQuery {
      allWordpressWpPortfolio {
        edges {
          node {
            title
            slug
            id
          }
          next {
            title
            link
            id
            slug
          }
          previous {
            title
            link
            id
            slug
          }
        }
      }
    }
  `)

  // Check for any errors
  if (result.errors) {
    throw new Error(result.errors)
  }

  // Access query results via object destructuring
  const { allWordpressWpPortfolio } = result.data

  // Create Page pages.
  const portfolioTemplate = path.resolve(`./src/templates/portfolio.js`)

  allWordpressWpPortfolio.edges.forEach(edge => {
    createPage({
      path: `/work/${edge.node.slug}`,
      component: slash(portfolioTemplate),
      context: {
        id: edge.node.id,
        slug: edge.node.slug,
        title: edge.node.title,
        next: edge.next,
        previous: edge.previous,
      },
    })
  })
}
