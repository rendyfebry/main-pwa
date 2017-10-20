import React from 'react'
import {
	Container,
	Row,
	Breadcrumb,
	BreadcrumbItem,
} from 'reactstrap'
import { browserHistory, withRouter, Link } from 'react-router'

// import './ComicListPage.css'
import Page from './Page'
import Loader from '../components/Loader'
import ComicList from '../components/ComicList'
import MainPagination from '../components/MainPagination'

class ComicListPage extends React.Component {
	state = {
		isLoading: true,
		issues: [],
		currentPage: 1,
		limitPerPage: 24,
		totalPages: [],
		sortBy: '-issueNumber',
	}

	componentWillMount() {
		const currentPage = parseInt(this.props.location.query.page, 10) || 1
		const limitPerPage = parseInt(this.props.location.query.limit, 10) || 24

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
		const paginationComponend = (
			<MainPagination
				onPageChange={this.fetchComicListPage}
				currentPage={this.state.currentPage}
				totalPages={this.state.totalPages}
			/>
		)

		const component = this.state.issues.length ? paginationComponend : null
		return component
	}

	render() {
		return (
			<Page title="About" >
				<Breadcrumb>
					<BreadcrumbItem>
						<Link href="/" to="/">Home</Link>
					</BreadcrumbItem>
					<BreadcrumbItem active>Comics</BreadcrumbItem>
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

export default withRouter(ComicListPage)
