import { React, Component } from 'ive-f';

export default class Tab extends Component {
	constructor (props) {
		super(props);
	}

	renderInner () {
		let { tab } = this.props;
		let Component = tab.screen;

		if (!this.props.open) {
			return <noscript />;
		}

		return <div className="inner">
			<Component {...tab.data} />
		</div>
	}

	render () {
		let { tab, toggle } = this.props;

		return <div key={tab.id} className="tab">
			<div className="head" onClick={() => toggle(tab)}>
				{tab.title}
			</div>
			{this.renderInner()}
		</div>;
	}
}