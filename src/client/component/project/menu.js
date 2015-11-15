import { React, StoreComponent } from 'ive-f';
import ProjectLoadContext from './load';
import ProjectCreateContext from './create';
import ProjectUpdateContext from './update';
import { SetContext } from '../../action/context';

// TODO create context actions

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

	renderCreate () {
		let onClick = () => this.setContext(ProjectCreateContext, {name: ''});
		return <button onClick={onClick}>Create</button>;
	}

	renderEdit () {
		let { project } = this.props;

		if (!project) return <noscript />;

		let onClick = () => this.setContext(ProjectUpdateContext, { project });
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