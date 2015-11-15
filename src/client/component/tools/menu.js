import { React, Component } from 'ive-f';
import { CreateNode } from '../../action/diagram';
import Draggable from '../draggable';

class DragItem extends Component {
	constructor (props) {
		super(props);
		this.dType = 'node'
	}

	render () {
		return <div>{this.props.name}</div>;
	}
}

export default class ProjectMenu extends Component {
	constructor (props) {
		super(props);
		this.own('onDrag', 'onDrop')
	}

	onDrag () {}

	onDrop (props, event) {
		CreateNode.trigger({
			x: event.pageX,
			y: event.pageY,
			type: props.name
		});
	}

	createDragItem (name, type) {
		let Comp = Draggable(DragItem, this.onDrag, this.onDrop);
		return <Comp name={name} type={type} />;
	}

	render () {
		return <div className="menu">
			{this.createDragItem('Action', 'node')}
			{this.createDragItem('Component', 'node')}
			{this.createDragItem('Store', 'node')}
			{this.createDragItem('Service', 'node')}
			{this.createDragItem('Server', 'node')}
			{this.createDragItem('Table', 'node')}
		</div>;
	}
}