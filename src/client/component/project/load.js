import { React, Component } from 'ive-f';
import { LoadProject } from '../../action/project';

export default class ProjectLoadContext extends Component {
	constructor (props) {
		super(props);
	}

	select (project) {
		let  current = this.props.project;

		if (!current || (current&& current.id != project.id)) {
			LoadProject.trigger(project);
		}
	}

	renderList () {
		let { projects, project } = this.props;

		if (projects.length == 0) {
			return <span className="item">No projects found</span>;
		}

		let elements = projects.map((current, key) => {
			let className =  project && project.id == current.id ? 'selected' : '';
			return <div key={key} className={`item ${className}`} onClick={() => this.select(current)}>
				{current.name}
			</div>;
		});

		return <div className="list">{elements}</div>;
	}

	render () {
		return <div className="project-load">
			{this.renderList()}
		</div>;
	}
}