import { Store, merge } from 'ive-f';
import Graph from '../model/graph';
import * as Actions from '../action/diagram';
import UID from '../helper/uid';

let DID = new UID();

let CANVAS_POS = {
	x: 0,
	y: 0,
	width: 100,
	height: 100
};

let DEFAULT_DIAGRAM = {
	id: DID.next(),
	name: '',
	graph: new Graph()
};

export default class DiagramStore extends Store {
	constructor (diagrams = [], diagram = null) {
		super({ diagrams, diagram });

		this.listenTo(Actions.CreateDiagram, this.create);
		this.listenTo(Actions.LoadDiagram, this.load);
		this.listenTo(Actions.UpdateDiagram, this.update);
		this.listenTo(Actions.CreateNode, this.createNode);
		this.listenTo(Actions.UpdateNode, this.updateNode);
		this.listenTo(Actions.CreateEdge, this.createEdge);
		this.listenTo(Actions.SetPosition, this.setPosition);

		this.create({ projectId: 0, name: 'diag1' });
	}

	create (data = null) {
		if (data) {
			this.state.diagram = merge(DEFAULT_DIAGRAM, data);
			this.state.diagrams.push(this.state.diagram);
			this.notify();
		}
	}

	update (data = null) {
		if (data != null) {
			this.state.diagram = merge(this.state.diagram, data);
			this.notify();
		}
	}

	load (data = { id: null }) {
		this.state.diagram = this.state.diagrams.filter(current => {
			return current.id == data.id;
		})[0];
		this.notify();
	}

	createNode (data = { x: 0, y: 0, type: null, data: {} }) {
		data.x -= CANVAS_POS.x;
		data.y -= CANVAS_POS.y;
		let width = 200, height = 120;

		if (this.isInside(data.x, data.y, width, height)) {
			this.state.diagram.graph.createNode(merge(data, { width, height }));
			this.notify();
		}
	}

	updateNode (data = { id: -1 }) {
		let { diagram } = this.state;
		let { x, y, width, height } = data;

		if (diagram && this.isInside(x, y, width, height)) {
			diagram.graph.updateNode(data);
			this.notify();
		}
	}

	isInside (x, y, width, height) {
		return x > 0 && x + width - 10 < CANVAS_POS.width &&
			y > 0 && y + height - 10 < CANVAS_POS.height;
	}

	createEdge (source, target, sPos, tPos, type) {
		// TODO get start and end position of the edge
		this.state.diagram.createEdge(source, target, sPos, tPos, type);
		this.notify();
	}

	setPosition (data = { x: 0, y: 0, width: 100, height: 100 }) {
		CANVAS_POS = data;
	}
}