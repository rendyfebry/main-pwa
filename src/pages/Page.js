import React from 'react'
import Navbar from '../components/Navbar'

import '../App.css'

const Page = ({ title, children }) => (
	<div className="App">
		<Navbar title={title} />
		{children}
	</div>
)

export default Page
