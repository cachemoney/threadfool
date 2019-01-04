import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby'
import _ from 'lodash'
import { Container,  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem} from 'reactstrap';

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
    // todo: set article url to: href={`${siteMetadata.siteUrl}/#articles`}
    return (
      <div>
        <Navbar color="primary" dark expand="lg">
          <Container>
            <NavbarBrand href="/">{siteMetadata.title}</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>

                {/* conditionally render category links */}
                {categories && (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      SW/Arch Notes
                    </DropdownToggle>
                    <DropdownMenu right>
                      {categories.map((category) => {
                        return (
                          <DropdownItem key={category.fieldValue}>
                            <NavLink href={`${siteMetadata.siteUrl}/#${category.fieldValue}`}>{_.startCase(category.fieldValue)}</NavLink>
                          </DropdownItem>
                        )
                      })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                )}
                <NavItem>
                  <NavLink disabled href={`${siteMetadata.siteUrl}/#articles`}>Articles</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    About
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Link to="#">About Robin</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href={siteMetadata.social.github}>GitHub</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href={siteMetadata.social.twitter}>Twitter</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href={siteMetadata.social.linkedIn}>LinkedIn</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
            </Container>
          </Navbar>
      </div>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
            social {
              twitter
              linkedIn
              github
            }
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