import Plnx from 'plnx';
import Utils from './utils';
import * as Constants from './constants';

export default class Poloniex {

    constructor() {
        this.init();
    }

    init() {
        this.connect();
    }

    connect() {
        Plnx.push((session) => {
            Utils.event.emit(Constants.EVENT_TYPE_EXCHANGE_CONNECTED, session, this);
        });
    }

    subscribe(session, channel) {
        session.subscribe(channel, (data) => {
            Utils.event.emit(Constants.EVENT_TYPE_EXCHANGE_TICKER_UPDATE, data);
        });
    }

    getBalances() {

    }

    getTicker() {

    }

    getOpenOrders() {

    }

    buy() {

    }

    sell() {

    }

}