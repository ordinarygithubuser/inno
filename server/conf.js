'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var ClientPath = __dirname.replace('server', 'client');
var MainFile = ClientPath + '\\index.html';
var Session = {};

var Server = {
	port: 3000
};

exports['default'] = {
	ClientPath: ClientPath,
	MainFile: MainFile,
	Session: Session,
	Server: Server
};
module.exports = exports['default'];