export default class UID {
	constructor (id = 0) {
		this.id = id;
	}
	next () {
		this.id = id + 1;
		return this.id;
	}
}