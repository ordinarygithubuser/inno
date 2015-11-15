import { Table, Types } from 'ive-b';

export default class UserTable {
	constructor (db) {
		this.query = db.execute;
		this.table = new Table('user',
			{ name: 'name', type: new Types.Varchar(20), req: true },
			{ name: 'pass', type: new Types.Varchar(20), req: true },
			{ name: 'online', type: new Types.Boolean(false) }
		);
	}

	async install () {
		await this.query(this.table.toSQL());
	}

	async clean () {
		await this.query('DROP TABLE IF EXISTS user;');
	}

}