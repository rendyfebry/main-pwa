import React from 'react'
import Axios from 'axios'
import md5 from 'md5'
import { Link } from 'react-router'
import { Container, Row, Col } from 'reactstrap'

import {
	API_URL,
	PUBLIC_KEY,
	PRIVATE_KEY,
} from '../shared/config'


class CharacterList extends React.Component {
	state = {
		characters: [],
	}

	componentWillMount() {
		this.fetchCharacters()
	}

	fetchCharacters = async () => {
		const ts = Date.now()
		const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY)

		const apiUrl = `${API_URL}/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`

		const response = await Axios.get(apiUrl)

		if (response.status === 200) {
			const characters = response.data.data.results
			this.setState({ characters })
		} else {
			console.error(`Something wrong when fetching data. Status Code ${response.status}, ${response.statusText}`)
		}
	}

	renderCharacterList = () => {
		const characterList = this.state.characters.map((char) => {
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
