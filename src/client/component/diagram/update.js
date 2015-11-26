import { React, Component } from 'ive-f';
import { UpdateDiagram } from '../../action/diagram';

export default class DiagramUpdateContext extends Component {
	constructor (props) {
		super(props);
		this.name = null;
		this.defName = props.diagram.name;
	}

	update () {
		UpdateDiagram.trigger({name: this.name.getDOMNode().value});
	}

	renderForm () {
		return <div className="form">
			<label>Name</label>
			<input defaultValue={this.defName} ref={(ref) => this.name = ref} />
			<button onClick={this.update.bind(this)}>Save</button>
		</div>;
	}

	render () {
		return <div className="project-create">
			{this.renderForm()}
		</div>;
	}
}