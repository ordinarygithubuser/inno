import { React, Component } from 'ive-f';

export default class Context extends Component {
	constructor (props) {
		super(props);
	}

	renderComponent (context) {
		let { Component, data } = context;
		if (Component) {
			return <Component {...data} />;
		}
	}

	render () {
		let { context } = this.props;

		return <div className="context">
			{this.renderComponent(context)}
		</div>;
	}
}