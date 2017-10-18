import React from 'react'
import md5 from 'md5'
import { withRouter } from 'react-router'

import Page from './Page'
import Loader from '../components/Loader'
import CharacterDetail from '../components/CharacterDetail'

import {
	PRIVATE_KEY,
	PUBLIC_KEY,
	API_URL,
} from '../shared/config'

class CharacterDetailPage extends React.Component {
	state = {
		isLoading: true,
		characterDetail: {},
	}

	componentWillMount() {
		this.fetchCharacterDetail(this.props.params.charId)
	}

	fetchCharacterDetail = async (charId) => {
		const ts = Date.now()
		const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY)

		const apiUrl = `${API_URL}/v1/public/characters/${charId}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`

		fetch(apiUrl)
			.then(response => response.json())
			.then((responJSON) => {
				if (responJSON.code === 200 && responJSON.data.results.length) {
					const characterDetail = responJSON.data.results[0]
					this.setState({
						isLoading: false,
						characterDetail,
					})
				} else {
					console.error(`Something wrong when fetching data. Status Code ${responJSON.code}, ${responJSON.status}`)
				}
			})
	}

	renderMainContent = () => {
		const mainContent = this.state.isLoading
			? <Loader title="Fetch Character Detail" description="Please wait..." />
			: <CharacterDetail {...this.state.characterDetail} />
		return mainContent
	}

	render() {
		return (
			<Page title="About">
				<div className="App-header">
					<h2>Characters Detail</h2>
				</div>
				{this.renderMainContent()}
			</Page>
		)
	}
}

export default withRouter(CharacterDetailPage)
