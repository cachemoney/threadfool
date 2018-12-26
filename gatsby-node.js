const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ actions: { createPage }, graphql }) => {
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              contentType
              path
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`src/templates/${String(node.frontmatter.contentType)}.js`),
        context: {
          slug: node.fields.slug
        }
      })
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark` || node.internal.type === `JupyterNotebook`) {
    const fileNode = getNode(node.parent)
    // console.log(`\n`, fileNode.relativePath)
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}