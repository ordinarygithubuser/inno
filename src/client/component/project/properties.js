import { React, Component } from 'ive-f';
import { Lang, Mode } from '../../const/conf';
import * as Actions from '../../action/conf';

export default class Properties extends Component {
	setLanguage (e) {
	    Actions.SetLanguage.trigger(e.target.value);
    }

	setModel (e) {
        Actions.SetMode.trigger(e.target.value);
	}

	renderSelection (array) {
		return array.map((current, key) => {
			return <option key={key} value={current}>{current}</option>;
		});
	}

	render () {
		let { lang, model } = this.props.conf;

		return <div className="generate form">
			<label>Language</label>
			<select value={lang} onChange={this.setLanguage.bind(this)}>
				{this.renderSelection(Lang)}
			</select>
			<label>Model File</label>
			<select value={model} onChange={this.setModel.bind(this)}>
				{this.renderSelection(Mode)}
			</select>
			<button>Save</button>
		</div>;
	}
}