import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import HeaderNavBar from '../shared/header-nav-bar'

// code syntax-highlighting theme
// feel free to change it to another one
import 'prismjs/themes/prism-twilight.css'

// main site style
import './index.scss'

const TemplateWrapper = ({ children, data }) => {

  return (
    <StaticQuery query={pageQuery} render={data => (
      <div className='App'>
        <HeaderNavBar/>
        <div className='pageContent'>{children}</div>
      </div>
    )} />
  )
}

TemplateWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

const pageQuery = graphql`
  query LayoutIndexQuery {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
  }
`

export default TemplateWrapper