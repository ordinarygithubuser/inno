export default class UID {
	constructor (id = 0) {
		this.id = id;
	}

	next () {
		return this.id++;
	}
}