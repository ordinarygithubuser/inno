import { React, Component } from 'ive-f';
import { CreateNode } from '../../action/node';
import Draggable from '../draggable';

class DragItem extends Component {
	constructor (props) {
		super(props);
		this.dType = 'node'
	}

	render () {
		return <div className="node">{this.props.name}</div>;
	}
}

export default class ComponentMenu extends Component {
	constructor (props) {
		super(props);
		this.own('onDrag', 'onDrop')
	}

	onDrag () {}

	onDrop (props, event) {
		let { diagram } =  this.props;

		if (diagram) {
			CreateNode.trigger({
				diagramId: diagram.id,
				x: event.pageX,
				y: event.pageY,
				type: props.name
			});
		}
	}

	createDragItem (name, type) {
		let Comp = Draggable(DragItem, this.onDrag, this.onDrop);
		return <Comp name={name} type={type} />;
	}

	render () {
		return <div className="components">
            <label>Client</label>
            {this.createDragItem('Action', 'node')}
            {this.createDragItem('Component', 'node')}
			{this.createDragItem('Store', 'node')}
            {this.createDragItem('Transaction', 'node')}
            <label>Server</label>
            {this.createDragItem('Database', 'node')}
            {this.createDragItem('Service', 'node')}
			{this.createDragItem('Server', 'node')}
			{this.createDragItem('Table', 'node')}
		</div>;
	}
}