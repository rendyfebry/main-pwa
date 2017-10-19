import React from 'react'
import LazyLoad from 'react-lazyload'
import { Link } from 'react-router'
import { Col } from 'reactstrap'
import './ComicList.css'

class ComicList extends React.PureComponent {
	renderComicList = () => {
		const comicList = this.props.comics.map((char) => {
			const thumbUrl = `${char.thumbnail.path}.${char.thumbnail.extension}`
			const thumbUrlHttps = thumbUrl.replace('http://', 'https://')

			const thumbTitle = `thumbnail_${char.title}_${char.id}`
			const thumbnail = (
				<LazyLoad height={200} offset={200} once>
					<img
						src={thumbUrlHttps}
						alt={thumbTitle}
						className="img-responsive"
					/>
				</LazyLoad>
			)

			const charDetailUrl = `/comics/${char.id}`

			return (
				<Col key={char.id} xs={12} sm={6} md={4} className="ComicListItem">
					{thumbnail}
					<p className="text-center">
						<Link href={charDetailUrl} to={charDetailUrl}>
							{char.title}
						</Link>
					</p>
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
