import React from 'react'
import { Router, browserHistory, Route } from 'react-router'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ComicListPage from './pages/ComicListPage'
import CharacterListPage from './pages/CharacterListPage'
import CharacterDetailPage from './pages/CharacterDetailPage'
import SettingsPage from './pages/SettingsPage'

const App = () => (
	<Router history={browserHistory}>
		<Route path="/" component={HomePage} />
		<Route path="/about" component={AboutPage} />
		<Route path="/comics" component={ComicListPage} />
		<Route path="/characters" component={CharacterListPage} />
		<Route path="/characters/:charId" component={CharacterDetailPage} />
		<Route path="/settings" component={SettingsPage} />
	</Router>
)

export default App

