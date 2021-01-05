const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query WorkItemQuery {
      allWordpressWpWork {
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

  const { allWordpressWpWork } = result.data

  const workTemplate = path.resolve(`./src/templates/work.js`)

  allWordpressWpWork.edges.forEach(edge => {
    createPage({
      path: `/work/${edge.node.slug}`,
      component: slash(workTemplate),
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
