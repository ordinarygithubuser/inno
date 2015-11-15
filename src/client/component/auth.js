import { React, StoreComponent } from 'ive-f';

import Login from './login.js';
import Register from './register.js';

const LOGIN_VIEW = 'login';
const REGISTER_VIEW = 'register';

export default class Auth extends StoreComponent {
	constructor (props) {
		super(props);
		this.state = { view: LOGIN_VIEW };
		this.own('showLogin', 'showRegister');
	}

	showLogin () {
		this.setState({ view: LOGIN_VIEW });
	}

	showRegister () {
		this.setState({ view: REGISTER_VIEW });
	}

	renderView () {
		let view = this.state.view;

		switch (view) {
			case LOGIN_VIEW: return <Login showRegister={this.showRegister} />;
			case REGISTER_VIEW: return <Register showLogin={this.showLogin} />;
			default: return <noscript />;
		}
	}

	render () {
		return <div className="auth">
			{this.renderView()}
		</div>;
	}
}