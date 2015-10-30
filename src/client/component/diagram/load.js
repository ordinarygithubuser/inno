import { React, Component } from 'ive-f';
import { LoadDiagram } from '../../action/diagram';

export default class DiagramLoadContext extends Component {
	constructor (props) {
		super(props);
		this.state = { diagram: null };
		this.own('setDiagram', 'load');
	}

	load () {
		LoadDiagram.trigger(this.state.project);
	}

	setDiagram (diagram) {
		this.setState({ diagram });
	}

	renderList () {
		let { diagrams } = this.props;

		if (diagrams.length == 0) {
			return <span className="item">No diagrams found</span>;
		}

		return diagrams.map((diagram, key) => {
			return <div key={key} className="diagram item" onClick={this.setDiagram}>
				{diagram.name}
			</div>;
		});
	}

	renderLoad () {
		if (!this.state.diagram) return <noscript />;

		return <button className="load" onClick={this.load}>Load</button>;
	}

	render () {
		return <div className="diagram-load">
			<h2>Load a Diagram</h2>
			<div className="list">
				{this.renderList()}
			</div>
			{this.renderLoad()}
		</div>;
	}
}