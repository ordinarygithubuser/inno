import { React } from 'ive-f';
import App from './component/app';

import DiagramStore from './store/diagram';
import UserStore from './store/user';
import ContextStore from './store/context';
import ProjectStore from './store/project';

window.onload = () => {
	let stores = {
		diagram: new DiagramStore(),
		user: new UserStore(),
		context: new ContextStore(),
		project: new ProjectStore()
	};

	React.render(<App {...stores} />, document.body);
};