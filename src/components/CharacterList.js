import React from 'react'
import LazyLoad from 'react-lazyload'
import { Link } from 'react-router'
import { Col } from 'reactstrap'
import './CharacterList.css'

class CharacterList extends React.PureComponent {
	renderCharacterList = () => {
		const characterList = this.props.characters.map((character) => {
			const placeholderUrl = 'https://comicvine.gamespot.com/api/image/scale_avatar/1-male-good-large.jpg'

			const thumbUrl = character.image ? character.image.medium_url : placeholderUrl
			const thumbTitle = `thumbnail_${character.name}_${character.id}`

			// const thumbUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`
			// const thumbUrlHttps = thumbUrl.replace('http://', 'https://')

			const charDetailUrl = `/characters/${character.id}`

			return (
				<Col key={character.id} xs={12} sm={6} md={4} className="CharacterListItem">
					<LazyLoad height={200} offset={200} once>
						<img
							src={thumbUrl}
							alt={thumbTitle}
							className="img-responsive"
						/>
					</LazyLoad>
					<p className="text-center">
						<Link href={charDetailUrl} to={charDetailUrl}>
							{character.name}
						</Link>
						<br />
						{character.publisher ? ` ( ${character.publisher.name} )` : null}
					</p>
				</Col>
			)
		})
		return characterList
	}

	render() {
		return this.renderCharacterList()
	}
}

export default CharacterList
