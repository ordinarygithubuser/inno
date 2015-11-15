import { Store, merge } from 'ive-f';
import * as Actions from '../action/project';
import UID from '../helper/uid';

let PID = new UID();

export default class ProjectStore extends Store {
	constructor (projects = [], project = null) {
		super({ projects, project });

		this.listenTo(Actions.LoadProject, this.load);
		this.listenTo(Actions.CreateProject, this.create);
		this.listenTo(Actions.UpdateProject, this.update);
		this.create({ name: 'test' , description: 'test' });
	}

	load (data = { id: null }) {
		this.state.project = this.state.projects.filter(current => {
			return current.id == data.id;
		})[0];
		this.notify();
	}

	create (data = { name: null, description: null }) {
		if (data.name && data.description) {
			this.state.project = merge({ id: PID.next() }, data);
			this.state.projects.push(this.state.project);
			this.notify();
		}
	}

	update (project, data) {
		this.notify();
	}
}