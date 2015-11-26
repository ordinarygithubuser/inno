import { React, Component, merge } from 'ive-f';
import { UpdateNode } from '../../action/node';

function diff (o1, o2) {
	return (o1 && o2) && (
	       o1.id != o2.id ||
	       o1.name != o2.name ||
		   o1.type != o2.type ||
		   o1.x != o2.x ||
		   o1.y != o2.y ||
		   o1.width != o2.width ||
		   o1.height != o2.height);
}

export default class NodeContext extends Component {
	constructor (props) {
		super(props);
		this.state = {
			input: props.node
		};
	}

	componentDidUpdate (prevProps) {
		let props = this.props;

		if (diff(prevProps.node, props.node)) {
			this.setState({ input: props.node });
		}
	}

	update () {
		UpdateNode.trigger(this.state.input);
	}

	setNode (data) {
		this.setState({ input: merge(this.state.input, data) });
	}

	setParsed (value, name) {
		let parsed = parseInt(value, 10);
		let data = {};
		data[name] = parsed;
		if (!isNaN(parsed)) this.setNode(data);
	}

	setName (e) { this.setNode({ name: e.target.value }); }
	setType (e) { this.setNode({ type: e.target.value }); }
	setX (e) { this.setParsed(e.target.value, 'x'); }
	setY (e) { this.setParsed(e.target.value, 'y'); }
	setWidth (e) { this.setParsed(e.target.value, 'width'); }
	setHeight (e) { this.setParsed(e.target.value, 'height'); }

	renderForm () {
		let { name, x, y, width, height, type } = this.state.input;

		return <div className="form">
			<h2>Node</h2>
			<div className="row">
				<label>Name</label>
				<input value={name} onChange={this.setName.bind(this)} />
			</div>
			<div className="row">
				<label>Type</label>
				<input value={type} onChange={this.setType.bind(this)} />
			</div>
			<div className="row">
				<label>X</label>
				<input value={x} onChange={this.setX.bind(this)} />
			</div>
			<div className="row">
				<label>Y</label>
				<input value={y}  onChange={this.setY.bind(this)} />
			</div>
			<div className="row">
				<label>Width</label>
				<input value={width} onChange={this.setWidth.bind(this)} />
			</div>
			<div className="row">
				<label>Height</label>
				<input value={height}  onChange={this.setHeight.bind(this)} />
			</div>
			<div className="row">
				<button onClick={this.update.bind(this)}>Change</button>
			</div>
		</div>;
	}

	render () {
		return <div className="node-context">
			{this.renderForm()}
		</div>;
	}
}