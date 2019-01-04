import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby'
import { Container } from 'reactstrap'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {

    const {
            data: 
              {
                site: {siteMetadata},
                allMarkdownRemark: {categories}
              }
          } = this.props
    // console.log("categories ", categories)

    return (
      <div className='navbar navbar-expand-lg navbar-dark bg-primary'>
        <Container>
          <Link to='/' className='navbar-brand'>{siteMetadata.title}</Link>
          <ul className='nav navbar-nav'>
            <li className='nav-item'>
              <Link to='/about' className='nav-link'>About</Link>
            </li>
          </ul>
        </Container>
      </div>
    );
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { date: { ne: null } } }
        )
        {
          categories: group(field: fields___category) {
            fieldValue
          }
        }
      }
    `}
    render={(data) => (
      <NavBar data={data} />
    )}
  />
)