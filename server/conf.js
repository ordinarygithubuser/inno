'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var ClientPath = __dirname.replace('server', 'client');
var MainFile = ClientPath + '\\index.html';

var Database = {
	host: 'localhost',
	port: 3300,
	user: 'alex',
	database: 'inno',
	password: 'bezgog8jd'
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