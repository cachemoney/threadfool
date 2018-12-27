import React from "react"
import { graphql } from "gatsby"
import Link from 'gatsby-link'
import { Container, Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import Layout from '../components/layout'
import TagLine from '../components/text/tagLine'
import PostLink from "../components/post-link"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !edge.node.frontmatter.hidden) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  // return <div>{Posts}</div>
  return (
    <Layout>
      <Container><TagLine /></Container>
      <Container>
        <Card style={{marginBottom: 10}}>
          <CardBody>
            {Posts}
          </CardBody>
        </Card>
      </Container>
    </Layout>
  )

}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            hidden
          }
          fields {
            slug
            category
          }
        }
      }
    }
  }
`