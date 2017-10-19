import React from 'react'
import LazyLoad from 'react-lazyload'
import { Link } from 'react-router'
import { Col } from 'reactstrap'
import './CharacterList.css'

class CharacterList extends React.PureComponent {
	renderCharacterList = () => {
		const characterList = this.props.characters.map((char) => {
			const thumbUrl = `${char.thumbnail.path}.${char.thumbnail.extension}`
			const thumbUrlHttps = thumbUrl.replace('http://', 'https://')

			const thumbTitle = `thumbnail_${char.name}_${char.id}`
			const thumbnail = (
				<LazyLoad height={200} offset={200} once>
					<img
						src={thumbUrlHttps}
						alt={thumbTitle}
						className="img-responsive"
					/>
				</LazyLoad>
			)

			const charDetailUrl = `/characters/${char.id}`

			return (
				<Col key={char.id} xs={12} sm={6} md={4} className="CharacterListItem">
					{thumbnail}
					<p className="text-center">
						<Link href={charDetailUrl} to={charDetailUrl}>{char.name}</Link>
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
