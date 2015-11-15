import { React, Component, merge } from 'ive-f';
import { UpdateNode } from '../../action/diagram';

export default class NodeContext extends Component {
	constructor (props) {
		super(props);
		this.state = { node: props.node };
	}

	componentDidUpdate () {
		if (this.props.node.id != this.state.node.id) {
			this.setNode(this.props.node);
		}
	}

	setNode (data) {
		this.setState({ node: merge(this.state.node, data) });
	}

	update () {
		let id = this.props.node.id;
		let { name, x, y, width, height } = this;

		UpdateNode.trigger(this.state.node);
	}

	setName (e) { this.setNode({ name: e.target.value }); }
	setType (e) { this.setNode({ type: e.target.value }); }
	setX (e) { this.setNode({ x: parseInt(e.target.value, 10) }); }
	setY (e) { this.setNode({ y: parseInt(e.target.value, 10) }); }
	setWidth (e) { this.setNode({ width: parseInt(e.target.value, 10) }); }
	setHeight (e) { this.setNode({ height: parseInt(e.target.value, 10) }); }

	renderForm () {
		let { name, x, y, width, height, type } = this.props.node;

		return <div className="form">
			<h2>{`Node`}</h2>

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
				<label>Edges</label>
				{this.renderEdgeList()}
			</div>
			<div className="row">
				<button onClick={this.update.bind(this)}>Change</button>
			</div>
		</div>;
	}

	renderEdgeList (node) {
		let { edges } = this.props.node;

		if (edges.length == 0) {
			return <span>No connections found.</span>;
		}

		return <div className="edge-list">{
			edges.map(edge => { return <div className="edge">{edge.type}</div>; })
		}</div>;
	}

	render () {
		return <div className="node-context">
			{this.renderForm()}
		</div>;
	}
}