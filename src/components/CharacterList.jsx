import React from 'react'
import CharacterListItem from './CharacterListItem'
import './CharacterList.css'

class CharacterList extends React.PureComponent {
	characterItemMapper = char => <CharacterListItem {...char} key={char.id} />

	renderCharacterList = () => {
		const characterList = this.props.characters.map(this.characterItemMapper)
		return characterList
	}

	render() {
		return this.renderCharacterList()
	}
}


export default CharacterList
