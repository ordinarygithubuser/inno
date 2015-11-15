import { React, Component } from 'ive-f';
import Tab from './tab';

export default class Tabs extends Component {
	constructor (props) {
		super(props);
	}

	renderTabs () {
		let { tabs, states, toggle } = this.props;

		return tabs.map(tab => {
			return <Tab tab={tab} key={tab.id} open={states[tab.id]} toggle={toggle} />;
		});
	}

	render () {
		return <div className="tabs">
			{this.renderTabs()}
		</div>;
	}
}