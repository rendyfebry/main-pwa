import React from 'react'
import md5 from 'md5'
import { Container, Row, Col, Button } from 'reactstrap'
import { browserHistory, withRouter } from 'react-router'

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
		currentPage: 1,
		limitPerPage: 25,
		sortBy: 'name',
	}

	componentWillMount() {
		const currentPage = parseInt(this.props.location.query.page, 10) || 1
		const limitPerPage = parseInt(this.props.location.query.limit, 10) || 25

		this.setState({
			currentPage,
			limitPerPage,
		}, () => this.fetchCharacterListPage(currentPage))
	}

	handlePrevClick = () => {
		let newPage
		if (this.state.currentPage <= 1) {
			newPage = 1
		} else {
			newPage = this.state.currentPage - 1
		}

		return this.fetchCharacterListPage(newPage)
	}

	handleNextClick = () => {
		const newPage = this.state.currentPage + 1
		return this.fetchCharacterListPage(newPage)
	}

	fetchCharacterListPage = (newPage) => {
		this.setState({
			currentPage: newPage,
			isLoading: true,
		}, () => {
			let newUrl = `/characters`
			newUrl += `?page=${this.state.currentPage}`
			newUrl += `&limit=${this.state.limitPerPage}`

			browserHistory.push(newUrl)
			this.fetchCharacters({
				page: this.state.currentPage,
				limit: this.state.limitPerPage,
				sort: this.state.sortBy,
			})
		})
	}

	fetchCharacters = async ({ page, limit, sort }) => {
		const ts = Date.now()
		const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY)
		const offset = (page - 1) * limit

		let apiUrl = `${API_URL}/v1/public/characters`
		apiUrl += `?orderBy=${sort}`
		apiUrl += `&limit=${limit}`
		apiUrl += `&offset=${offset}`
		apiUrl += `&ts=${ts}`
		apiUrl += `&apikey=${PUBLIC_KEY}`
		apiUrl += `&hash=${hash}`

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
				<Container>
					<Row>
						<Col>
							<Button onClick={this.handlePrevClick}>Prev</Button>
							<Button onClick={this.handleNextClick}>Next</Button>
						</Col>
					</Row>
				</Container>
			</Page >
		)
	}
}

export default withRouter(CharactersPage)
