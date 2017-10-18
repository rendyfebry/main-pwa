import React from 'react'
import './Loader.css'

const Loader = ({ title, description }) => {
	const getTitleDescriontion = () => {
		const titleDecription = (
			<div>
				<p>{title}</p>
				<p>{description}</p>
			</div>
		)

		return (title && description) ? titleDecription : null
	}

	return (
		<div className="loading-wrapper">
			<div>
				<div className="loading-spinner" />
				{getTitleDescriontion()}
			</div>
		</div>
	)
}

export default Loader
