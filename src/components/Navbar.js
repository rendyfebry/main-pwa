import React from 'react'
import { Link } from 'react-router'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

export default class Example extends React.Component {
	state = {
		isOpen: false,
	}

	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen })
	}

	render() {
		return (
			<Navbar light expand="md">
				<NavbarBrand to="/" href="/">Alkemi</NavbarBrand>
				<NavbarToggler onClick={this.toggle} aria-label="toggler" />
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<Link className="nav-link" href="/about" to="/about">About</Link>
						</NavItem>
						<NavItem>
							<Link className="nav-link" href="/characters" to="/characters">Characters</Link>
						</NavItem>
						<NavItem>
							<Link className="nav-link" href="/settings" to="/settings">Settings</Link>
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
