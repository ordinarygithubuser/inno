import { React, Component } from 'ive-f';
import { LoadDiagram } from '../../action/diagram';

export default class DiagramLoadContext extends Component {
	constructor (props) {
		super(props);
		this.state = { diagram: null };
		this.own('setDiagram', 'load');
	}

	load () {
		LoadDiagram.trigger({ id: this.state.diagram.id });
	}

	setDiagram (diagram) {
		this.setState({ diagram });
	}

	renderList () {
		let { project, diagrams } = this.props;
		let { diagram } = this.state;

		diagrams = diagrams.filter(diagram => {
			return diagram.projectId == project.id;
		});

		if (diagrams.length == 0) {
			return <span className="item">No diagrams found</span>;
		}

		let elements = diagrams.map((current, key) => {
			let selected = diagram && diagram.id == current.id ? 'selected' : '';
			let click = () => this.setDiagram(current);
			return <div key={key} className={`item ${selected}`} onClick={click}>
				{current.name}
			</div>;
		});

		return <div className="list">{elements}</div>;
	}

	renderLoad () {
		if (!this.state.diagram) return <noscript />;

		return <button className="load" onClick={this.load}>Load</button>;
	}

	render () {
		return <div className="diagram-load">
			<h2>Load a Diagram</h2>
			{this.renderList()}
			{this.renderLoad()}
		</div>;
	}
}