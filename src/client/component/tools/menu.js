import { React, StoreComponent } from 'ive-f';
import ProjectLoadContext from './load';
import ProjectCreateContext from './create';
import ProjectUpdateContext from './update';
import { SetContext } from '../../action/context';

export default class ProjectMenu extends StoreComponent {
	constructor (props) {
		super(props);
	}

	setContext (Component, data) {
		SetContext.trigger({ Component, data });
	}

	renderLoad () {
		let { projects } = this.props;
		let onClick = () => this.setContext(ProjectLoadContext, { projects });
		return <button onClick={onClick}>Load</button>;
	}

	render () {
		return <div className="menu">
			{this.renderLoad()}
			{this.renderCreate()}
			{this.renderEdit()}
		</div>;
	}
}