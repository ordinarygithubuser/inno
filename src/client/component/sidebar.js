import { React, Component } from 'ive-f';
import Tabs from './tabs';
import ProjectMenu from './project/menu';
import DiagramMenu from './diagram/menu';
import ToolMenu from './tools/menu';

let Project = (data) => {
	let title = 'Project';
	if (data.project) title += ' - ' + data.project.name;
	return { id: 0, title: title, screen: ProjectMenu, data: data };
};

let Diagram = (data) => {
	let title = 'Diagram';
	if (data.diagram) title += ' - ' + data.diagram.name;
	return { id: 1, title: title, screen: DiagramMenu, data: data }
};

let Tools = (data) => {
	return { id: 2, title: 'Tools', screen: ToolMenu, data: data }
};

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
		let props = this.props;
		let tabs = [Project(props)];

		if (this.props.project) {
			tabs.push(Diagram(props));
		}

		if (this.props.diagram) {
			tabs.push(Tools(props));
		}

		return <div className="side">
			<Tabs tabs={tabs} toggle={this.setTabState} states={tabStates}/>
		</div>;
	}
}