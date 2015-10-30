import { React, Component } from 'ive-f';
import { CreateDiagram } from '../../action/diagram';

export default class ProjectCreateContext extends Component {
	constructor (props) {
		super(props);
		this.name = null;
	}

	create () {
		CreateDiagram.trigger({ name: this.name.getDOMNode().value });
		this.name.getDOMNode().value = '';
	}

	renderForm () {
		return <div className="form">
			<h2>Create Diagram</h2>
			<label>Name</label>
			<input ref={(ref) => this.name = ref} />
			<button onClick={this.create.bind(this)}>Create</button>
		</div>;
	}

	render () {
		return <div className="diagram-create">
			{this.renderForm()}
		</div>;
	}
}