import { Server } from 'ive-b';
import conf from './conf';

let server = new Server(conf);

server.start(async () => {
	console.log('app running');
});