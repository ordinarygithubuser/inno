import { React, Component } from 'ive-f';

export default class Menu extends Component {

	renderActive () {
		let { selected } = this.props;

		if (selected != null) {
			let Component = selected.component;
			return <Component {...this.props.data} />
		}
		return <noscript />;
	}

	renderOption (opt, key) {
		let { selected, select } = this.props;
		let className = selected && selected.name == opt.name ? 'selected': '';
		let click = () => select(opt);

		return <div key={key} className={`option ${className}`} onClick={click}>
			<i className={`fa fa-${opt.icon}`} title={opt.name} />
		</div>;
	}

	renderOptions () {
		return this.props.options.map((opt, key) => {
			return this.renderOption(opt, key);
		});
	}

	render () {
		return <div className="menu">
			<div className="options">
				{this.renderOptions()}
			</div>
			<div className="active-option">
				{this.renderActive()}
			</div>
		</div>;
	}
}