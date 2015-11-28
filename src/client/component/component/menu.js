import { React, Component } from 'ive-f';
import { CreateNode } from '../../action/node';
import Draggable from '../draggable';

function Item (name, type) {
	return { name, type };
}

function ClientItem (name) { return Item(name, 'Client') }
function ServerItem (name) { return Item(name, 'Server') }

class DragItem extends Component {
	constructor (props) {
		super(props);
		this.dType = 'node'
	}

	render () {
		return <div key={this.props.name} className="node">
			{this.props.name}
		</div>;
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

	renderClient () {
		// TODO: list Components
		return this.renderDragItems(
			ClientItem('Action'), ClientItem('Component'),
			ClientItem('Store'), ClientItem('Transaction')
		);
	}

	renderServer () {
		return this.renderDragItems(
			ServerItem('Database'), ServerItem('Service'),
			ServerItem('Server'), ServerItem('Table')
		);
	}

	renderComponent () {
		return [];
	}

	renderDragItems (...items) {
		return items.map((item, key) => {
			let Comp = Draggable(DragItem, this.onDrag, this.onDrop);
			return <Comp name={item.name} type={item.type} key={key} />;
		})
	}

	renderTypeMenu () {
		switch (this.props.diagram.type) {
			case 'Client': return this.renderClient();
			case 'Server': return this.renderServer();
			case 'Component': return this.renderComponent();
			default: return <noscript />;
		}
	}

	render () {
		return <div className="components">
			{this.renderTypeMenu()}
		</div>;
	}
}