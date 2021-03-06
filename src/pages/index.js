import React from "react"
import { graphql } from "gatsby"
import _ from 'lodash'
import { Container, Card } from 'reactstrap'
import Layout from '../components/layout'
import SEO from '../components/seo'
import TagLine from '../components/text/tag-line'
import SubCategoryCard from "../components/sub-category-card"

// NOTE: Set frontmatter date to null to not publish the note

const IndexPage = ({
  data: {
    site: { siteMetadata },
    allMarkdownRemark: { categories },
  },
}) => {

  function articleObjBuilder(node) {
    return {
      title: node.frontmatter.title,
      slug: node.fields.slug
    }
  }

  function populateSubs(cat) {
    let articleItems = [], subCatName, objIndex
    cat.edges.forEach( ({node}) => {
      subCatName = node.fields.subCategory || "undefined"
      objIndex = articleItems.findIndex( obj => obj.name === subCatName )
      if (objIndex >= 0) {
        articleItems[objIndex].articles.push(articleObjBuilder(node))
      } else {
        // subArticleItems = [] // initialize the array since its the 1st time
        articleItems.push({name: subCatName, articles: [articleObjBuilder(node)]})
      }
    })

    return articleItems
  }

  const transformedGraph = categories.map(category => (
    {
      name: category.fieldValue,
      subCategory: populateSubs(category)
    }))
  // console.log('transformedGraph: ', transformedGraph)

  // [
  //   {
  //     name: "patterns",
  //     subCategory: [{name: "creational", articles: [{title: "Abstract Factory Pattern", slug:"/patterns/creational/abstract-factory/"}]},{name: "structural", articles: []},{name: "behavioral"}]
  //   }
  // ]

  return (
    <Layout>
      <SEO
        title="Robin Paul · Notes on Software Design & Data Architecture"
        keywords={[`design patterns`, `robin paul`, `Software design`, `software architecture`]}
        description={siteMetadata.description}
      />
      <Container><TagLine /></Container>
      <Container>
        {transformedGraph.map(category => (
          <div key={category.name}>
            <Card style={{marginBottom: 20}} id={category.name}>
              <h4 className="card-header" style={{fontWeight: 700}}>{_.startCase(category.name)}</h4>
            </Card>
             <SubCategoryCard subcategories={category.subCategory}/>
          </div>
        ))}
      </Container>
    </Layout>
  )

}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author {
          name
        }
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { date: { ne: null } } }
      ) {
        categories: group(field: fields___category) {
          fieldValue
          totalCount
        edges {node {frontmatter{title}fields {slug subCategory }}}
        }
    }
}
`