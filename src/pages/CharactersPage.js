import React from 'react'
import md5 from 'md5'

import Page from './Page'
import Loader from '../components/Loader'
import CharacterList from '../components/CharacterList'

import {
	API_URL,
	PUBLIC_KEY,
	PRIVATE_KEY,
} from '../shared/config'

class CharactersPage extends React.Component {
	state = {
		isLoading: true,
		characters: [],
	}

	componentWillMount() {
		this.fetchCharacters()
	}

	fetchCharacters = async () => {
		const ts = Date.now()
		const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY)

		const apiUrl = `${API_URL}/v1/public/characters?orderBy=name&limit=100&offset=0&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`

		fetch(apiUrl)
			.then(response => response.json())
			.then((responJSON) => {
				if (responJSON.code === 200) {
					const characters = responJSON.data.results
					this.setState({
						isLoading: false,
						characters,
					})
				} else {
					console.error(`Something wrong when fetching data. Status Code ${responJSON.code}, ${responJSON.status}`)
				}
			})
	}

	renderMainContent = () => {
		const mainContent = this.state.isLoading
			? <Loader title="Fetch Character List" description="Please wait..." />
			: <CharacterList characters={this.state.characters} />
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
