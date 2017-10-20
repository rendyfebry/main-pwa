import React from 'react'
import { Link } from 'react-router'
import { Col } from 'reactstrap'
import LazyLoad from 'react-lazyload'

import './CharacterListItem.css'

const CharacterListItem = (props) => {
	const {
		name,
		id,
		image,
		publisher,
	} = props

	const placeholderUrl = 'https://comicvine.gamespot.com/api/image/scale_avatar/1-male-good-large.jpg'

	const thumbUrl = image ? image.medium_url : placeholderUrl
	const thumbTitle = `thumbnail_${name}_${id}`

	const charDetailUrl = `/characters/${id}`

	return (
		<Col key={id} xs={12} sm={6} md={4} className="CharacterListItem">
			<div className="CharacterListItem_inner">
				<LazyLoad height={200} offset={200} once>
					<img
						src={thumbUrl}
						alt={thumbTitle}
						className="img-responsive"
					/>
				</LazyLoad>
				<div className="CharacterListItem_title">
					<Link href={charDetailUrl} to={charDetailUrl}>
						{name}
					</Link>
					<br />
					{publisher ? ` ( ${publisher.name} )` : null}
				</div>
			</div>
		</Col>
	)
}

export default CharacterListItem
