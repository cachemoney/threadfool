import React from 'react'
import { Container, Card, CardTitle, CardGroup, CardBody } from 'reactstrap'
import Helmet from 'react-helmet'
import { basename } from 'path'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

// find a post title by path
const findNode = (path, data) => data.allMarkdownRemark.edges
  .map(edge => edge.node.frontmatter)
  .filter(r => r.path === path)
  .pop()

export default function Template ({ data }) {
  const { markdownRemark: post } = data
  const related = post.frontmatter.related ? post.frontmatter.related.map(r => findNode(r.post, data)) : []
  return (
    <Layout>
      <div>
        <Helmet title={`Blog | ${post.frontmatter.title}`}>

        </Helmet>
        <Container>
          <h1 className='display-3'>{post.frontmatter.title}</h1>
        </Container>

        <Container dangerouslySetInnerHTML={{ __html: post.html }} />

        {post.frontmatter.attachments && (<Container><h4>Attachments</h4><CardGroup>
          {post.frontmatter.attachments.map((attachment, i) => (
            <Card key={i}>
              <CardBody>
                <CardTitle><a href={attachment.filename}>{basename(attachment.filename)}</a></CardTitle>
              </CardBody>
            </Card>
          ))}
        </CardGroup></Container>)}

        {post.frontmatter.related && (<Container><h4>Related</h4><CardGroup>
          {related.map((r, i) => (
            <Card key={i}>
              <CardBody>
                <CardTitle>
                  <Link to={r.path}>{r.title}</Link>
                </CardTitle>
              </CardBody>
            </Card>
          ))}
        </CardGroup></Container>)}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        path
        date(formatString: "MMMM DD, YYYY")
        title
      }
      fields {
        slug
      }
    }

    allMarkdownRemark{
      edges{
        node{
          frontmatter{
            title
            path
          }
        }
      }
    }
  }
`
