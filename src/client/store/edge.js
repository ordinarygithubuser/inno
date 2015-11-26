import { Store, merge } from 'ive-f';
import * as Actions from '../action/edge';
import UID from '../helper/uid';

let EID = new UID();

export default class EdgeStore extends Store {
	constructor (edges = [], edge = null) {
		super({ edges, edge});

		this.listenTo(Actions.CreateEdge, this.create);
		this.listenTo(Actions.UpdateEdge, this.update);
		this.listenTo(Actions.DeleteEdge, this.remove);
	}

	create (data = { source: null, target: null }) {
		if (data.source && data.target) {
            if (!data.width) data.width = 1;
            if (!data.type) data.type = 'default';
            this.state.edge = merge({ id: EID.next() }, data);
            this.state.edges.push(this.state.edge);
            this.notify();
        }
	}

	update (edge = null) {
		this.state.edges = this.state.edges.map(current => {
			if (current.id == edge.id) {
				this.state.edge = edge;
				return edge;
			}
			return current;
		});
		this.notify();
	}

    remove (edge = { id: -1 }) {
        this.state.edges = this.state.edges.filter(current => {
            return edge.id != current.id
        });
    }
}