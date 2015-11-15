import { React, Component } from 'ive-f';
import { LoadProject } from '../../action/project';

export default class ProjectLoadContext extends Component {
	constructor (props) {
		super(props);
		if (this.props.projects.length > 0) {
			this.state = { project: this.props.projects[0] };
		} else {
			this.state = { project: null };
		}
		this.own('setProject', 'load');
	}

	load () {
		LoadProject.trigger(this.state.project);
	}

	setProject (project) {
		this.setState({ project });
	}

	renderList () {
		let { projects } = this.props;
		let { project } = this.state;

		if (projects.length == 0) {
			return <span className="item">No projects found</span>;
		}

		let elements = projects.map((current, key) => {
			let selected = project && project.id == current.id ? 'selected' : '';
			let setProject = () => this.setProject(current);
			return <div key={key} className={`item ${selected}`} onClick={setProject}>
				{current.name}
			</div>;
		});

		return <div className="list">{elements}</div>;
	}

	renderLoad () {
		if (!this.state.project) return <noscript />;

		return <button className="load" onClick={this.load}>
			Load
		</button>;
	}

	render () {
		return <div className="project-load">
			<h2>Load a Project</h2>

				{this.renderList()}

			{this.renderLoad()}
		</div>;
	}
}