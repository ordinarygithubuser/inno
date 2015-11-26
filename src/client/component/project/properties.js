import { React, Component } from 'ive-f';

let LANGUAGES = [ 'Javascript', 'Java', 'Scala' ];
let MODELS = [ 'None', 'JSON', 'XML' ];

export default class Properties extends Component {
	constructor (props) {
		super(props);
		this.state = {
			language: LANGUAGES[0],
			model: MODELS[0]
		};
	}

	setLanguage (e) {
		this.setState({ language: e.target.value });
	}

	setModel (e) {
		this.setState({ model: e.target.value });
	}

	renderSelection (array) {
		return array.map((current, key) => {
			return <option key={key} value={current}>{current}</option>;
		});
	}

	render () {
		let { language, model } = this.state;

		return <div className="generate form">
			<label>Language</label>
			<select value={language} onChange={this.setLanguage.bind(this)}>
				{this.renderSelection(LANGUAGES)}
			</select>
			<label>Model File</label>
			<select value={model} onChange={this.setModel.bind(this)}>
				{this.renderSelection(MODELS)}
			</select>
			<button>Save</button>
		</div>;
	}
}