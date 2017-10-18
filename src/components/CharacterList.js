import React from 'react'
import { Link } from 'react-router'
import { Container, Row, Col } from 'reactstrap'

class CharacterList extends React.PureComponent {
	renderCharacterList = () => {
		console.log(this.props)
		const characterList = this.props.characters.map((char) => {
			const thumbUrl = `${char.thumbnail.path}.${char.thumbnail.extension}`
			const thumbUrlHttps = thumbUrl.replace('http://', 'https://')

			const thumbTitle = `thumbnail_${char.name}_${char.id}`
			const thumbnail = (
				<img
					src={thumbUrlHttps}
					alt={thumbTitle}
					className="img-responsive"
				/>
			)

			const charDetailUrl = `/characters/${char.id}`

			return (
				<Col key={char.id} xs={12} sm={6} md={4}>
					{thumbnail}
					<p>
						<Link href={charDetailUrl} to={charDetailUrl}>{char.name}</Link>
					</p>
				</Col>
			)
		})
		return characterList
	}

	render() {
		return (
			<Container>
				<Row>
					{this.renderCharacterList()}
				</Row>
			</Container>
		)
	}
}

export default CharacterList
