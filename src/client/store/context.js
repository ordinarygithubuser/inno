import { Store } from 'ive-f';
import * as Actions from '../action/context';

export default class ContextStore extends Store {
	constructor (context = {}) {
		super({ context });

		this.listenTo(Actions.SetContext, this.setContext);
	}

	setContext (context) {
		this.state.context = context;
		this.notify();
	}
}