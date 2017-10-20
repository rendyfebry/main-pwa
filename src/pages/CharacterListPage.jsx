import React from 'react'
import {
	Container,
	Row,
	Breadcrumb,
	BreadcrumbItem,
} from 'reactstrap'
import { browserHistory, withRouter, Link } from 'react-router'

import './CharacterListPage.css'
import Page from './Page'
import Loader from '../components/Loader'
import CharacterList from '../components/CharacterList'
import MainPagination from '../components/MainPagination'

class CharacterListPage extends React.Component {
	state = {
		isLoading: true,
		characters: [],
		currentPage: 1,
		limitPerPage: 24,
		totalPages: 0,
		sortBy: 'name',
	}

	componentWillMount() {
		const currentPage = parseInt(this.props.location.query.page, 10) || 1
		const limitPerPage = parseInt(this.props.location.query.limit, 10) || 24

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
		const paginationComponent = (
			<MainPagination
				onPageChange={this.fetchCharacterListPage}
				currentPage={this.state.currentPage}
				totalPages={this.state.totalPages}
			/>
		)

		const component = (this.state.characters.length) ? paginationComponent : null
		return component
	}

	render() {
		return (
			<Page title="Characters" >
				<Breadcrumb>
					<BreadcrumbItem>
						<Link href="/" to="/">Home</Link>
					</BreadcrumbItem>
					<BreadcrumbItem active>Characters</BreadcrumbItem>
				</Breadcrumb>
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
