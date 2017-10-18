import React from 'react'
import { Link, withRouter } from 'react-router'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import "./Navbar.css"

class MainNavbar extends React.Component {
	state = {
		isOpen: false,
	}

	get currentPath() {
		return this.props.location.pathname
	}

	getLinkClassName = (route) => {
		const isActive = this.isOnThisRoute(route)
		const className = isActive ? 'nav-link active' : 'nav-link'
		return className
	}

	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen })
	}

	isOnThisRoute = route => route === this.currentPath

	render() {
		return (
			<Navbar light fixed="top" expand="md">
				<NavbarBrand to="/" href="/">Marvel DB</NavbarBrand>
				<NavbarToggler onClick={this.toggle} aria-label="toggler" />
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<Link
								className={this.getLinkClassName('/')}
								href="/"
								to="/"
							>
								Home
							</Link>
						</NavItem>
						<NavItem>
							<Link
								className={this.getLinkClassName('/about')}
								href="/about"
								to="/about"
							>
								About
							</Link>
						</NavItem>
						<NavItem>
							<Link
								className={this.getLinkClassName('/characters')}
								href="/characters"
								to="/characters"
							>
								Characters
							</Link>
						</NavItem>
						<NavItem>
							<NavLink
								href="https://github.com/rendyfebry/main-pwa"
								rel="noopener"
							>
								Github
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		)
	}
}

const MainNavbarWithRouter = withRouter(MainNavbar)

export default MainNavbarWithRouter
