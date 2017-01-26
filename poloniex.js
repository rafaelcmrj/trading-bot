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
            key: 'HBPMA84V-I7JVGMD0-WJOFF96N-F7WMUYB1',
            secret: 'd8591347687ca8b3128f038d4391c32a984e02a919f9d83a5bf72274bfa01728f2d1792d4385aa67b8cf579252058a88db0500b1565e177ca0b45e4d4dcba57a'
        }, function (err, data) {
            if (data) {
                Utils.event.emit(Constants.EVENT_TYPE_EXCHANGE_GET_BALANCES, data);
            }
        });
    }

    getOpenOrders() {
        Plnx.returnOpenOrders({
            currencyPair: '',
            key: 'HBPMA84V-I7JVGMD0-WJOFF96N-F7WMUYB1',
            secret: 'd8591347687ca8b3128f038d4391c32a984e02a919f9d83a5bf72274bfa01728f2d1792d4385aa67b8cf579252058a88db0500b1565e177ca0b45e4d4dcba57a'
        }, function(err, data) {
            if (!err && data) {
                Utils.event.emit(Constants.EVENT_TYPE_EXCHANGE_GET_OPEN_ORDERS, data);
            }
        });
    }

    returnChartData() {
        Plnx.returnChartData({
            currencyPair: 'USDT_BTC',
            period: 900,
            start: Math.round(new Date().getTime() / 1000) - (6 * 3600),
            end: '9999999999'
        }, function (err, data) {
            if (data) {
                Utils.event.emit(Constants.EVENT_TYPE_EXCHANGE_RETURN_CHART_DATA, data);
            }
        })
    }

    buy(currencyPair, rate, amount) {
        Plnx.buy({
            currencyPair: currencyPair,
            rate: rate,
            amount: amount,
            key: 'HBPMA84V-I7JVGMD0-WJOFF96N-F7WMUYB1',
            secret: 'd8591347687ca8b3128f038d4391c32a984e02a919f9d83a5bf72274bfa01728f2d1792d4385aa67b8cf579252058a88db0500b1565e177ca0b45e4d4dcba57a'
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
            key: 'HBPMA84V-I7JVGMD0-WJOFF96N-F7WMUYB1',
            secret: 'd8591347687ca8b3128f038d4391c32a984e02a919f9d83a5bf72274bfa01728f2d1792d4385aa67b8cf579252058a88db0500b1565e177ca0b45e4d4dcba57a'
        }, function(err, data) {
            if (!err && data) {
                Utils.event.emit(Constants.EVENT_TYPE_EXCHANGE_SELL, data);
            }
        });
    }

    serializeTickerUpdate(ticker) {
        return {
            currencyPair: ticker[0],
            lastPrice: ticker[1],
            lowestAsk: ticker[2],
            highestBid: ticker[3],
            percentChange: ticker[4],
            baseVolume: ticker[5],
            quoteVolume: ticker[6],
            isFrozen: ticker[7],
            high24hr: ticker[8]
        };
    }

    get name() {
        return 'Poloniex';
    }

}