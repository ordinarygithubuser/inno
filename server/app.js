'use strict';

var _this = this;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _iveB = require('ive-b');

var _conf = require('./conf');

var _conf2 = _interopRequireDefault(_conf);

var _dbUser = require('./db/user');

var _dbUser2 = _interopRequireDefault(_dbUser);

var _routesUser = require('./routes/user');

var _routesUser2 = _interopRequireDefault(_routesUser);

var server = new _iveB.Server(_conf2['default']);

server.start(function callee$0$0() {
	return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				context$1$0.next = 2;
				return regeneratorRuntime.awrap(server.setupTables(_dbUser2['default']));

			case 2:
				server.setRoutes(_routesUser2['default']);
				console.log('app running');

			case 4:
			case 'end':
				return context$1$0.stop();
		}
	}, null, _this);
});