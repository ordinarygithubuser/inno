import { React } from 'ive-f';
import App from './component/app';

import UserStore from './store/user';
import NodeStore from './store/node';
import EdgeStore from './store/edge';
import ConfStore from './store/conf';
import DiagramStore from './store/diagram';
import ContextStore from './store/context';
import ProjectStore from './store/project';

window.onload = () => {
	let stores = {
		user: new UserStore(),
		node: new NodeStore(),
        edge: new EdgeStore(),
		conf: new ConfStore(),
        diagram: new DiagramStore(),
		context: new ContextStore(),
		project: new ProjectStore()
	};

	React.render(<App {...stores} />, document.body);
};