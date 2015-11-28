import { Store, merge } from 'ive-f';
import * as Actions from '../action/diagram';
import UID from '../helper/uid';

let DID = new UID();

export default class DiagramStore extends Store {
	constructor (diagrams = [], diagram = null) {
		super({ diagrams, diagram });

		this.listenTo(Actions.CreateDiagram, this.create);
		this.listenTo(Actions.LoadDiagram, this.load);
		this.listenTo(Actions.UpdateDiagram, this.update);

		this.create({ projectId: 0, name: 'diag1', type: 'Client' });
	}

	create (data = null) {
		if (data) {
			this.state.diagram = merge({ id: DID.next(), name: '' }, data);
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
}