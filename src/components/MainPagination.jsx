import React from 'react'
import {
	Col,
	Pagination,
	PaginationItem,
	PaginationLink,
} from 'reactstrap'

import './MainPagination.css'

class MainPagination extends React.PureComponent {
	render() {
		const { currentPage, totalPages } = this.props
		const prevPage = currentPage <= 1 ? 1 : currentPage - 1
		const nextPage = currentPage + 1
		const currentPageMinTwo = currentPage <= 2 ? 1 : currentPage - 2
		const currentPageMinOne = prevPage
		const currentPagePlusOne = nextPage
		const currentPagePlusTwo = currentPage + 2

		return (
			<Col>
				<Pagination className="CharacterList_pagination">
					<PaginationItem>
						<PaginationLink
							previous
							href="#"
							onClick={() => this.props.onPageChange(1)}
						/>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink
							href="#"
							onClick={() => this.props.onPageChange(currentPageMinTwo)}
						>
							{currentPage <= 2 ? '..' : currentPage - 2}
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink
							href="#"
							onClick={() => this.props.onPageChange(currentPageMinOne)}
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
							onClick={() => this.props.onPageChange(currentPagePlusOne)}
						>
							{currentPagePlusOne}
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink
							href="#"
							onClick={() => this.props.onPageChange(currentPagePlusTwo)}
						>
							{currentPagePlusTwo}
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink
							next
							href="#"
							onClick={() => this.props.onPageChange(totalPages)}
						/>
					</PaginationItem>
				</Pagination>
			</Col>
		)
	}
}

export default MainPagination
