import React from 'react'
import { Container, Row, Col } from 'reactstrap'


class CharacterDetail extends React.PureComponent {
	get thumbnail() {
		const thumbUrl = `${this.props.thumbnail.path}.${this.props.thumbnail.extension}`
		const thumbUrlHttps = thumbUrl.replace('http://', 'https://')

		const thumbTitle = `thumbnail_${this.props.name}_${this.props.id}`
		const thumbnail = (
			<img
				src={thumbUrlHttps}
				alt={thumbTitle}
				className="img-responsive"
			/>
		)

		return thumbnail
	}

	get eventList() {
		let eventlist = []

		if (this.props.events && this.props.events.items.length) {
			eventlist = this.props.events.items.map(item => (
				<li key={item.resourceURI}>- {item.name}</li>
			))
		}

		return eventlist
	}

	get comicList() {
		let comicList = []

		if (this.props.comics && this.props.comics.items.length) {
			comicList = this.props.comics.items.map(item => (
				<li key={item.resourceURI}>- {item.name}</li>
			))
		}

		return comicList
	}

	get storyList() {
		let storyList = []

		if (this.props.stories && this.props.stories.items.length) {
			storyList = this.props.stories.items.map(item => (
				<li key={item.resourceURI}>- {item.name}</li>
			))
		}

		return storyList
	}

	get seriesList() {
		let seriesList = []

		if (this.props.series && this.props.series.items.length) {
			seriesList = this.props.series.items.map(item => (
				<li key={item.resourceURI}>- {item.name}</li>
			))
		}

		return seriesList
	}

	render() {
		return (
			<Container className="container_main">
				<Row>
					<Col xs={12} md={4}>
						<Row>
							<Col>
								{this.thumbnail}
							</Col>
						</Row>
						<Row>
							<Col>
								<h5>Name</h5>
								<p>{this.props.name}</p>
							</Col>
						</Row>
						<Row>
							<Col>
								<h5>Description</h5>
								<p>{this.props.description || '...'}</p>
							</Col>
						</Row>
					</Col>
					<Col xs={12} md={8}>
						<Row>
							<Col>
								<h5>Comics</h5>
								<ul>
									{this.comicList}
								</ul>
							</Col>
						</Row>
						<Row>
							<Col>
								<h5>Series</h5>
								<ul>
									{this.seriesList}
								</ul>
							</Col>
						</Row>
						<Row>
							<Col>
								<h5>Stories</h5>
								<ul>
									{this.storyList}
								</ul>
							</Col>
						</Row>
						<Row>
							<Col>
								<h5>Events</h5>
								<ul>
									{this.eventList}
								</ul>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default CharacterDetail
