import { React, Component } from 'ive-f';
import { UpdateProject } from '../../action/project';

export default class ProjectUpdateContext extends Component {
	constructor (props) {
		super(props);
		this.state = {
			name: props.project.name,
			description: props.project.description
		};
	}

	update () {
		UpdateProject.trigger(this.state);
	}

	setName (e) {
		this.setState({ name: e.target.value });
	}

	setDescription (e) {
		this.setState({ description: e.target.value });
	}

	renderForm () {
		let { name, description } = this.state;

		return <div className="form">
			<h2>Edit Project</h2>
			<label>Name</label>
			<input value={name} onChange={this.setName} />
			<label>Description</label>
			<textarea value={description} onChange={this.setDescription} />
			<button onClick={this.update}>Save</button>
		</div>;
	}

	render () {
		return <div className="project-create">
			{this.renderForm()}
		</div>;
	}
}