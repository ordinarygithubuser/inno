import { React, Component } from 'ive-f';
import { CreateProject } from '../../action/project';

export default class ProjectCreateContext extends Component {
	constructor (props) {
		super(props);
		this.name = '';
		this.description = '';
	}

	create () {
		CreateProject.trigger({
			name: this.name.getDOMNode().value,
			description: this.description.getDOMNode().value
		});
		this.name.getDOMNode().value = '';
		this.description.getDOMNode().value = '';
	}

	renderForm () {
		return <div className="form">
			<h2>Create Project</h2>
			<label>Name</label>
			<input ref={(ref) => this.name = ref} />
			<label>Description</label>
			<textarea ref={(ref) => this.description = ref} />
			<button onClick={this.create.bind(this)}>Create</button>
		</div>;
	}

	render () {
		return <div className="project-create">
			{this.renderForm()}
		</div>;
	}
}