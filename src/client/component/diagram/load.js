import { React, Component } from 'ive-f';
import { LoadDiagram } from '../../action/diagram';

export default class DiagramLoadContext extends Component {

	select (diagram) {
		let  current = this.props.diagram;

		if (!current || (current&& current.id != diagram.id)) {
			LoadDiagram.trigger(diagram);
		}
	}

	renderList () {
		let { project, diagrams, diagram } = this.props;

		diagrams = diagrams.filter(diagram => {
			return diagram.projectId == project.id;
		});

		if (diagrams.length == 0) {
			return <span className="item">No diagrams found</span>;
		}

		let elements = diagrams.map((current, key) => {
			let className =  diagram && diagram.id == current.id ? 'selected' : '';
			return <div key={key} className={`item ${className}`} onClick={() => this.select(current)}>
				{current.name}
			</div>;
		});

		return <div className="list">{elements}</div>;
	}

	render () {
		return <div className="diagram-load">
			{this.renderList()}
		</div>;
	}
}