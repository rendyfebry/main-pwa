import React from 'react'
import Page from './Page'
import logo from '../logo.svg'

const SettingPage = () => (
	<Page title="Settings">
		<div className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h2>Settings</h2>
		</div>
		<p className="App-intro">
			This is the Settings page.
		</p>
	</Page>
)

export default SettingPage
