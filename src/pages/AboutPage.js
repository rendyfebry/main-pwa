import React from 'react'
import Page from './Page'
import logo from '../logo.svg'

const AboutPage = () => (
	<Page title="About">
		<div className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h2>About</h2>
		</div>
		<p className="App-intro">
			This is the About page.
		</p>
	</Page>
)

export default AboutPage
