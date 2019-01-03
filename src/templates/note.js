import React from 'react'
import { Container, Card, CardTitle, CardGroup, CardBody } from 'reactstrap'
import Helmet from 'react-helmet'
import { basename } from 'path'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

// find a post title by path
// const findNode = (path, data) => data.allMarkdownRemark.edges
//   .map(edge => edge.node.frontmatter)
//   .filter(r => r.path === path)
//   .pop()

export default function Template ({ data }) {
  const { markdownRemark: post } = data
  const description = post.frontmatter.description || post.excerpt
  return (
    <Layout>
    <SEO title={post.frontmatter.title} description={description} keywords={post.frontmatter.keywords} />
      <div>
        <Container>
          <h1 className='display-3'>{post.frontmatter.title}</h1>
        </Container>

        <Container dangerouslySetInnerHTML={{ __html: post.html }} />

      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        keywords
      }
      fields {
        slug
      }
    }
  }
`
