let ClientPath = __dirname.replace('server', 'client');
let MainFile = ClientPath + '\\index.html';
let Session = {};

let Server = {
	port: 3000
};

export default {
	ClientPath,
	MainFile,
	Session,
	Server
}