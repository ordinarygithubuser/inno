import { React, StoreComponent } from 'ive-f';

import SideBar from './side-bar';
import Diagram from './diagram';

/**
 * Ties all data stores and view components.
 * It is the entry node of the presentation.
 */
export default class App extends StoreComponent {
	constructor (props) {
		super(props);

		this.connect(this.props.diagram, (s) => { return { diagram: s }});
	}

	/**
	 * TODO render app components
	 * 	Renders the Sidebar and Diagram if the user is
	 * 	logged in, otherwise the authorization will be shown.
	 */
	render () {
		let { diagram } = this.state;

		return <div className="app">
			<SideBar />
		</div>;
	}
}