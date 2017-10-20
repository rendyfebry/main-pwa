import React from 'react'

import './SubNav.css'

class SubNav extends React.PureComponent {
	render() {
		return (
			<div className="SubNav">
				{this.props.children}
			</div>
		)
	}
}

export default SubNav
