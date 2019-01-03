const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                contentType
                title
                path
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(({node}) => {

      createPage({
        path: node.fields.slug,
        component: path.resolve(`src/templates/${String(node.frontmatter.contentType)}.js`),
        context: {
          slug: node.fields.slug
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark` || node.internal.type === `JupyterNotebook`) {
    const fileNode = getNode(node.parent)
    // console.log(`\n`, fileNode.relativeDirectory)
    const [category, subCategory] = fileNode.relativeDirectory.split('/')
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
    createNodeField({
      node,
      name: `category`,
      value: category
    })
    createNodeField({
      node,
      name: `subCategory`,
      value: subCategory
    })
  }
}
