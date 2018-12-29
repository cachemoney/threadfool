import React from "react"
import { graphql } from "gatsby"
// import Link from 'gatsby'
import _ from 'lodash'
// import { Container, Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import { Container, Card } from 'reactstrap'
import Layout from '../components/layout'
import TagLine from '../components/text/tagLine'
import { node } from "prop-types";
// import PostLink from "../components/post-link"

const IndexPage = ({
  data: {
    allMarkdownRemark: { categories, subCategories },
  },
}) => {
  let allPosts = []
  let categoryItems = []
  let articleItems = []

  function buildArticleBySubCategory(name, element, subCategoryItems ) {
    console.log("buildArticleBySubCategory for: ", name)
    console.log("subCategoryItems passed in: ",subCategoryItems)
    let tempObj = {}
    let articlesArray = []
    if (_.find(subCategoryItems, function(o) { return o.name === name }) ) {
      console.log("exited because subcategoryitems has ", name)
      return subCategoryItems
    } else {
      element.edges.forEach(edge => {
        articlesArray.push(
          {
            title: edge.node.frontmatter.title,
            slug: edge.node.fields.slug
          })
      })
      tempObj = {name, articles: articlesArray}
      console.log("buildArticleBySubCategory tempObj: ", tempObj)
      subCategoryItems.push(tempObj)
      console.log("buildArticleBySubCategory final Array: ", subCategoryItems)
      return subCategoryItems
    }
    // console.log("Finished buildArticleBySubCategory current state subCategoryItems ", subCategoryItems);
    // return subCategoryItems
  } 

  function populateSubs(category) {
    console.log(`building ${category} in populatingSubs`)
    let subCategoryItemsArray = []
    subCategories.forEach(element => { //behavioral subcategory
      console.log("looping through sub-categories: ", element.fieldValue)
      element.edges.forEach(edge => { // command pattern article meta
        let articleItems = []
        if (edge.node.fields.category === category) {
            console.log(`found subcategory <${element.fieldValue}> in ${category}`)
            let temp = buildArticleBySubCategory(element.fieldValue, element, subCategoryItemsArray)
            console.log("inside populateSubs buildArticleBySubCategory: ",temp)
            subCategoryItemsArray.push(temp)
        }
      })
    })
    return subCategoryItemsArray
  }

  const transformedGraph = categories.map(category => (
    {
      category: category.fieldValue,
      subCategory: populateSubs(category.fieldValue)
    }))
  console.log('transformedGraph: ', transformedGraph)

  // [
  //   {
  //     category: "patterns",
  //     subCategory: [{name: "creational", articles: [{titles: "Abstract Factory Pattern", slug:"/patterns/creational/abstract-factory/"}]},{name: "structural", articles: []},{name: "behavioral"}]
  //   }
  // ]
  // console.log("foo ",categories[2]);



  return (
    <Layout>
      <Container><TagLine /></Container>
      <Container>
        {categories.map(category => (
            <div key={category.fieldValue}>
              <Card style={{marginBottom: 20}}>
                <h4 className="card-header" style={{fontWeight: 700}}>{_.startCase(category.fieldValue)}</h4>
              </Card>
            </div>
        ))}
      </Container>
    </Layout>
  )

}

export default IndexPage

export const pageQuery = graphql`
  query {
  allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      categories: group(field: fields___category) {
        fieldValue
        totalCount
    	edges {node {frontmatter{title}fields {subCategory}}}
    	}
    subCategories: group(field: fields___subCategory) {
      fieldValue
      totalCount
      edges {node {frontmatter{title} fields{slug category}}}
    }
  }
}
`