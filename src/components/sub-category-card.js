import React from "react"
import { Link } from "gatsby"
import _ from 'lodash'
import { Card, CardBody, CardTitle, CardHeader } from 'reactstrap'


// [
  //   {
  //     name: "patterns",
  //     subCategory: [{name: "creational", articles: [{title: "Abstract Factory Pattern", slug:"/patterns/creational/abstract-factory/"}]},{name: "structural", articles: []},{name: "behavioral"}]
  //   }
  // ]

const SubCategoryCard = ({subcategories}) => (
  <div>
    {subcategories.map(item => (
      <Card style={{marginBottom: 20, flexDirection: "column"}}>
        <CardHeader tag="h5" style={{backgroundColor: "#fff", fontWeight: "normal"}}>{_.startCase(item.name)}</CardHeader>
        <CardBody>
          <ul style={{columns:2, WebkitColumns: 2, MozColumns: 2}}>
            {item.articles.map(article => (
              <li>
                <Link to={article.slug}>{article.title}</Link>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    ))}
  </div>
)

export default SubCategoryCard