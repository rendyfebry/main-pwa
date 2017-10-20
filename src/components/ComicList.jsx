import React from 'react'
import LazyLoad from 'react-lazyload'
import { Link } from 'react-router'
import { Col } from 'reactstrap'
import './ComicList.css'

class ComicList extends React.PureComponent {
	renderComicList = () => {
		const comicList = this.props.issues.map((issue) => {
			const placeholderUrl = 'https://comicvine.gamespot.com/api/image/scale_avatar/1-male-good-large.jpg'

			const thumbUrl = issue.image ? issue.image.medium_url : placeholderUrl
			const thumbTitle = `thumbnail_${issue.name}_${issue.id}`

			const charDetailUrl = `/issues/${issue.id}`

			return (
				<Col key={issue.id} xs={12} sm={6} md={4} className="ComicListItem">
					<div className="ComicListItem_inner">
						<LazyLoad height={200} offset={200} once>
							<img
								src={thumbUrl}
								alt={thumbTitle}
								className="img-responsive"
							/>
						</LazyLoad>
						<div className="ComicListItem_title">
							<Link href={charDetailUrl} to={charDetailUrl}>
								{issue.name}
							</Link>
							<br />
							{issue.issue_number && `#${issue.issue_number}`}
						</div>
					</div>
				</Col>
			)
		})
		return comicList
	}

	render() {
		return this.renderComicList()
	}
}

export default ComicList
