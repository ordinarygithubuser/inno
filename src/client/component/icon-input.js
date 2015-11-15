import { React, Component, getNode } from 'ive-f';

export default class IconInput extends Component {
	constructor () {
		super();
		this.own('onChange', 'keyDown');
	}

	componentDidMount () {
		if (this.props.focus) {
			getNode(this.refs.field).focus();
		}
	}

	onChange (e) {
		this.props.change(e.target.value, e.which);
	}

	keyDown (e) {
		if (this.props.keyDown) {
			this.props.keyDown(e.which);
		}
	}

	render () {
		let { icon, value, type } = this.props;

		if (!type) type = 'text';

		return <div className="icon-input">
			<i className={'fa fa-' + icon} />
			<input ref="field" type={type} onChange={this.onChange} onKeyDown={this.keyDown} value={value} />
		</div>;
	}
}