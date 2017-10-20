import React from 'react'
import { Jumbotron, Button } from 'reactstrap'
import Page from './Page'

import './Homepage.css'

const HomePage = () => (
	<Page title="Home">
		<Jumbotron className="HomePage_hero">
			<h1 className="display-3">Hello, Geeks!</h1>
			<p className="lead">
				Welcome to <b>ComicDB</b>, here you can find many information
				about your favorite comics, <br />comics character, movies and many more.
			</p>
			<p className="lead">
				<Button color="primary">Learn More</Button>
			</p>
		</Jumbotron>
	</Page>
)

export default HomePage
