import React from 'react'
import Page from './Page'
import logo from '../logo.svg'
import SubNav from '../components/SubNav'

const SettingPage = () => (
	<Page title="Settings">
		<SubNav>
			<img src={logo} className="App-logo" alt="logo" />
			<h2>Settings</h2>
		</SubNav>
		<p className="App-intro">
			This is the Settings page.
		</p>
	</Page>
)

export default SettingPage
