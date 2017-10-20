import React from 'react'
import Page from './Page'
import logo from '../logo.svg'
import SubNav from '../components/SubNav'

const AboutPage = () => (
	<Page title="About">
		<SubNav>
			<img src={logo} className="App-logo" alt="logo" />
			<h2>About</h2>
		</SubNav>
		<p className="App-intro">
			This is the About page.
		</p>
	</Page>
)

export default AboutPage
