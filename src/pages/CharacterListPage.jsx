import React from 'react'
import {
	Container,
	Row,
	Col,
	Pagination,
	PaginationItem,
	PaginationLink,
} from 'reactstrap'
import { browserHistory, withRouter } from 'react-router'

import './CharacterListPage.css'
import Page from './Page'
import Loader from '../components/Loader'
import CharacterList from '../components/CharacterList'

class CharacterListPage extends React.Component {
	state = {
		isLoading: true,
		characters: [],
		currentPage: 1,
		limitPerPage: 25,
		totalPages: 0,
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

	fetchCharacterListPage = (newPage) => {
		this.setState({
			currentPage: newPage,
			isLoading: true,
		}, () => {
			let newUrl = '/characters'
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
		let apiUrl = '/api/characters'
		apiUrl += `?sort=${sort}`
		apiUrl += `&limit=${limit}`
		apiUrl += `&page=${page}`

		fetch(apiUrl)
			.then(response => response.json())
			.then((responseJSON) => {
				if (responseJSON.error !== 'OK') {
					console.error('Something wrong when fetching data.')
					return false
				}

				const characters = responseJSON.results
				const totalCharacters = responseJSON.number_of_total_results
				const totalPages = Math.ceil(totalCharacters / this.state.limitPerPage)

				return this.setState({
					isLoading: false,
					characters,
					totalPages,
				})
			})
	}

	renderMainComponent = () => {
		const mainComponent = this.state.isLoading
			? <Loader title="Fetch Character List" description="Please wait..." />
			: <CharacterList characters={this.state.characters} />
		return mainComponent
	}

	renderPaginationComponent = () => {
		let paginationComponent = null
		if (this.state.characters.length) {
			const { currentPage } = this.state
			const prevPage = currentPage <= 1 ? 1 : currentPage - 1
			const nextPage = currentPage + 1
			const currentPageMinTwo = currentPage <= 2 ? 1 : currentPage - 2
			const currentPageMinOne = prevPage
			const currentPagePlusOne = nextPage
			const currentPagePlusTwo = currentPage + 2

			paginationComponent = (
				<Col>
					<Pagination className="CharacterList_pagination">
						<PaginationItem>
							<PaginationLink
								previous
								href="#"
								onClick={() => this.fetchCharacterListPage(1)}
							/>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink
								href="#"
								onClick={() => this.fetchCharacterListPage(currentPageMinTwo)}
							>
								{currentPage <= 2 ? '..' : currentPage - 2}
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink
								href="#"
								onClick={() => this.fetchCharacterListPage(currentPageMinOne)}
							>
								{currentPage <= 1 ? '..' : currentPage - 1}
							</PaginationLink>
						</PaginationItem>
						<PaginationItem active>
							<PaginationLink href="#">
								{currentPage}
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink
								href="#"
								onClick={() => this.fetchCharacterListPage(currentPagePlusOne)}
							>
								{currentPagePlusOne}
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink
								href="#"
								onClick={() => this.fetchCharacterListPage(currentPagePlusTwo)}
							>
								{currentPagePlusTwo}
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink
								next
								href="#"
								onClick={() => this.fetchCharacterListPage(this.state.totalPages)}
							/>
						</PaginationItem>
					</Pagination>
				</Col>
			)
		}
		return paginationComponent
	}

	render() {
		return (
			<Page title="About" >
				<div className="App-header">
					<h2>Characters</h2>
				</div>
				<Container className="container_main">
					<Row>
						{this.renderMainComponent()}
					</Row>
				</Container>
				<Container>
					<Row>
						{this.renderPaginationComponent()}
					</Row>
				</Container>
			</Page >
		)
	}
}

export default withRouter(CharacterListPage)
