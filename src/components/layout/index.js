import React from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

// code syntax-highlighting theme
// feel free to change it to another one
import 'prismjs/themes/prism-twilight.css'

// main site style
import './index.scss'

const TemplateWrapper = ({ children, data }) => {
  // let user
  // if (typeof window !== 'undefined') {
  //   user = window.netlifyIdentity && window.netlifyIdentity.currentUser()
  // }
  const currentYear = new Date().getFullYear();

  return (
    <StaticQuery query={pageQuery} render={data => (
      <div className='App'>
        <Helmet title={data.site.siteMetadata.title} />
        <div className='navbar navbar-expand-lg navbar-dark bg-primary'>
          <Container>
            <Link to='/' className='navbar-brand'>{data.site.siteMetadata.title}</Link>
            <ul className='nav navbar-nav'>

              <li className='nav-item'>
                <Link to='/about' className='nav-link'>About</Link>
              </li>
            </ul>
          </Container>
        </div>
        <div className='pageContent'>{children}</div>
        <div className="text-center footer">
          <h5>
            This project contains {data.allMarkdownRemark.totalCount} pages and is available on <a href={data.site.siteMetadata.blogRepo}>GitHub</a>. Copyright © {data.site.siteMetadata.author}, {currentYear}.
          </h5>
        </div>
      </div>
    )} />
  )
}

TemplateWrapper.propTypes = {
  children: PropTypes.array
}

const pageQuery = graphql`
  query LayoutIndexQuery {
    site {
      siteMetadata {
        title
        blogRepo
        author
      }
    }
    allMarkdownRemark {
      totalCount
    }
  }
`

export default TemplateWrapper
