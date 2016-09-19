import Plnx from 'plnx';
import Utils from './utils';
import * as Constants from './constants';

export default class Poloniex {

    constructor() {
        this.init();
    }

    init() {
        Utils.event.emit(Constants.EVENT_TYPE_EXCHANGE_INITIED, this.name);

        this.connect();
    }

    connect() {
        Plnx.push((session) => {
            Utils.event.emit(Constants.EVENT_TYPE_EXCHANGE_CONNECTED, session);
        });
    }

    subscribe(session, channel) {
        session.subscribe(channel, (data) => {
            Utils.event.emit(Constants.EVENT_TYPE_EXCHANGE_TICKER_UPDATE, data);
        });
    }

    getBalances() {
        Plnx.returnCompleteBalances({
            key: '',
            secret: ''
        }, function(err, data) {
            if (!err & data) {
                Utils.event.emit(Constants.EVENT_TYPE_EXCHANGE_GET_BALANCES, data);
            }
        });
    }

    getOpenOrders() {
        Plnx.returnOpenOrders({
            currencyPair: '',
            key: '',
            secret: ''
        }, function(err, data) {
            if (!err && data) {
                Utils.event.emit(Constants.EVENT_TYPE_EXCHANGE_GET_OPEN_ORDERS, data);
            }
        });
    }

    buy(currencyPair, rate, amount) {
        Plnx.buy({
            currencyPair: currencyPair,
            rate: rate,
            amount: amount,
            key: '',
            secret: ''
        }, function(err, data) {
            if (!err && data) {
                Utils.event.emit(Constants.EVENT_TYPE_EXCHANGE_BUY, data);
            }
        })
    }

    sell(currencyPair, rate, amount) {
        Plnx.sell({
            currencyPair: currencyPair,
            rate: rate,
            amount: amount,
            key: '',
            secret: ''
        }, function(err, data) {
            if (!err && data) {
                Utils.event.emit(Constants.EVENT_TYPE_EXCHANGE_SELL, data);
            }
        });
    }

    get name() {
        return 'Poloniex';
    }

}