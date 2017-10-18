import React from 'react'
import Page from './Page'
import logo from '../logo.svg'

const HomePage = () => (
	<Page title="Home">
		<div className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h2>Home</h2>
		</div>
		<p className="App-intro">
			This is the Home page.
		</p>
	</Page>
)

export default HomePage
