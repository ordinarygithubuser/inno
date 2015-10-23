import { Store } from 'ive-f';
import UID from '../helper/uuid';
import * as Actions from '../action/diagram';

let NodeID = new UID();
let EdgeID = new UID();

export default class DiagramStore extends Store {
	constructor (nodes = [], edges = []) {
		super({ nodes, edges });

		this.listenTo(Actions.CreateNode, this.createNode);
		this.listenTo(Actions.CreateEdge, this.createEdge);
	}

	/**
	 * Creates a node in a diagram at position (<x>, <y>) with the width
	 * <width> and height <height>. Each node has a type determined by
	 * <type>. Each node contains arbitrary <data>.
	 */
	createNode (x, y, width, height, type, data) {
		let id = NodeID.next();
		let edges = [];

		this.state.nodes.push({ id, x, y, width, height, type, data, edges });
		this.notify();
	}

	/**
	 * Connects the two nodes <first> and <second>
	 * with an edge of the type <type>.
	 */
	createEdge (start, end, fPos, sPos, type) {
		// TODO get start and end position of the edge
		// center position of first and seconds edges?
		let id = EdgeID.next();
		let startId = start.id;
		let endId = end.id;

		start.source.push(id);
		end.target.push(id);
		this.state.edges.push({ id, startId, endId, fPos, sPos, type });
		this.notify();
	}
}