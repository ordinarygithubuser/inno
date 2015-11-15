import { Route } from 'ive-b';

let success = { success: true };
let fail = { success: false };

export default class UserRoute extends Route {
	constructor (db) {
		super(db);
	}

	@Route.isRoute()
	async login (res, data) {
		this.getSession().setUser(data);
		res.reply('login', data);
	}

	@Route.isRoute()
	logout (res) {
		this.getSession().setUser(null);
		res.reply('logout', success);
	}

	@Route.isRoute()
	register (res, data = { name: null, pass: null }) {
		let status = fail;

		if (data.name != null && data.pass != null) {
			this.getSession().setUser({ name, pass });
			status = success;
		}
		res.reply(status);
	}
}