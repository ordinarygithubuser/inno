import { Store } from 'ive-f';
import { Lang, Mode } from '../const/conf';

export default class ConfigStore {
    constructor (conf = { lang: Lang[0], mode: Mode[0]}) {
        super({ conf });
    }

    setLanguage (lang) {
        this.state.conf.lang = lang;
        this.notify();
    }

    setMode () {
        this.state.conf.mode = mode;
        this.notify();
    }
}