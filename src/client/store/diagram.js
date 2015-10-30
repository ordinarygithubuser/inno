import { Store, merge } from 'ive-f';
import Graph from '../model/graph';
import * as Actions from '../action/diagram';
import UID from '../helper/uid';

let DID = new UID();

export default class DiagramStore extends Store {
	constructor (diagrams = [], diagram = null) {
		super({ diagrams, diagram });

		this.listenTo(Actions.CreateDiagram, this.create);
		this.listenTo(Actions.LoadDiagram, this.load);
		this.listenTo(Actions.CreateNode, this.createNode);
		this.listenTo(Actions.CreateEdge, this.createEdge);
	}

	create (data = { name: '', graph: new Graph() }) {
		this.state.diagram = merge({id: DID.next()}, data);
		this.state.diagrams.push(this.state.diagram);
		this.notify();
	}

	load (name) {
		this.state.diagram = this.state.diagrams.filter(current => {
			return current.name == name;
		})[0];
		this.notify();
	}

	createNode (x, y, width, height, type, data) {
		this.state.graph.createNode(x, y, width, height, type, data);
		this.notify();
	}

	createEdge (source, target, sPos, tPos, type) {
		// TODO get start and end position of the edge
		this.state.graph.createEdge(source, target, sPos, tPos, type);
		this.notify();
	}
}