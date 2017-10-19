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

// import './ComicListPage.css'
import Page from './Page'
import Loader from '../components/Loader'
import ComicList from '../components/ComicList'

class ComicListPage extends React.Component {
	state = {
		isLoading: true,
		issues: [],
		currentPage: 1,
		limitPerPage: 25,
		totalPages: [],
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

	fetchComicListPage = (newPage) => {
		this.setState({
			currentPage: newPage,
			isLoading: true,
		}, () => {
			let newUrl = '/comics'
			newUrl += `?page=${this.state.currentPage}`
			newUrl += `&limit=${this.state.limitPerPage}`

			browserHistory.push(newUrl)
			this.fetchIssues({
				page: this.state.currentPage,
				limit: this.state.limitPerPage,
				sort: this.state.sortBy,
			})
		})
	}

	fetchIssues = async ({ page, limit, sort }) => {
		let apiUrl = '/api/issues'
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

				const issues = responseJSON.results
				const totalIssues = responseJSON.number_of_total_results
				const totalPages = Math.ceil(totalIssues / this.state.limitPerPage)

				return this.setState({
					isLoading: false,
					issues,
					totalPages,
				})
			})
	}

	renderMainComponent = () => {
		const loaderComponent = this.state.isLoading
			? <Loader title="Fetch Comic List" description="Please wait..." />
			: <ComicList issues={this.state.issues} />
		return loaderComponent
	}

	renderPaginationComponent = () => {
		let paginationComponent = null
		if (this.state.issues.length) {
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
								onClick={() => this.fetchComicListPage(1)}
							/>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink
								href="#"
								onClick={() => this.fetchComicListPage(currentPageMinTwo)}
							>
								{currentPage <= 2 ? '..' : currentPage - 2}
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink
								href="#"
								onClick={() => this.fetchComicListPage(currentPageMinOne)}
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
								onClick={() => this.fetchComicListPage(currentPagePlusOne)}
							>
								{currentPagePlusOne}
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink
								href="#"
								onClick={() => this.fetchComicListPage(currentPagePlusTwo)}
							>
								{currentPagePlusTwo}
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink
								next
								href="#"
								onClick={() => this.fetchComicListPage(this.state.totalPages)}
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
					<h2>Comics</h2>
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

export default withRouter(ComicListPage)
