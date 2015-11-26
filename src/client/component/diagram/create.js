import { React, Component } from 'ive-f';
import { CreateDiagram } from '../../action/diagram';

export default class DiagramCreateContext extends Component {
	constructor (props) {
		super(props);
		this.name = null;
	}

	create () {
		CreateDiagram.trigger({
			projectId: this.props.project.id,
			name: this.name.getDOMNode().value
		});
		this.name.getDOMNode().value = '';
	}

	renderForm () {
		return <div className="form">
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