'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var ClientPath = __dirname.replace('server', 'client');
var MainFile = ClientPath + '\\index.html';

// Notebook: 3006
// Desktop: 3000

var Database = {
	host: 'localhost',
	port: 3306,
	user: 'alex',
	database: 'inno',
	password: '1234'
};

var Server = {
	port: 3000,
	clean: true
};

var Session = {
	user: null
};

exports['default'] = {
	ClientPath: ClientPath,
	MainFile: MainFile,
	Database: Database,
	Session: Session,
	Server: Server
};
module.exports = exports['default'];