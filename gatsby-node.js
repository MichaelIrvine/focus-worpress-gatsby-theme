const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  // createRedirect({
  //   fromPath: "/",
  //   toPath: "/front-page",
  //   redirectInBrowser: true,
  //   isPermanent: true,
  // })
  const result = await graphql(`
    {
      allWordpressPage {
        edges {
          node {
            id
            slug
            template
            content
            title
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
  const { allWordpressPage } = result.data

  // Create Page pages.
  const pageTemplate = path.resolve(`./src/templates/page.js`)
  const portfolioItems = path.resolve(`./src/templates/portfolioItems.js`)

  allWordpressPage.edges.forEach(edge => {
    const template =
      edge.node.template === "portfolio_items.php"
        ? portfolioItems
        : pageTemplate
    createPage({
      path: edge.node.slug,
      component: slash(pageTemplate),
      context: edge.node,
    })
  })
}
