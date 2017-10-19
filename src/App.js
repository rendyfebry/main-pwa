import React from 'react'
import { Router, browserHistory, Route } from 'react-router'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import SettingsPage from './pages/SettingsPage'
import CharactersPage from './pages/CharactersPage'
import CharacterDetailPage from './pages/CharacterDetailPage'

const App = () => (
	<Router history={browserHistory}>
		<Route path="/" component={HomePage} />
		<Route path="/about" component={AboutPage} />
		<Route path="/characters" component={CharactersPage} />
		<Route path="/characters/page/:pageId" component={CharactersPage} />
		<Route path="/characters/:charId" component={CharacterDetailPage} />
		<Route path="/settings" component={SettingsPage} />
	</Router>
)

export default App

