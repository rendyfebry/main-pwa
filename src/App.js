import React, { Component } from 'react'
import { Router, browserHistory, Route, Link } from 'react-router'

import Navbar from './components/Navbar'
import logo from './logo.svg'
import './App.css'

const Page = ({ title }) => (
	<div className="App">
		<Navbar title={title} />
		<div className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h2>{title}</h2>
		</div>
		<br />
		<br />
		<br />
		<p className="App-intro">
			This is the {title} page.
		</p>
	</div>
)


const Home = () => (
	<Page title="Home" />
)

const About = () => (
	<Page title="About" />
)

const Settings = () => (
	<Page title="Settings" />
)

class App extends Component {
	render() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={Home} />
				<Route path="/about" component={About} />
				<Route path="/settings" component={Settings} />
			</Router>
		)
	}
}

export default App
