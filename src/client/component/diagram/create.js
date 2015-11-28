import { React, Component } from 'ive-f';
import { Types } from '../../const/diagram';
import { CreateDiagram } from '../../action/diagram';

export default class DiagramCreateContext extends Component {
	constructor (props) {
		super(props);
		this.state = {
			name: '',
			type: Types[0]
		};
	}

	setName (e) {
		this.setState({ name: e.target.value });
	}

	setType (e) {
		this.setState({ type: e.target.value });
	}

	create () {
		let projectId = this.props.project.id;
		let { name, type } = this.state;

		CreateDiagram.trigger({ projectId, name, type });
	}

	renderTypes () {
		return Types.map((type, key) => {
			return <option key={key}>{type}</option>;
		});
	}

	renderForm () {
		return <div className="form">
			<label>Name</label>
			<input onChange={this.setName.bind(this)} />
			<label>Name</label>
			<select onChange={this.setType.bind(this)}>
				{this.renderTypes()}
			</select>
			<button onClick={this.create.bind(this)}>Create</button>
		</div>;
	}

	render () {
		return <div className="diagram-create">
			{this.renderForm()}
		</div>;
	}
}