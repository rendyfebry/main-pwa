import React from 'react'
import Axios from 'axios'
import md5 from 'md5'

import Page from './Page'
import Loader from '../components/Loader'
import CharacterList from '../components/CharacterList'
import './CharactersPage.css'

import {
	API_URL,
	PUBLIC_KEY,
	PRIVATE_KEY,
} from '../shared/config'

class CharactersPage extends React.Component {
	state = {
		characters: [],
	}

	componentWillMount() {
		this.fetchCharacters()
	}

	fetchCharacters = async () => {
		const ts = Date.now()
		const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY)

		const apiUrl = `${API_URL}/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`
		// https://gateway.marvel.com:443/v1/public/characters?orderBy=name&limit=25&offset=0&apikey=b78e32405c03d7cfd6d91633cb7f6a13

		const response = await Axios.get(apiUrl)

		if (response.status === 200) {
			const characters = response.data.data.results
			this.setState({ characters })
		} else {
			console.error(`Something wrong when fetching data. Status Code ${response.status}, ${response.statusText}`)
		}
	}

	renderMainContent = () => {
		const mainContent = this.state.characters.length
			? <CharacterList characters={this.state.characters} />
			: <Loader title="Fetch Character List" description="Please wait..." />
		return mainContent
	}

	render() {
		return (
			<Page title="About" >
				<div className="App-header">
					<h2>Characters</h2>
				</div>
				{this.renderMainContent()}
			</Page >
		)
	}
}

export default CharactersPage
