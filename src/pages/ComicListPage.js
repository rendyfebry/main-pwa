import React from 'react'
import md5 from 'md5'
import { Container, Row, Col, Button } from 'reactstrap'
import { browserHistory, withRouter } from 'react-router'

// import './ComicListPage.css'
import Page from './Page'
import Loader from '../components/Loader'
import ComicList from '../components/ComicList'

import {
	API_URL,
	PUBLIC_KEY,
	PRIVATE_KEY,
} from '../shared/config'

class ComicListPage extends React.Component {
	state = {
		isLoading: true,
		comics: [],
		currentPage: 1,
		limitPerPage: 25,
		sortBy: '-issueNumber',
	}

	componentWillMount() {
		const currentPage = parseInt(this.props.location.query.page, 10) || 1
		const limitPerPage = parseInt(this.props.location.query.limit, 10) || 25

		this.setState({
			currentPage,
			limitPerPage,
		}, () => this.fetchComicListPage(currentPage))
	}

	handlePrevClick = () => {
		let newPage
		if (this.state.currentPage <= 1) {
			newPage = 1
		} else {
			newPage = this.state.currentPage - 1
		}

		return this.fetchComicListPage(newPage)
	}

	handleNextClick = () => {
		const newPage = this.state.currentPage + 1
		return this.fetchComicListPage(newPage)
	}

	fetchComicListPage = (newPage) => {
		this.setState({
			currentPage: newPage,
			isLoading: true,
		}, () => {
			let newUrl = `/comics`
			newUrl += `?page=${this.state.currentPage}`
			newUrl += `&limit=${this.state.limitPerPage}`

			browserHistory.push(newUrl)
			this.fetchComics({
				page: this.state.currentPage,
				limit: this.state.limitPerPage,
				sort: this.state.sortBy,
			})
		})
	}

	fetchComics = async ({ page, limit, sort }) => {
		const ts = Date.now()
		const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY)
		const offset = (page - 1) * limit

		let apiUrl = `${API_URL}/v1/public/comics`
		apiUrl += `?orderBy=${sort}`
		apiUrl += `&limit=${limit}`
		apiUrl += `&offset=${offset}`
		apiUrl += `&ts=${ts}`
		apiUrl += `&apikey=${PUBLIC_KEY}`
		apiUrl += `&hash=${hash}`

		fetch(apiUrl)
			.then(response => response.json())
			.then((responJSON) => {
				console.log(responJSON)

				if (responJSON.code === 200) {
					const comics = responJSON.data.results
					this.setState({
						isLoading: false,
						comics,
					})
				} else {
					console.error(`Something wrong when fetching data. Status Code ${responJSON.code}, ${responJSON.status}`)
				}
			})
	}

	renderLoaderComponent = () => {
		let loaderComponent = null

		if (this.state.isLoading) {
			loaderComponent = this.state.comics.length
				? <Loader />
				: <Loader title="Fetch Comic List" description="Please wait..." />
		}
		return loaderComponent
	}

	renderPaginationComponent = () => {
		let paginationComponent = null
		if (this.state.comics.length) {
			paginationComponent = (
				<Col>
					<Button onClick={this.handlePrevClick}>Prev</Button>
					<Button onClick={this.handleNextClick}>Next</Button>
				</Col>
			)
		}
		return paginationComponent
	}

	render() {
		return (
			<Page title="About" >
				<div className="App-header">
					<h2>Comics</h2>
				</div>
				<Container className="container_main">
					<Row>
						<ComicList comics={this.state.comics} />
					</Row>
					<Row>
						<Col>
							{this.renderLoaderComponent()}
						</Col>
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

export default withRouter(ComicListPage)
