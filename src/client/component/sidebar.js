import { React, Component } from 'ive-f';
import Tabs from './tabs';
import ProjectMenu from './project/menu';
import DiagramMenu from './diagram/menu';
import ComponentMenu from './component/menu';

function Tab (id, title, screen, data) {
	return { id, title, screen, data };
}

/**
 * Exposes options to manipulate a the Diagram and
 * elements on it. Displays various state details.
 */
export default class SideBar extends Component {
	constructor (props) {
		super(props);
		this.own('setTabState');
		this.state = {
			tabStates: {}
		}
	}

	setTabState (tab) {
		let tabStates = this.state.tabStates;

		if (!tabStates[tab.id]) {
			tabStates[tab.id] = true;
		} else {
			tabStates[tab.id] = false;
		}
		this.setState({ tabStates });
	}

	/**
	 * TODO: render menu options
	 * 	elements draggable to the diagram
	 * 	context properties
	 * 	detailed options -> popups
	 */
	render () {
		let { tabStates } = this.state;
		let { project, diagram } = this.props;
		let tabs = [];

		tabs.push(Tab(0, project ? project.name : 'No Project selected', ProjectMenu, this.props));

		if (project) {
			tabs.push(Tab(1, diagram ? diagram.name : 'No Diagram selected', DiagramMenu, this.props));
			if (diagram) {
				tabs.push(Tab(2, `Components [${diagram.type}]`, ComponentMenu, this.props));
			}
		}

		return <div className="side">
			<Tabs tabs={tabs} toggle={this.setTabState} states={tabStates}/>
		</div>;
	}
}