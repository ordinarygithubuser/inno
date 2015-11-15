class UID {
	constructor (id = 0) {
		this.id = id;
	}
	next () {
		return this.id++;
	}
}

let NodeID = new UID();
let EdgeID = new UID();

export default class Graph {
	constructor (nodes = [], edges = []) {
		this.nodes = nodes;
		this.edges = edges;
	}

	/**
	 * Creates a node in a diagram at position (<x>, <y>) with the width
	 * <width> and height <height>. Each node has a type determined by
	 * <type>. Each node contains arbitrary <data>.
	 */
	createNode (data = { id: NodeID.next(), edges: [] }) {
		data.id = NodeID.next();
		data.edges = [];
		this.nodes.push(data);
	}

	updateNode (data) {
		this.nodes = this.nodes.map(node => {
			if (node.id == data.id) {
				data.edges = node.edges;
				data.type = node.type;
				return data;
			} else {
				return node;
			}
		});
	};

	/**
	 * Connects the two nodes <first> and <second> with an edge of the type
	 * <type>. The edge will originate from sPos and end at tPos.
	 */
	createEdge (data = { id: EdgeID.next(), source: null, target: null }) {
		if (source) source.edges.push(id);
		if (target) target.edges.push(id);
		this.edges.push(data);
	}
}