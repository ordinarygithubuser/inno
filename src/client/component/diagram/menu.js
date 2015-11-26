import { React, Component } from 'ive-f';
import Menu from '../menu';
import DiagramLoadContext from './load';
import DiagramCreateContext from './create';
import DiagramUpdateContext from './update';

function Option ( name, icon, component) {
	return { name, icon, component };
}

let OPTIONS = {
	LOAD: Option('Load', 'list', DiagramLoadContext),
	NEW: Option('New', 'plus-circle', DiagramCreateContext),
	EDIT: Option('Edit', 'pencil', DiagramUpdateContext)
};

export default class DiagramMenu extends Component {
	constructor (props) {
		super(props);
		this.own('select');
		this.state = {
			selected: OPTIONS.LOAD
		};
	}

	select (option) {
		this.setState({ selected: option });
	}

	render () {
		let options = [ OPTIONS.LOAD, OPTIONS.NEW ];
		if (this.props.diagram) options.push(OPTIONS.EDIT);

		return <Menu options={options}
					 data={this.props}
					 select={this.select}
					 selected={this.state.selected} />;
	}

}