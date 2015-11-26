import { Store, merge } from 'ive-f';
import * as Actions from '../action/node';
import UID from '../helper/uid';

let NID = new UID();

let CONSTRAINTS = {
	x: 0,
	y: 0,
	width: 100,
	height: 100
};

let ALL_NODES = [];

function updateAll (nodes) {
	ALL_NODES = ALL_NODES.filter(current => {
		return !contains(nodes, current);
	}).concat(nodes);
}

function contains (nodes, node) {
	for (let i = 0; i < nodes.length; i++) {
		if (nodes[i].id == node.id) return true;
	}
	return false;
}

export default class NodeStore extends Store {
	constructor (nodes = [], node = null) {
		super({ nodes, node });

		this.listenTo(Actions.LoadNodes, this.load);
		this.listenTo(Actions.CreateNode, this.create);
		this.listenTo(Actions.UpdateNode, this.update);
		this.listenTo(Actions.SetPosition, this.setPosition);
	}

	load (data = { id: null }) {
		this.state.nodes = ALL_NODES.filter(current => {
			return current.diagramId == data.id;
		});
		this.state.node = null;
		this.notify();
	}

	create (data = { x: 0, y: 0, width: 0, height: 0 }) {
		data.x -= CONSTRAINTS.x;
		data.y -= CONSTRAINTS.y;
		if (!data.width) data.width = 160; // make constant
		if (!data.height) data.height = 120; // make constant

		if (this.isInside(data.x, data.y, data.width, data.height)) {
			data.id = NID.next();
			this.state.nodes.push(data);
			ALL_NODES.push(data);
			this.notify();
		}
	}

	update (node = null) {
		this.state.nodes = this.state.nodes.map(current => {
			if (current.id == node.id) {
				this.state.node = node;
				return node;
			}
			return current;
		});
		updateAll(this.state.nodes);
		this.notify();
	}

	setPosition (data = { x: 0, y: 0, width: 100, height: 100 }) {
		CONSTRAINTS = data;
	}

	isInside (x, y, width, height) {
		return x > 0 && x + width - 10 < CONSTRAINTS.width &&
			   y > 0 && y + height - 10 < CONSTRAINTS.height;
	}

}