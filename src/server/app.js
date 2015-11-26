import { Server } from 'ive-b';
import conf from './conf';

import UserTable from './db/user';
import UserRoute from './routes/user';

let server = new Server(conf);

server.start(async () => {
    await server.setupTables(UserTable);
	server.setRoutes(UserRoute);
	console.log('app running');
});