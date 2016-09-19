import Events from 'events';

export default class Utils {

    static now() {
        let date = new Date();
        return date.toLocaleString();
    }

    static log(str) {
        let message = Utils.now() + ': ' + str;
        console.log(message);
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