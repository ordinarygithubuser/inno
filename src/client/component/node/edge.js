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

export default class MultiNodeContext extends Component {
	constructor (props) {
		super(props);
	}

	createEdge () {
		//UpdateNode.trigger(this.state.input);
	}

	renderForm () {
		let { source, target } = this.props;

		return <div className="form">
			<h2>Create Edge</h2>
			<label>Source / Target</label>
			<select>
				<option value={}></option>
				<option value={}></option>
			</select>
		</div>;
	}

	render () {
		return <div className="node-context">
			{this.renderForm()}
		</div>;
	}
}