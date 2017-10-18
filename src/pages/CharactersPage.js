import React from 'react'
import Page from './Page'
import CharacterList from '../components/CharacterList'
import './CharactersPage.css'

const CharactersPage = () => (
	<Page title="About">
		<div className="App-header">
			<h2>Characters</h2>
		</div>
		<CharacterList />
	</Page>
)

export default CharactersPage
