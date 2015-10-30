import { React, StoreComponent } from 'ive-f';

import SideBar from './sidebar';
import Diagram from './diagram';
import Context from './context';
import Auth from './auth';

/**
 * Ties all data stores and view components.
 * It is the entry node of the presentation.
 */
export default class App extends StoreComponent {
	constructor (props) {
		super(props);

		this.connect(props.user);
		this.connect(props.diagram);
		this.connect(props.context);
		this.connect(props.project);
	}

	renderApp(...components) {
		return <div className="app">{components}</div>;
	}

	/**
	 * TODO render app components
	 * 	Renders the Sidebar and Diagram if the user is
	 * 	logged in, otherwise the authorization will be shown.
	 */
	render () {
		let { diagram, context, user } = this.state;

		if (user.name == null) {
			return this.renderApp(<Auth />);
		} else {
			return this.renderApp(
				<SideBar {...this.state} />,
				<Diagram diagram={diagram} />,
				<Context context={context} />
			);
		}
	}
}