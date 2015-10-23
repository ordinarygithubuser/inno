import { React } from 'ive-f';
import App from './component/app';

import DiagramStore from './store/diagram';

window.onload = () => {
	let diagram = new DiagramStore();

	React.render(<App diagram={diagram} />, document.body);
};