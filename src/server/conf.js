let ClientPath = __dirname.replace('server', 'client');
let MainFile = ClientPath + '\\index.html';

// Notebook: 3006
// Desktop: 3000

let Database = {
	host: 'localhost',
	port: 3306,
	user: 'alex',
	database: 'inno',
	password: '1234'
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