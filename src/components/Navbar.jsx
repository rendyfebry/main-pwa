import React from 'react'
import { Link, withRouter } from 'react-router'
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Input,
} from 'reactstrap'
import './Navbar.css'

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
			<Navbar dark fixed="top" expand="md">
				<NavbarBrand to="/" href="/">Comic DB</NavbarBrand>
				<NavbarToggler onClick={this.toggle} aria-label="toggler" />
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="mr-auto navbar_search-wrapper" navbar>
						<Input type="text" placeholder="search" />
					</Nav>
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
								className={this.getLinkClassName('/comics')}
								href="/comics"
								to="/comics"
							>
								Comics
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

export default withRouter(MainNavbar)
