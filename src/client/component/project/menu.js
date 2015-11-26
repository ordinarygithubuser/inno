import { React, Component } from 'ive-f';
import Menu from '../menu';
import Properties from './properties';
import ProjectLoadContext from './load';
import ProjectCreateContext from './create';
import ProjectUpdateContext from './update';

function Option (name, icon, component, focus = true) {
	return { name, icon, component, focus };
}

let OPTIONS = {
	LOAD: Option('Load', 'list', ProjectLoadContext),
	NEW: Option('New', 'plus-circle', ProjectCreateContext),
	EDIT: Option('Edit', 'pencil', ProjectUpdateContext),
	PROPS: Option('Properties', 'gear', Properties),
	GENERATE: Option('Generate', 'play-circle', Properties, false)
};

export default class ProjectMenu extends Component {
	constructor (props) {
		super(props);
		this.own('select');
		this.state = {
			selected: OPTIONS.LOAD
		}
	}

	select (option) {
		if (option.name == 'Generate') {
			alert('generate');
		} else {
			this.setState({ selected: option });
		}
	}

	render () {
		let options = [ OPTIONS.LOAD, OPTIONS.NEW ];
		if (this.props.project) {
			options.push(OPTIONS.EDIT);
			options.push(OPTIONS.GENERATE);
		}
		options.push(OPTIONS.PROPS);

		return <Menu options={options}
					 data={this.props}
					 select={this.select}
					 selected={this.state.selected} />;
	}

}