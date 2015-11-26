import { Store } from 'ive-f';
import { Lang, Mode } from '../const/conf';
import * as Actions from '../action/conf';

export default class ConfStore extends Store {
    constructor (conf = { lang: Lang[0], mode: Mode[0]}) {
        super({ conf });

        this.listenTo(Actions.SetLanguage, this.setLanguage);
        this.listenTo(Actions.SetMode, this.setMode);
    }

    setLanguage (lang = Lang[0]) {
        this.state.conf.lang = lang;
        this.notify();
    }

    setMode (mode = Mode[0]) {
        this.state.conf.mode = mode;
        this.notify();
    }
}