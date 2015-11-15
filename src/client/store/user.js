import { Store } from 'ive-f';
import * as User from '../action/user';

export default class UserStore extends Store {
	constructor (user = { name: null, pass: null }) {
		super({ user });

		this.listenTo(User.Login, this.login);
		this.listenTo(User.Logout, this.logout);
		this.listenTo(User.Register, this.login);
	}

	login (user) {
		this.state.user = user;
		this.notify();
	}

	logout () {
		this.state.user = { name: null, pass: null};
		this.notify();
	}
}