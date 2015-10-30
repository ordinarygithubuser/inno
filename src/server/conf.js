let ClientPath = __dirname.replace('server', 'client');
let MainFile = ClientPath + '\\index.html';

let Database = {
	host: 'localhost',
	port: 3300,
	user: 'alex',
	database: 'inno',
	password: 'bezgog8jd'
};

let Server = {
	port: 3000,
	clean: true
};

let Session = {
	user: null
};

export default {
	ClientPath,
	MainFile,
	Database,
	Session,
	Server
}