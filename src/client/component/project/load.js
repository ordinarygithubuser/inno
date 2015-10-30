import { React, Component } from 'ive-f';
import { LoadProject } from '../../action/poject';

export default class ProjectLoadContext extends Component {
	constructor (props) {
		super(props);
		this.state = { project: null };
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

		if (projects.length == 0) {
			return <span className="item">No projects found</span>;
		}

		return projects.map((project, key) => {
			return <div key={key} className="project item" onClick={this.setProject}>
				{project.name}
			</div>;
		});
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
			<div className="list">
				{this.renderList()}
			</div>
			{this.renderLoad()}
		</div>;
	}
}