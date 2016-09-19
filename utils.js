import Events from 'events';

export default class Utils {

    static now() {
        let date = new Date();
        return date.toLocaleString();
    }

    static log(str) {
        console.log(str);
    }

    static get event() {

        if (!this._event) {
            this._event = new Events();
        }

        return this._event;
    }

    static emitEvent(event, params) {
        
    }

}