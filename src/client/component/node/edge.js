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

export default class NodeEdgeContext extends Component {
	constructor (props) {
		super(props);
		this.state = {
			nodes: {
				source: props.source,
				target: props.target
			}
		};
	}

	create () {
		//UpdateNode.trigger(this.state.input);
	}

	switchNodes (e) {
		let { source, target } = this.state.nodes;

		this.setState({ nodes: {
			source: target,
			target: source
		} });
	}

	renderForm () {
		let { source, target } = this.state.nodes;

		return <div className="form">
			<h2>Create Edge</h2>
			<div className="row">
				<label>Name</label>
				<input />
			</div>
			<div className="row">
				<label>Source</label>
				<input disabled={true} value={source.name || 'Anon'} />
			</div>
			<div className="row">
				<label>Target</label>
				<input disabled={true} value={target.name || 'Anon'} />
			</div>
			<button onClick={this.switchNodes.bind(this)}>Switch</button>
			<div className="row">
				<label>Type</label>
				<select value="t1">
					<option value="t1">Arrow Type 1</option>
					<option value="t2">Arrow Type 2</option>
					<option value="t3">Arrow Type 3</option>
					<option value="t4">Arrow Type 4</option>
				</select>
			</div>
			<button onClick={this.create.bind(this)}>Create</button>
		</div>;
	}

	render () {
		return <div className="edge-context">
			{this.renderForm()}
		</div>;
	}
}