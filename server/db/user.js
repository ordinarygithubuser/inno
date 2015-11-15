'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _iveB = require('ive-b');

var UserTable = (function () {
	function UserTable(db) {
		_classCallCheck(this, UserTable);

		this.query = db.execute;
		this.table = new _iveB.Table('user', { name: 'name', type: new _iveB.Types.Varchar(20), req: true }, { name: 'pass', type: new _iveB.Types.Varchar(20), req: true }, { name: 'online', type: new _iveB.Types.Boolean(false) });
	}

	_createClass(UserTable, [{
		key: 'install',
		value: function install() {
			return regeneratorRuntime.async(function install$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						context$2$0.next = 2;
						return regeneratorRuntime.awrap(this.query(this.table.toSQL()));

					case 2:
					case 'end':
						return context$2$0.stop();
				}
			}, null, this);
		}
	}, {
		key: 'clean',
		value: function clean() {
			return regeneratorRuntime.async(function clean$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						context$2$0.next = 2;
						return regeneratorRuntime.awrap(this.query('DROP TABLE IF EXISTS user;'));

					case 2:
					case 'end':
						return context$2$0.stop();
				}
			}, null, this);
		}
	}]);

	return UserTable;
})();

exports['default'] = UserTable;
module.exports = exports['default'];