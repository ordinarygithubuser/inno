import { React, Component } from 'ive-f';
import DiagramLoadContext from './load';
import DiagramCreateContext from './create';
import DiagramUpdateContext from './update';
import { SetContext } from '../../action/context';

export default class DiagramMenu extends Component {
	constructor (props) {
		super(props);
	}

	/**
	 * TODO: abstract this
	 */
	setContext (Component, data) {
		SetContext.trigger({ Component, data });
	}

	renderLoad () {
		let { diagrams } = this.props;
		let onClick = () => this.setContext(DiagramLoadContext, { diagrams });
		return <button onClick={onClick}>Load</button>;
	}

	renderCreate () {
		let onClick = () => this.setContext(DiagramCreateContext);
		return <button onClick={onClick}>Create</button>;
	}

	renderEdit () {
		let { diagram } = this.props;

		if (!diagram) return <noscript />;

		let onClick = () => this.setContext(DiagramUpdateContext, { diagram });
		return <button onClick={onClick}>Edit</button>;
	}

	render () {
		return <div className="menu">
			{this.renderLoad()}
			{this.renderCreate()}
			{this.renderEdit()}
		</div>;
	}
}